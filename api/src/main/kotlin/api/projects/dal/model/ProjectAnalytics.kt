package api.projects.dal.model

import io.micronaut.core.annotation.Creator
import io.micronaut.core.annotation.Introspected
import org.bson.codecs.pojo.annotations.BsonCreator
import org.bson.codecs.pojo.annotations.BsonProperty

@Introspected
data class ProjectAnalytics @Creator @BsonCreator constructor(
  @field:BsonProperty("_id")
  @param:BsonProperty("_id") var id: String? = null,
  @field:BsonProperty("projectId")
  @param:BsonProperty("projectId") var projectId: String,
  @field:BsonProperty("projectPreviews")
  @param:BsonProperty("projectPreviews") var projectPreviews: List<ProjectPreview> = listOf(),
)
