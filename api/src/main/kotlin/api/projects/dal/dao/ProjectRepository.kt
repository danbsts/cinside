package api.projects.dal.dao

import api.projects.dal.model.Project

interface ProjectRepository {

  fun save(project: Project): Project?

  fun emailExists(email: String): Boolean

  fun findByEmail(email: String): Project?

  fun update(project: Project): Long
}