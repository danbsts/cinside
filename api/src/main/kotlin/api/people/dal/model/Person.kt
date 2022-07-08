package api.people.dal.model

import io.micronaut.core.annotation.Creator
import io.micronaut.core.annotation.Introspected
import org.bson.codecs.pojo.annotations.BsonCreator
import org.bson.codecs.pojo.annotations.BsonProperty
import java.time.LocalDateTime

@Introspected
class Person @Creator @BsonCreator constructor(
  @field:BsonProperty("fullName") @param:BsonProperty("fullName") val fullName: String? = null,
  @field:BsonProperty("displayName") @param:BsonProperty("displayName") val displayName: String? = null,
  @field:BsonProperty("email") @param:BsonProperty("email") val email: String,
  @field:BsonProperty("github") @param:BsonProperty("github") val github: String,
  @field:BsonProperty("linkedin") @param:BsonProperty("linkedin") val linkedin: String,
  @field:BsonProperty("skills") @param:BsonProperty("skills") val skills: String,
  @field:BsonProperty("creationDate") @param:BsonProperty("creationDate") val creationDate: LocalDateTime =
    LocalDateTime.now()
)
