package api.projects.dal.dao.impl

import api.configuration.MongoDbConfiguration
import api.projects.dal.dao.ProjectAnalyticsRepository
import api.projects.dal.model.ProjectAnalytics
import api.projects.dal.model.ProjectPreview
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoCollection
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Updates
import jakarta.inject.Singleton
import org.bson.types.ObjectId

@Singleton
class MongoDbProjectAnalyticsRepository(
  private val mongoConfig: MongoDbConfiguration,
  private val mongoClient: MongoClient
) : ProjectAnalyticsRepository {

  private val collection: MongoCollection<ProjectAnalytics>
    get() = mongoClient.getDatabase(mongoConfig.name)
      .getCollection(mongoConfig.projectAnalyticsCollection, ProjectAnalytics::class.java)

  override fun save(projectAnalytics: ProjectAnalytics): ObjectId? {
    val result = collection.insertOne(projectAnalytics)
    if (!result.wasAcknowledged()) {
      return null
    }
    return result.insertedId?.let { it.asObjectId().value }
  }

  override fun findByProjectId(projectId: ObjectId): ProjectAnalytics? {
    val filter = Filters.eq("projectId", projectId)
    return collection.find(filter).first()
  }

  override fun addProjectPreview(id: ObjectId, username: String): Long {
    val filter = Filters.eq("_id", id)
    val update = Updates.push("projectPreviews", ProjectPreview(username = username))
    val result = collection.updateOne(filter, update)
    return result.modifiedCount
  }

}