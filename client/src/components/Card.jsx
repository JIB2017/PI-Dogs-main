import React from "react";
import { Link } from "react-router-dom";

export default function Card({ id, image, name, temperament, weight }) {
  return (
    <div className="grid-container">
      <div key={id}>
        <Link to={`/home/${id}`}>
          <img
            className="img-container"
            src={image}
            alt="una imágen"
            width="100px"
            height="100px"
          />
        </Link>
        <div className="color-text">
          <h6>Nombre: "{name}"</h6>
        </div>
        <div className="color-text">
          <h6>Personalidades: "{temperament}"</h6>
        </div>
        <div className="color-text">
          <h6>Peso: "{weight}"</h6>
        </div>
      </div>
    </div>
  );
}
