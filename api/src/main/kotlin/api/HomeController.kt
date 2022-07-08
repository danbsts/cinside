package api

import api.people.dal.model.Person
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import io.micronaut.views.View

@Controller("/api")
class HomeController {

  @Secured(SecurityRule.IS_ANONYMOUS)
  @View("home")
  @Get
  fun index(): Map<String, Any> = HashMap()

  @Get("/testing")
  @Secured(SecurityRule.IS_AUTHENTICATED)
  fun testing(): Person {
    println("Testing")
    return Person(
      "Daniel",
      "Dan",
      "dan@cin.ufpe.br",
      "https://github",
      "linkedin.com",
      "Java, Kotlin"
    )
  }
}