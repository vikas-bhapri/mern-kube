# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app/backend

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose the backend port (change this to your backend's actual port)
EXPOSE 3001

# Start the backend server
CMD ["npm", "start"]
