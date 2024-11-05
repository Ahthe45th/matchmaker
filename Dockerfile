# Dockerfile
# Specify the base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application for production
RUN npm run build

# Serve the build with a lightweight server
RUN npm install -g serve
CMD ["serve", "-s", "build"]

EXPOSE 3000
