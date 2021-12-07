import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../actions";
import { Link } from "react-router-dom";
import estilos from "./createDog.module.css";
import { useNavigate } from "react-router";

export default function CreateDog() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const history = useNavigate();

  const [input, setInput] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    lifeSpan: "",
    temperament: [],
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postDog(input));
    alert("Congratulations, your dog was created!!!");
    setInput({
      name: "",
      minHeight: "",
      maxHeight: "",
      minWeight: "",
      maxWeight: "",
      lifeSpan: "",
      temperament: [],
    });
    history.push("/home");
  };
  // para qué me sirve esto en el select???
  const handleTemperament = (e) => {
    setInput({
      ...input,
      temperament: [input.temperament, e.target.value],
    });
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      temperament: input.temperament.filter((t) => t !== e),
    });
  };

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  return (
    <div>
      <div>
        <form className={estilos.form} onSubmit={handleSubmit}>
          <h1>Formulario</h1>
          <input
            type="text"
            name="name"
            placeholder="Nombre del perro"
            className={estilos.control}
            value={input.name}
            onChange={handleInputChange}
          ></input>
          <input
            type="text"
            name="minHeight"
            placeholder="Altura mínima"
            className={estilos.control}
            value={input.minHeight}
            onChange={handleInputChange}
          ></input>
          <input
            type="text"
            name="maxHeight"
            placeholder="Altura máxima"
            className={estilos.control}
            value={input.maxHeight}
            onChange={handleInputChange}
          ></input>
          <input
            type="text"
            name="minWeight"
            placeholder="Peso mínimo"
            className={estilos.control}
            value={input.minWeight}
            onChange={handleInputChange}
          ></input>
          <input
            type="text"
            name="maxWeight"
            placeholder="Peso máximo"
            className={estilos.control}
            value={input.maxWeight}
            onChange={handleInputChange}
          ></input>
          <input
            type="text"
            name="lifeSpan"
            placeholder="Esperanza de vida"
            className={estilos.control}
            value={input.lifeSpan}
            onChange={handleInputChange}
          ></input>
          <select className={estilos.select} onChange={handleTemperament}>
            <option>Elige una o varias personalidades</option>
            {temperaments?.map((t) => {
              return (
                <option value={t.name} key={t.id}>
                  {t.name}
                </option>
              );
            })}
          </select>
          <button type="submit" className={estilos.btnSubmit}>
            Crear
          </button>
        </form>
        <ul>
          <li>
            {input.temperament.map((t) => (
              <div>
                {t}
                <button className="x" key={t.id} onClick={handleDelete(t)}>
                  x
                </button>
              </div>
            ))}
          </li>
        </ul>
      </div>
      <div className={estilos.volver}>
        <Link to="/home">
          <button className={estilos.btn}>Volver al Home</button>
        </Link>
      </div>
    </div>
  );
}
