package api.people.dal.dao

import api.people.dal.model.Person

interface PersonRepository {

  fun save(person: Person): Person?

  fun emailExists(email: String): Boolean

  fun findByEmail(email: String): Person?

  fun findByUsername(username: String): Person?

  fun findAllByUsernames(usernames: List<String>): List<Person>

  fun update(person: Person): Long

  fun updateUsername(email: String, username: String): Long
}