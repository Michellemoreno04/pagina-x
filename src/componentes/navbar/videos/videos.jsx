import React, { useState, useEffect } from 'react';
import { Navbar, Submenu } from '../navbar';
import '../videos/videos.css';
import appFirebase from '../../../firebaseConfig'; // Importa también 'storage'
import { getAuth, signOut } from 'firebase/auth';
import { ref, listAll, getDownloadURL } from 'firebase/storage'; // Importa 'listAll' para obtener la lista de archivos
import { storage } from '../subirVideo/subirVideos';



const auth = getAuth(appFirebase);

export function Videos() {
  const [videosUrl, setVideosUrl] = useState([]);

  // Función para obtener la lista de videos desde Firebase Storage
  async function fetchVideos() {
    const storageRef = ref(storage,'videos'); // videos es la ruta donde esta la carpeta de las videos 
    
    try {
      const filesList = await listAll(storageRef); // Obtener la lista de archivos
      
      // Para cada archivo en la lista, obtener su URL de descarga
      const urls = await Promise.all(filesList.items.map(async (item) => {
        return getDownloadURL(item);
      }));

      setVideosUrl(urls); // Establecer las URLs de los videos en el estado

    } catch (error) {
      console.error('Error al obtener la lista de videos:', error);
    }
    
  }

  useEffect(() => {
    fetchVideos(); // Llamar a fetchVideos al cargar el componente
  }, []);

  return (
    <div>
      <h2>Videos</h2>
      <div className="videos-content">
        <div >
          {/* Mapear sobre las URLs de los videos y mostrar cada video */}
          {videosUrl.map((url, index) => (
            <video key={index} controls className="videos">
              <source src={url} type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          ))}
        </div>
      </div>
      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
}
