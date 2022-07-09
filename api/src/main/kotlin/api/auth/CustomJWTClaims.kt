package api.auth

import io.micronaut.context.annotation.Replaces
import io.micronaut.runtime.ApplicationConfiguration
import io.micronaut.security.authentication.Authentication
import io.micronaut.security.token.config.TokenConfiguration
import io.micronaut.security.token.jwt.generator.claims.ClaimsAudienceProvider
import io.micronaut.security.token.jwt.generator.claims.ClaimsGenerator
import io.micronaut.security.token.jwt.generator.claims.JWTClaimsSetGenerator
import io.micronaut.security.token.jwt.generator.claims.JwtIdGenerator
import jakarta.inject.Singleton
import org.slf4j.LoggerFactory

@Singleton
@Replaces(ClaimsGenerator::class)
class CustomJWTClaims(
) : ClaimsGenerator {
  val LOG = LoggerFactory.getLogger(CustomJWTClaims::class.java)

  override fun generateClaims(authentication: Authentication?, expiration: Int?): MutableMap<String, Any> {
    LOG.info("CLAIMSS!! at CustomJWTClaims")
    LOG.info(authentication?.attributes.toString())
//    LOG.info(claims.toString())
    if (authentication != null) {
      return authentication.attributes
    }
    return HashMap()
  }

  override fun generateClaimsSet(oldClaims: MutableMap<String, *>?, expiration: Int?): MutableMap<String, Any> {
    LOG.info("OLD CLAIMS")
    LOG.info(oldClaims.toString())
    return HashMap()
  }
}