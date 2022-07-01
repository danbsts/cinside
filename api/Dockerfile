FROM openjdk:11-jre-slim
WORKDIR /api
COPY build/libs/api-0.1-all.jar ./api.jar
CMD ["java", "-jar", "api.jar"]