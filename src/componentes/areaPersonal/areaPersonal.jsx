import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Cabecera } from "../cabecera/cabecera";
import React, { useState, useEffect } from 'react';

export const AreaPersonal = () => {
    
    const { idUsuario } = useParams()
    const URIrecetas = "https://recetap.herokuapp.com/recetas/"
    const URIrecetasUsuario="https://recetap.herokuapp.com/recetasusuarios/"
    const URIUsuario="https://recetap.herokuapp.com/usuarios/"
    const [recipes, setRecipes] = useState([]);
    const [recetasU, setRecetasU]= useState([])
    const [usuario,setUsuario] = useState({})
    const navigate = useNavigate();
    useEffect(() => {
        getRecetaByID()
        getHorario()
    }, [])

    const [horario,setHorario]=useState({
                d1: "122",
                a1: "122",
                c1: "122",
                d2: "122",
                a2: "122",
                c2: "122",
                d3: "122",
                a3: "122",
                c3: "122",
                d4: "122",
                a4: "122",
                c4: "122",
                d5: "122",
                a5: "122",
                c5: "122",
                d6: "122",
                a6: "122",
                c6: "122",
                d7: "122",
                a7: "122",
                c7: "122"

    })

    async function getHorario(){

        try {
            const user= await axios.get(URIUsuario+idUsuario);
            const horarioUser=user.data.horario;
            const hor=await axios.get(URIhorario+horarioUser);
            setHorario(hor.data)
            
        } catch (error) {
            console.log(error)
        }
    }
       
    const getRecetaByID = async () => {
        try {
            
            const res = await axios.get(URIrecetasUsuario + idUsuario);
            setRecetasU(res.data);
    
            const promises = res.data.map(async (id) => {
                const res2 = await axios.get(URIrecetas + id.idReceta);
                return res2.data;
            });
    
            const recipesData = await Promise.all(promises);
            setRecipes(recipesData);
        } catch (error) {
            console.error(error);
        }
        const res3 = await axios.get(URIUsuario + idUsuario)
        setUsuario(res3.data)
    };


    const URIhorario="https://recetap.herokuapp.com/horario/"

    const crearHorario = async(e)=>{
        e.preventDefault()
        //Get para ver si horario esta en la bdd
        const user=await axios.get(URIUsuario+idUsuario);
        console.log(user)
        const horarioUser=user.data.horario;
        console.log(horarioUser)
        //const horarioUser=user.data
        //guardar en fkUsuario

        if(horarioUser==null || horarioUser==""){
            const ver= await axios.post(URIhorario, {
                d1: e.target.d1.value,
                a1: e.target.a1.value,
                c1: e.target.c1.value,
                d2: e.target.d2.value,
                a2: e.target.a2.value,
                c2: e.target.c2.value,
                d3: e.target.d3.value,
                a3: e.target.a3.value,
                c3: e.target.c3.value,
                d4: e.target.d4.value,
                a4: e.target.a4.value,
                c4: e.target.c4.value,
                d5: e.target.d5.value,
                a5: e.target.a5.value,
                c5: e.target.c5.value,
                d6: e.target.d6.value,
                a6: e.target.a6.value,
                c6: e.target.c6.value,
                d7: e.target.d7.value,
                a7: e.target.a7.value,
                c7: e.target.c7.value
            })
                
                const idH= ver.data.message.pasar.idhorario;
                
            await axios.put(URIUsuario+idUsuario,{
                //nombre: user.data.name,
                //correo: user.data.correo,
               // contrasena: user.data.contrasena,
                horario:idH
            })
            console.log(ver)
        }else{
            const ver= await axios.put((URIhorario+horarioUser), {
                d1: e.target.d1.value,
                a1: e.target.a1.value,
                c1: e.target.c1.value,
                d2: e.target.d2.value,
                a2: e.target.a2.value,
                c2: e.target.c2.value,
                d3: e.target.d3.value,
                a3: e.target.a3.value,
                c3: e.target.c3.value,
                d4: e.target.d4.value,
                a4: e.target.a4.value,
                c4: e.target.c4.value,
                d5: e.target.d5.value,
                a5: e.target.a5.value,
                c5: e.target.c5.value,
                d6: e.target.d6.value,
                a6: e.target.a6.value,
                c6: e.target.c6.value,
                d7: e.target.d7.value,
                a7: e.target.a7.value,
                c7: e.target.c7.value
            })
            console.log(ver)
        }
        alert("Tu horario se ha actualizado")
        window.location.reload();

    }

    const URIrecetasusuarios = "https://recetap.herokuapp.com/recetasusuarios"
    const borrarReceta = async (id, e) => {
        e.preventDefault()
        try{
            const idReceta=id;
            const idUsuario=localStorage.getItem('user');
           const r= await axios.delete(`${URIrecetasusuarios}/usuario/${idUsuario}/receta/${idReceta}`);
           console.log(r);
            alert("Receta elimanada con éxito.");
            window.location.reload();
        }catch (error){
            console.error("Algo falló " + error);
            alert("Error al eliminar receta");
        }
    }


    return (
        <div>
            <Cabecera />
            <div className='parteDeArriba'>
                        <h1 className='medioUsuarios tituloBuscador margenTxt' title="Bienvenido">Bienvenido {usuario.nombre}</h1>
                        <h3 className='h3Usuarios centrarTxt margentB' title="Estas son tus recetas guardadas">Estas son tus recetas guardadas</h3>
                        </div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 mb-4">
                        <div className="row">
                        
                        {recipes.map(recipe => (
                                <div className="col-sm-3" key={recipe.id}>
                                    <div className="card centrarTxt cartaRec"  tabIndex="0" title={`Receta ${recipe.Tittle}`} >
                                        <img className="card-img-top" title={`Imagen ${recipe.Tittle}`} src={recipe.Image_Name} style={{ objectFit: 'cover', height: '200px' }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{recipe.Tittle} </h5>
                                            <div>
                                                <a href={`/recetaExtendida/${recipe.id}`} className="btn btn-success btnMargen btnMargen1" title="Ver Receta">Ver Receta</a>
                                                <button onClick={borrarReceta.bind(this, recipe.id)} className="btn btn-outline-dark btnMargen1" type="submit" title="Borrar">Borrar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='container'>
            <h2 className='h3Usuarios centrarTxt' title="¡Planifica tu semana con tus recetas guardadas!">¡Planifica tu semana con tus recetas guardadas!</h2>
            <div className="horarioSemanal margenTxt">
                <form name="horario" onSubmit={crearHorario}>
                    <table className="table table-bordered" >
                        <tr>
                            <th></th>
                            <th title="Desayuno">DESAYUNO</th>
                            <th title="Almuerzo">ALMUERZO</th>
                            <th title="Cena">CENA</th>
                        </tr>
                        <tr>
                            <th title="Lunes">LUNES</th>
                            <td>
                                
                                <select name="d1">
                                    {console.log(horario)}
                                        <option value={""}>{"----"}</option>
                                    {recipes.map(recipe => (
                                        (recipe.id==horario.d1)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )                               
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select name="a1">
                                    <option value={""}>{"----"}</option>
                                    {recipes.map(recipe => (
                                        (recipe.id==horario.a1)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select name="c1">
                                    <option value={""}>{"----"}</option>
                                    {recipes.map(recipe => (
                                        (recipe.id==horario.c1)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                        <th title="Martes">MARTES</th>
                        <td>
                            <select name="d2">
                                <option value={""}>{"----"}</option>
                               {recipes.map(recipe => (
                                    (recipe.id==horario.d2)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                ))}
                            </select>
                         </td>
                         <td>
                            <select name="a2">
                                <option value={""}>{"----"}</option>
                                {recipes.map(recipe => (
                                    (recipe.id==horario.a2)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                 ))}
                            </select>
                         </td>
                         <td>
                            <select name="c2">
                            <option value={""}>{"----"}</option>
                                {recipes.map(recipe => (
                                    (recipe.id==horario.c2)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                        <th title="Miercoles">MIERCOLES</th>
                        <td>
                                <select name="d3">
                                <option value={""}>{"----"}</option>
                                    {recipes.map(recipe => (
                                        (recipe.id==horario.d3)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select name="a3">
                                <option value={""}>{"----"}</option>
                                    {recipes.map(recipe => (
                                        (recipe.id==horario.a3)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select name="c3">
                                <option value={""}>{"----"}</option>
                                    {recipes.map(recipe => (
                                        (recipe.id==horario.c3)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                        <th title="Jueves">JUEVES</th>
                        <td>
                                <select name="d4">
                                <option value={""}>{"----"}</option>
                                    {recipes.map(recipe => (
                                        (recipe.id==horario.d4)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select name="a4">
                                <option value={""}>{"----"}</option>
                                    {recipes.map(recipe => (
                                        (recipe.id==horario.a4)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select name="c4">
                                <option value={""}>{"----"}</option>
                                    {recipes.map(recipe => (
                                        (recipe.id==horario.c4)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                        <th title="Viernes">VIERNES</th>
                        <td>
                                <select name="d5">
                                <option value={""}>{"----"}</option>
                                    {recipes.map(recipe => (
                                        (recipe.id==horario.d5)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select name="a5">
                                <option value={""}>{"----"}</option>
                                    {recipes.map(recipe => (
                                        (recipe.id==horario.a5)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select name="c5">
                                <option value={""}>{"----"}</option>
                                    {recipes.map(recipe => (
                                        (recipe.id==horario.c5)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                        <th title="Sabado">SABADO</th>
                        <td>
                                <select name="d6">
                                <option value={""}>{"----"}</option>
                                    {recipes.map(recipe => (
                                        (recipe.id==horario.d6)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select name="a6">
                                <option value={""}>{"----"}</option>
                                    {recipes.map(recipe => (
                                        (recipe.id==horario.a6)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select name="c6">
                                <option value={""}>{"----"}</option>
                                    {recipes.map(recipe => (
                                        (recipe.id==horario.c6)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                        <th title="Domingo">DOMINGO</th>
                        <td>
                                <select name="d7">
                                <option value={""}>{"----"}</option>
                                    {recipes.map(recipe => (
                                        (recipe.id==horario.d7)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select name="a7">
                                <option value={""}>{"----"}</option>
                                    {recipes.map(recipe => (
                                        (recipe.id==horario.a7)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select name="c7">
                                <option value={""}>{"----"}</option>
                                    {recipes.map(recipe => (
                                        (recipe.id==horario.c7)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                    ))}
                                </select>
                            </td>
                        </tr>
                    </table>
                    <div className='centrarTxt'>
                    <button type="submit" className='btn btn-success btn-lg margenBoton' title="Crear horario">Crear horario</button>
                    </div>
                </form>
            </div>
            </div>


        </div>

        
    )
}
