# Use the official Node.js image as the base image for building the frontend
FROM node:14 as build

# Set the working directory inside the container
WORKDIR /app/frontend

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Build the frontend
RUN npm run build

# Use a lightweight web server to serve the built frontend
FROM nginx:alpine

# Copy the built frontend from the previous stage to the web server's public directory
COPY --from=build /app/frontend/build /usr/share/nginx/html

# Expose the frontend port (usually 80 for HTTP)
EXPOSE 80

# Start the web server
CMD ["nginx", "-g", "daemon off;"]
