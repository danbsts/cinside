package api.projects.service.impl

import api.auth.CustomAuthentication
import api.people.dal.dao.PersonRepository
import api.projects.dal.dao.ProjectRepository
import api.projects.dal.model.Contributor
import api.projects.dal.model.JoinRequest
import api.projects.dal.model.Project
import api.projects.dto.ProjectDTO
import api.projects.dto.ProjectStatus
import api.projects.dto.ProjectVisibility
import api.projects.mapper.ProjectMapper
import api.projects.service.ProjectService
import io.micronaut.data.model.Page
import io.micronaut.http.HttpStatus
import io.micronaut.http.exceptions.HttpStatusException
import jakarta.inject.Singleton
import org.bson.types.ObjectId

@Singleton
class ProjectServiceImpl(
  private val personRepository: PersonRepository,
  private val projectRepository: ProjectRepository,
  private val customAuthentication: CustomAuthentication,
  private val projectMapper: ProjectMapper,
) : ProjectService {

  override fun register(projectDTO: ProjectDTO): ObjectId? {
    if (
      projectDTO.title == null || projectDTO.startDate == null ||
      projectDTO.status == null || projectDTO.visibility == null ||
      projectDTO.stack == null || projectDTO.description == null ||
      projectDTO.contributors == null || projectDTO.stack.isEmpty() ||
      projectDTO.images == null
    ) {
      throw HttpStatusException(HttpStatus.BAD_REQUEST, "Missing project information")
    }

    val username = customAuthentication.getUserName()
    val user = personRepository.findByUsername(username)
    if (user?.displayName == null) {
      throw HttpStatusException(HttpStatus.UNAUTHORIZED, "User not found.")
    }
    val contributors = projectDTO
      .contributors
      .map { Contributor(it.name, it.role, it.username) }
      .toMutableList()

    val founderProjects = projectRepository.findByFounderUsername(username)
    if (founderProjects.size >= 10) {
      throw HttpStatusException(HttpStatus.FORBIDDEN, "Too many projects registered for this account")
    }

    val project = Project(
      title = projectDTO.title,
      startDate = projectDTO.startDate,
      status = projectDTO.status,
      visibility = projectDTO.visibility,
      stack = projectDTO.stack,
      description = projectDTO.description,
      url = projectDTO.url,
      repository = projectDTO.repository,
      contributors = contributors,
      images = projectDTO.images,
      founderUsername = username
    )
    return projectRepository.save(project)
      ?: throw HttpStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error saving.")
  }

  override fun find(id: ObjectId): ProjectDTO {
    val project = projectRepository.findById(id)
      ?: throw HttpStatusException(HttpStatus.NOT_FOUND, "Project $id not registered")

    return projectMapper.projectToDTO(project)
  }

  override fun findAllPaged(
    page: Int,
    projectStatus: ProjectStatus?,
    projectVisibility: ProjectVisibility?,
    filterPrivate: Boolean
  ): Page<ProjectDTO> {
    val projectPage = projectRepository.findAllPaged(page, projectStatus, projectVisibility, filterPrivate)
    val problemDTOs =
      projectPage.content.map { project -> projectMapper.projectToDTO(project) }
    return Page.of(problemDTOs, projectPage.pageable, projectPage.totalSize)
  }


  override fun update(projectDTO: ProjectDTO): Long {
    if (
      projectDTO.title == null || projectDTO.startDate == null ||
      projectDTO.status == null || projectDTO.visibility == null ||
      projectDTO.stack == null || projectDTO.description == null ||
      projectDTO.contributors == null || projectDTO.stack.isEmpty() ||
      projectDTO.images == null || projectDTO.id == null
    ) {
      throw HttpStatusException(HttpStatus.BAD_REQUEST, "Missing project information")
    }

    val userId = customAuthentication.getUserName()
    val user = personRepository.findByUsername(userId)
    if (user?.displayName == null) {
      throw HttpStatusException(HttpStatus.UNAUTHORIZED, "User not found.")
    }
    val replaceable = projectRepository.findById(ObjectId(projectDTO.id))
      ?: throw HttpStatusException(HttpStatus.NOT_FOUND, "Project ${projectDTO.id} not registered")
    if (userId != replaceable.founderUsername) {
      throw HttpStatusException(HttpStatus.FORBIDDEN, "Not project owner")
    }

    val contributors = projectDTO.contributors
      .map { Contributor(it.name, it.role, it.username) }
      .toMutableList()

    replaceable.title = projectDTO.title
    replaceable.startDate = projectDTO.startDate
    replaceable.status = projectDTO.status
    replaceable.visibility = projectDTO.visibility
    replaceable.stack = projectDTO.stack
    replaceable.description = projectDTO.description
    replaceable.url = projectDTO.url
    replaceable.repository = projectDTO.repository
    replaceable.contributors = contributors
    replaceable.images = projectDTO.images

    return projectRepository.update(replaceable)
  }

  override fun sendJoinRequest(id: ObjectId) {
    val username = customAuthentication.getUserName()
    val project = projectRepository.findById(id)
    if (project?.joinRequests?.find { it.username == username } != null) {
      return
    }
    val joinRequest = JoinRequest(username)
    projectRepository.addJoinRequest(id, joinRequest)
    projectRepository.addUnNotifiedJoinRequest(id, joinRequest)
  }

  override fun delete(id: ObjectId): Long {
    val project = projectRepository.findById(id)
      ?: throw HttpStatusException(HttpStatus.NOT_FOUND, "Project $id not found.")
    if (customAuthentication.getUserName() != project.founderUsername) {
      throw HttpStatusException(HttpStatus.FORBIDDEN, "Not project owner")
    }
    return projectRepository.delete(id)
  }
}