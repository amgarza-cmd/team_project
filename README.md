# Campus Event Finder

Web app for TAMUCC students to browse campus events and reserve spots.

**Team Campus Connect:** Andres Garza, Marcelo Barahona Rivera, Timothy Grix

## Overview

One place to find and reserve campus events instead of hunting through emails and group chats. Students browse, filter, and book. Organizers see who reserved.

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

**Guest:** Browse Dashboard, submit Reserve form. No login needed.

**Logged-in user:** Log in with email and password, get a JWT, view My Reservations.

Demo login for the deployed site:
- Email: `organizer@islander.edu`
- Password: `password123`

## AI Assistance Disclosure

Team members used AI assistants (Claude, ChatGPT) during development for the following:

- Debugging errors (CORS, dependency issues)
- Code review and refactoring suggestions

All code was reviewed, tested, and committed by team members.