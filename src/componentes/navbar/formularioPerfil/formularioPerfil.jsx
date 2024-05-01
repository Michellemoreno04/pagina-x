// ProfileForm.js
import "../formularioPerfil/formularioPerfil.css";
import React, { useState,useEffect } from "react";
import { Navbar, Submenu } from "../navbar";
import { collection, addDoc,getDocs } from "firebase/firestore"; // Importa los métodos necesarios de Firebase Firestore
import { db } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const ProfileForm = () => {
  const navigate = useNavigate();
  
  // Utiliza el hook useState para manejar el estado de los datos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    ciudad: "",
    genero: "",
    idioma: "",
    intereses: "",
    telefono: ""
  });

  // Controlador de eventos para el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    
    try {
      // Guarda los datos del formulario en la colección "users" de Firestore
      const docRef = await addDoc(collection(db, "users"), formData);
      
      // Muestra un mensaje de éxito utilizando SweetAlert2
      Swal.fire({
        icon: "success",
        title: "¡Datos guardados!",
        text: "Los datos del formulario se han guardado correctamente."
      });
      
      // Redirige a otra página
      //navigate("/ruta-a-redirigir");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      // Muestra un mensaje de error utilizando SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al guardar los datos. Por favor, inténtalo de nuevo más tarde."
      });
    }
  };

  // Controlador de eventos para cambiar el estado de los datos del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Función para obtener la información de la colección "users"
const getUsersData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const userData = [];
    querySnapshot.forEach((doc) => {
      // Agrega los datos de cada documento a un array
      userData.push({
        id: doc.id, // ID del documento
        ...doc.data() // Datos del documento
      });
    });
    return userData;
  } catch (error) {
    console.error("Error al obtener los datos de usuarios:", error);
    return [];
  }
};
getUsersData()

 


  
  return (
    <div className="profile-form-container">
      <Navbar />
      <Submenu />
      <h2>Editar informacion de perfil</h2>
      <form className="form-perfil" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input className="input-perfil-form" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Edad:</label>
          <input className="input-perfil-form" name="edad" value={formData.edad} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Ciudad:</label>
          <input className="input-perfil-form" name="ciudad" value={formData.ciudad} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Género:</label>
          <select className="input-perfil-form" name="genero" value={formData.genero} onChange={handleChange} required>
            <option value="">Selecciona</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div className="form-group">
          <label>Idioma:</label>
          <input className="input-perfil-form" name="idioma" value={formData.idioma} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Intereses:</label>
          <textarea className="input-perfil-form" name="intereses" value={formData.intereses} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Número de Teléfono:</label>
          <input className="input-perfil-form" name="telefono" value={formData.telefono} onChange={handleChange} required />
        </div>
        <button type="submit">Guardar</button>
      </form>
    
    </div>
  );
};

