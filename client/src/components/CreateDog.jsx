import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../actions";
import { Link } from "react-router-dom";
import estilos from "./createDog.module.css";
import { useNavigate } from "react-router";

function validate(input) {
  let errors = {};
  // NAME
  if (!input.name || !/^[A-Za-z0-9\s]+$/g.test(input.name)) {
    errors.name = "Solo se permiten valores alfanuméricos";
  }
  // HEIGHT
  if (input.minHeight >= input.maxHeight) {
    errors.minHeight =
      "La altura mínima no puede ser mayor o igual a la altura máxima";
  }
  if (!input.minHeight || !/^[1-9]\d*(\.\d+)?$/.test(input.minHeight)) {
    errors.minHeight = "Solo se permiten valores numéricos";
  }
  if (!input.maxHeight || !/^[1-9]\d*(\.\d+)?$/.test(input.maxHeight)) {
    errors.maxHeight = "Solo se permiten valores numéricos";
  }
  // WEIGHT
  if (input.minWeight >= input.maxWeight) {
    errors.minWeight =
      "El peso mínimo no puede ser mayor o igual al peso máximo";
  }
  if (!input.minWeight || !/^[1-9]\d*(\.\d+)?$/.test(input.minWeight)) {
    errors.minWeight = "Solo se permiten valores numéricos";
  }
  if (!input.maxWeight || !/^[1-9]\d*(\.\d+)?$/.test(input.maxWeight)) {
    errors.maxWeight = "Solo se permiten valores numéricos";
  }
  // ESPERANZA DE VIDA
  if (!input.lifeSpan || !/^[1-9]\d*(\.\d+)?$/.test(input.lifeSpan)) {
    errors.lifeSpan = "Solo se permiten valores numéricos";
  }
  // IMÁGEN
  if (
    !input.image ||
    !/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g.test(
      input.image
    )
  ) {
    errors.image = "Tiene que ser una Url válida";
  }
  // PERSONALIDADES
  if (input.temperament.length <= 2) {
    errors.temperament = "Se necesitan al menos tres(3) personalidades";
  }

  return errors;
}

export default function CreateDog() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    lifeSpan: "",
    image: "",
    temperament: [],
  });

  const [error, setError] = useState({});

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    // console.log(input.temperament.join(', '))
    // console.log(Object.keys(error).length);
    // console.log(input);
  };

  const correccion = (input) => {
    let height = `${input.minHeight} - ${input.maxHeight}`;
    let weight = `${input.minWeight} - ${input.maxWeight}`;
    let complete = {
      name: input.name,
      height: height,
      weight: weight,
      life_span: input.lifeSpan,
      image: input.image,
      temperament: input.temperament.join(", "),
    };

    return complete;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // verifico que todo esté en orden
    if (
      input.name !== "" &&
      input.minHeight !== "" &&
      input.maxHeight !== "" &&
      input.minWeight !== "" &&
      input.maxWeight !== "" &&
      input.lifeSpan !== "" &&
      input.image !== "" &&
      input.temperament.length !== 0 &&
      Object.keys(error).length === 0
    ) {
      // en caso positivo prosigo
      let dogi = correccion(input);
      dispatch(postDog(dogi));
      setInput({
        name: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        lifeSpan: "",
        image: "",
        temperament: [],
      });
      alert("Felicidades, tu perro ha sido creado!!!");
      navigate("/home");
      // en caso negativo detengo al usuario
    } else {
      alert("No pueden quedar campos vacíos en el formulario");
    }
  };

  const handleTemperament = (e) => {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
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
  }, [dispatch]);

  return (
    <div>
      <div>
        <form className={estilos.form} onSubmit={handleSubmit}>
          <h1>Formulario</h1>
          {error.name && <p>{error.name}</p>}
          <input
            type="text"
            name="name"
            placeholder="Nombre del perro"
            className={estilos.control}
            value={input.name}
            onChange={handleInputChange}
          ></input>
          {error.minHeight && <p>{error.minHeight}</p>}
          <input
            type="text"
            name="minHeight"
            placeholder="Altura mínima"
            className={estilos.control}
            value={input.minHeight}
            onChange={handleInputChange}
          ></input>
          {error.maxHeight && <p>{error.maxHeight}</p>}
          <input
            type="text"
            name="maxHeight"
            placeholder="Altura máxima"
            className={estilos.control}
            value={input.maxHeight}
            onChange={handleInputChange}
          ></input>
          {error.minWeight && <p>{error.minWeight}</p>}
          <input
            type="text"
            name="minWeight"
            placeholder="Peso mínimo"
            className={estilos.control}
            value={input.minWeight}
            onChange={handleInputChange}
          ></input>
          {error.maxWeight && <p>{error.maxWeight}</p>}
          <input
            type="text"
            name="maxWeight"
            placeholder="Peso máximo"
            className={estilos.control}
            value={input.maxWeight}
            onChange={handleInputChange}
          ></input>
          {error.lifeSpan && <p>{error.lifeSpan}</p>}
          <input
            type="text"
            name="lifeSpan"
            placeholder="Esperanza de vida"
            className={estilos.control}
            value={input.lifeSpan}
            onChange={handleInputChange}
          ></input>
          {error.image && <p>{error.image}</p>}
          <input
            type="text"
            name="image"
            placeholder="Url de la imágen"
            className={estilos.control}
            value={input.image}
            onChange={handleInputChange}
          ></input>
          {/* LISTA SELECT DE TEMPERAMENTOS */}
          {error.temperament && <p>{error.temperament}</p>}
          <select className={estilos.select} onChange={handleTemperament}>
            <option value="elegir">Elige tres(3) o mas personalidades</option>
            {temperaments?.map((t) => (
              <option value={t.name} key={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          {/* MAPEO LOS TEMPERAMENTOS SELECCIONADOS CON SUS RESPECTIVOS BOTONES */}
          {input.temperament.map((t) => (
            <div key={t.id}>
              <button
                type="button"
                className={estilos.delete}
                onClick={() => handleDelete(t)}
              >
                X
              </button>
              <ul>
                <li>
                  <p className={estilos.p}>{t}</p>
                </li>
              </ul>
            </div>
          ))}
          {/* BOTÓN DE SUBMIT */}
          <button type="submit" className={estilos.btnSubmit}>
            Crear
          </button>
        </form>
      </div>
      {/* BOTÓN PARA VOLVER AL HOME */}
      <div>
        <Link to="/home">
          <button className={estilos.btn}>Volver al Home</button>
        </Link>
      </div>
    </div>
  );
}
