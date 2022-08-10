package api.projects.scheduled

import api.people.dal.dao.PersonRepository
import api.people.dal.model.Person
import api.people.dto.PersonDTO
import api.projects.client.EmailEventClient
import api.projects.dal.dao.ProjectRepository
import api.projects.dto.EmailType
import api.projects.dto.JoinRequestEmailEvent
import io.micronaut.scheduling.annotation.Scheduled
import jakarta.inject.Singleton
import org.slf4j.LoggerFactory

@Singleton
class ProjectTasks(
  private val projectRepository: ProjectRepository,
  private val personRepository: PersonRepository,
  private val emailEventClient: EmailEventClient
) {
  private val logger = LoggerFactory.getLogger(ProjectTasks::class.java)

  @Scheduled(fixedDelay = "6h")
  fun sendJoinRequests() {
    val notifiableProjects = projectRepository
      .findAllWithPendingJoinRequests()
      .filter { it.notifyJoinRequests != null }
    logger.info("${notifiableProjects.size} project owners will be notified.")

    notifiableProjects.forEach { project ->
      val projectFounder = personRepository.findByUsername(project.founderUsername) ?: return@forEach
      val newJoiners = personRepository.findAllByUsernames(
        project.notifyJoinRequests!!.map { it.username }
      )
      val newContributors = parseNewContributors(newJoiners)

      val event = JoinRequestEmailEvent(
        projectFounder.email,
        EmailType.JOIN_REQUEST,
        project.title,
        newContributors
      )
      emailEventClient.sendJoinRequestEmailEvent(event)
      projectRepository.removeNotifiableJoinRequests(project.id!!)
    }
  }

  private fun parseNewContributors(newJoiners: List<Person>): List<PersonDTO> {
    return newJoiners.map {
      PersonDTO(
        displayName = it.displayName,
        email = it.email,
        linkedin = it.linkedin,
        github = it.github,
        skills = it.skills
      )
    }
  }
}