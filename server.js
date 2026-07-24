const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

const events = [
  {
    eventId: 1,
    title: "Intro to Cybersecurity Workshop",
    category: "workshop",
    date: "2026-08-05",
    time: "3:00 PM",
    location: "CI Building 127",
    capacity: 30,
    availableSpots: 12,
    organizer: "Islander Cyber Club"
  },
  {
    eventId: 2,
    title: "Career Fair Prep Session",
    category: "career",
    date: "2026-08-08",
    time: "1:00 PM",
    location: "University Center Room 101",
    capacity: 100,
    availableSpots: 45,
    organizer: "Career Services"
  },
  {
    eventId: 3,
    title: "Beach Cleanup",
    category: "social",
    date: "2026-08-10",
    time: "9:00 AM",
    location: "Whitecap Beach",
    capacity: 50,
    availableSpots: 20,
    organizer: "Student Government"
  },
  {
    eventId: 4,
    title: "Calculus II Study Group",
    category: "academic",
    date: "2026-08-12",
    time: "6:00 PM",
    location: "Library Room 204",
    capacity: 15,
    availableSpots: 8,
    organizer: "Math Tutoring Center"
  }
];

app.get("/api/events", (req, res) => {
  res.json(events);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});