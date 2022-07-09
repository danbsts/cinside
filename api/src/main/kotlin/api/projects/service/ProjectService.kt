package api.projects.service

import api.projects.dto.ProjectDTO

interface ProjectService {

  fun register(projectDTO: ProjectDTO): String

  fun exists(email: String): Boolean

  fun find(email: String): ProjectDTO

  fun update(email: String, projectDTO: ProjectDTO): Long
}
