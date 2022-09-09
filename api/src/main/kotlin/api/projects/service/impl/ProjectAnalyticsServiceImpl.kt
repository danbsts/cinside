package api.projects.service.impl

import api.auth.CustomAuthentication
import api.projects.dal.dao.ProjectAnalyticsRepository
import api.projects.dal.model.ProjectAnalytics
import api.projects.service.ProjectAnalyticsService
import jakarta.inject.Singleton
import org.bson.types.ObjectId
import java.time.LocalDateTime

@Singleton
class ProjectAnalyticsServiceImpl(
  private val projectAnalyticsRepository: ProjectAnalyticsRepository,
  private val customAuthentication: CustomAuthentication,
) : ProjectAnalyticsService {

  override fun addPreviewToProject(projectId: ObjectId) {
    val projectAnalytics = findOrSaveProjectAnalytics(projectId)

    val username = customAuthentication.getUserName()
    val lastUserPreview = projectAnalytics.projectPreviews
      .filter { it.username == username }.maxByOrNull { it.time }

    val fourHoursAgo = LocalDateTime.now().minusHours(1L)
    if (lastUserPreview == null || lastUserPreview.time.isBefore(fourHoursAgo)) {
      projectAnalyticsRepository.addProjectPreview(projectAnalytics.id!!, username)
    }
  }

  private fun findOrSaveProjectAnalytics(projectId: ObjectId): ProjectAnalytics {
    val projectAnalytics = projectAnalyticsRepository.findByProjectId(projectId)
      ?: ProjectAnalytics(projectId = projectId).also {
        it.id = projectAnalyticsRepository.save(it)
      }
    return projectAnalytics
  }
}