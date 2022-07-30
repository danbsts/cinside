package api.projects.controller;

import api.auth.CustomAuthentication
import api.projects.dto.ProjectDTO
import api.projects.service.ProjectService
import io.micronaut.data.model.Page
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Delete
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Post
import io.micronaut.http.annotation.Put
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import org.bson.types.ObjectId

@Controller("/api/projects")
class ProjectController(
  private val projectService: ProjectService,
  private val customAuthentication: CustomAuthentication
) {

  @Post
  @Secured(SecurityRule.IS_AUTHENTICATED)
  fun register(@Body projectDTO: ProjectDTO): HttpResponse<ProjectDTO> {
    val projectId = projectService.register(projectDTO)
    return HttpResponse.created(ProjectDTO(id = projectId?.toString()))
  }

  @Get("{?page}")
  @Secured(SecurityRule.IS_ANONYMOUS)
  fun find(page: Int?): HttpResponse<Page<ProjectDTO>> {
    val pageNumber = page ?: 1
    if (!customAuthentication.isAuthenticated()) {
      return HttpResponse.ok(projectService.findAllPaged(pageNumber, true))
    }
    return HttpResponse.ok(projectService.findAllPaged(pageNumber))
  }

  @Get("/{id}")
  @Secured(SecurityRule.IS_AUTHENTICATED)
  fun find(id: String): HttpResponse<ProjectDTO> {
    val objectId = ObjectId(id)
    val result = projectService.find(objectId)
    return HttpResponse.ok(result)
  }

  @Put
  @Secured(SecurityRule.IS_AUTHENTICATED)
  fun update(@Body projectDTO: ProjectDTO): HttpResponse<ProjectDTO> {
    val result = projectService.update(projectDTO)
    if (result <= 0) {
      return HttpResponse.notFound()
    }
    return HttpResponse.noContent()
  }

  @Delete("{id}")
  @Secured(SecurityRule.IS_AUTHENTICATED)
  fun delete(id: String): HttpResponse<Any> {
    val objectId = ObjectId(id)
    val result = projectService.delete(objectId)
    if (result <= 0) {
      return HttpResponse.notFound()
    }
    return HttpResponse.noContent()
  }

  @Post("{id}/join")
  @Secured(SecurityRule.IS_AUTHENTICATED)
  fun join(id: String): HttpResponse<Any> {
    val objectId = ObjectId(id)
    projectService.sendJoinRequest(objectId)
    return HttpResponse.noContent()
  }
}
