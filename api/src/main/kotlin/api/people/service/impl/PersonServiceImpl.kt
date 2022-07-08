package api.people.service.impl

import api.people.dal.dao.PersonRepository
import api.people.dal.model.Person
import api.people.dto.PersonDTO
import api.people.service.PersonService
import io.micronaut.http.HttpStatus
import io.micronaut.http.exceptions.HttpStatusException
import jakarta.inject.Singleton

@Singleton
class PersonServiceImpl(private val personRepository: PersonRepository) : PersonService {

  override fun register(personDTO: PersonDTO): String {
    if (personDTO.skills == null || personDTO.linkedin == null ||
      personDTO.github == null || personDTO.email == null ||
      personDTO.fullName == null || personDTO.displayName == null
    ) {
      throw HttpStatusException(HttpStatus.BAD_REQUEST, "Missing information for profile")
    }
    checkRegex(personDTO)

    val personExists = personRepository.emailExists(personDTO.email)
    if (personExists) {
      throw HttpStatusException(HttpStatus.CONFLICT, "Select another email")
    }

    val person = Person(
      personDTO.fullName,
      personDTO.displayName,
      personDTO.email,
      personDTO.linkedin,
      personDTO.github,
      personDTO.skills
    )
    val result = personRepository.save(person)
      ?: throw HttpStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error saving.")
    return result.email
  }

  private fun checkRegex(personDTO: PersonDTO): Boolean {
    val emailRegex = "^((?!\\.)[\\w-_.]*[^.])(@\\w+)(\\.\\w+(\\.\\w+)?[^.\\W])\$".toRegex()
    if (personDTO.email == null || !emailRegex.matches(personDTO.email)) {
      throw HttpStatusException(HttpStatus.BAD_REQUEST, "Bad email: ${personDTO.email}")
    }

    val githubRegex = "^(http(s?):\\/\\/)?(www\\.)?github\\.([a-z])+\\/([A-Za-z0-9]{1,})+\\/?\$".toRegex()
    if (personDTO.github == null || !githubRegex.matches(personDTO.github)) {
      throw HttpStatusException(HttpStatus.BAD_REQUEST, "Bad Github: ${personDTO.github}")
    }

    val linkedinRegex =
      "^https?://((www|\\w\\w)\\.)?linkedin.com/((in/[^/]+/?)|(pub/[^/]+/((\\w|\\d)+/?){3}))\$".toRegex()
    if (personDTO.linkedin == null || !linkedinRegex.matches(personDTO.linkedin)) {
      throw HttpStatusException(HttpStatus.BAD_REQUEST, "Bad LinkedIn: ${personDTO.linkedin}")
    }
    return true
  }

  override fun exists(email: String): Boolean {
    return personRepository.emailExists(email)
  }

}