# Sapien

[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-Friendly-orange.svg)](https://hacktoberfest.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

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

## 📦 Requirements
- [Node.js 24 (via nvm)](https://github.com/nvm-sh/nvm#installing-and-updating)

Create a free mongo DB cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and get the connection string and add it to the `demo.env` file in the root of the project.Once done, rename the file from demo.env to .env.

```
nvm install 24
nvm use 24
# Clone the repo
git clone <YOUR_GIT_URL>
cd sapien

# Install dependencies
npm i

# Start backend (Node.js app with MongoDB connection)
npm run dev
```
The app is deployed on a free instance of Render.

👉 UI has its own setup guide — check ui/README.md.

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
<a href="https://github.com/sapien/graphs/contributors"> <img src="https://contrib.rocks/image?repo=sapien" /> </a>

## 👤 Maintainer
Built with ❤️ by Keerat