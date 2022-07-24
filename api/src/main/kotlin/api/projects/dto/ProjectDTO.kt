package api.projects.dto

import api.projects.dal.model.Contributor
import com.fasterxml.jackson.annotation.JsonFormat
import java.time.LocalDateTime

class ProjectDTO(
  val id: String? = null,
  val title: String? = null,
  val isFounder: Boolean? = null,
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") val startDate: LocalDateTime? = null,
  val status: ProjectStatus? = null,
  val visibility: ProjectVisibility? = null,
  val stack: List<String>? = null,
  val description: String? = null,
  val url: String? = null,
  val repository: String? = null,
  val contributors: MutableList<ContributorDTO>? = null,
  val images: MutableList<String>? = null,
)
