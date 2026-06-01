---
name: cinside-patterns
description: Backend development conventions for the Kotlin API with MongoDB as the data store
---

# Architecture

## Controllers

- Controller classes should be named after the resource they control
- They should be responsible for checking the permissions of the user and returning `HttpResponse.notFound()`if the operation is not allowed. The permissions class should be used in this case
- Every endpoint should have your own POJO that maps the request body to a Kotlin object. Two endpoints with the same request format could share the same POJO
- The naming convention for the request POJO should follow `{endpoint}RequestDTO`
- All endpoints should return an DTO object for the entity
- Validation against the request objects should be done on this layer
- The location of the files should be in the `controller` folder

## Service Layer

- The service layer should be responsible for the business logic of the application. It should fetch data from the data layer and be responsible for joining any complex data structures
- The objects returned by the service layer should be POJOs that are not tied to the data layer or the controllers
- On the service layer HTTP/response logic should be avoided
- There should be no validations on this layer, the service should be mission driven, asked -> done
- The location of the files should be in the `service` folder

## Data Layer

- The data layer should have its own interface for abstraction and usage of different data sources (databases). It should also return the POJO fetched from the database
- Abstractions should be in place for easy change of data repository if needed
- The location of the files should be in the `dal` folder

## Permissions

- The permission checks should be included in its own permission class, they should make use of the services to retrieve the necessary information about the data
- These classes should mostly be used with boolean check functions that should tell whether something is allowed or not

# Testing

## Framework

- Testing should be done using Micronaut testing, see documentation on [the Micronaut website](https://micronaut-projects.github.io/micronaut-test/latest/guide/#introduction)
- E2E testing can also be written by mocking the entire HTTP flow but instantiating the containers on a docker file would be needed
- The docker-compose file should contain the necessary setup to put the entire service up and running

## What should be done

- The test should focus on the functionality and follow good principles depending on what layer it's testing
- Reflection testing should be avoided at max
- For testing the controller, it should assert that the correct fields were populated and the names are correct
- Use mocks to create missing pieces of components and make sure they return the correct values when their function is called
