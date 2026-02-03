# JobPilot API

JobPilot is a backend REST API that helps users track job applications, manage resume versions, and plan their job search.

## Tech Stack
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT Authentication

## Features
- User authentication (register, login)
- JWT-protected routes
- Jobs CRUD (create, read, update, delete)
- Resume version storage
- User ownership enforcement

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Jobs
- POST /api/jobs
- GET /api/jobs
- GET /api/jobs/:id
- PUT /api/jobs/:id
- DELETE /api/jobs/:id

### Resumes
- POST /api/resumes
- GET /api/resumes

## Getting Started

1. Clone the repo
2. Install dependencies
3. npm install
    Create a .env file
    Run the server
4. npm run dev