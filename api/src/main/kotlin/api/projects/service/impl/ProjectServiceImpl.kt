package api.projects.service.impl

import api.projects.dal.dao.ProjectRepository
import api.projects.dal.model.Project
import api.projects.dto.ProjectDTO
import api.projects.service.ProjectService
import io.micronaut.http.HttpStatus
import io.micronaut.http.exceptions.HttpStatusException
import jakarta.inject.Singleton

@Singleton
class ProjectServiceImpl(private val projectRepository: ProjectRepository) : ProjectService {

  override fun register(projectDTO: ProjectDTO): String {
    if (projectDTO.skills == null || projectDTO.linkedin == null ||
      projectDTO.github == null || projectDTO.email == null ||
      projectDTO.fullName == null || projectDTO.displayName == null
    ) {
      throw HttpStatusException(HttpStatus.BAD_REQUEST, "Missing profile information")
    }
    emailCheck(projectDTO.email)
    urlsCheck(projectDTO)

    val personExists = projectRepository.emailExists(projectDTO.email)
    if (personExists) {
      throw HttpStatusException(HttpStatus.CONFLICT, "Select another email")
    }

    val project = Project(
      fullName = projectDTO.fullName,
      displayName = projectDTO.displayName,
      email = projectDTO.email,
      github = projectDTO.github,
      linkedin = projectDTO.linkedin,
      skills = projectDTO.skills
    )
    val result = projectRepository.save(project)
      ?: throw HttpStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error saving.")
    return result.email
  }

  private fun emailCheck(email: String?) {
    val emailRegex = "^((?!\\.)[\\w-_.]*[^.])(@\\w+)(\\.\\w+(\\.\\w+)?[^.\\W])\$".toRegex()
    if (email == null || !emailRegex.matches(email)) {
      throw HttpStatusException(HttpStatus.BAD_REQUEST, "Bad email: $email")
    }
  }

  private fun urlsCheck(projectDTO: ProjectDTO) {
    val githubRegex = "^(http(s?):\\/\\/)?(www\\.)?github\\.([a-z])+\\/([A-Za-z0-9]{1,})+\\/?\$".toRegex()
    if (projectDTO.github == null || !githubRegex.matches(projectDTO.github)) {
      throw HttpStatusException(HttpStatus.BAD_REQUEST, "Bad Github: ${projectDTO.github}")
    }

    val linkedinRegex =
      "^https?://((www|\\w\\w)\\.)?linkedin.com/((in/[^/]+/?)|(pub/[^/]+/((\\w|\\d)+/?){3}))\$".toRegex()
    if (projectDTO.linkedin == null || !linkedinRegex.matches(projectDTO.linkedin)) {
      throw HttpStatusException(HttpStatus.BAD_REQUEST, "Bad LinkedIn: ${projectDTO.linkedin}")
    }
  }

  override fun exists(email: String): Boolean {
    return projectRepository.emailExists(email)
  }

  override fun find(email: String): ProjectDTO {
    val person = projectRepository.findByEmail(email)
      ?: throw HttpStatusException(HttpStatus.NOT_FOUND, "User $email not registered")

    return ProjectDTO(
      fullName = person.fullName,
      displayName = person.displayName,
      email = person.email,
      linkedin = person.linkedin,
      github = person.github,
      skills = person.skills
    )
  }

  override fun update(email: String, projectDTO: ProjectDTO): Long {
    urlsCheck(projectDTO)
    if (projectDTO.skills == null || projectDTO.linkedin == null ||
      projectDTO.github == null || projectDTO.displayName == null
    ) {
      throw HttpStatusException(HttpStatus.BAD_REQUEST, "Missing profile information")
    }

    val replaceable = projectRepository.findByEmail(email)
      ?: throw HttpStatusException(HttpStatus.NOT_FOUND, "User $email not registered")

    replaceable.skills = projectDTO.skills
    replaceable.displayName = projectDTO.displayName
    replaceable.github = projectDTO.github
    replaceable.linkedin = projectDTO.linkedin
    return projectRepository.update(replaceable)
  }

}