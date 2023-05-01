import './componentes/App.css';
import { gsap } from 'gsap';
import { Link, Route, Routes } from "react-router-dom"
import Inicio from './componentes/Inicio.jsx';
//<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
import PaginaLectoraCSV from "./paginasOcultas/paginaLectoraCSV"
import { Explorador } from './componentes/PaginasBuscador/explorador';
import { RecetasExpandidas } from './componentes/PaginasBuscador/recetasExpandidas';
import { AreaPersonal } from './componentes/areaPersonal/areaPersonal';
import { CrearReceta } from './componentes/areaPersonal/crearReceta';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/ocultoCSV' element = {<PaginaLectoraCSV/>}/>
        <Route path='/explorador' element = {<Explorador/>}/>
        <Route path='/recetaExtendida/:idReceta' element  = {<RecetasExpandidas/>}/>
        <Route path='/areaPersonal/:idUsuario' element={<AreaPersonal/>}/>
        <Route path='/crearReceta' element = {<CrearReceta/>}/>
      </Routes>
    </div>
  )
}

export default App;
