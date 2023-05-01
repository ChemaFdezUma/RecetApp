import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Cabecera } from "../cabecera/cabecera";
import React, { useState, useEffect } from 'react';


export const RecetasExpandidas = () => {
   

    const { idReceta } = useParams()
    const URIreceta = "https://recetap.herokuapp.com/recetas/"
    const URIinstrucciones = "https://recetap.herokuapp.com/instrucciones/"
    const URIingredientes = "https://recetap.herokuapp.com/ingredientes/"

    const [receta, setReceta] = useState({})
    const [instrucciones, setInstrucciones] = useState("")
    const [ingredientes, setIngredientes] = useState("")
    useEffect(() => {
        getRecetaByID()
    }, [])

    const getRecetaByID = async () => {
        const res = await axios.get(URIreceta + idReceta)
        setReceta(res.data)
        const resIngredientes = await axios.get(URIingredientes + res.data.Ingredients_id)
        setIngredientes(resIngredientes.data.ingredientes)
        const resInstrucciones = await axios.get(URIinstrucciones + res.data.Instructions_id)
        setInstrucciones(resInstrucciones.data.instruccion)
    }
    console.log(receta)
    
    const URIrecetasusuarios = "http://localhost:8000/recetasusuarios"
    const guardarReceta = async (id, e) => {
        e.preventDefault()
        try{
            const idReceta=id;
            const idUsuario=localStorage.getItem('user');
            const receta = await axios.get(`${URIrecetasusuarios}/idReceta/${idReceta}/idUsuario/${idUsuario}`);

            
            if (receta.data==null) {
                console.log("a")
                const result = axios.post(URIrecetasusuarios,{
                    idReceta: id,
                    idUsuario:localStorage.getItem('user')
                })
                alert("Receta guardada con éxito.");
            }else{
                alert("La receta ya está guardada");
            }
        }catch (error){
            console.error("Algo falló " + error);
            alert("Error al guardar receta");
        }
    }

    document.title =`Receta completa de ${receta.Tittle}`
    

    return (
        <div>
            <Cabecera />

            <div className='container '>
            <h1 className="tituloBuscador">Detalles de la receta</h1>
                <div className='container cartaMar'>
                    <div className="card mb-3" >
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={receta.Image_Name} className="img-fluid rounded-start" alt="..."/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{receta.Tittle}</h5>
                                    <p className="card-text">{instrucciones}</p>
                                    <p className="card-text">{ingredientes}</p>
                                    <p><small>Numero de comensales: {receta.comensales}</small></p>
                                    <p><small>Tiempo estimado: {receta.tiempo} minutos</small></p>
                                </div> 
                            </div>
                            <button onClick={guardarReceta.bind(this, receta.id)} className="btn btn-success" type="submit">Guardar</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>


    )
}