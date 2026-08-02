import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-content">
          <span className="home-badge">Campus Connect</span>

          <h1>
            Discover what is happening
            <span> around campus.</span>
          </h1>

          <p className="home-description">
            Find campus events, workshops, academic activities, and student
            organization meetings in one place. Browse upcoming events and
            reserve your spot before seats run out.
          </p>

          <div className="home-actions">
            <Link className="home-primary-button" to="/dashboard">
              Browse Events
            </Link>

            <Link className="home-secondary-button" to="/reserve">
              Reserve a Spot
            </Link>
          </div>
        </div>

        <div className="home-visual">
          <div className="home-event-card home-event-card-main">
            <div className="home-card-date">
              <span>AUG</span>
              <strong>05</strong>
            </div>

            <div>
              <span className="home-card-category">Workshop</span>
              <h3>Intro to Cybersecurity</h3>
              <p>3:00 PM · CI Building 127</p>
            </div>
          </div>

          <div className="home-event-card home-event-card-small">
            <span className="home-card-icon">✓</span>

            <div>
              <strong>Quick Reservations</strong>
              <p>Reserve your spot in seconds.</p>
            </div>
          </div>

          <div className="home-available-spots">
            <span>Available spots</span>
            <strong>12</strong>
          </div>
        </div>
      </section>

      <section className="home-how-it-works">
        <div className="home-section-heading">
          <span>Simple and convenient</span>
          <h2>How it works</h2>
          <p>
            Discovering and joining campus events only takes a few steps.
          </p>
        </div>

        <div className="home-steps">
          <article className="home-step-card">
            <span className="home-step-number">01</span>
            <div className="home-step-icon">⌕</div>
            <h3>Browse events</h3>
            <p>
              Explore upcoming campus events, workshops, meetings, and
              activities from the Dashboard.
            </p>
          </article>

          <article className="home-step-card">
            <span className="home-step-number">02</span>
            <div className="home-step-icon">≡</div>
            <h3>Find your category</h3>
            <p>
              Review academic, workshop, social, sports, and career events in
              one organized place.
            </p>
          </article>

          <article className="home-step-card">
            <span className="home-step-number">03</span>
            <div className="home-step-icon">✓</div>
            <h3>Reserve your spot</h3>
            <p>
              Complete a quick reservation form and receive confirmation when
              space is available.
            </p>
          </article>
        </div>
      </section>

      <section className="home-call-to-action">
        <div>
          <span>Ready to get involved?</span>
          <h2>Find your next campus event today.</h2>
        </div>

        <Link to="/dashboard">View Upcoming Events</Link>
      </section>
    </main>
  );
}