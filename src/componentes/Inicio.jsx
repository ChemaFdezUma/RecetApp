import logo from './logo.png';
import dA from './imagenesInicio/derechaAbajo.png';
import dM from './imagenesInicio/derechaArriba.png';
import iA from './imagenesInicio/izqArriba.png';
import iG from './imagenesInicio/izqAbajo.png';
import iM from './imagenesInicio/izqMedio.png';
import Titulo from './RecetAppLetra.svg';
import fL from './fotoLogin.png'
import flecha from './flecha.png'

import { useLayoutEffect } from 'react';
import { useState } from 'react';
import { Login } from "./LoginRegistro/Login";
import { Register } from "./LoginRegistro/Register";
import './App.css';
import { gsap } from 'gsap';
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";


<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>

function Inicio() {

    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    // typically it's best to useLayoutEffect() instead of useEffect() to have React render the initial state properly from the very start.
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".izqMedio", { x: -200, duration: 1 });
            gsap.from(".izqArriba", { y: -200, duration: 1, delay: 0.1 });
            gsap.from(".izqGrande", { x: -300, duration: 1, delay: 0.2 });

            gsap.from(".derechaAbajo", { y: 300, duration: 1 });
            gsap.from(".derechaMedio", { x: 300, duration: 1, delay: 0.4 });

            gsap.from(".fotoLogin", { x: -600, y: 600, duration: 1, delay: 3 });
        });
        return () => ctx.revert(); // <- cleanup!
    }, []);

    document.title = "RecetApp";
    return (


        <div className="App">

            <ScrollContainer>
                <ScrollPage className='bgInicio'>
                    <Animator animation={batch(Fade(0, 1), MoveOut(0, 100))}>
                        <div className='pagina'>
                        <div className='Center'>
                            <img src={logo} className="App-logo" alt="logo" />
                            <img src={Titulo} className="Titulo" alt="logo" />
                            <p className='pTitulo'>Recetas a un click</p>
                        </div>
                        <div className='prueba'>

                            <div className="izqMedioDIV"><img src={iM} className="izqMedio" alt='image-1' /></div>
                            <div className="izqArribaDIV"><img src={iA} className="izqArriba" alt='image-1' /></div>
                            <div className="izqGrandeDIV"><img src={iG} className="izqGrande" alt='image-1' /></div>

                            <div className="derAbajoDIV"><img src={dA} className="derechaAbajo" alt='image-1' /></div>
                            <div className="derMedioDIV"><img src={dM} className="derechaMedio" alt='image-1' /></div>
                            <div className='flechaScrollDIV'><img src={flecha} className="flechaScroll" alt='image-1' /></div>
                        </div>
                        </div>
                    </Animator>
                </ScrollPage>
                <ScrollPage className='bgLogin'>
                    <Animator animation={batch(Fade(0, 1), MoveOut(0, -200))}>
                        <div className='topLeft'>
                            <img src={logo} className="chiquito" alt="logo" />
                        </div>



                        <div className='Container'>
                            <div className='Wrapper cent'>
                                <div className='info col-6'>
                                    <div className='CenterInfo'>
                                        <h2>Bienvenido a </h2>
                                        <h1>RecetApp</h1>
                                        <p>RecetApp es una aplicacion creada<br />  para compartir y descubrir<br /> recetas de todo tipo</p>
                                    </div>
                                    <div className='fotoLoginDIV'>
                                        <img src={fL} className='fotoLogin' alt='image-1' />
                                    </div>
                                </div>
                                <div className='marginTop col-6' >
                                    {
                                        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
                                    }
                                </div>
                            </div>
                        </div>
                    </Animator>
                </ScrollPage>
            </ScrollContainer>
        </div>
    );
}

export default Inicio;
