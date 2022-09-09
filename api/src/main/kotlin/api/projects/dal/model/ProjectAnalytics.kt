package api.projects.dal.model

import io.micronaut.core.annotation.Creator
import io.micronaut.core.annotation.Introspected
import org.bson.codecs.pojo.annotations.BsonCreator
import org.bson.codecs.pojo.annotations.BsonProperty
import org.bson.types.ObjectId

@Introspected
data class ProjectAnalytics @Creator @BsonCreator constructor(
  @field:BsonProperty("_id")
  @param:BsonProperty("_id") var id: ObjectId? = null,
  @field:BsonProperty("projectId")
  @param:BsonProperty("projectId") var projectId: ObjectId,
  @field:BsonProperty("projectPreviews")
  @param:BsonProperty("projectPreviews") var projectPreviews: List<ProjectPreview> = listOf(),
)
