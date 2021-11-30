import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Dogs landing page</h1>
      <Link to="/home">
        <button>Ir a la página principal</button>
      </Link>
    </div>
  );
}
