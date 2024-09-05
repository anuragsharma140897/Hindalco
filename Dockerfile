# Stage 1: Use Node.js 18 to build the React app
FROM node:18 AS build

WORKDIR /app

# Copy package.json and yarn.lock files to install dependencies
COPY package.json yarn.lock ./

RUN yarn install

# Copy the rest of the application source code and build the React app
COPY . .
RUN yarn build

# Stage 2: Use NGINX to serve the built app
FROM nginx:latest

# Copy the build output from the first stage to NGINX's default public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the NGINX server
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]

