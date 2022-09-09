package api.projects.service

import org.bson.types.ObjectId

interface ProjectAnalyticsService {

  fun addPreviewToProject(projectId: ObjectId)
}