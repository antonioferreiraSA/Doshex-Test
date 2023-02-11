# Use a Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /src

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the server files to the working directory
COPY . .

# Expose port 3000 for the server to listen on
EXPOSE 3000

# Define the command to start the server
CMD ["npm", "start"]
