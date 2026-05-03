# Use official Node.js image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy dependency file first (for caching optimization)
COPY package.json .

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port used by the app
EXPOSE 8080

# Start the application
CMD ["npm", "start"]