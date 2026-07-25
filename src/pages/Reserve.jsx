import { useState } from "react";
import "./Reserve.css";

export default function Reserve() {
  const [formData, setFormData] = useState({
    eventId: "",
    name: "",
    email: "",
    tickets: 1,
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: name === "tickets" ? Number(value) : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setIsSuccess(false);
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/reservations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Reservation could not be created."
        );
      }

      setMessage(
        data.message || "Reservation created successfully!"
      );

      setIsSuccess(true);

      setFormData({
        eventId: "",
        name: "",
        email: "",
        tickets: 1,
      });
    } catch (error) {
      setMessage(error.message);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="reserve-page">
      <section className="reserve-card">
        <div className="reserve-header">
          <span className="reserve-badge">
            Event Reservation
          </span>

          <h1>Reserve an Event</h1>

          <p>
            Complete the information below to reserve your
            spot.
          </p>
        </div>

        <form
          className="reserve-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="eventId">Event ID</label>

            <input
              id="eventId"
              name="eventId"
              type="number"
              min="1"
              placeholder="Enter the event ID"
              value={formData.eventId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="name@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tickets">
              Number of Tickets
            </label>

            <input
              id="tickets"
              name="tickets"
              type="number"
              min="1"
              value={formData.tickets}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="reserve-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Submitting..."
              : "Reserve Now"}
          </button>
        </form>

        {message && (
          <p
            className={
              isSuccess
                ? "form-message success-message"
                : "form-message error-message"
            }
          >
            {message}
          </p>
        )}
      </section>
    </main>
  );
}