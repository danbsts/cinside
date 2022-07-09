package api.auth

import api.auth.failures.AccountNotRegisteredResponse
import api.people.dal.dao.PersonRepository
import io.micronaut.security.authentication.AuthenticationResponse
import io.micronaut.security.oauth2.endpoint.authorization.state.State
import io.micronaut.security.oauth2.endpoint.token.response.OauthAuthenticationMapper
import io.micronaut.security.oauth2.endpoint.token.response.OpenIdAuthenticationMapper
import io.micronaut.security.oauth2.endpoint.token.response.OpenIdClaims
import io.micronaut.security.oauth2.endpoint.token.response.OpenIdTokenResponse
import io.micronaut.security.token.jwt.generator.claims.JwtClaims
import jakarta.inject.Named
import jakarta.inject.Singleton
import org.bson.types.ObjectId
import java.util.Collections
import java.util.function.Consumer

@Singleton
@Named("google")
class GoogleOpenIdAuthenticationMapper(
  private val personService: PersonRepository,
) : OpenIdAuthenticationMapper {

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
    val claims = buildAttributes(providerName, tokenResponse, openIdClaims, user?.id)
    return AuthenticationResponse.success(openIdClaims.subject, Collections.emptyList(), claims)
  }

  private fun buildAttributes(
    providerName: String?,
    tokenResponse: OpenIdTokenResponse?,
    openIdClaims: OpenIdClaims,
    userId: ObjectId?
  ): Map<String, Any> {
    val claims: MutableMap<String, Any> = HashMap(openIdClaims.claims)
    JwtClaims.ALL_CLAIMS.forEach(Consumer { key: String -> claims.remove(key) })
    tokenResponse?.let {
      claims.put(OpenIdAuthenticationMapper.OPENID_TOKEN_KEY, it.idToken)
    }
    providerName?.let { claims[OauthAuthenticationMapper.PROVIDER_KEY] = it }
    userId?.let { claims["id"] = it }
    return claims
  }

}