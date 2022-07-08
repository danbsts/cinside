package api.auth.failures

import io.micronaut.security.authentication.AuthenticationFailed
import io.micronaut.security.authentication.AuthenticationFailureReason

class AccountNotRegisteredResponse(val name: String? = null, val email: String? = null) :
  AuthenticationFailed(AuthenticationFailureReason.USER_NOT_FOUND)
