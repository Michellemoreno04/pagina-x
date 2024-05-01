import { Navbar, Submenu } from '../componentes/navbar/navbar'
import '../perfiles/usuarios.css'
import { useState,useEffect } from 'react';
import { storage } from '../componentes/navbar/subirVideo/subirVideos';
import { getDocs,collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Link } from 'react-router-dom';



export function Usuarios() {
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
// aqui va la funcion de llamarla imagen que esta en en la db
const [imagePreview, setImagePreview] = useState(() => {
    // Recupera la URL de descarga de localStorage al cargar el componente
    return localStorage.getItem("imagePreview") || null;
  });
  const [users, setUsers] = useState([]);
  
  
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

<div className="perfiles">
<Navbar/>
<Submenu/>
<h1>Usuarios</h1>

<div className="userProfile">
<Link to='/perfil'>
<div className='img-user-content'>
    
<img src={imagePreview} alt="" className='img-user' />

</div>
</Link>
<div className='info-usuario'>
    <Link to='/perfil'> 
<p>{userData[0] && userData[0].nombre}, {userData[0] && userData[0].edad}, {userData[0] && userData[0].ciudad}</p>
<p>cantidad de videos </p>
</Link>
</div>
</div>

</div>
     )
}

