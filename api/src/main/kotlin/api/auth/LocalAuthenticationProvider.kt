package api.auth

import api.people.dal.dao.PersonRepository
import io.micronaut.http.HttpRequest
import io.micronaut.security.authentication.AuthenticationProvider
import io.micronaut.security.authentication.AuthenticationRequest
import io.micronaut.security.authentication.AuthenticationResponse
import io.micronaut.context.annotation.Requires
import jakarta.inject.Singleton
import org.reactivestreams.Publisher
import org.reactivestreams.Subscriber
import org.reactivestreams.Subscription

@Singleton
@Requires(property = "micronaut.security.authentication", value = "bearer")
class LocalAuthenticationProvider(
  private val personRepository: PersonRepository
) : AuthenticationProvider {

  override fun authenticate(
    httpRequest: HttpRequest<*>?,
    authenticationRequest: AuthenticationRequest<*, *>
  ): Publisher<AuthenticationResponse> {
    val email = authenticationRequest.identity.toString()
    val password = authenticationRequest.secret.toString()

    val person = personRepository.findByEmail(email)
    val response = if (person != null && person.password == password) {
      if (person.username == null) {
        personRepository.updateUsername(email, email)
      }
      val attributes = mutableMapOf<String, Any>()
      attributes["email"] = person.email
      person.id?.let { attributes["id"] = it }
      AuthenticationResponse.success(person.username ?: person.email, listOf(), attributes)
    } else {
      AuthenticationResponse.failure("Invalid credentials")
    }

    return Publisher { subscriber: Subscriber<in AuthenticationResponse> ->
      subscriber.onSubscribe(object : Subscription {
        override fun request(n: Long) {
          subscriber.onNext(response)
          subscriber.onComplete()
        }
        override fun cancel() {}
      })
    }
  }
}
