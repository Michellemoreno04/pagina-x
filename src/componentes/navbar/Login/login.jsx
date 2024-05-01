import { useState } from 'react'
import '../Login/login.css'
import appFireBase from '../../../firebaseConfig' //coneccion con firebase
import { getAuth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider,onAuthStateChanged } from 'firebase/auth' // authenticacion
import { createUserWithEmailAndPassword} from 'firebase/auth'// para crear usuario con correo y contraseña
import Swal from 'sweetalert2'


const auth = getAuth(appFireBase)


export function Login(){

const [registrando,setRegistrando] = useState(false)
const [muestraModal,setMuetraModal] = useState(true)
const [usuario,setUsuario] = useState(null)


onAuthStateChanged(auth,(usuarioFirebase)=>{

  if(usuarioFirebase){
    setUsuario(usuarioFirebase)
    
    setMuetraModal(false) // si esta autenticado desaparece el modal
  
  }
  else{
    setUsuario(null)
  }
})


// AQUISE OBTIENEN LAS CREDENCIALES FACILMENTE
const authenticacion = async (e)=>{
e.preventDefault()
const correo = e.target.email.value //tiene que tener el id de email para que funcione asi
const contraseña = e.target.password.value // tiene que tener el id de password

if(registrando){
   try {
    await createUserWithEmailAndPassword (auth,correo,contraseña)
    
    

   } catch (error) {

   }
}
else{

    try {
        await signInWithEmailAndPassword(auth,correo,contraseña)
    } catch (error) {
        alert("el usuario o contraseña son incorrectos")
    }
    
}
}
// Función para autenticación con Google
const handleGoogle = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider(); // Crear instancia del proveedor de autenticación de Google
    signInWithPopup(auth, provider) // Iniciar sesión con el proveedor de autenticación de Google mediante una ventana emergente
        .then((result) => {
            // Autenticación exitosa
            console.log(result.user);
        })
        .catch((error) => {
            // Manejo de errores
            console.error(error);
        });
};


    return( 
        <div>
            {
                
muestraModal && (  // contenido del modal aqui si no esta autenticado

    <div> 
<div className='form-container'>
    <h2 className='welcome-login'> Welcome!</h2>
                
            
            <form onSubmit={authenticacion} className="form_main">
         
    <p className="heading">Login</p>
    <div className="inputContainer">
        <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
        </svg>
    <input type="text" className="inputField" id="email" placeholder="Username" required/>
    </div>
    
<div className="inputContainer">
    <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
    </svg>
    <input type="password" className="inputField" id="password" placeholder="Password" required/>
</div>
              
           
<button className="btn-registrate">{registrando ? "Registrate" : "Inicia Sesion" }</button>
<h4>{registrando ? "Si ya tienes cuenta" : "No tienes cuenta "}<button className='btn-registrate' onClick={()=>setRegistrando(!registrando)}>{registrando ? "Inicia Sesion" : "Registrate"}</button></h4>
  {/*BOTON DE GOOGLE*/ }

  <button className="btn-loginGoogle" onClick={(e)=>handleGoogle(e)}>
  <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
  <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
  <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
  <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
  <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
</svg>
  Continue with Google
</button>
 
    <a className="forgotLink" href="#">Forgot your password?</a>
    
    
</form>

<div>
    
</div>
</div>
    
        </div>

    )
    
    }

    

</div>
)

}
