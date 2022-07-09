package api.people.dal.dao.impl

import api.configuration.MongoDbConfiguration
import api.people.dal.dao.PersonRepository
import api.people.dal.model.Person
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoCollection
import com.mongodb.client.model.Filters
import com.mongodb.client.result.InsertOneResult
import jakarta.inject.Singleton
import org.bson.conversions.Bson

@Singleton
class MongoDbPersonRepository(
  private val mongoConfig: MongoDbConfiguration,
  private val mongoClient: MongoClient
): PersonRepository {

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

  override fun update(person: Person): Long {
    val filter = Filters.eq("email", person.email)
    val result = collection.replaceOne(filter, person)
    return result.modifiedCount
  }

}