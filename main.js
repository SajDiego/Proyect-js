let usuariosRegistrados = [
    { usuario: "Javier", contraseña: "js2023" },
    { usuario: "Gonzalo", contraseña: "gonza2023" },
    { usuario: "Diego", contraseña: "diego2023" }
  ];
  
  // Función para verificar si el usuario y contraseña coinciden
  const estaUsuarioRegistrado = (username, password) => {
    return usuariosRegistrados.some(user => user.usuario === username && user.contraseña === password);
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    let loginButton = document.getElementById("botonInicio");
    const mensajeModal = document.getElementById("mensajeModal");
    let mensajeTexto = document.getElementById("mensajeTexto");
    const enlace = document.getElementById("enlace");
    let cerrarModal = document.getElementById("cerrarModal");
  
    const usuarioGuardado = cargarDatosDesdeLocalStorage("usuario");
    if (usuarioGuardado) {
      document.getElementById("username").value = usuarioGuardado;
    }
  
    loginButton.addEventListener("click", () => {
      let usernameInput = document.getElementById("username");
      let passwordInput = document.getElementById("password");
  
      const user = usernameInput.value;
      const password = passwordInput.value;
  
      if (estaUsuarioRegistrado(user, password)) {
        mensajeTexto.textContent = "Bienvenido " + user;
        enlace.textContent = "INGRESAR";
        enlace.href = "notas/notas.html";
        enlace.style.display = "none";
  
        guardarDatosEnLocalStorage("usuario", user);
  
        setTimeout(() => {
          window.location.href = enlace.href;
        }, 3000);
      } else {
        mensajeTexto.textContent = "Usuario no registrado o contraseña incorrecta";
      }
    });
  
    cerrarModal.addEventListener("click", () => {
      mensajeModal.style.display = "block";
    });
  });
  
  //  localStorage del inicio de sesion
  const guardarDatosEnLocalStorage = (key, datos) => {
    localStorage.setItem(key, JSON.stringify(datos));
  };
  
  let cargarDatosDesdeLocalStorage = key => {
    const datosGuardados = localStorage.getItem(key);
    return datosGuardados ? JSON.parse(datosGuardados) : null;
  };
   
  //calculo de promedio
  const calcularPromedio = () => {
    const nombre = document.getElementById("nombre").value;
    const Lengua = parseFloat(document.getElementById("Lengua").value);
    const Historia = parseFloat(document.getElementById("Historia").value);
    const Matematicas = parseFloat(document.getElementById("Matematicas").value);
  
    if (Lengua >= 1 && Lengua <= 10 && Historia >= 1 && Historia <= 10 && Matematicas >= 1 && Matematicas <= 10) {
      const promedio = (Lengua + Historia + Matematicas) / 3; // Calcular el promedio aquí
  
      let promedioData = {
        nombre: nombre,
        promedio: promedio.toFixed(2),
      };
    
      // Obtener los promedios guardados (si existen)
      let promediosGuardados = JSON.parse(localStorage.getItem("promedios")) || [];
    
      // Agregar el nuevo promedio al arreglo de promedios guardados
      promediosGuardados.push(promedioData);
    
      // Guardar los promedios actualizados en el localStorage (Pero la realidad es que no guarda o yo no puedo acceder loa promedios guardados )
      localStorage.setItem("promedios", JSON.stringify(promediosGuardados));
    
      // Mostrar el promedio en la página junto a un botón de borrado
      const resultado = document.createElement("p");
      resultado.innerHTML = `El promedio de ${nombre} es: ${promedioData.promedio} <button onclick="borrarPromedio(this)">Borrar</button>`;
      const promediosDiv = document.getElementById("promedios");
      promediosDiv.appendChild(resultado);
    } else {
      alert("Por favor, ingrese notas del 1 al 10.");
    }
  }
  
  const borrarPromedio = (button) => {
    const resultadoDiv = button.parentElement;
    const nombre = resultadoDiv.textContent.split(" ")[3];
    let promediosGuardados = JSON.parse(localStorage.getItem("promedios")) || [];
    promediosGuardados = promediosGuardados.filter((promedio) => promedio.nombre !== nombre);
    localStorage.setItem("promedios", JSON.stringify(promediosGuardados));
    resultadoDiv.remove();
  };
  
  //Aclaraciones: intente agregar una tabla abajo para poder guardar los Promedios calculados y me perdi y no pude hacerlo.
  // Se que tambien la idea es que los nombres de las variables esten en ingles. Pero me perdia horrores, supongo que es por falta de practica. Entonces preferí dejar así
  