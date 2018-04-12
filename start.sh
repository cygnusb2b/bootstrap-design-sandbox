#!/bin/sh
docker-compose -p bootstrapsandbox run --no-deps --entrypoint yarn server
docker-compose -p bootstrapsandbox up
