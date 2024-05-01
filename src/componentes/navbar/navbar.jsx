import '../navbar/navbar.css'
import appFireBase from '../../firebaseConfig' //coneccion con firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth' // authenticacion
import { Login } from './Login/login'
import { Link } from 'react-router-dom'
import React, { useState } from 'react';


const auth = getAuth(appFireBase)

export function Navbar() {
  const [muestraModal,setMuestraModal] = useState(false)


  
  // Manejador de eventos para mostrar el modal de inicio de sesión
  const mostrarModalLogin = () => {
    setMuestraModal(true);
  };
      return (
      <div className="navbar">
    
       <div className="total-envivo"> <Link to='/' style={{color:"white",marginRight:"20px",fontSize:"20px"}}>Home</Link> <Activo/><p>855 en vivo</p></div>
             
<input className='search-bar'  placeholder='Modelos,pais ect...'/>

<div className="btn-login">
  
  <button onClick={mostrarModalLogin}>Crear cuenta</button>
  

<button >Login</button>

<Link className='myPerfil' to='/perfil'>Perfil</Link>



</div>


      </div>
      
    )
  }

export function Submenu(){



  return(
    <div className='submenu'>

<div className='links-submenu'>
  <Link className='link-submenu' to='/usuarios'> Usuarios </Link>
  <Link className='link-submenu' to='/live'> Porno en vivo </Link>
  <Link className='link-submenu' to='#'>Show privados</Link>
  <Link className='link-submenu' to='/citas'>Cita a alguien</Link>

</div>

    </div>
  )
}



  //Esta es la funcion que define si el user esta activo en la web o no
export function Activo(){

return(
      <div>
<div className='activos'>
  
   </div>
      </div>
    )
  }