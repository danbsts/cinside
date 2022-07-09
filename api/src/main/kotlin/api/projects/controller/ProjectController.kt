package api.projects.controller;

import api.auth.CustomAuthentication
import api.projects.dto.ProjectDTO
import api.projects.service.ProjectService
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Post
import io.micronaut.http.annotation.Put
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule

@Controller("/api/projects")
class ProjectController(
  private val projectService: ProjectService,
  private val customAuthentication: CustomAuthentication
) {

  @Post
  @Secured(SecurityRule.IS_AUTHENTICATED)
  fun register(@Body projectDTO: ProjectDTO): HttpResponse<ProjectDTO> {
    val personEmail = projectService.register(projectDTO)
    return HttpResponse.created(ProjectDTO(email = personEmail))
  }

  @Get
  @Secured(SecurityRule.IS_AUTHENTICATED)
  fun find(): HttpResponse<ProjectDTO> {
    val result = projectService.find(customAuthentication.getEmail())
    return HttpResponse.ok(result)
  }

  @Put
  @Secured(SecurityRule.IS_AUTHENTICATED)
  fun update(@Body projectDTO: ProjectDTO): HttpResponse<ProjectDTO> {
    val result = projectService.update(customAuthentication.getEmail(), projectDTO)
    if (result <= 0) {
      return HttpResponse.accepted()
    }
    return HttpResponse.noContent()
  }
}
