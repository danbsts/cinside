package api.people.dal.dao

import api.people.dal.model.Person
import org.bson.types.ObjectId

interface PersonRepository {

  fun save(person: Person): Person?

  fun emailExists(email: String): Boolean

  fun findByEmail(email: String): Person?

  fun findById(id: ObjectId): Person?

  fun update(person: Person): Long
}