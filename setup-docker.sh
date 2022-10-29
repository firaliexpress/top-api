#!/bin/bash

# build the api container
docker build -t top-api .

# start the api container
docker-compose -f ./docker-compose.yml up -d
