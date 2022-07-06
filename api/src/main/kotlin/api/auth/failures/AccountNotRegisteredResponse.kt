package api.auth.failures

import io.micronaut.security.authentication.AuthenticationFailed
import io.micronaut.security.authentication.AuthenticationFailureReason

class AccountNotRegisteredResponse(val email: String): AuthenticationFailed(AuthenticationFailureReason.USER_NOT_FOUND) {

}