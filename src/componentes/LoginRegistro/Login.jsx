import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const uriUsuarios = "https://recetap.herokuapp.com/usuarios/"
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pass);
        const usuario = await axios.get(`${uriUsuarios}/email/${email}/contrasena/${pass}`);
        console.log(typeof usuario.data);
        if((typeof usuario.data) == "number"){
            console.log("OK")
            localStorage.setItem('user', JSON.stringify(usuario.data));
            navigate("./explorador")
        }else{
            window.alert("No se han insertado datos correctos")
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Inicio de Sesion</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email" className="labelAndInputLoginRegister">Correo</label>
                <input value={email} className="labelAndInputLoginRegister" onChange={(e) => setEmail(e.target.value)}type="email" placeholder="tucorreo@mail.com" id="email" name="email" required />
                <label htmlFor="password" className="labelAndInputLoginRegister">Contraseña</label>
                <input value={pass}  className="labelAndInputLoginRegister" onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"  required/>
                <button className="b1" type="submit">Iniciar Sesion</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>¿No tienes cuenta todavía? Regístrate aquí.</button>
        </div>
    )
}