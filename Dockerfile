# Use Node.js official image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first
COPY package*.json ./

COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Expose the app port
EXPOSE ${SERVER_PORT}

# Start the app in development mode
CMD ["npm", "run", "dev:hot"]
