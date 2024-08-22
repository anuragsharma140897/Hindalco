# Use the official NGINX image as the base
FROM nginx:latest

# Copy the built React app from /var/www/html on your local machine to the appropriate directory in the container
COPY /build /usr/share/nginx/html/

# Copy the NGINX configuration file if you have a custom one
# If you are using the default NGINX config, this line can be omitted.
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
