package api.people.service

import api.people.dto.PersonDTO

interface PersonService {

  fun createPerson(personDTO: PersonDTO): String
}
