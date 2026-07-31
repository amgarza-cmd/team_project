require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const {Pool} = require("pg");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET missing from .env');
}

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "campus_events",
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const result = await pool.query(
      "SELECT user_id, email, password_hash FROM users WHERE email = $1",
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = result.rows[0];
    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const accessToken = jwt.sign(
      { id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful.", accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed." });
  }
});

app.get("/api/events", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT event_id AS "eventId", title, category,
              to_char(event_date, 'YYYY-MM-DD') AS date,
              event_time AS time, location, capacity,
              available_spots AS "availableSpots", organizer
       FROM events ORDER BY event_date`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not load events." });
  }
});

app.post("/api/reservations", async (req, res) => {
  const { eventId, name, email, tickets } = req.body;

  if (!eventId || !name || !email || !tickets || tickets < 1) {
    return res.status(400).json({ message: "eventId, name, email, and tickets are all required." });
  }

  try {
    const eventResult = await pool.query(
      "SELECT title, available_spots FROM events WHERE event_id = $1",
      [eventId]
    );

    if (eventResult.rowCount === 0) {
      return res.status(404).json({ message: `No event with ID ${eventId}.` });
    }

    const event = eventResult.rows[0];

    if (event.available_spots < tickets) {
      return res.status(409).json({ message: `Only ${event.available_spots} spot(s) left.` });
    }

    const insertResult = await pool.query(
      `INSERT INTO reservations (event_id, name, email, tickets)
       VALUES ($1, $2, $3, $4)
       RETURNING reservation_id AS "reservationId", event_id AS "eventId", name, email, tickets`,
      [eventId, name, email, tickets]
    );

    await pool.query(
      "UPDATE events SET available_spots = available_spots - $1 WHERE event_id = $2",
      [tickets, eventId]
    );

    res.status(201).json({
      message: `Reservation confirmed for "${event.title}".`,
      reservation: insertResult.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not create reservation." });
  }
});

app.get("/api/reservations", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
          r.reservation_id AS "reservationId",
          r.event_id AS "eventId",
          e.title AS "eventTitle",
          r.name,
          r.email,
          r.tickets
       FROM reservations r
       INNER JOIN events e
         ON e.event_id = r.event_id
       ORDER BY r.reservation_id DESC`
    );

    res.json({
      requestedBy: req.user.email,
      reservations: result.rows,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Could not load reservations.",
    });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: `No route matches ${req.method} ${req.originalUrl}` });
});

app.listen(PORT, () => {
  console.log(`On port:${PORT}`);
});