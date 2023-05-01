import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";



export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const uriUsuarios = "https://recetap.herokuapp.com/usuarios/"

    const handleSubmit = async (e) => {
        e.preventDefault();
        const respuesta = await axios.post(uriUsuarios,{
            nombre: name,
            correo: email,
            contrasena: pass,
            horario:null    
        })
        if(respuesta.data.message == "Validation error"){
            window.alert("YA existe un usuario con este  correo")
        }else{
            window.alert("Usuario registrado!")
            window.location.reload()
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Registro</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Usuario</label>
            <input value={name} className="labelAndInputLoginRegister" required name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Usuario" />
            <label htmlFor="email" className="labelAndInputLoginRegister">Correo</label>
            <input value={email} className="labelAndInputLoginRegister" required onChange={(e) => setEmail(e.target.value)}type="email" placeholder="tucorreo@gmail.com" id="email" name="email" />
            <label htmlFor="password" className="labelAndInputLoginRegister">Contraseña</label>
            <input value={pass} className= "labelAndInputLoginRegister"required onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button className="b1" type="submit">Registrate</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>¿Ya tienes una cuenta? Inicia sesión aquí.</button>
    </div>
    )
}