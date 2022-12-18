ARG NODE_VERSION=18-alpine
ARG NGINX_VERSION=1.23.3-alpine

# First create a build image which will used to build 
# the React app, depending on where this is being run
# it does not have to target amd64
FROM node:${NODE_VERSION} AS build-stage

# All file sare copied to the app directory
WORKDIR /app

# First get the current package.json and yarn.lock
COPY package*.json /app/
COPY yarn.lock /app/

# preare the environment that we will use to build
RUN yarn install

# Copy the rest of the files, note that .dockerignore
# should leave what we don't need
COPY . /app/

# TODO: we should run tests, prettier and linting here

# Build the React app
RUN yarn build

# Now build the production image that will serve the files
FROM nginx:${NGINX_VERSION}

# Simply copy the built files to the default directory
# that nginx will serve, there should be no need to 
# provide a custom configuration for the web server, 
# remember that this is built to be proxied.
COPY --from=build-stage /app/build/ /usr/share/nginx/html

