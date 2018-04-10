#!/bin/sh
yarn
./node_modules/.bin/webpack-dev-server --mode=development --env.dev --inline --host=0.0.0.0 --port=${PORT}
