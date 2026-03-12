# Stage 1: Build and Install dependencies
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Stage 2: Production Environment
FROM node:20-alpine

# Set environment to production
ENV NODE_ENV=production

# Set the working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.js ./
COPY --from=builder /app/script.js ./
COPY --from=builder /app/style.css ./
COPY --from=builder /app/index.html ./
COPY --from=builder /app/data.json ./

# Security: Run the application as a non-root user
USER node

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]