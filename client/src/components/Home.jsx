import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDogs,
  getTemperaments,
  filterByTemperament,
  filterByOrder,
  filterByWeight,
} from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import estilos from "./home.module.css"

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemps = useSelector((state) => state.temperaments);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("");
  const lastIndex = page * 8;
  const firstIndex = lastIndex - 8;
  const pages = allDogs.slice(firstIndex, lastIndex);
  // const [order, setOrder] = useState("ASC");
  // const [filtro, setFiltro] = useState("");

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);
  // Volver a mostrar todos los perros
  const handleClickDogs = (e) => {
    e.preventDefault();
    dispatch(getDogs());
    setPage(1);
  };
  // Filtrar por temperamento
  const handleFiltered = (e) => {
    dispatch(filterByTemperament(e.target.value));
  };
  // Ordenarlos alfabéticamente
  const handleOrder = (e) => {
    e.preventDefault();
    dispatch(filterByOrder(e.target.value));
    // setPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  };
  // Ordenarlos por peso
  const handleWeight = (e) => {
    e.preventDefault()
    dispatch(filterByWeight(e.target.value))
  }
  const paged = (nro) => {
    setPage(nro);
  };

  return (
    <div className="total-amount">
      <div>
        <SearchBar />
      </div>
      <Link to="/dog">
        <button className={estilos.btncreate}>Crear perro</button>
      </Link>
      <h1>Dog World</h1>
      <div className="general">
        <button className={estilos.btn} onClick={handleClickDogs}>Refresh</button>
      </div>
      <div>
        <select className={estilos.control} onChange={handleFiltered}>
          <option value="Todos">Todos</option>
          {allTemps.map((t) => {
            return (
              <option value={t.name} key={t.id}>
                {t.name}
              </option>
            );
          })}
        </select>
        <select className={estilos.control} onChange={handleOrder}>
          <option value="Nada">Ordenar alfabéticamente</option>
          <option value="A-Z">Ascendente</option>
          <option value="Z-A">Descendente</option>
        </select>
        <select className={estilos.control} onChange={handleWeight}>
          <option value="">Odernar por peso</option>
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
