import React from "react";

export default function Card({ image, name, temperament, weight }) {
  return (
    <div>
      <img src={image} alt="una imágen" width="280px" height="280px" />
      <h3>Nombre: "{name}"</h3>
      <h3>Personalidades: "{temperament}"</h3>
      <h3>Peso: "{weight}"</h3>
    </div>
  );
}
