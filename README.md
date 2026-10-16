# Applio — Job Application Management SaaS

A minimal, full-stack job application tracker built with React (Vite + Tailwind CSS), Node.js (Express), and MongoDB (Mongoose).

## Core Evaluation Features

1. **Status Workflows**: Track applications across defined recruitment stages: `Applied` ➔ `Interview` ➔ `Offer` ➔ `Rejected` with instant inline transitions.
2. **Filtering & Sorting**: Real-time keyword search by company or role, status filter tabs, and multi-mode sorting (newest, oldest, company name).
3. **Dashboard Summary Cards**: Aggregated pipeline metrics displaying Total Applications, Interviews, Offers, and Rejected counts.
4. **Data Aggregation**: Backend endpoint (`/api/applications/stats`) computing recruitment pipeline counts using Mongoose aggregation queries.
5. **Authentication**: Secure user registration and login using JSON Web Tokens (JWT) and bcrypt password hashing.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide React, Axios
- **Backend**: Node.js, Express.js (ES Modules)
- **Database**: MongoDB Atlas with Mongoose
- **Auth**: JWT (jsonwebtoken) & bcryptjs

## Environment Variables

### Backend (`backend/.env`)
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5001/api
```

## Quick Start

### Run Both Frontend & Backend (One Command)

From the project root directory:

```bash
npm run dev
```

This starts both services concurrently:

- **Backend API**: `http://localhost:5001`
- **Frontend App**: `http://localhost:5173`

---

### Run Separately (Optional)

**Backend:**

```bash
cd backend && npm run dev
```

**Frontend:**

```bash
cd frontend && npm run dev
```

## API Endpoints

- `POST /api/auth/register` - Create user account
- `POST /api/auth/login` - Authenticate user & get JWT
- `GET /api/auth/me` - Get current user profile
- `GET /api/applications` - List applications (supports `search` and `status` query parameters)
- `POST /api/applications` - Create a new application
- `PUT /api/applications/:id` - Update application details
- `PATCH /api/applications/:id/status` - Quick update of application status
- `DELETE /api/applications/:id` - Delete an application
- `GET /api/applications/stats` - Get aggregated pipeline metrics
