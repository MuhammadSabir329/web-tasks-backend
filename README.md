# Web Tasks API

REST API for **Web Tasks**, a task management app with nested lists and tasks. Built with Node.js, Express and MongoDB, with JWT authentication.

- **Live demo (frontend):** https://tasks-webapp.netlify.app
- **Frontend repository:** [web-tasks-frontend](https://github.com/MuhammadSabir329/web-tasks-frontend)

## Features

- User registration and login with JWT authentication
- Passwords hashed with bcrypt
- All `/lists` routes protected by custom Express middleware
- Each user can only see and change their own lists
- Lists containing tasks (tasks are stored inside their list)
- Create, update, star, complete, move and delete tasks
- Delete all completed tasks in a list in one request
- API documented with OpenAPI: [docs/openapi.yaml](./docs/openapi.yaml)

## Tech Stack

Node.js, Express 5, MongoDB with Mongoose, JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `cors`, `dotenv`.

Backend deployed on Bonto, with the database on MongoDB Atlas.

## API Endpoints

Routes under `/lists` require the header `Authorization: Bearer <token>`.

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/auth/register` | Create an account |
| POST | `/auth/login` | Log in and receive a JWT |
| GET | `/lists` | Get all lists for the logged-in user |
| POST | `/lists` | Create a list |
| GET | `/lists/:listId` | Get one list |
| PATCH | `/lists/:listId` | Update a list |
| DELETE | `/lists/:listId` | Delete a list |
| POST | `/lists/:listId/tasks` | Add a task to a list |
| PATCH | `/lists/:listId/tasks/:taskId` | Update a task (title, starred, completed) |
| PATCH | `/lists/:listId/tasks/:taskId/move` | Move a task to another list |
| DELETE | `/lists/:listId/tasks/:taskId` | Delete a task |
| DELETE | `/lists/:listId/tasks/completed` | Delete all completed tasks in a list |

## Project Structure

```
server.js            Entry point (connects to MongoDB, starts the server)
src/
  app.js             Express app, middleware and route setup
  config/db.js       MongoDB connection
  controllers/       Auth, list and task logic
  middleware/        JWT authentication middleware
  models/            Mongoose models (User, List, Task)
  routes/            Route definitions
docs/openapi.yaml    OpenAPI documentation
```

## Getting Started

**Requirements:** Node.js 18 or later, and a MongoDB database (local or a free MongoDB Atlas cluster).

```bash
git clone https://github.com/MuhammadSabir329/web-tasks-backend.git
cd web-tasks-backend
npm install
```

Create a `.env` file in the project root:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_long_random_secret
PORT=5000
```

Run the server:

```bash
npm run dev     # development, restarts on changes (nodemon)
npm start       # production
```

The API runs at `http://localhost:5000`.

## Author

**Muhammad Sabir**, Junior Full-Stack Developer (MERN)

- GitHub: [MuhammadSabir329](https://github.com/MuhammadSabir329)
- LinkedIn: [Muhammad Sabir](https://www.linkedin.com/in/muhammad-sabir-226b7443b/)
- Email: msabir.work@gmail.com
