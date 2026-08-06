import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyReservations.css";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [requestedBy, setRequestedBy] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadReservations() {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/reservations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(
            data.message || "Could not load reservations."
          );
        }

        setReservations(data.reservations || []);
        setRequestedBy(data.requestedBy || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadReservations();
  }, [navigate]);

  if (loading) {
    return <p>Loading reservations...</p>;
  }

  if (error) {
    return <p>Error loading reservations: {error}</p>;
  }

  return (
    <main className="reservations-page">
      <section className="reservations-card">
        <h1>My Reservations</h1>

        {requestedBy && (
          <p className="requested-by">
            Signed in as {requestedBy}
          </p>
        )}

        {reservations.length === 0 ? (
          <div className="empty-state">
            <h2>No reservations found</h2>
            <p>There are currently no event reservations.</p>
          </div>
        ) : (
          <div className="reservations-list">
            {reservations.map((reservation) => (
              <article
                className="reservation-item"
                key={reservation.reservationId}
              >
                <div>
                  <h2>
                    {reservation.eventTitle ||
                      `Event #${reservation.eventId}`}
                  </h2>

                  <p>
                    Reservation #{reservation.reservationId}
                  </p>
                </div>

                <div className="reservation-details">
                  <p>
                    <strong>Name:</strong> {reservation.name}
                  </p>

                  <p>
                    <strong>Email:</strong> {reservation.email}
                  </p>

                  <p>
                    <strong>Tickets:</strong> {reservation.tickets}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}