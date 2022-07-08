package api.people.controller;

import api.people.dto.PersonDTO
import api.people.service.PersonService
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule

@Controller("/api/people")
class PersonController(private val personService: PersonService) {

  @Post
  @Secured(SecurityRule.IS_ANONYMOUS)
  fun register(@Body personDTO: PersonDTO): HttpResponse<PersonDTO> {
    val personEmail = personService.register(personDTO)
    return HttpResponse.created(PersonDTO(email = personEmail))
  }
}
