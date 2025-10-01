# Multi-stage build for production
FROM node:18-alpine AS ui-builder

# Build the React frontend
WORKDIR /app/ui
COPY ui/package*.json ./
RUN npm ci --only=production
COPY ui/ ./
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy application code
COPY . .
COPY --from=ui-builder /app/ui/dist ./ui/dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 8009

CMD ["npm", "start"]