package api.projects.dal.model

import io.micronaut.core.annotation.Creator
import io.micronaut.core.annotation.Introspected
import org.bson.codecs.pojo.annotations.BsonCreator
import org.bson.codecs.pojo.annotations.BsonProperty
import org.bson.types.ObjectId

@Introspected
data class Contributor @Creator @BsonCreator constructor(
  @field:BsonProperty("name") @param:BsonProperty("name") val name: String,
  @field:BsonProperty("role") @param:BsonProperty("role") val role: String,
  @field:BsonProperty("username") @param:BsonProperty("username") val username: String? = null
)