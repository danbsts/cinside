package api.people.controller;

import api.auth.CustomAuthentication
import api.people.dto.PersonDTO
import api.people.service.PersonService
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Post
import io.micronaut.http.annotation.Put
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import java.net.URI

@Controller("/api/people")
class PersonController(
  private val personService: PersonService,
  private val customAuthentication: CustomAuthentication
) {

  @Post
  @Secured(SecurityRule.IS_ANONYMOUS)
  fun register(@Body personDTO: PersonDTO): HttpResponse<PersonDTO> {
    val personEmail = personService.register(personDTO)
    return HttpResponse.created(PersonDTO(email = personEmail))
  }

  @Get
  @Secured(SecurityRule.IS_AUTHENTICATED)
  fun find(): HttpResponse<PersonDTO> {
    val result = personService.find(customAuthentication.getEmail())
    return HttpResponse.ok(result)
  }

  @Put
  @Secured(SecurityRule.IS_AUTHENTICATED)
  fun update(@Body personDTO: PersonDTO): HttpResponse<PersonDTO> {
    val result = personService.update(customAuthentication.getEmail(), personDTO)
    if (result <= 0) {
      return HttpResponse.notFound()
    }
    return HttpResponse.noContent()
  }

  @Get("/logged-in")
  @Secured(SecurityRule.IS_ANONYMOUS)
  fun checkLogin(): HttpResponse<Any> {
    if (!customAuthentication.isAuthenticated()) {
      return HttpResponse.unauthorized()
    }
    return HttpResponse.ok()
  }
}
