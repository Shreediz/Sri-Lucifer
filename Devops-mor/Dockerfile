# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the current directory contents to /app
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD [ "node", "app.js" ]

