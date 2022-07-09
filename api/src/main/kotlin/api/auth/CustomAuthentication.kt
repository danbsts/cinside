package api.auth

import io.micronaut.http.HttpStatus
import io.micronaut.http.exceptions.HttpStatusException
import io.micronaut.security.authentication.Authentication
import io.micronaut.security.utils.SecurityService
import jakarta.inject.Singleton

@Singleton
class CustomAuthentication(private val securityService: SecurityService) {

  private fun requireAuthenticated(): Authentication {
    if (!securityService.isAuthenticated) {
      throw HttpStatusException(HttpStatus.UNAUTHORIZED, "[CA] Please login first.")
    }
    return securityService.authentication.get()
  }

  fun getEmail(): String {
    return requireAuthenticated().attributes["email"]?.toString()
      ?: throw HttpStatusException(HttpStatus.BAD_REQUEST, "[CA] Email not found.")
  }

  fun getUserName(): String {
    return requireAuthenticated().attributes["name"]?.toString()
      ?: throw HttpStatusException(HttpStatus.BAD_REQUEST, "[CA] Name not found.")
  }

  fun getProfilePicture(): String? {
    return requireAuthenticated().attributes["picture"]?.toString()
  }
}