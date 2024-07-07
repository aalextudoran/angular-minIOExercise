# Stage 1: Build the Angular application
FROM node:latest as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy the entire application
COPY . .

# Stage 2: Serve the Angular application with Angular CLI
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy the node_modules from the build stage to save time
COPY --from=build /app/node_modules ./node_modules

# Copy the entire application
COPY --from=build /app .

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Expose the port Angular will run on
EXPOSE 4200

# Command to run the application
CMD ["ng", "serve", "--host", "0.0.0.0"]
