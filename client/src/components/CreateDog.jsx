import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../actions"
import { Link } from "react-router-dom";


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
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <label>Nombre: </label>
                    <input type="text" name="name" placeholder="Nombre del perro" value={input.name} onChange={(e) => handleChange(e)} ></input>
                    <label>Altura mínima: </label>
                    <input type="text" name="min-height" placeholder="Altura mínima" value={input.minHeight} onChange={(e) => handleChange(e)} ></input>
                    <label>Altura máxima: </label>
                    <input type="text" name="max-height" placeholder="Altura máxima" value={input.maxHeight} onChange={(e) => handleChange(e)} ></input>
                    <label>Peso mínimo: </label>
                    <input type="text" name="min-weight" placeholder="Peso mínimo" value={input.minWeight} onChange={handleChange} ></input>
                    <label>Peso máximo: </label>
                    <input type="text" name="max-weight" placeholder="Peso máximo" value={input.maxWeight} onChange={handleChange} ></input>
                    <label>Años de vida: </label>
                    <input type="text" name="lifespan" placeholder="Años de vida" value={input.lifeSpan} onChange={handleChange} ></input>
                    <label>Temperamentos: </label>
                    <select>
                        {temperaments?.map((t) => {
                            return (
                                <option value={t.name} onChange={handleInputSelect} key={t.id}>{t.name}</option>
                            )
                        })}
                    </select>
                    <div>
                        <ul>
                            <li>
                                {input.temperament.map(t => t + " , ")}
                            </li>
                        </ul>
                    </div>
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