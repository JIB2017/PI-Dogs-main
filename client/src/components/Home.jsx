import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, filterByTemperament } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemps = useSelector((state) => state.temperaments)
  const [page, setPage] = useState(1);
  const lastIndex = page * 8;
  const firstIndex = lastIndex - 8;
  const pages = allDogs.slice(firstIndex, lastIndex);
  // const [order, setOrder] = useState("ASC");
  // const [filtro, setFiltro] = useState("");

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  const handleClickDogs = (e) => {
    e.preventDefault();
    dispatch(getDogs());
  };

  const handleFiltered = (e) => {
    dispatch(filterByTemperament(e.target.value))
    console.log(e.target.value)
  }

  const paged = (nro) => {
    setPage(nro);
  };

  return (
    <div className="total-amount">
      <h1>Dog World</h1>
      <Link to="/dog">
        <button>Crear perro</button>
      </Link>
      <div>
        <SearchBar />
      </div>
      <div>
        <button
          onClick={handleClickDogs}
        >
          Mostrar todos los perros
        </button>
      </div>
      <div>
        <select onChange={(e) => handleFiltered(e)}>
          <option value="Todos" >Todos</option>
          {allTemps.map((t) => {
            return (
              <option value={t.name} key={t.id} >{t.name}</option>
            )
          })}
        </select>
        <select>
          <option value="order">Ordear alfabéticamente</option>
          <option value="weight">Ordenar por peso</option>
        </select>
        <select>
          <option value="">Elegir orden</option>
          <option value="ASC">Ascendente</option>
          <option value="DESC">Descendente</option>
        </select>
        <h2>Lista de perros</h2>
        {<Paginado allDogs={allDogs.length} paged={paged} page={page} />}
        {pages?.map((dog) => {
          return (
            <div key={dog.id}>
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
