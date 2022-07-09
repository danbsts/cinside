package api.people.service

import api.people.dto.PersonDTO

interface PersonService {

  fun register(personDTO: PersonDTO): String

  fun exists(email: String): Boolean

  fun find(email: String): PersonDTO

  fun update(email: String, personDTO: PersonDTO): Long
}
