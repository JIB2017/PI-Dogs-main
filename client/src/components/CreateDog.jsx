import React, { useState } from "react";
import { useDispatch } from "react-redux";
import addDog from "../actions"
import { Link } from "react-router-dom";


export default function CreateDog() {
    const [input, setInput] = useState({
        name: "",
        "": ""
        
    })
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch()
    }


    return (
        <div>
            <div>
                <form onSubmit={handleSubmit} >
                    <label>Nombre: </label>
                    <input type="text" name="name" placeholder="Nombre del perro" value={input.name} onChange={handleChange} ></input>
                    <label>Altura mínima: </label>
                    <input type="text" name="min-height" placeholder="Altura mínima" value={""} onChange={handleChange} ></input>
                    <label>Altura máxima: </label>
                    <input type="text" name="max-height" placeholder="Altura máxima" value={""} onChange={handleChange} ></input>
                    <label>Peso mínimo: </label>
                    <input type="text" name="min-weight" placeholder="Peso mínimo" value={""} onChange={handleChange} ></input>
                    <label>Peso máximo: </label>
                    <input type="text" name="max-weight" placeholder="Peso máximo" value={""} onChange={handleChange} ></input>
                    <label>Años de vida: </label>
                    <input type="text" name="life-span" placeholder="Años de vida" value={""} onChange={handleChange} ></input>
                    <button type="submit">Crear</button>
                </form>
            </div>
            <div>
                <Link to="/home">
                <button>Volver al Home</button>
                </Link>
            </div>
        </div>


        
    )
}