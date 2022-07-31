package api.projects.client

import api.projects.dto.JoinRequestEmailEvent
import io.micronaut.rabbitmq.annotation.Binding
import io.micronaut.rabbitmq.annotation.RabbitClient

@RabbitClient("emails")
interface EmailEventClient {

  @Binding("join-request-email")
  fun sendJoinRequestEmailEvent(joinRequestEmailEvent: JoinRequestEmailEvent)
}