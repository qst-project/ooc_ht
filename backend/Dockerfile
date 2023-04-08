FROM openjdk:19-slim-buster as build

COPY .mvn .mvn
COPY mvnw .
COPY pom.xml .
COPY src src

RUN ./mvnw -B package

FROM openjdk:19-slim-buster
COPY --from=build /target/*.jar monolith.jar

# windows fix
# RUN apt-get update && apt-get install dos2unix && apt-get clean && dos2unix mvnw

CMD ["java", "-jar", "monolith.jar"]
