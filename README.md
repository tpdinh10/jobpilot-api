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
- Resume-to-job match scoring (keyword overlap) + match history
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

### Match (protected)
- POST /api/match
- GET /api/match

#### POST /api/match
Calculates a match score between a saved resume and a saved job description and saves the result.

**Headers**
```bash
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```
Body

```json
{
  "jobId": "<job_id>",
  "resumeId": "<resume_id>"
}
```
Example response
```json
{
  "jobId": "<job_id>",
  "resumeId": "<resume_id>",
  "score": 62,
  "matchedKeywords": ["node", "express", "mongodb", "jwt"],
  "missingKeywords": ["docker", "aws"],
  "matchId": "<match_id>"
}
```
GET /api/match

Returns saved match history for the logged-in user.
```bash
Headers
Authorization: Bearer <your_jwt_token>
```
Example response

```json
{
  "matches": [
    {
      "_id": "<match_id>",
      "jobId": "<job_id>",
      "resumeId": "<resume_id>",
      "score": 62,
      "matchedKeywords": ["node", "express", "mongodb", "jwt"],
      "missingKeywords": ["docker", "aws"],
      "createdAt": "2026-02-10T00:00:00.000Z"
    }
  ]
}
```
Getting Started

1. Clone the repo
```bash
git clone https://github.com/tpdinh10/jobpilot-api.git
cd jobpilot-api
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file

(.env should not be committed)

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

4. Run the server
```bash
npm run dev
```

5. Test the API

Open your browser or API client and visit:
```bash

http://localhost:5000/health
```


Expected response:
```json

{ "status": "ok" }
```
