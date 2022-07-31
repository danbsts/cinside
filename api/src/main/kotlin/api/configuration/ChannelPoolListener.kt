package api.configuration

import com.rabbitmq.client.BuiltinExchangeType
import com.rabbitmq.client.Channel
import io.micronaut.rabbitmq.connect.ChannelInitializer
import jakarta.inject.Singleton
import org.slf4j.LoggerFactory
import java.io.IOException

@Singleton
class ChannelPoolListener : ChannelInitializer() {
  private val logger = LoggerFactory.getLogger(ChannelPoolListener::class.java)

  @Throws(IOException::class)
  override fun initialize(channel: Channel, name: String) {
    logger.info("Initializing queues and exchange.")
    channel.exchangeDeclare("emails", BuiltinExchangeType.DIRECT, true)
    channel.queueBind("email", "emails", "join-request-email")
  }
}