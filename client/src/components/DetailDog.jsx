import React, { useEffect } from "react";
import { getDogDetail } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import estilos from "./detailDog.module.css"

export default function DetailDog() {
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.dogs);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDogDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <div className={estilos.containerDog}>
        <div key={dog[0].id}>
          <img
            className={estilos.imgContainer}
            src={dog[0].image}
            alt={dog[0].name}
            width="100px"
            height="100px"
          />
          <h3>Nombre: "{dog[0].name}"</h3>
          <h3>Personalidades: "{typeof dog[0].temperament === "string" ? dog[0].temperament : dog[0].temperaments.map(el => el.name + " ")}"</h3>
          <h3>Peso: "{dog[0].weight}"</h3>
          <h3>Esperanza de vida: "{dog[0].life_span}"</h3>
        </div>
      </div>
      <div>
        <Link to="/home">
          <button className={estilos.btn}>Volver al Home</button>
        </Link>
      </div>
      {console.log(dog[0].temperaments)}
    </div>
  );
}
