# Use the official node image as a base with Node 20
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port used by your application (if any)
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

# Start your application
CMD ["npm", "start"]
