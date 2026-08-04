import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      localStorage.setItem("token", data.accessToken);
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Cannot reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-information">
          <div className="login-information-content">
            <span className="login-brand">Campus Connect</span>

            <h1>
              Find your next
              <span> campus experience.</span>
            </h1>

            <p>
              Discover university events, workshops, career opportunities,
              student meetings, and academic activities in one place.
            </p>
          </div>

          <div className="login-benefits">
            <div className="login-benefit">
              <span>01</span>

              <div>
                <strong>Explore upcoming events</strong>
                <p>Find activities organized around campus.</p>
              </div>
            </div>

            <div className="login-benefit">
              <span>02</span>

              <div>
                <strong>Reserve your spot</strong>
                <p>Register before event availability runs out.</p>
              </div>
            </div>

            <div className="login-benefit">
              <span>03</span>

              <div>
                <strong>Review reservations</strong>
                <p>Access submitted reservations securely.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="login-form-section">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form-header">
              <div className="login-logo">CC</div>

              <span>Campus Event Finder</span>
              <h2>Welcome back</h2>

              <p>Enter your account information to continue.</p>
            </div>

            <div className="login-field">
              <label htmlFor="login-email">Email address</label>

              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="organizer@islander.edu"
                autoComplete="email"
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="login-password">Password</label>

              <div className="login-password-wrapper">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <div className="login-error" role="alert" aria-live="polite">
                <span>!</span>
                <p>{error}</p>
              </div>
            )}

            <button
              className="login-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="login-spinner"></span>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>

            <div className="login-demo">
              <strong>Demo account</strong>

              <span>
                Email: <b>organizer@islander.edu</b>
              </span>

              <span>
                Password: <b>password123</b>
              </span>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}