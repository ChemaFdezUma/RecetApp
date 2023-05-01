import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Cabecera } from "../cabecera/cabecera";

export const CrearReceta = () => {

    const URIInstrucciones="https://recetap.herokuapp.com/instrucciones/"
    const URIrecetas = "https://recetap.herokuapp.com/recetas/"
    const URIingredientes = "https://recetap.herokuapp.com/ingredientes/"

    const navigate = useNavigate();
    
    const crearReceta = async(e)=>{
        e.preventDefault()
        const responseIngredientes = await axios.post(URIingredientes, {
            ingredientes: e.target.ingredientes.value
        })

        // Guarda el ID de los ingredientes en la variable idIngredientes
        const idIngredientes = responseIngredientes.data.message.pasar.id

        // Envía la solicitud HTTP para crear las instrucciones
        const responseInstrucciones = await axios.post(URIInstrucciones, {
            instruccion: e.target.instrucciones.value
        })

        // Guarda el ID de las instrucciones en la variable idInstrucciones
        const idInstrucciones = responseInstrucciones.data.message.pasar.id

        const ver =await axios.post(URIrecetas, {
            Tittle: e.target.nombre.value,
            Ingredients_id: idIngredientes,
            Instructions_id: idInstrucciones,
            Image_Name: e.target.foto.value,
            comensales: e.target.nComensales.value,
            tiempo: e.target.tiempo.value
        })
        navigate("/explorador");
    }
    const volver = ()=> {
        console.log("cerrar sesion")
        navigate(`/areaPersonal/${localStorage.getItem('user')}`);
    }

    return (
        <div>
        <Cabecera/>
        <h1 className="tituloBuscador">Crear Receta</h1>
        <form onSubmit={crearReceta}>
        <div className="container margenCR bordePrueba centrarTxt margenG">
                <div className="margenD">
                Nombre:<input type="text" name="nombre" required className="inputFondo col-2 margenG margenB" placeholder="Titulo de receta" title="Titulo de la receta"/>
                Ingredientes: <input type="text" name="ingredientes" required className="inputFondo col-2 margenG margenB" placeholder="Ingrediente1;Ingrediente2" title="Ingredientes separados por punto y coma"/>
                Instrucciones: <input type="text" name="instrucciones" required className="inputFondo margenG margenB" placeholder="Paso1;Paso2;" title="Pasos separados por punto y coma"/> <br/>
                </div>
                <div className="margenD2">
                Tiempo de cocina: <input type="number" name="tiempo" required className="inputFondo margenG" placeholder="Tiempo en minutos" title="Tiempo en minutos"/>
                Nº de comensales: <input type="number" name="nComensales" required className="inputFondo margenG"placeholder="Numero comensales" title="Numero de comensales"/>
                Enlace de la foto: <input type="text" name="foto" className="inputFondo margenG" placeholder="Vinculo imagen https//..."title="Link de la imagen"/><br/>
                </div>
                </div>
                <div className="centrarTxt">
                <button type="submit" className="btn btn-success btn-lg centrarTxt" title="Crear tu receta">Crear Receta</button>
                </div>
            </form>  
         </div>  
        
    )
}