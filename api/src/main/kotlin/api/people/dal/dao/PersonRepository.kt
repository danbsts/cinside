package api.people.dal.dao

import api.people.dal.model.Person

interface PersonRepository {

  fun create(person: Person): Person
}