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
      throw HttpStatusException(HttpStatus.BAD_REQUEST, "Missing profile information")
    }
    emailCheck(personDTO.email)
    urlsCheck(personDTO)

    val personExists = personRepository.emailExists(personDTO.email)
    if (personExists) {
      throw HttpStatusException(HttpStatus.CONFLICT, "Select another email")
    }

    val person = Person(
      fullName = personDTO.fullName,
      displayName = personDTO.displayName,
      email = personDTO.email,
      github = personDTO.github,
      linkedin = personDTO.linkedin,
      skills = personDTO.skills
    )
    val result = personRepository.save(person)
      ?: throw HttpStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error saving.")
    return result.email
  }

  private fun emailCheck(email: String?) {
    val emailRegex = "^((?!\\.)[\\w-_.]*[^.])(@\\w+)(\\.\\w+(\\.\\w+)?[^.\\W])\$".toRegex()
    if (email == null || !emailRegex.matches(email)) {
      throw HttpStatusException(HttpStatus.BAD_REQUEST, "Bad email: $email")
    }
  }

  private fun urlsCheck(personDTO: PersonDTO) {
    val githubRegex = "^(http(s?):\\/\\/)?(www\\.)?github\\.([a-z])+\\/([A-Za-z0-9]{1,})+\\/?\$".toRegex()
    if (personDTO.github == null || !githubRegex.matches(personDTO.github)) {
      throw HttpStatusException(HttpStatus.BAD_REQUEST, "Bad Github: ${personDTO.github}")
    }

    val linkedinRegex =
      "^https?://((www|\\w\\w)\\.)?linkedin.com/((in/[^/]+/?)|(pub/[^/]+/((\\w|\\d)+/?){3}))\$".toRegex()
    if (personDTO.linkedin == null || !linkedinRegex.matches(personDTO.linkedin)) {
      throw HttpStatusException(HttpStatus.BAD_REQUEST, "Bad LinkedIn: ${personDTO.linkedin}")
    }
  }

  override fun exists(email: String): Boolean {
    return personRepository.emailExists(email)
  }

  override fun find(email: String): PersonDTO {
    val person = personRepository.findByEmail(email)
      ?: throw HttpStatusException(HttpStatus.NOT_FOUND, "User $email not registered")

    return PersonDTO(
      fullName = person.fullName,
      displayName = person.displayName,
      email = person.email,
      linkedin = person.linkedin,
      github = person.github,
      skills = person.skills
    )
  }

  override fun update(email: String, personDTO: PersonDTO): Long {
    urlsCheck(personDTO)
    if (personDTO.skills == null || personDTO.linkedin == null ||
      personDTO.github == null || personDTO.displayName == null
    ) {
      throw HttpStatusException(HttpStatus.BAD_REQUEST, "Missing profile information")
    }

    val replaceable = personRepository.findByEmail(email)
      ?: throw HttpStatusException(HttpStatus.NOT_FOUND, "User $email not registered")

    replaceable.skills = personDTO.skills
    replaceable.displayName = personDTO.displayName
    replaceable.github = personDTO.github
    replaceable.linkedin = personDTO.linkedin
    return personRepository.update(replaceable)
  }

}