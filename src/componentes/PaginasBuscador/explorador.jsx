import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Cabecera } from "../cabecera/cabecera";
import React, { useState, useEffect } from 'react';


export const Explorador = () => {
    document.title = "Explorador"

    const [comensales, setComensales] = useState(0);
    const [alimentos, setAlimentos] = useState([]);
    const [tiempo, setTiempo] = useState(0);
    const URIrecetas = "https://recetap.herokuapp.com/recetas/"
    const URIrecetasusuarios = "https://recetap.herokuapp.com/recetasusuarios"
    const [recipes, setRecipes] = useState([]);
    console.log(recipes[1])

    useEffect(() => {
        fetch(URIrecetas)
            .then(response => response.json())
            .then(data => setRecipes(data))
            .catch(error => console.error(error));
    }, []);
    console.log(localStorage.getItem('user'))
    const [busqueda, setBusqueda] = useState('');

    const buscarRecetas = async (e) => {
        e.preventDefault()
        let url = URIrecetas
        if (busqueda) {
            url = `https://recetap.herokuapp.com/recetas/search/${busqueda}`;
        }
        
        try {
          const url = busqueda ? `https://recetap.herokuapp.com/recetas/search/${busqueda}` : URIrecetas;
          if (comensales > 0) {
            url += `?comensales=${comensales}`
        }
        if (tiempo) {
            url += `&tiempo=${tiempo}`
        }
          const response = await fetch(url);
          const recetas = await response.json();
          setRecipes(recetas);
        } catch (error) {
          console.error("Algo falló " + error);
        }
      }
    
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

    const limpiarSeleccion = async (e) => {
        try{
            const busqueda = document.getElementById("busqueda")
            setBusqueda("");
            setTiempo(0)
            setComensales(0)
         
        }catch (error){
            console.error("Fallo al limpiar selección");
        }
      }

      let guardar = recipes.filter(recipe => 
        (comensales == 0 || recipe.comensales == comensales)&&
        ((tiempo === 0 || recipe.tiempo == tiempo)  ||
        (tiempo === 1 && recipe.tiempo < 30) ||
        (tiempo === 2 && recipe.tiempo >= 30 && recipe.tiempo <= 60) ||
        (tiempo === 3 && recipe.tiempo > 60)) )

    const limpiarFiltro = async (e) => {
            
          }

      return (
        <div>
            <Cabecera />
            <h1 className="tituloBuscador">RecetApp</h1>
            <p className="pBuscador ">Descubre todo nuestro recetario</p>
            <form className="busquedaForm" onSubmit={buscarRecetas}>
                <input value={busqueda} className="buscador" title="Buscador" onChange={(e) => setBusqueda(e.target.value)} type="text" placeholder="Busca aqui tu receta..." id="busqueda" name="busqueda"  />
                <button className="btn btn-success btn-sm busquedaReceta" type="submit" title="Buscar">Buscar</button>
                <button onClick={limpiarSeleccion} className="btn btn-outline-dark btn-sm busquedaLimpiar" title="Limpiar">Limpiar</button>
             </form>
             <div className="container-fluid">
            <div>
                <div className="row">
                    <div className="sticky-top col-12 col-sm-12 col-md-2 col-lg-2"> 
                        <div className="card cartaMar centrarTxt"  tabIndex="0" title="Filtrar por Tiempo">
                            <h5 className="card-title">Filtrar por Tiempo</h5>
                            <select className="form-control" value={tiempo} onChange={(e) => setTiempo(parseInt(e.target.value))} title="Desplegable filtro Tiempo">
                                <option value={0}>Todos</option>
                                <option value={1}>Menos de 30 minutos</option>
                                <option value={2}>Entre 30 y 60 minutos</option>
                                <option value={3}>Más de 60 minutos</option>
                            </select>
                        </div>  
                        <div className="card cartaMar centrarTxt" tabIndex="0" title="Filtrar por comensales">
                            <h5 className="card-title" >Filtrar por Comensales</h5>
                            <select className="form-control" value={comensales} onChange={(e) => setComensales(parseInt(e.target.value))} title="Desplegable filtro comensales">
                                    <option value={0}>Todos</option>
                                    <option value={1}>1 comensal</option>
                                    <option value={2}>2 comensales</option>
                                    <option value={3}>3 comensales</option>
                                    <option value={4}>4 comensales</option>
                                    <option value={5}>5+ comensales</option>
                            </select>
                        </div>    
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9">
                        <div className="row">
                        {guardar.length==0 ? (
                                    <p>No hay recetas que cumplan con los criterios de búsqueda.</p>
                                ) : guardar.map(recipe => (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={recipe.id} >
                                    <div className="card centrarTxt cartaRec" tabIndex="0" title={`Receta ${recipe.Tittle}`}>
                                        <img className="card-img-top" title={`Imagen ${recipe.Tittle}`} src={recipe.Image_Name} alt={recipe.Tittle} style={{ objectFit: 'cover', height: '200px' }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{recipe.Tittle}</h5>
                                            <div>
                                                <a href={`./recetaExtendida/${recipe.id}`} className="btn btn-success btnMargen btnMargen1" title="Ver receta" >Ver Receta</a>
                                                <button onClick={guardarReceta.bind(this, recipe.id)} className="btn btn-outline-dark btnMargen1" type="submit" title="Guardar Receta">Guardar Receta</button> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

    )
}