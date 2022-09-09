package api.projects.dal.model

import io.micronaut.core.annotation.Creator
import io.micronaut.core.annotation.Introspected
import org.bson.codecs.pojo.annotations.BsonCreator
import org.bson.codecs.pojo.annotations.BsonProperty
import java.time.LocalDateTime

@Introspected
data class ProjectPreview @Creator @BsonCreator constructor(
  @field:BsonProperty("username")
  @param:BsonProperty("username") val username: String,
  @field:BsonProperty("time")
  @param:BsonProperty("time") val time: LocalDateTime = LocalDateTime.now(),
)
