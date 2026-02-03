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

### 1. Clone the repo
```bash
git clone https://github.com/tpdinh10/jobpilot-api.git
cd jobpilot-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a .env file
(.env should not be committed)
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```
### 4. Run the server
```bash
npm run dev
```
### 5. Test the API

Open your browser or API client and visit:
```bash
http://localhost:5000/health
```

Expected response:
```json
{ "status": "ok" }
```