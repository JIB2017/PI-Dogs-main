import React from "react";
import { Link } from "react-router-dom";
import estilos from "./landingPage.module.css"

export default function LandingPage() {
  return (
    <div>
      <h1>Henry Dogs</h1>
      <Link to="/home">
        <button className={estilos.btn}>Ir a la página principal</button>
      </Link>
    </div>
  );
}
