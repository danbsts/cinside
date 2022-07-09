package api.projects.service.impl

import api.auth.CustomAuthentication
import api.people.dal.dao.PersonRepository
import api.projects.dal.dao.ProjectRepository
import api.projects.dal.model.Contributor
import api.projects.dal.model.Project
import api.projects.dto.ProjectDTO
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
  private val customAuthentication: CustomAuthentication
) : ProjectService {
  val FOUNDER = "Founder"

  override fun register(projectDTO: ProjectDTO): ObjectId? {
    if (
      projectDTO.title == null || projectDTO.startDate == null ||
      projectDTO.status == null || projectDTO.visibility == null ||
      projectDTO.stack == null || projectDTO.description == null ||
      projectDTO.url == null || projectDTO.repository == null ||
      projectDTO.contributors == null || projectDTO.stack.isEmpty()
    ) {
      throw HttpStatusException(HttpStatus.BAD_REQUEST, "Missing project information")
    }

    val userId = customAuthentication.getUserID()
    val user = personRepository.findById(userId)
      ?: throw HttpStatusException(HttpStatus.UNAUTHORIZED, "User not found.")
    projectDTO.contributors.add(Contributor(user.displayName, FOUNDER, userId))

    val founderProjects = projectRepository.findByFounderId(userId)
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
      contributors = projectDTO.contributors,
      founderId = userId
    )
    return projectRepository.save(project)
      ?: throw HttpStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error saving.")
  }

  override fun find(id: ObjectId): ProjectDTO {
    val project = projectRepository.findById(id)
      ?: throw HttpStatusException(HttpStatus.NOT_FOUND, "Project $id not registered")

    return ProjectDTO(
      id = project.id.toString(),
      title = project.title,
      startDate = project.startDate,
      status = project.status,
      visibility = project.visibility,
      stack = project.stack,
      description = project.description,
      url = project.url,
      repository = project.repository,
      contributors = project.contributors.toMutableList(),
    )
  }

  override fun findAllPaged(page: Int, filterPrivate: Boolean): Page<ProjectDTO> {
    val page = projectRepository.findAllPaged(page, filterPrivate)
    val problemDTOs =
      page.content.map {
        ProjectDTO(
          id = it.id.toString(),
          title = it.title,
          startDate = it.startDate,
          status = it.status,
          visibility = it.visibility,
          stack = it.stack,
          description = it.description,
          url = it.url,
          repository = it.repository,
          contributors = it.contributors.toMutableList(),
        )
      }
    return Page.of(problemDTOs, page.pageable, page.totalSize)
  }


  override fun update(projectDTO: ProjectDTO): Long {
    if (
      projectDTO.title == null || projectDTO.startDate == null ||
      projectDTO.status == null || projectDTO.visibility == null ||
      projectDTO.stack == null || projectDTO.description == null ||
      projectDTO.url == null || projectDTO.repository == null ||
      projectDTO.contributors == null || projectDTO.stack.isEmpty() ||
      projectDTO.id == null
    ) {
      throw HttpStatusException(HttpStatus.BAD_REQUEST, "Missing project information")
    }

    val userId = customAuthentication.getUserID()
    val user = personRepository.findById(userId)
      ?: throw HttpStatusException(HttpStatus.UNAUTHORIZED, "User not found.")
    val replaceable = projectRepository.findById(ObjectId(projectDTO.id))
      ?: throw HttpStatusException(HttpStatus.NOT_FOUND, "Project ${projectDTO.id} not registered")
    if (userId != replaceable.founderId) {
      throw HttpStatusException(HttpStatus.FORBIDDEN, "Not project owner")
    }

    val contributors = projectDTO.contributors
      .filter { userId != it.userId }
      .toMutableList()
    contributors.add(Contributor(user.displayName, FOUNDER, userId))

    replaceable.title = projectDTO.title
    replaceable.startDate = projectDTO.startDate
    replaceable.status = projectDTO.status
    replaceable.visibility = projectDTO.visibility
    replaceable.stack = projectDTO.stack
    replaceable.description = projectDTO.description
    replaceable.url = projectDTO.url
    replaceable.repository = projectDTO.repository
    replaceable.contributors = contributors

    return projectRepository.update(replaceable)
  }

  override fun delete(id: ObjectId): Long {
    val project = projectRepository.findById(id)
      ?: throw HttpStatusException(HttpStatus.NOT_FOUND, "Project $id not found.")
    if (customAuthentication.getUserID() != project.founderId) {
      throw HttpStatusException(HttpStatus.FORBIDDEN, "Not project owner")
    }
    return projectRepository.delete(id)
  }
}