package api.projects.dal.dao.impl

import api.configuration.MongoDbConfiguration
import api.projects.dal.dao.ProjectRepository
import api.projects.dal.model.Project
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoCollection
import com.mongodb.client.model.Filters
import jakarta.inject.Singleton

@Singleton
class MongoDbProjectRepository(
  private val mongoConfig: MongoDbConfiguration,
  private val mongoClient: MongoClient
): ProjectRepository {

  private val collection: MongoCollection<Project>
    get() = mongoClient.getDatabase(mongoConfig.name)
      .getCollection(mongoConfig.personCollection, Project::class.java)

  override fun save(project: Project): Project? {
    val result = collection.insertOne(project)
    if (!result.wasAcknowledged()) {
      return null
    }
    return project
  }

  override fun emailExists(email: String): Boolean {
    val result = findByEmail(email)
    return result != null
  }

  override fun findByEmail(email: String): Project? {
    val filter = Filters.eq("email", email)
    val result = collection.find(filter)
    return result.first()
  }

  override fun update(project: Project): Long {
    val filter = Filters.eq("email", project.email)
    val result = collection.replaceOne(filter, project)
    return result.modifiedCount
  }

}