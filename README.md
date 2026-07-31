# Campus Event Finder

A web app for TAMUCC students to browse campus events and reserve spots.

**Team Campus Connect:** Andres Garza, Marcelo Jesus Barahona Rivera, Timothy Grix

## Stack

- Frontend: React + Vite + React Router
- Backend: Node.js + Express
- Database: PostgreSQL
- Auth: JWT (jsonwebtoken) + bcryptjs

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 14+ running locally on port 5432

### 1. Clone and install

```bash
git clone https://github.com/amgarza-cmd/team_project.git
cd team_project
npm install
```

### 2. Set up the database

Create a Postgres database named `campus_events` with user `postgres` and password `postgres` (or update the connection details in `server.js`).

```bash
psql -U postgres -c "CREATE DATABASE campus_events;"
psql -U postgres -d campus_events -f schema.sql
```

This creates the `events`, `reservations`, and `users` tables and seeds sample data plus a demo login.

### 3. Create a .env file

Create a file named `.env` in the project root with:

```
JWT_SECRET=campus-events-dev-secret
```

### 4. Run the backend

```bash
node server.js
```

Server runs on http://localhost:3000.

### 5. Run the frontend

In a second terminal:

```bash
npm run dev
```

Frontend runs on http://localhost:5173.

## Demo login

- Email: `organizer@islander.edu`
- Password: `password123`

## Routes

**Frontend**
- `/` — Home
- `/dashboard` — Event list
- `/reserve` — Reservation form
- `/about` — Team bios
- `/login` — Login page
- My Reservations view (JWT-protected)

**Backend API**
- `GET /api/events` — list events
- `POST /api/reservations` — create reservation
- `POST /api/login` — authenticate, returns JWT
- `GET /api/reservations` — list reservations (requires Bearer token)