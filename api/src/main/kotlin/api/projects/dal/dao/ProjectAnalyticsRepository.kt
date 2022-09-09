package api.projects.dal.dao

import api.projects.dal.model.ProjectAnalytics
import org.bson.types.ObjectId

interface ProjectAnalyticsRepository {

  fun save(projectAnalytics: ProjectAnalytics): ObjectId?

  fun findByProjectId(projectId: ObjectId): ProjectAnalytics?

  fun addProjectPreview(id: ObjectId, username: String): Long
}