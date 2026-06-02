package api.projects.dal.dao

import api.projects.dal.model.ProjectAnalytics

interface ProjectAnalyticsRepository {

  fun save(projectAnalytics: ProjectAnalytics): String?

  fun findByProjectId(projectId: String): ProjectAnalytics?

  fun addProjectPreview(id: String, username: String): Long
}