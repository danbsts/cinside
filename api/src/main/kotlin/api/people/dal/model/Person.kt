package api.people.dal.model

import io.micronaut.core.annotation.Creator
import io.micronaut.core.annotation.Introspected
import org.bson.codecs.pojo.annotations.BsonCreator
import org.bson.codecs.pojo.annotations.BsonProperty
import org.bson.types.ObjectId
import java.time.LocalDateTime

@Introspected
data class Person @Creator @BsonCreator constructor(
  @field:BsonProperty("fullName") @param:BsonProperty("fullName") val fullName: String? = null,
  @field:BsonProperty("displayName") @param:BsonProperty("displayName") var displayName: String? = null,
  @field:BsonProperty("email") @param:BsonProperty("email") val email: String,
  @field:BsonProperty("github") @param:BsonProperty("github") var github: String,
  @field:BsonProperty("linkedin") @param:BsonProperty("linkedin") var linkedin: String,
  @field:BsonProperty("skills") @param:BsonProperty("skills") var skills: String,
  @field:BsonProperty("_id") @param:BsonProperty("_id") val id: ObjectId? = null,
  @field:BsonProperty("creationDate") @param:BsonProperty("creationDate") val creationDate: LocalDateTime =
    LocalDateTime.now()
)
