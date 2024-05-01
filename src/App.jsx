import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import { Navbar, Submenu } from "./componentes/navbar/navbar";
import { Portada } from "./componentes/navbar/portada/portada";
import { Login } from "./componentes/navbar/Login/login";
import "./App.css";
import { LiveVideos } from "./componentes/navbar/live-videos/liveVideos";
import { Videos } from "./componentes/navbar/videos/videos";
import { useEffect, useState } from "react";
// IMPORTANDO LOS MODULOS DE FIREBASE
import appFirebase from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth"; //onAuthStateChanged es para ver el estado de authenticacion
import { Citas } from "./Citas/citas";
import { Usuarios } from "./perfiles/usuarios";
import { MiPerfil } from "./perfiles/mi-perfil/myPerfil";
// (dispatch) para llamar funciones de redux y para actualisar el estado (useSeletor): es para traer los datos del estado
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "./app/features/tasks/taskSlice";
import { ProfileForm } from "./componentes/navbar/formularioPerfil/formularioPerfil";



const auth = getAuth(appFirebase);

function App(){

  const dispatch = useDispatch()// esto es lo que va a ir a reducer desde cualquier lado de la web a ejecutar reducer/store

  const tasksState = useSelector(state => state.task) // useSelector es pára traer algo del estado

//console.log(tasksState[0])
dispatch(addTask('este es mi parametro'))// esto va al action de addTask que espera dos parametros


  return (
    <>


      <Navbar />
      <Submenu />
      <Portada />
      <LiveVideos />
      <Videos />
      <Login />
    
    </>
  );
}

export default App;

// ESTA SON LAS RUTAS
export function AppRutas() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route
          path="/videos"
          element={
            <RutasProtegidas>
              {" "}
              <Videos />{" "}
            </RutasProtegidas>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/live" element={<LiveVideos />} />
        <Route path="/perfil" element={<MiPerfil/> } /> 
        <Route path="/formularioPerfil" element={<ProfileForm/> } /> 

      </Routes>
    </div>
  );
}

function RutasProtegidas({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (usuario) => {
      if (usuario) {
        const uid = usuario.uid;

        navigate("/videos");
      } else {
        navigate("/login");
      }
    }),
      [];
  });

  return children;
}
