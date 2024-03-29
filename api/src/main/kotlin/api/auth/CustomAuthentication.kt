package api.auth

import io.micronaut.http.HttpStatus
import io.micronaut.http.exceptions.HttpStatusException
import io.micronaut.security.authentication.Authentication
import io.micronaut.security.utils.SecurityService
import jakarta.inject.Singleton
import org.bson.types.ObjectId
import org.slf4j.LoggerFactory

@Singleton
class CustomAuthentication(private val securityService: SecurityService) {
  val LOG = LoggerFactory.getLogger(CustomAuthentication::class.java)

  private fun requireAuthenticated(): Authentication {
    if (!securityService.isAuthenticated) {
      throw HttpStatusException(HttpStatus.UNAUTHORIZED, "[CA] Please login first.")
    }
    return securityService.authentication.get()
  }

  fun isAuthenticated(): Boolean {
    return securityService.isAuthenticated
  }

  fun getEmail(): String {
    return requireAuthenticated().attributes["email"]?.toString()
      ?: throw HttpStatusException(HttpStatus.BAD_REQUEST, "[CA] Email not found.")
  }

  fun getUserName(): String {
    return requireAuthenticated().name
  }

  fun getProfilePicture(): String? {
    return requireAuthenticated().attributes["picture"]?.toString()
  }
}