package api.projects.service.impl

import api.auth.CustomAuthentication
import api.people.dal.dao.PersonRepository
import api.people.service.impl.PersonServiceImpl
import api.projects.dal.dao.ProjectRepository
import api.projects.dal.model.Contributor
import api.projects.dal.model.Project
import api.projects.dto.ContributorDTO
import api.projects.dto.ProjectDTO
import api.projects.service.ProjectService
import io.micronaut.data.model.Page
import io.micronaut.http.HttpStatus
import io.micronaut.http.exceptions.HttpStatusException
import jakarta.inject.Singleton
import org.bson.types.ObjectId
import org.slf4j.LoggerFactory

@Singleton
class ProjectServiceImpl(
  private val personRepository: PersonRepository,
  private val projectRepository: ProjectRepository,
  private val customAuthentication: CustomAuthentication
) : ProjectService {
  val FOUNDER = "Founder"
  val LOG = LoggerFactory.getLogger(PersonServiceImpl::class.java)

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

    val username = customAuthentication.getUserName()
    val user = personRepository.findByUsername(username)
    if (user?.displayName == null) {
      throw HttpStatusException(HttpStatus.UNAUTHORIZED, "User not found.")
    }
    val contributors = projectDTO
      .contributors
      .filter { username != it.username }
      .map { Contributor(it.name, it.role, it.username) }
      .toMutableList()
    contributors
      .add(Contributor(user.displayName!!, FOUNDER, username))

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
      founderUsername = username
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
      contributors = project
        .contributors
        .map { ContributorDTO(it.name, it.role, it.username) }
        .toMutableList(),
    )
  }

  override fun findAllPaged(page: Int, filterPrivate: Boolean): Page<ProjectDTO> {
    val page = projectRepository.findAllPaged(page, filterPrivate)
    val problemDTOs =
      page.content.map { project ->
        ProjectDTO(
          id = project.id.toString(),
          title = project.title,
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
      .filter { userId != it.username }
      .map { Contributor(it.name, it.role, it.username) }
      .toMutableList()
    contributors.add(Contributor(user.displayName!!, FOUNDER, userId))

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
    if (customAuthentication.getUserName() != project.founderUsername) {
      throw HttpStatusException(HttpStatus.FORBIDDEN, "Not project owner")
    }
    return projectRepository.delete(id)
  }
}