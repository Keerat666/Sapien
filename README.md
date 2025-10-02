# Sapien

[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-Friendly-orange.svg)](https://hacktoberfest.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Maintained by Sapien Team](https://img.shields.io/badge/maintained%20by-Sapien%20Team-blueviolet.svg)](./CONTRIBUTORS.md)


Sapien is an **open-source Prompt Management & Discovery Platform**.  
It allows you to **publish, rate, review, and organize prompts** with features like version control, private/public prompts, and a social layer for the AI community.

This project is a **monolith** containing both:

- **Backend** → Node.js + MongoDB
- **Frontend** → React + TypeScript (Vite + shadcn-ui + Tailwind CSS)

🚀 Perfect for Hacktoberfest contributions — we’re building Sapien in public!

---

## ✨ Features

- 🌐 GitHub Login
- 📝 Create, Edit, and Manage Prompts
- ⭐ Rate, Favorite & Comment on Prompts
- 🔍 Search & Filter with Trending and Starred views
- 🗂️ Personal Prompt Library with version control
- 👥 Public & Private Prompts

---

## 🛠 Tech Stack

**Frontend (UI)**

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

**Backend**

- Node.js
- Express.js
- MongoDB

---

## 🚀 Getting Started

### Option 1: Docker Setup (Recommended)

The easiest way to get started is with Docker, which handles all dependencies and services automatically.

#### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)

#### Quick Start

1. **Clone and setup environment:**

   ```bash
   git clone <YOUR_GIT_URL>
   cd sapien
   cp .env.example .env
   ```

2. **Start development environment:**

   ```bash
   # Windows
   docker-scripts.bat dev

   # Linux/Mac
   ./docker-scripts.sh dev
   ```

3. **Access the application:**
   - Frontend: http://localhost:5173 (React dev server with HMR)
   - Backend API: http://localhost:8009
   - MongoDB: localhost:27017

#### Docker Commands

**Linux/Mac:**

```bash
./docker-scripts.sh dev        # Start development environment
./docker-scripts.sh dev-down   # Stop development environment
./docker-scripts.sh prod       # Start production environment
./docker-scripts.sh prod-down  # Stop production environment
./docker-scripts.sh logs       # View production logs
./docker-scripts.sh logs-dev   # View development logs
./docker-scripts.sh clean      # Clean up Docker resources
```

#### Development Architecture

- **Backend**: Separate Node.js container with nodemon for hot reload
- **Frontend**: Separate Vite dev server container with hot reload
- **Database**: MongoDB container with persistent volumes

### Option 2: Local Development

#### Prerequisites

- [Node.js 24 (via nvm)](https://github.com/nvm-sh/nvm#installing-and-updating)
- MongoDB (local installation or Atlas cluster)

#### Setup

1. **Install Node.js:**

   ```bash
   nvm install 24
   nvm use 24
   ```

2. **Clone and install dependencies:**

   ```bash
   git clone <YOUR_GIT_URL>
   cd sapien
   npm i
   ```

3. **Database setup:**
   Create a free MongoDB cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and get the connection string. Add it to the `demo.env` file, then rename to `.env`.

4. **Start the application:**
   ```bash
   npm run dev
   ```

👉 UI has its own setup guide — check ui/README.md.

### Environment Configuration

Copy `.env.example` to `.env` and configure:

```env
# MongoDB Configuration
MONGO_PATH=mongodb://mongo:27017/autopilot  # For Docker
# MONGO_PATH=your_atlas_connection_string   # For local development

MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=your_secure_password
MONGO_DB_NAME=autopilot
NODE_ENV=development
PORT=8009
```

## 🐳 Docker Details

### Production Deployment

- Multi-stage build for optimized image size
- Frontend built and served statically by Express
- Non-root user for security
- Persistent MongoDB volumes
- Health checks and restart policies

### Development Workflow

1. Start development environment: `docker-scripts.bat dev` (Windows) or `./docker-scripts.sh dev` (Linux/Mac)
2. Three separate containers will start:
   - **Backend**: http://localhost:8009 (API endpoints)
   - **Frontend**: http://localhost:5173 (React dev server with HMR)
   - **MongoDB**: localhost:27017 (Database)
3. Make changes to your code:
   - Backend changes trigger nodemon restart
   - Frontend changes trigger Vite hot module replacement
4. Both frontend and backend code are mounted as volumes for instant updates

### Troubleshooting

**Common Issues:**

- **Port conflicts**: Make sure ports 8009, 5173, and 27017 are available
- **Permission issues**: On Linux/Mac, make scripts executable: `chmod +x docker-scripts.sh`
- **MongoDB connection**: Ensure the `mongoPath` in your `.env` matches the service name in docker-compose

**Useful Commands:**

```bash
# View running containers
docker ps

# View logs for specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongo

# Rebuild without cache
docker-compose build --no-cache

# Remove all containers and volumes
docker-compose down -v

# Access MongoDB shell
docker-compose exec mongo mongosh
```

## 🤝 Contributing

We welcome contributions from everyone! 🎉
To contribute:

- Fork the repository
- Create a new branch for your feature/fix
- Commit your changes with clear messages
- Open a Pull Request
  You can also check the Issues tab for beginner-friendly tasks — especially during Hacktoberfest 🌱.

## 📜 License

This project is licensed under the MIT License.
You are free to use, modify, and distribute this software with attribution.

## 👥 Contributors

Thanks goes to these wonderful people:
<a href="https://github.com/Keerat666/Sapien/graphs/contributors"> <img src="https://contrib.rocks/image?repo=Keerat666/Sapien" alt="Contributors graph"/> </a>

## 🧑‍🤝‍🧑 Maintainers & Contributors

<div align="left">

<a href="https://github.com/keerat666" title="Gurkeerat (Maintainer)">
	<img src="https://avatars.githubusercontent.com/u/18071315?v=4" alt="Gurkeerat" width="64" height="64" style="border-radius:50%; margin-right:8px;" />
</a>
<a href="https://github.com/Devash422" title="Devansh Verma (Contributor)">
	<img src="https://avatars.githubusercontent.com/u/65439049?v=4" alt="Devansh Verma" width="64" height="64" style="border-radius:50%; margin-right:8px;" />
</a>

</div>

## 👤 Maintainer

Built with ❤️ by Keerat
