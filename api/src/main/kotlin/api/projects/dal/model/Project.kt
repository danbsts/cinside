package api.projects.dal.model

import api.projects.dto.ProjectStatus
import api.projects.dto.ProjectVisibility
import io.micronaut.core.annotation.Creator
import io.micronaut.core.annotation.Introspected
import org.bson.codecs.pojo.annotations.BsonCreator
import org.bson.codecs.pojo.annotations.BsonProperty
import org.bson.types.ObjectId
import java.time.LocalDateTime

@Introspected
class Project @Creator @BsonCreator constructor(
  @field:BsonProperty("title") @param:BsonProperty("title") var title: String,
  @field:BsonProperty("startDate") @param:BsonProperty("startDate") var startDate: LocalDateTime,
  @field:BsonProperty("status") @param:BsonProperty("status") var status: ProjectStatus,
  @field:BsonProperty("visibility") @param:BsonProperty("visibility") var visibility: ProjectVisibility,
  @field:BsonProperty("stack") @param:BsonProperty("stack") var stack: List<String>,
  @field:BsonProperty("description") @param:BsonProperty("description") var description: String,
  @field:BsonProperty("url") @param:BsonProperty("url") var url: String,
  @field:BsonProperty("repository") @param:BsonProperty("repository") var repository: String,
  @field:BsonProperty("contributors") @param:BsonProperty("contributors") var contributors: List<Contributor>,
  @field:BsonProperty("founderId") @param:BsonProperty("founderId") val founderId: ObjectId,
  @field:BsonProperty("_id") @param:BsonProperty("_id") val id: ObjectId? = null,
  @field:BsonProperty("creationDate") @param:BsonProperty("creationDate") val registrationDate: LocalDateTime =
    LocalDateTime.now(),
)
