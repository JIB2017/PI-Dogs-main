import React, { useEffect } from "react";
import { getDogDetail } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function DetailDog() {
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.dogs);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDogDetail(id));
  }, [dispatch]);

  return (
    <div>
      <div className="grid-container">
        <div key={dog[0].id}>
          <img
            className="img-container"
            src={dog[0].image}
            alt="una imágen"
            width="100px"
            height="100px"
          />
          <h3>Nombre: "{dog[0].name}"</h3>
          <h3>Personalidades: "{dog[0].temperament}"</h3>
          <h3>Peso: "{dog[0].weight}"</h3>
        </div>
      </div>
      <div>
        <Link to="/home">
          <button>Volver al Home</button>
        </Link>
      </div>
    </div>
  );
}
