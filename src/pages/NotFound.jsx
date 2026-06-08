import React from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/notFound.scss";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="not-found-page">
      <div className="not-found-bg" aria-hidden="true">
        <span className="orb orb-one"></span>
        <span className="orb orb-two"></span>
        <span className="orb orb-three"></span>
      </div>

      <section className="not-found-card" aria-labelledby="nf-title">
        <p className="not-found-code">404</p>
        <h1 id="nf-title">Route Lost In Transit</h1>
        <p className="not-found-copy">
          The page you are looking for took a detour. Let us send you back to a
          safe place.
        </p>

        <div className="not-found-actions">
          <button type="button" className="nf-btn primary" onClick={() => navigate("/")}>
            Go Home
          </button>
          <button
            type="button"
            className="nf-btn ghost"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;
