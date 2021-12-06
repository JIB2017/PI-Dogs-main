import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../actions"
import { Link } from "react-router-dom";
import estilos from "./createDog.module.css"


export default function CreateDog() {
    const dispatch = useDispatch()
    const temperaments = useSelector((state) => state.temperaments)
    
    const [input, setInput] = useState({
        name: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        lifeSpan: "",
        temperament: [],
    })
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postDog(input))
        alert('Congratulations, your dog was created!!!')
        setInput({
            name: "",
            minHeight: "",
            maxHeight: "",
            minWeight: "",
            maxWeight: "",
            lifeSpan: "",
            temperament: [],
        })
        
    }
    // para qué me sirve esto en el select???
    const handleInputSelect = (e) => {
        setInput({
            ...input,
            temperament: [input.temperament, e.target.value]
        })
    }
    
    useEffect(() => {
        dispatch(getTemperaments())
    }, [])
    
    return (
        <div>
            <div>
                <form className={estilos.form} onSubmit={handleSubmit}>
                    <h1>Formulario</h1>
                    <input type="text" name="name" placeholder="Nombre del perro" className={estilos.control} value={input.name} onChange={handleChange} ></input>
                    <input type="text" name="min-height" placeholder="Altura mínima" className={estilos.control} value={input.minHeight} onChange={handleChange} ></input>
                    <input type="text" name="max-height" placeholder="Altura máxima" className={estilos.control} value={input.maxHeight} onChange={handleChange} ></input>
                    <input type="text" name="min-weight" placeholder="Peso mínimo" className={estilos.control} value={input.minWeight} onChange={handleChange} ></input>
                    <input type="text" name="max-weight" placeholder="Peso máximo" className={estilos.control} value={input.maxWeight} onChange={handleChange} ></input>
                    <input type="text" name="lifespan" placeholder="Años de vida" className={estilos.control} value={input.lifeSpan} onChange={handleChange} ></input>
                    <select className={estilos.select} onChange={handleInputSelect}>
                        <option>Elige una o varias personalidades</option>
                        {temperaments?.map((t) => {
                            return (
                                <option value={t.name} key={t.id}>{t.name}</option>
                            )
                        })}
                    </select>
                    <button type="submit" className={estilos.btnSubmit}>Crear</button>
                </form>
                <p>
                    <ul>
                        <li>{input.temperament.map(t => t + " ")}</li>
                    </ul>
                </p>
            </div>
            <div>
                <Link to="/home">
                <button className={estilos.btn}>Volver al Home</button>
                </Link>
            </div>
        </div>
    )
}