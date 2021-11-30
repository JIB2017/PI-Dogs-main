import React from "react";

export default function Card({ image, name, temperament, weight }) {
  return (
    <div>
      <img src={image} alt="una imágen" width="220px" height="280px" />
      <h3>{name}</h3>
      <h3>{temperament}</h3>
      <h3>{weight}</h3>
    </div>
  );
}
