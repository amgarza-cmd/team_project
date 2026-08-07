# Campus Event Finder

Web app for TAMUCC students to browse campus events and reserve spots.

**Team Campus Connect:** Andres Garza, Marcelo Barahona Rivera, Timothy Grix

## Overview

One place to find and reserve campus events instead of hunting through emails and group chats. Users log in, browse events, book a spot, and see their reservations.

**Live:**
- Frontend: https://team-project-nu-nine.vercel.app/
- Backend:  https://team-project-2t0v.onrender.com

**Stack:** React + Vite, Express, PostgreSQL, JWT auth. Hosted on Vercel and Render.

## Setup

Requires Node 18+ and PostgreSQL running locally.

```bash
git clone https://github.com/amgarza-cmd/team_project.git
cd team_project
npm install
```

Create the database:
```bash
psql -U postgres -c "CREATE DATABASE campus_events;"
psql -U postgres -d campus_events -f schema.sql
```

Create `.env` in the project root:
```
JWT_SECRET=campus-events-dev-secret
VITE_API_URL=http://localhost:3000
```

Run backend and frontend in two terminals:
```bash
node server.js     # http://localhost:3000
npm run dev        # http://localhost:5173
```

## API

Base URL: `http://localhost:3000` (or the Render URL in production)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/events | none | List all events |
| POST | /api/reservations | none | Create a reservation |
| POST | /api/login | none | Log in, returns JWT |
| GET | /api/reservations | Bearer | List all reservations |

Bad requests return 400, missing events 404, capacity conflicts 409, missing/invalid tokens 401.

## Roles and Workflows

The app has one role: an authenticated user (organizer).

**Workflow:**
1. Log in with email and password on the Login page.
2. Backend verifies credentials and returns a JWT (valid 1 hour).
3. Browse events on the Dashboard.
4. Submit the Reserve form to book a spot. Backend validates capacity and creates the reservation.
5. View all reservations on the My Reservations page (JWT-protected).
6. Logout clears the token.

Demo login for the deployed site:
- Email: `organizer@islander.edu`
- Password: `password123`

## AI Assistance Disclosure

Team members used AI assistants (Claude, ChatGPT) during development for the following:

- Debugging errors (CORS, dependency issues)
- Code review and refactoring suggestions

All code was reviewed, tested, and committed by team members.