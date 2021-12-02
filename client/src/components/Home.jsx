import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const [page, setPage] = useState(1);
  const lastIndex = page * 8;
  const firstIndex = lastIndex - 8;
  const pages = allDogs.slice(firstIndex, lastIndex);
  // const [order, setOrder] = useState("ASC");
  // const [filtro, setFiltro] = useState("");

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getDogs());
  };

  const paged = (nro) => {
    setPage(nro);
  };

  return (
    <div className="total-amount">
      <h1>Dog World</h1>
      <div className="busqueda">
        buen dato crack
        <input type="text" name="busqueda" />
      </div>
      <div className="button">
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
          <option value="ASC">Ascendente</option>
          <option value="DESC">Descendente</option>
        </select>
        <select>
          <option value="order">Orden alfabético</option>
          <option value="weight">Peso</option>
        </select>
        <h2>Lista de perros</h2>
        {<Paginado allDogs={allDogs.length} paged={paged} page={page} />}
        {pages?.map((dog) => {
          return (
            <div>
              <Card
                id={dog.id}
                image={dog.image}
                name={dog.name}
                temperament={dog.temperament}
                weight={dog.weight}
                key={dog.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
