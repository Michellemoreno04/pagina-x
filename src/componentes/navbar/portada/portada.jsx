
import { Link } from 'react-router-dom'
import imgPortada from '../../../imagenes/imgPortada.png'
import Sexyvd from '../../../imagenes/Sexyvd.mp4'
import '../portada/portada.css'



export function Portada(){


    return(
        <div className="portada">
             <video autoPlay loop muted className='vd-portada'>
        <source src={Sexyvd} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
<div>
<img src={imgPortada}  className='imgPortada'/>
<p>Conecta con <br /> estrellas pornos</p>


<Link to='/videos'>
<button className="btn-empezar" type="button">
  <strong>Empezar</strong>
  <div id="container-stars">
    <div id="stars"></div>
  </div>

  <div id="glow">
    <div className="circle"></div>
    <div className="circle"></div>
  </div>
</button>
</Link>



</div>

        </div>
    )
}