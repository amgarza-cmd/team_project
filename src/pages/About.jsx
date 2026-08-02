import { Link } from "react-router-dom";
import "./About.css";

const teamMembers = [
  {
    name: "Marcelo Barahona",
    username: "MBarahona388",
    role: "Frontend Development",
    initials: "MB",
    description:
      "Worked on the reservation form and the protected My Reservations view.",
  },
  {
    name: "Andres Garza",
    username: "CarvingRiper386",
    role: "Project Coordination",
    initials: "AG",
    description:
      "Supported project coordination, organization, and application development.",
  },
  {
    name: "Timothy Grix III",
    username: "timothyjg123",
    role: "Backend Development",
    initials: "TG",
    description:
      "Worked on the Express API, authentication, database, and server functionality.",
  },
];

export default function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-eyebrow">About the project</span>

          <h1>
            Connecting students with
            <span> campus opportunities.</span>
          </h1>

          <p>
            Campus Event Finder is a web application designed to help
            university students discover campus events, workshops, academic
            activities, and student organization meetings in one organized
            place.
          </p>

          <div className="about-actions">
            <Link to="/dashboard" className="about-primary-button">
              Explore Events
            </Link>

            <Link to="/reserve" className="about-secondary-button">
              Make a Reservation
            </Link>
          </div>
        </div>

        <div className="about-project-card">
          <div className="about-project-logo">CC</div>

          <span>Campus Connect Team</span>
          <h2>Campus Event Finder</h2>

          <p>
            A full-stack event reservation application created for students,
            campus organizations, and event organizers.
          </p>

          <div className="about-project-stats">
            <div>
              <strong>3</strong>
              <span>Team members</span>
            </div>

            <div>
              <strong>5+</strong>
              <span>Routed pages</span>
            </div>

            <div>
              <strong>Full</strong>
              <span>Stack project</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-purpose-section">
        <div className="about-section-heading">
          <span>Our purpose</span>
          <h2>One place for campus events</h2>

          <p>
            The application reduces confusion by bringing event information
            and reservations together instead of requiring students to search
            through emails, flyers, websites, or group chats.
          </p>
        </div>

        <div className="about-features">
          <article className="about-feature-card">
            <div className="about-feature-icon">01</div>
            <h3>Discover events</h3>

            <p>
              Browse upcoming academic, workshop, social, sports, and career
              events.
            </p>
          </article>

          <article className="about-feature-card">
            <div className="about-feature-icon">02</div>
            <h3>Reserve quickly</h3>

            <p>
              Submit a simple reservation form and receive confirmation when
              space is available.
            </p>
          </article>

          <article className="about-feature-card">
            <div className="about-feature-icon">03</div>
            <h3>Manage registrations</h3>

            <p>
              Authenticated organizers can review event reservations from a
              protected page.
            </p>
          </article>
        </div>
      </section>

      <section className="about-team-section">
        <div className="about-section-heading">
          <span>Campus Connect</span>
          <h2>Meet the team</h2>

          <p>
            The project was developed collaboratively using GitHub, React,
            Node.js, Express, and PostgreSQL.
          </p>
        </div>

        <div className="about-team-grid">
          {teamMembers.map((member) => (
            <article className="team-card" key={member.username}>
              <div className="team-card-header">
                <div className="team-avatar">{member.initials}</div>

                <div>
                  <h3>{member.name}</h3>
                  <span>@{member.username}</span>
                </div>
              </div>

              <div className="team-role">{member.role}</div>

              <p>{member.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-stack-section">
        <div>
          <span className="about-eyebrow">Technology stack</span>
          <h2>Built with modern web technologies</h2>
        </div>

        <div className="about-stack-list">
          <span>React</span>
          <span>React Router</span>
          <span>Node.js</span>
          <span>Express</span>
          <span>PostgreSQL</span>
          <span>JWT</span>
          <span>GitHub</span>
        </div>
      </section>
    </main>
  );
}