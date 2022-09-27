# Cin Inside

## Dependencies

* `Java`
* `Gradle`
* `Docker` (preferably install via the install script)
* `Docker Compose`
* `e-sender env file`

## Run locally

Make sure that the docker daemon is running then run the following from inside the project folder:

1. `cd api && ./gradlew build`
2. `docker compose up -d --build`

If successfull, you'll be able to access the project from the localhost
