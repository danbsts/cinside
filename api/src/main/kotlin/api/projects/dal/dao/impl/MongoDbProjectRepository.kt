package api.projects.dal.dao.impl

import api.configuration.MongoDbConfiguration
import api.projects.dal.dao.ProjectRepository
import api.projects.dal.model.JoinRequest
import api.projects.dal.model.Project
import api.projects.dto.ProjectVisibility
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoCollection
import com.mongodb.client.MongoCursor
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Sorts
import com.mongodb.client.model.Updates
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import jakarta.inject.Singleton
import org.bson.types.ObjectId
import kotlin.math.ceil


@Singleton
class MongoDbProjectRepository(
  private val mongoConfig: MongoDbConfiguration,
  private val mongoClient: MongoClient
) : ProjectRepository {
  private val PAGE_SIZE = 15

  private val collection: MongoCollection<Project>
    get() = mongoClient.getDatabase(mongoConfig.name)
      .getCollection(mongoConfig.projectCollection, Project::class.java)

  override fun save(project: Project): ObjectId? {
    val result = collection.insertOne(project)
    if (!result.wasAcknowledged()) {
      return null
    }
    return result.insertedId?.let { it.asObjectId().value }
  }

  override fun findByFounderUsername(username: String): List<Project> {
    val filter = Filters.eq("founderUsername", username)
    val result = collection.find(filter)
    return result.toList()
  }

  override fun findById(id: ObjectId): Project? {
    val filter = Filters.eq("_id", id)
    val result = collection.find(filter)
    return result.first()
  }

  override fun findAllPaged(pageNumber: Int, filterPrivate: Boolean): Page<Project> {
    val filter = if (filterPrivate) Filters.eq("visibility", ProjectVisibility.PUBLIC) else
      Filters.or(
        Filters.eq("visibility", ProjectVisibility.PUBLIC),
        Filters.eq("visibility", ProjectVisibility.PRIVATE)
      )
    val sort = Sorts.ascending("title")

    val totalRecords: Long = collection.countDocuments(filter)
    var realPageNumber = pageNumber
    if (PAGE_SIZE.toLong() * (pageNumber - 1) > totalRecords) {
      realPageNumber = ceil(totalRecords.toDouble() / PAGE_SIZE.toDouble()).toInt()
    }
    val mongoCursor = collection
      .find(filter)
      .sort(sort)
      .skip(PAGE_SIZE * (pageNumber - 1))
      .limit(PAGE_SIZE)
      .cursor()

    val result = ArrayList<Project>()
    while (mongoCursor.hasNext()) {
      result.add(mongoCursor.next())
    }
    return Page.of(result, Pageable.from(realPageNumber, PAGE_SIZE), totalRecords)
  }

  override fun update(project: Project): Long {
    val filter = Filters.eq("_id", project.id)
    val result = collection.replaceOne(filter, project)
    return result.modifiedCount
  }

  override fun delete(id: ObjectId): Long {
    val filter = Filters.eq("_id", id)
    return collection.deleteOne(filter).deletedCount
  }

  override fun addJoinRequest(id: ObjectId, joinRequest: JoinRequest): Long {
    return addJoinRequestToField(id, "joinRequests", joinRequest)
  }

  override fun addUnNotifiedJoinRequest(id: ObjectId, joinRequest: JoinRequest): Long {
    return addJoinRequestToField(id, "notifyJoinRequests", joinRequest)
  }

  private fun addJoinRequestToField(id: ObjectId, fieldName: String, joinRequest: JoinRequest): Long {
    val filter = Filters.eq("_id", id)
    val update = Updates.push(fieldName, joinRequest)
    val result = collection.updateOne(filter, update)
    return result.modifiedCount
  }

  override fun findAllWithPendingJoinRequests(): List<Project> {
    val filters = Filters.ne("notifyJoinRequests", null)
    val cursor = collection.find(filters).cursor()

    val result = ArrayList<Project>()
    while (cursor.hasNext()) result.add(cursor.next())
    return result
  }

  override fun removeNotifiableJoinRequests(id: ObjectId): Long {
    val filter = Filters.eq("_id", id)
    val update = Updates.unset("notifyJoinRequests")
    return collection.updateOne(filter, update).modifiedCount
  }
}