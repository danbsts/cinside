package api.auth

import api.auth.failures.AccountNotRegisteredResponse
import api.people.dal.dao.PersonRepository
import io.micronaut.security.authentication.AuthenticationResponse
import io.micronaut.security.config.AuthenticationModeConfiguration
import io.micronaut.security.oauth2.configuration.OpenIdAdditionalClaimsConfiguration
import io.micronaut.security.oauth2.endpoint.authorization.state.State
import io.micronaut.security.oauth2.endpoint.token.response.DefaultOpenIdAuthenticationMapper
import io.micronaut.security.oauth2.endpoint.token.response.OpenIdClaims
import io.micronaut.security.oauth2.endpoint.token.response.OpenIdTokenResponse
import jakarta.inject.Named
import jakarta.inject.Singleton

@Singleton
@Named("google")
class GoogleAuthenticationMapper(
  openIdAdditionalClaimsConfiguration: OpenIdAdditionalClaimsConfiguration,
  authenticationModeConfiguration: AuthenticationModeConfiguration,
  private val personService: PersonRepository
) : DefaultOpenIdAuthenticationMapper(openIdAdditionalClaimsConfiguration, authenticationModeConfiguration) {

  override fun createAuthenticationResponse(
    providerName: String?,
    tokenResponse: OpenIdTokenResponse?,
    openIdClaims: OpenIdClaims?,
    state: State?
  ): AuthenticationResponse {
    val email = openIdClaims?.email ?: return AccountNotRegisteredResponse()

    val emailExists = personService.emailExists(email)
    if (!emailExists) {
      return AccountNotRegisteredResponse(openIdClaims.name, email)
    }

    val user = personService.findByEmail(email)
    val roles = getRoles(providerName, tokenResponse, openIdClaims)
    val username = getUsername(providerName, tokenResponse, openIdClaims)
    val claims = buildAttributes(providerName, tokenResponse, openIdClaims)
    user?.id?.let { claims.put("id", it.toString()) }

    return AuthenticationResponse.success(username, roles, claims)
  }
}