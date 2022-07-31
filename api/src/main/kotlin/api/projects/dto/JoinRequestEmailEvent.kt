package api.projects.dto

import api.people.dto.PersonDTO

class JoinRequestEmailEvent(
  val receiver: String,
  val type: EmailType,
  val project: String,
  val contributors: List<PersonDTO>
)
