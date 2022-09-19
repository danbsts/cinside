package api.people.dal.dao.impl

import api.configuration.MongoDbConfiguration
import api.people.dal.dao.PersonRepository
import api.people.dal.model.Person
import api.projects.dal.model.ProjectPreview
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoCollection
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Updates
import jakarta.inject.Singleton
import java.time.LocalDateTime

@Singleton
class MongoDbPersonRepository(
  private val mongoConfig: MongoDbConfiguration,
  private val mongoClient: MongoClient
) : PersonRepository {

  private val collection: MongoCollection<Person>
    get() = mongoClient.getDatabase(mongoConfig.name)
      .getCollection(mongoConfig.personCollection, Person::class.java)

  override fun save(person: Person): Person? {
    val result = collection.insertOne(person)
    if (!result.wasAcknowledged()) {
      return null
    }
    return person
  }

  override fun emailExists(email: String): Boolean {
    val result = findByEmail(email)
    return result != null
  }

  override fun findByEmail(email: String): Person? {
    val filter = Filters.eq("email", email)
    val result = collection.find(filter)
    return result.first()
  }

  override fun findByUsername(username: String): Person? {
    val filter = Filters.eq("username", username)
    return collection.find(filter).first()
  }

  override fun findAllByUsernames(usernames: List<String>): List<Person> {
    val filter = Filters.`in`("username", usernames)
    val cursor = collection.find(filter).cursor()
    val result = ArrayList<Person>()
    while(cursor.hasNext()) {
      result.add(cursor.next())
    }
    return result
  }

  override fun registerLogIn(email: String): Long {
    val filter = Filters.eq("email", email)
    val update = Updates.push("logInLog", LocalDateTime.now())
    val result = collection.updateOne(filter, update)
    return result.modifiedCount
  }

  override fun update(person: Person): Long {
    val filter = Filters.eq("email", person.email)
    val result = collection.replaceOne(filter, person)
    return result.modifiedCount
  }

  override fun updateUsername(email: String, username: String): Long {
    val filter = Filters.and(
      Filters.eq("email", email),
      Filters.eq("username", null)
    )
    val update = Updates.set("username", username)
    return collection.updateOne(filter, update).modifiedCount
  }
}