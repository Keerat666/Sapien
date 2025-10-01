#!/bin/bash

# Docker management scripts for the project

case "$1" in
  "dev")
    echo "Starting development environment..."
    docker-compose -f docker-compose.dev.yml up --build
    ;;
  "dev-down")
    echo "Stopping development environment..."
    docker-compose -f docker-compose.dev.yml down
    ;;
  "prod")
    echo "Starting production environment..."
    docker-compose up --build -d
    ;;
  "prod-down")
    echo "Stopping production environment..."
    docker-compose down
    ;;
  "build")
    echo "Building production image..."
    docker build -t autopilot:latest .
    ;;
  "build-dev")
    echo "Building development image..."
    docker build -f Dockerfile.dev -t autopilot:dev .
    ;;
  "logs")
    docker-compose logs -f
    ;;
  "logs-dev")
    docker-compose -f docker-compose.dev.yml logs -f
    ;;
  "clean")
    echo "Cleaning up Docker resources..."
    docker-compose down -v
    docker-compose -f docker-compose.dev.yml down -v
    docker system prune -f
    ;;
  *)
    echo "Usage: $0 {dev|dev-down|prod|prod-down|build|build-dev|logs|logs-dev|clean}"
    echo ""
    echo "Commands:"
    echo "  dev        - Start development environment with hot reload"
    echo "  dev-down   - Stop development environment"
    echo "  prod       - Start production environment"
    echo "  prod-down  - Stop production environment"
    echo "  build      - Build production Docker image"
    echo "  build-dev  - Build development Docker image"
    echo "  logs       - View production logs"
    echo "  logs-dev   - View development logs"
    echo "  clean      - Clean up all Docker resources"
    exit 1
    ;;
esac