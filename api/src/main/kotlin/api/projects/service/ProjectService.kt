package api.projects.service

import api.projects.dto.ProjectDTO
import api.projects.dto.ProjectStatus
import api.projects.dto.ProjectVisibility
import io.micronaut.data.model.Page
import org.bson.types.ObjectId

interface ProjectService {

  fun register(projectDTO: ProjectDTO): ObjectId?

  fun find(id: ObjectId): ProjectDTO

  fun findAllPaged(
    page: Int,
    projectStatus: ProjectStatus?,
    projectVisibility: ProjectVisibility?,
    filterPrivate: Boolean = false,
  ): Page<ProjectDTO>

  fun update(projectDTO: ProjectDTO): Long

  fun delete(id: ObjectId): Long

  fun sendJoinRequest(id: ObjectId)
}
