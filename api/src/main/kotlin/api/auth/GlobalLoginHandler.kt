package api.auth

import api.auth.failures.AccountNotRegisteredResponse
import api.people.service.PersonService
import io.micronaut.context.annotation.Replaces
import io.micronaut.http.HttpRequest
import io.micronaut.http.HttpResponse
import io.micronaut.http.MutableHttpResponse
import io.micronaut.security.authentication.Authentication
import io.micronaut.security.authentication.AuthenticationResponse
import io.micronaut.security.config.RedirectConfiguration
import io.micronaut.security.errors.PriorToLoginPersistence
import io.micronaut.security.oauth2.endpoint.token.response.IdTokenLoginHandler
import io.micronaut.security.token.jwt.cookie.AccessTokenCookieConfiguration
import jakarta.inject.Singleton
import org.slf4j.LoggerFactory
import java.net.URI
import java.net.URLEncoder

@Singleton
@Replaces(IdTokenLoginHandler::class)
class GlobalLoginHandler(
  accessTokenCookieConfiguration: AccessTokenCookieConfiguration?,
  redirectConfiguration: RedirectConfiguration?,
  priorToLoginPersistence: PriorToLoginPersistence?,
  private val personService: PersonService
) : IdTokenLoginHandler(accessTokenCookieConfiguration, redirectConfiguration, priorToLoginPersistence) {

  override fun loginSuccess(authentication: Authentication?, request: HttpRequest<*>?): MutableHttpResponse<*> {
    val log = LoggerFactory.getLogger(this::class.java)
    log.info(authentication.toString())
    log.info(authentication?.let {it.attributes["email"].toString() })
    authentication?.let {
      personService.registerLogIn(it.attributes["email"]?.toString())
    }
    return super.loginSuccess(authentication, request)
  }
  override fun loginFailed(
    authenticationFailed: AuthenticationResponse,
    request: HttpRequest<*>?
  ): MutableHttpResponse<*> {
    if (authenticationFailed !is AccountNotRegisteredResponse) {
      return super.loginFailed(authenticationFailed, request)
    }

    if (authenticationFailed.email == null) {
      val location = URI(loginFailure ?: "/")
      return HttpResponse.seeOther<Any>(location)
    }

    val encodedEmail = URLEncoder.encode(authenticationFailed.email, "UTF-8")
    val encodedName = authenticationFailed.name?.let { URLEncoder.encode(it, "UTF-8") }
    val nameQuery = encodedName?.let { "&name=$it" } ?: ""
    val displayNameQuery = authenticationFailed.name?.let {
      val names = it.split(' ')
      if (names.size < 2) {
        return@let null
      }
      val displayName = URLEncoder.encode("${names[0]} ${names[1]}", "UTF-8")
      return@let "&displayName=$displayName"
    } ?: ""
    val location = URI("$loginFailure?email=$encodedEmail$nameQuery$displayNameQuery")
    return HttpResponse.seeOther<Any>(location)
  }
}