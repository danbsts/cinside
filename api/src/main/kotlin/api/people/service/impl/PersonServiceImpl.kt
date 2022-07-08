package api.people.service.impl

import api.people.dal.dao.PersonRepository
import api.people.dal.model.Person
import api.people.dto.PersonDTO
import api.people.service.PersonService
import io.micronaut.http.HttpStatus
import io.micronaut.http.exceptions.HttpStatusException
import jakarta.inject.Singleton

@Singleton
class PersonServiceImpl() : PersonService {

  override fun createPerson(personDTO: PersonDTO): String {
    checkUrls(personDTO)
    val person = Person(
      email = personDTO.email!!,
      linkedin = personDTO.linkedin!!,
      github = personDTO.github!!,
      skills = personDTO.skills!!
    )
    return person.email
//    return personRepository.create(person).email
  }

  private fun checkUrls(personDTO: PersonDTO) {
    val githubRegex = Regex("/^(http(s?):\\/\\/)?(www\\.)?github\\.([a-z])+\\/([A-Za-z0-9]{1,})+\\/?\$/i")
    if (personDTO.github == null || !githubRegex.matches(personDTO.github)) {
      throw HttpStatusException(HttpStatus.BAD_REQUEST, "Bad github url")
    }

    val linkedinRegex = Regex("^(http(s)?:\\/\\/)?([\\w]+\\.)?linkedin\\.com\\/(pub|in|profile)\\/.*")
    if (personDTO.linkedin == null ||linkedinRegex.matches(personDTO.linkedin)) {
      throw HttpStatusException(HttpStatus.BAD_REQUEST, "Bad linkedin url")
    }
  }

}