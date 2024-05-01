import { Link } from "react-router-dom";
import { Navbar, Submenu } from "../../componentes/navbar/navbar";
import "../mi-perfil/myPerfil.css";
import { Videos } from "../../componentes/navbar/videos/videos";
import { UploadVideo } from "../../componentes/navbar/subirVideo/subirVideos";
import { useState, useEffect } from "react";
import { storage } from "../../componentes/navbar/subirVideo/subirVideos";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";



export const MiPerfil = () => {



  return (
    <div className="miPerfil">
      <Navbar />
      <Submenu />

      <h1>Bienvenidos a mi perfil</h1>
      <Link to="/formularioPerfil">
        <button className="btn-editarPerfil">Editar perfil</button>
      </Link>

      <div className="perfil-portada">
        <img src="" />
      </div>
      <ContactBar />
      <OpcionBar />
      <InfoPerfil />

      <Videos />
    </div>
  );


 function ContactBar() {
    const [imagePreview, setImagePreview] = useState(() => {
      // Recupera la URL de descarga de localStorage al cargar el componente
      return localStorage.getItem("imagePreview") || null;
    });
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState([]);
    
    useEffect(() => {
      // Almacena la URL de descarga en localStorage cuando cambie
      if (imagePreview) {
        localStorage.setItem("imagePreview", imagePreview);
      } else {
        localStorage.removeItem("imagePreview");
      }
      
    }, [imagePreview]);
  
    const handleImageChange = async (e) => {
      const file = e.target.files[0];
      const imageName = uuidv4();
      const storageRef = ref(storage, `imagenes-perfil/${imageName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progreso de carga
        },
        (error) => {
          console.error("Error al cargar la imagen:", error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(storageRef);
            console.log("URL de descarga:", downloadURL);
            setImagePreview(downloadURL);
          } catch (error) {
            console.error("Error al obtener la URL de descarga:", error);
          }
          
        }
      );
      
      
    };
  // aqui se obtienen los datos del usuario
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userDatas = [];
        querySnapshot.forEach((doc) => {
          userDatas.push({
            id: doc.id,
            ...doc.data()
          })[0] //obten el primer usuario
        });
        setUserData(userDatas);
  
      } catch (error) {
        console.error("Error al obtener los datos de usuarios:", error);
      }
    };
  
    fetchData();
    
  }, []);
  
    
    return (
      <div className="content-link-opcion">
        <div className="img-perfil">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" />
          ) : (
            <p>Selecciona una foto</p>
          )}
        </div>
  
        <p className="name-user">{userData[0] && userData[0].nombre }</p> {/* **/}
  
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="input-file-foto"
          id="upload-image"
        />
        <label htmlFor="upload-image" className="link-user-opcion">
          Subir imagen
        </label>
        <a className="link-user-opcion">Añade a favoritos</a>
        <a className="link-user-opcion">Notificaciones</a>
        <a className="link-user-opcion">Mensajes</a>
        <a className="link-user-opcion">Agregar a amigos</a>
        <a className="link-user-opcion">Reportar modelo</a>
      </div>
    );
  }
  
  function OpcionBar() {
    return (
      <div className="opcionBar">
        <Link className="links-opcion-bar">Perfil</Link>
        <Link className="links-opcion-bar">Videos</Link>
        <Link className="links-opcion-bar">Fotos</Link>
      </div>
    );
  }
  
  function InfoPerfil() {
  
    const [userData, setUserData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "users"));
          const userDatas = [];
          querySnapshot.forEach((doc) => {
            userDatas.push({
              id: doc.id,
              ...doc.data()
            });
          });
          setUserData(userDatas);
    
        } catch (error) {
          console.error("Error al obtener los datos de usuarios:", error);
        }
      };
    
      fetchData();
      
    }, []);
  
    return (
      <div className="infoPerfil">
        <div className="content-infoEndVideos">
          <div className="info-content-perfil">
            <div>
              <p>De: {userData[0] && userData[0].ciudad } </p>
            </div>
            <div>
              <p>Genero: {userData[0] && userData[0].genero }</p>
            </div>
            <div>
              <p>Idiomas: {userData[0] && userData[0].idioma }</p>
            </div>
            <div>
              <p>Edad {userData[0] && userData[0].edad }</p>
            </div>
            <div>
              <p>Descripcion: {userData[0] && userData[0].intereses }</p>
            </div>
          </div>
          <div className="videosEnPerfil">
            <VideosPerfil />
          </div>
        </div>
      </div>
    );
  }
  
   function VideosPerfil({videosUrl}) {
    return (
      <div className="videos-content">
        <div className="videosPerfil">
        <div>
            
        </div>
        </div>
  
        <UploadVideo />
      </div>
    );
  }
  

};

