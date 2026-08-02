import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadEvents() {
      try {
        const response = await fetch("http://localhost:3000/api/events", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();

        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Could not load events.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadEvents();

    return () => controller.abort();
  }, []);

  const categories = useMemo(() => {
    const eventCategories = events
      .map((event) => event.category)
      .filter(Boolean);

    return ["All", ...new Set(eventCategories)];
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (selectedCategory === "All") {
      return events;
    }

    return events.filter(
      (event) => event.category === selectedCategory
    );
  }, [events, selectedCategory]);

  function getCategoryClass(category = "") {
    return category
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");
  }

  if (loading) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-status">
          <div className="dashboard-spinner"></div>
          <h2>Loading events</h2>
          <p>Please wait while we retrieve the upcoming campus events.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-status dashboard-error">
          <span className="dashboard-status-icon">!</span>
          <h2>Could not load events</h2>
          <p>{error}</p>
          <button type="button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <span className="dashboard-eyebrow">Campus Event Finder</span>

          <h1>Upcoming Events</h1>

          <p>
            Explore workshops, academic activities, career events, social
            meetings, and other opportunities happening around campus.
          </p>
        </div>

        <div className="dashboard-summary">
          <span>Total events</span>
          <strong>{events.length}</strong>
        </div>
      </section>

      <section className="dashboard-content">
        <div className="dashboard-toolbar">
          <div>
            <h2>Find your next event</h2>

            <p>
              Filter the list by category and reserve your spot before
              availability runs out.
            </p>
          </div>

          <div className="dashboard-filter">
            <label htmlFor="category">Category</label>

            <select
              id="category"
              value={selectedCategory}
              onChange={(event) =>
                setSelectedCategory(event.target.value)
              }
            >
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="dashboard-empty">
            <span>⌕</span>
            <h2>No events found</h2>
            <p>
              There are currently no events available in this category.
            </p>
          </div>
        ) : (
          <div className="events-grid">
            {filteredEvents.map((event) => {
              const categoryClass = getCategoryClass(event.category);

              return (
                <article className="event-card" key={event.eventId}>
                  <div className="event-card-top">
                    <span
                      className={`event-category event-category-${categoryClass}`}
                    >
                      {event.category}
                    </span>

                    <span className="event-id">
                      Event #{event.eventId}
                    </span>
                  </div>

                  <div className="event-card-content">
                    <h2>{event.title}</h2>

                    <div className="event-details">
                      <div className="event-detail">
                        <span className="event-detail-icon">▣</span>

                        <div>
                          <small>Date and time</small>
                          <strong>
                            {event.date} at {event.time}
                          </strong>
                        </div>
                      </div>

                      <div className="event-detail">
                        <span className="event-detail-icon">⌖</span>

                        <div>
                          <small>Location</small>
                          <strong>{event.location}</strong>
                        </div>
                      </div>

                      <div className="event-detail">
                        <span className="event-detail-icon">●</span>

                        <div>
                          <small>Hosted by</small>
                          <strong>{event.organizer}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="event-card-footer">
                    <div className="event-availability">
                      <span
                        className={
                          event.availableSpots > 0
                            ? "availability-dot"
                            : "availability-dot availability-full"
                        }
                      ></span>

                      <div>
                        <strong>{event.availableSpots}</strong>
                        <span>
                          {event.availableSpots === 1
                            ? " spot left"
                            : " spots left"}
                        </span>
                      </div>
                    </div>

                    {event.availableSpots > 0 ? (
                      <Link to="/reserve">Reserve Spot</Link>
                    ) : (
                      <button type="button" disabled>
                        Event Full
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}