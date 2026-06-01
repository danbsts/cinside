FROM public.ecr.aws/docker/library/eclipse-temurin:11-jre-focal
WORKDIR /api
COPY build/libs/api-0.1-all.jar ./api.jar
CMD ["java", "-jar", "api.jar"]