import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogName } from "../actions";
import estilos from "./searchBar.module.css"

export default function SearchBar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogName(input));
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Ingresa una raza"
          className={estilos.searchBar}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <div>
        <button
          type="submit"
          className={estilos.buttonSearch}
          onClick={(e) => handleSubmit(e)}
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
