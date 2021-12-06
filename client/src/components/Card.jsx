import React from "react";
import { Link } from "react-router-dom";
import estilos from "./card.module.css";

export default function Card({ id, image, name, temperament, weight }) {
  return (
    <div className={estilos.gridcontainer}>
      <div key={id}>
        <Link to={`/home/${id}`}>
          <img
            className={estilos.imgContainer}
            src={image}
            alt={name}
          />
        </Link>
        <div className={estilos.desc}>
          <div className={estilos.colortext}>
            <h6>Nombre: "{name}"</h6>
          </div>
          <div className={estilos.colortext}>
            <h6>Personalidades: "{temperament}"</h6>
          </div>
          <div className={estilos.colortext}>
            <h6>Peso: "{weight}"</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
