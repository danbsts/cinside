package api.auth

import api.auth.failures.AccountNotRegisteredResponse
import api.people.service.PersonService
import io.micronaut.security.authentication.AuthenticationResponse
import io.micronaut.security.oauth2.endpoint.authorization.state.State
import io.micronaut.security.oauth2.endpoint.token.response.DefaultOpenIdAuthenticationMapper
import io.micronaut.security.oauth2.endpoint.token.response.OpenIdAuthenticationMapper
import io.micronaut.security.oauth2.endpoint.token.response.OpenIdClaims
import io.micronaut.security.oauth2.endpoint.token.response.OpenIdTokenResponse
import jakarta.inject.Named
import jakarta.inject.Singleton

@Singleton
@Named("google")
class GoogleAuthenticationMapper(
  private val defaultMapper: DefaultOpenIdAuthenticationMapper,
  private val personService: PersonService
) : OpenIdAuthenticationMapper {
  override fun createAuthenticationResponse(
    providerName: String?,
    tokenResponse: OpenIdTokenResponse?,
    openIdClaims: OpenIdClaims?,
    state: State?
  ): AuthenticationResponse {
    if (openIdClaims == null || openIdClaims.email == null) {
      return AccountNotRegisteredResponse()
    }

    val emailExists = personService.exists(openIdClaims.email)
    if (!emailExists) {
      return AccountNotRegisteredResponse(openIdClaims.name, openIdClaims.email)
    }

    return defaultMapper.createAuthenticationResponse(providerName, tokenResponse, openIdClaims, state)
  }
}