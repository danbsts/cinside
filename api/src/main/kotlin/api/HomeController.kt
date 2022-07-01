package api

import api.accounts.Account
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import io.micronaut.views.View

@Controller
class HomeController {

    @Secured(SecurityRule.IS_ANONYMOUS)
    @View("home")
    @Get
    fun index(): Map<String, Any> = HashMap()

    @Get("/testing")
    @Secured(SecurityRule.IS_AUTHENTICATED)
    fun testing(): Account {
        println("Testing")
        return Account("Daniel", "dan@cin.ufpe.br")
    }
}