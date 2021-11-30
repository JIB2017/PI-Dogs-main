import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs } from "../actions";
import Card from "./Card";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getDogs);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getDogs());
  };

  return (
      <div>
          <div>
              <h1>Dog World</h1>
              <input type='text'>Buscar raza</input>
              <button onClick={(e) => {handleSubmit(e)}} >Mostrar todos los perros</button>
          </div>
        <div>
        <select>
            <option value="">Temperamentos</option>
            <option value="">Razas</option>
        </select>
        <select>
            <option value="">Orden alfabético</option>
            <option value="">Peso</option>
        </select>
        {allDogs?.map((dog) => {
            return (
            <div>
                <Link to="/dogs/">
                <Card image={} name={} temperament={} weight={} />
                </Link>
            </div>
            );
        })}
        </div>
    </div>
  );
}
