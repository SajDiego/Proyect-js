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

