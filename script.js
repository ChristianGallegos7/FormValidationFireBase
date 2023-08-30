// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js"; // Importa las funciones necesarias para Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGrqLYECjNwcDxWcx5nuqp9XNXaPOScBw",
  authDomain: "datosform-96775.firebaseapp.com",
  projectId: "datosform-96775",
  storageBucket: "datosform-96775.appspot.com",
  messagingSenderId: "576017076428",
  appId: "1:576017076428:web:5069b225bedeb97dd33269",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

document.getElementById("formulario").addEventListener("submit", async (e) => {
  e.preventDefault();
  //validar campo nombre
  let nombre = document.getElementById("name").value;
  let errorNombre = document.getElementById("nameError");

  if (nombre.trim() === "") {
    errorNombre.textContent = "Introduce tu nombre";
    errorNombre.classList.add("error-message");
  } else {
    errorNombre.textContent = "";
    errorNombre.classList.remove("error-message");
  }
  //validar campo correo
  let correo = document.getElementById("email").value;
  let errorCorreo = document.getElementById("emailError");
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico

  if (!emailPattern.test(correo)) {
    errorCorreo.textContent = "Introduce un correo valido";
    errorCorreo.classList.add("error-message");
  } else {
    errorCorreo.textContent = "";
    errorCorreo.classList.remove("error-message");
  }

  //validar campo contraseña
  let password = document.getElementById("password").value;
  let passwordError = document.getElementById("passwordError");

  if (password.length < 8) {
    passwordError.textContent = "Caracteres minimos 8";
    passwordError.classList.add("error-message");
  } else {
    passwordError.textContent = "";
    passwordError.classList.remove("error-message");
  }

  //enviar formulario

  if (
    !errorNombre.textContent &&
    !errorCorreo.textContent &&
    !passwordError.textContent
  ) {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        nombre: nombre,
        email: correo,
        password: password,
      });
      console.log("Document written with ID: ", docRef.id);
      alert("Se envió el formulario correctamente");
      document.getElementById("formulario").reset();
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Hubo un error al enviar el formulario");
    }
  }
});
