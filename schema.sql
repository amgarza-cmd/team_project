CREATE TABLE IF NOT EXISTS events (
  event_id        SERIAL PRIMARY KEY,
  title           VARCHAR(200) NOT NULL UNIQUE,
  category        VARCHAR(50)  NOT NULL,
  event_date      DATE         NOT NULL,
  event_time      VARCHAR(20)  NOT NULL,
  location        VARCHAR(200) NOT NULL,
  capacity        INTEGER      NOT NULL,
  available_spots INTEGER      NOT NULL,
  organizer       VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS reservations (
  reservation_id SERIAL PRIMARY KEY,
  event_id       INTEGER      NOT NULL REFERENCES events(event_id),
  name           VARCHAR(100) NOT NULL,
  email          VARCHAR(255) NOT NULL,
  tickets        INTEGER      NOT NULL,
  created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  user_id       SERIAL PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);

INSERT INTO events (title, category, event_date, event_time, location, capacity, available_spots, organizer) VALUES
  ('Intro to Cybersecurity Workshop', 'workshop', '2026-08-05', '3:00 PM', 'CI Building 127',            30,  12, 'Islander Cyber Club'),
  ('Career Fair Prep Session',        'career',   '2026-08-08', '1:00 PM', 'University Center Room 101', 100, 45, 'Career Services'),
  ('Beach Cleanup',                   'social',   '2026-08-10', '9:00 AM', 'Whitecap Beach',             50,  20, 'Student Government'),
  ('Calculus II Study Group',         'academic', '2026-08-12', '6:00 PM', 'Library Room 204',           15,   8, 'Math Tutoring Center')
ON CONFLICT (title) DO NOTHING;

-- demo organizer account, password is: password123
INSERT INTO users (email, password_hash) VALUES
  ('organizer@islander.edu', '$2b$10$QSN/dcWWD9ZRY1H5TSaf..X8Pc4XJAuAo9xmPWBClnt4jbUt8c1Vm')
ON CONFLICT (email) DO NOTHING;