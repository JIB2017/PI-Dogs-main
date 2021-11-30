import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs } from "../actions";
import Card from "./Card";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getDogs());
  };

  return (
    <div>
      <div>
        <h1>Dog World</h1>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Mostrar todos los perros
        </button>
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
            <fragment>
              <Link to={"/dogs/" + dog.id}>
                <Card
                  image={dog.image}
                  name={dog.name}
                  temperament={dog.temperament}
                  weight={dog.weight}
                  key={dog.id}
                />
              </Link>
            </fragment>
          );
        })}
      </div>
    </div>
  );
}
