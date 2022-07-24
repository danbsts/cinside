package api.projects.mapper

import api.auth.CustomAuthentication
import api.projects.dal.model.Project
import api.projects.dto.ContributorDTO
import api.projects.dto.ProjectDTO
import jakarta.inject.Singleton

@Singleton
class ProjectMapper(private val customAuthentication: CustomAuthentication) {

  fun projectToDTO(project: Project): ProjectDTO {
    var isFounder =
      if (customAuthentication.isAuthenticated())
        project.founderUsername == customAuthentication.getUserName()
      else false

    return ProjectDTO(
      id = project.id.toString(),
      title = project.title,
      isFounder = isFounder,
      startDate = project.startDate,
      status = project.status,
      visibility = project.visibility,
      stack = project.stack,
      description = project.description,
      url = project.url,
      repository = project.repository,
      contributors = project
        .contributors
        .map { ContributorDTO(it.name, it.role, it.username) }
        .toMutableList(),
    )
  }
}
