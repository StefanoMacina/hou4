#!/bin/bashs
#create docker container for sql using docker compose file
docker compose up -d

#execute container if not running
docker start hou4-postgres-1

#cd server

#compile project jar
#./mvnw clean install

#execute jar
#java -jar ./target/expScann-0.0.1-SNAPSHOT.jar 
