# Build the admin front
FROM node:18.17.0-alpine3.18 AS build

# Start as root
USER root

# Api path
WORKDIR /usr/src/app

# Development packages
COPY ./package*.json ./
RUN npm install

# Copy application
COPY ./ /usr/src/app

RUN node --max_old_space_size=8192

# Build application
RUN ./node_modules/.bin/ng build --configuration production

# Nginx
FROM nginx:1.25.1-alpine3.17-slim AS production

# Copy static files
COPY --from=build /usr/src/app/dist/java-project /app/java-project

# Copy nginx configuration files
ADD ./ci/nginx.conf /etc/nginx/nginx.conf
ADD ./ci/default.conf /etc/nginx/conf.d/default.conf

# Update packages
RUN apk upgrade

# Grant permissions for nginx user
RUN chown -R nginx:nginx /app && chmod -R 755 /app && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

# Define user
USER nginx

WORKDIR /app/java-project

EXPOSE 8080
