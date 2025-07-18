FROM node:24.4.1-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json /app/

# Install dependencies
COPY . /app/

RUN npm install

# Create a non-root user and switch to it
RUN adduser -D ikinyamakuru
USER ikinyamakuru

# Expose the port the app runs on
EXPOSE 3000

# Start the nestjs application in production mode
CMD ["npm", "run", "start:prod"]