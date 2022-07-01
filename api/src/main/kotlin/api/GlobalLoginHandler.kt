package api

import io.micronaut.http.HttpRequest
import io.micronaut.http.MutableHttpResponse
import io.micronaut.security.authentication.AuthenticationFailureReason
import io.micronaut.security.authentication.AuthenticationResponse
import io.micronaut.security.config.RedirectConfiguration
import io.micronaut.security.errors.PriorToLoginPersistence
import io.micronaut.security.oauth2.endpoint.token.response.IdTokenLoginHandler
import io.micronaut.security.token.jwt.cookie.AccessTokenCookieConfiguration

class GlobalLoginHandler(
    accessTokenCookieConfiguration: AccessTokenCookieConfiguration?,
    redirectConfiguration: RedirectConfiguration?,
    priorToLoginPersistence: PriorToLoginPersistence?
) : IdTokenLoginHandler(accessTokenCookieConfiguration, redirectConfiguration, priorToLoginPersistence) {

    override fun loginFailed(
        authenticationFailed: AuthenticationResponse,
        request: HttpRequest<*>?
    ): MutableHttpResponse<*> {
        if (authenticationFailed.message.get() == AuthenticationFailureReason.USER_NOT_FOUND.toString()) {

        }
        return super.loginFailed(authenticationFailed, request)
    }
}