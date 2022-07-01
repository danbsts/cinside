//package api
//
//import io.micronaut.context.annotation.Replaces
//import io.micronaut.security.authentication.AuthenticationResponse
//import io.micronaut.security.oauth2.endpoint.authorization.state.State
//import io.micronaut.security.oauth2.endpoint.token.response.DefaultOpenIdAuthenticationMapper
//import io.micronaut.security.oauth2.endpoint.token.response.OpenIdAuthenticationMapper
//import io.micronaut.security.oauth2.endpoint.token.response.OpenIdClaims
//import io.micronaut.security.oauth2.endpoint.token.response.OpenIdTokenResponse
//import jakarta.inject.Singleton
//import org.slf4j.LoggerFactory
//
//@Singleton
//@Replaces(DefaultOpenIdAuthenticationMapper::class)
//class GlobalOpenIdAuthenticationMapper : OpenIdAuthenticationMapper {
//
//    private val LOG = LoggerFactory.getLogger(GlobalOpenIdAuthenticationMapper::class.java)
////    private lateinit var defaultMapper: DefaultOpenIdAuthenticationMapper
//
//    override fun createAuthenticationResponse(providerName: String, tokenResponse: OpenIdTokenResponse, openIdClaims: OpenIdClaims, state: State?): AuthenticationResponse {
//        LOG.info("creating auth response")
//        LOG.info("Provider: $providerName")
//        LOG.info(tokenResponse.toString())
//        LOG.info(openIdClaims.email)
//        LOG.info(openIdClaims.toString())
//        LOG.info(state.toString())
////        return defaultMapper.createAuthenticationResponse(providerName, tokenResponse, openIdClaims, state)
//        return AuthenticationResponse.success(openIdClaims.email)
//    }
//}
