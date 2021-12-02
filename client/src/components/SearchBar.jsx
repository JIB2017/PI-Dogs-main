import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogName } from "../actions";

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
      <input
        type="text"
        placeholder="Ingresa una raza"
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}
