package api.projects.dal.model

import org.bson.types.ObjectId

data class Contributor(
  val name: String?,
  val role: String,
  val userId: ObjectId?
)