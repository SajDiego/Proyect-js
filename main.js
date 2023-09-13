//Inicio de sesion
const usuario = "Javier";
const contraseña = "js2023";

document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("botonInicio");
    const mensajeModal = document.getElementById("mensajeModal");
    const mensajeTexto = document.getElementById("mensajeTexto");
    const enlace = document.getElementById("enlace");
    const cerrarModal = document.getElementById("cerrarModal");


    const usuarioGuardado = cargarDatosDesdeLocalStorage("usuario");
    if (usuarioGuardado) {
        document.getElementById("username").value = usuarioGuardado;
    }

    loginButton.addEventListener("click", function () {
        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");

        const user = usernameInput.value;
        const password = passwordInput.value;

        if (usuario === user && contraseña === password) {
            mensajeTexto.textContent = "Bienvenido " + usuario;
            enlace.textContent = "INGRESAR";
            enlace.href = "notas/notas.html";
            enlace.style.display = "block";

            
            guardarDatosEnLocalStorage("usuario", usuario);

            setTimeout(function () {
                window.location.href = enlace.href;
            }, 3000);
        } else {
            mensajeTexto.textContent = "No eres el tutor";
        }
    });

    cerrarModal.addEventListener("click", function () {
        mensajeModal.style.display = "none"; 
    });
});

// Función localStorage
function guardarDatosEnLocalStorage(key, datos) {
    localStorage.setItem(key, JSON.stringify(datos));
}

function cargarDatosDesdeLocalStorage(key) {
    const datosGuardados = localStorage.getItem(key);
    return datosGuardados ? JSON.parse(datosGuardados) : null;
}
// Calcular notas

function calcularPromedio() {
    const nombre = document.getElementById("nombre").value;
    const Lengua = parseFloat(document.getElementById("Lengua").value);
    const Historia = parseFloat(document.getElementById("Historia").value);
    const Matematicas = parseFloat(document.getElementById("Matematicas").value);

    
    if (Lengua >= 1 && Lengua <= 10 && Historia >= 1 && Historia <= 10 && Matematicas >= 1 && Matematicas <= 10) {
        const promedio = (Lengua + Historia + Matematicas) / 3;

        const resultado = document.getElementById("resultado");
        resultado.innerHTML = `El promedio de ${nombre} es: ${promedio.toFixed(2)}`;
    } else {
        alert("Por favor, ingrese notas del 1 a 10.");
    }
}