const calcularPromedio = () => {
    const nombre = document.getElementById("nombre").value;
    const Lengua = parseFloat(document.getElementById("Lengua").value);
    const Historia = parseFloat(document.getElementById("Historia").value);
    const Matematicas = parseFloat(document.getElementById("Matematicas").value);
  
    if (Lengua >= 1 && Lengua <= 10 && Historia >= 1 && Historia <= 10 && Matematicas >= 1 && Matematicas <= 10) {
      const promedio = (Lengua + Historia + Matematicas) / 3;
  
      let promedioData = {
        nombre: nombre,
        promedio: promedio.toFixed(2),
      };
  
      // Llamar a la función para guardar el promedio en el localStorage
      guardarPromedio(promedioData);
  
     
      mostrarPromedio(promedioData);
  
    } else {
      alert("Por favor, ingrese notas del 1 al 10.");
    }
  };
  
  // Función para guardar el promedio en el localStorage
  const guardarPromedio = (promedioData) => {
    let promediosGuardados = JSON.parse(localStorage.getItem("promedios")) || [];
  
    // Agregar el nuevo promedio al arreglo de promedios guardados
    promediosGuardados.push(promedioData);
  
    // Guardar los promedios actualizados en el localStorage
    localStorage.setItem("promedios", JSON.stringify(promediosGuardados));
  };
  
  // Mostrar el promedio en DOM
  const mostrarPromedio = (promedioData) => {
    const resultado = document.createElement("p");
    resultado.innerHTML = `El promedio de ${promedioData.nombre} es: ${promedioData.promedio} <button onclick="borrarPromedio(this)">Borrar</button>`;
    const promediosDiv = document.getElementById("promedios");
    promediosDiv.appendChild(resultado);
  };
  
  const borrarPromedio = (button) => {
    const nombre = button.getAttribute("data-nombre");
  
    let promediosGuardados = JSON.parse(localStorage.getItem("promedios")) || [];
    promediosGuardados = promediosGuardados.filter((promedio) => promedio.nombre !== nombre);
    localStorage.setItem("promedios", JSON.stringify(promediosGuardados));
  
   
    button.parentElement.remove();
  };
  
  fetch('alumnos.json')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const alumnos = data;
      const promediosDiv = document.getElementById('promedios-lista'); // Div donde se mostrarán los promedios
  
      //calcular el promedio de un alumno y mostrarlo en el DOM
      const calcularPromedio = (alumno) => {
        const nombre = alumno.nombre;
        const Lengua = alumno.Lengua;
        const Historia = alumno.Historia;
        const Matematicas = alumno.Matematicas;
  
        
        const promedio = (Lengua + Historia + Matematicas) / 3;
  
        const resultado = document.createElement("p");
        resultado.innerHTML = `El promedio de ${nombre} es: ${promedio.toFixed(2)} `;
  
       
        promediosDiv.appendChild(resultado);
      };
  
      // Iterar a través de la lista de alumnos y calcular y mostrar sus promedios
      alumnos.forEach(calcularPromedio);
    })
    .catch(error => {
      console.error('Error al cargar el archivo JSON:', error);
    });