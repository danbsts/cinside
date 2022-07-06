package api.auth

import api.auth.failures.AccountNotRegisteredResponse
import io.micronaut.security.authentication.AuthenticationResponse
import io.micronaut.security.oauth2.endpoint.authorization.state.State
import io.micronaut.security.oauth2.endpoint.token.response.DefaultOpenIdAuthenticationMapper
import io.micronaut.security.oauth2.endpoint.token.response.OpenIdAuthenticationMapper
import io.micronaut.security.oauth2.endpoint.token.response.OpenIdClaims
import io.micronaut.security.oauth2.endpoint.token.response.OpenIdTokenResponse
import jakarta.inject.Named
import jakarta.inject.Singleton
import org.slf4j.LoggerFactory

@Singleton
@Named("google")
class GoogleAuthenticationMapper(private val defaultMapper: DefaultOpenIdAuthenticationMapper): OpenIdAuthenticationMapper {
    private val LOG = LoggerFactory.getLogger(GoogleAuthenticationMapper::class.java)

    override fun createAuthenticationResponse(
        providerName: String?,
        tokenResponse: OpenIdTokenResponse?,
        openIdClaims: OpenIdClaims?,
        state: State?
    ): AuthenticationResponse {
        LOG.info("creating auth response")
        LOG.info("Provider: $providerName")
        LOG.info("${ openIdClaims?.email == "dan@cin.ufpe.br" }")
        LOG.info(openIdClaims?.email)
        LOG.info(openIdClaims?.preferredUsername)
        LOG.info(openIdClaims?.name)
        LOG.info(openIdClaims?.birthday)
        LOG.info(openIdClaims?.phoneNumber)
        LOG.info(openIdClaims?.audience?.joinToString(","))
        openIdClaims?.email?.let { email ->
            if (email == "dan@cin.ufpe.br") {
                LOG.info("Returning bc it's")
                return AccountNotRegisteredResponse(email)
            }
        }
        return defaultMapper.createAuthenticationResponse(providerName, tokenResponse, openIdClaims, state)
    }
}