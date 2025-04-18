// Obtener los elementos del formulario
const formulario = document.getElementById('formularioPelicula');
const modalAlerta = new bootstrap.Modal(document.getElementById('modalAlerta'));
const mensajeModal = document.getElementById('mensajeModal');

// Función que guarda la película en localStorage
function guardarPelicula(pelicula) {
    let peliculas = JSON.parse(localStorage.getItem('peliculas')) || [];  // Recupera las películas guardadas

    // Verifica si la película ya está en el catálogo
    const peliculaExistente = peliculas.some(p => p.nombre.toLowerCase() === pelicula.nombre.toLowerCase());
    if (peliculaExistente) {
        mensajeModal.innerHTML = '⚠️ Esta película ya está registrada en el catálogo.';
        modalAlerta.show();
        return;
    }

    // Si no existe, guarda la nueva película
    peliculas.push(pelicula);
    localStorage.setItem('peliculas', JSON.stringify(peliculas));
    formulario.reset();  // Resetea el formulario
    modalExito.show();
}

// Función que maneja el envío del formulario
formulario.addEventListener('submit', function (e) {
    e.preventDefault();  // Evita el comportamiento por defecto de recargar la página

    const nombre = document.getElementById('nombre').value.trim();
    const director = document.getElementById('director').value.trim();
    const fecha = document.getElementById('date').value.trim();
    const genero = document.getElementById('genero').value.trim();
    const imagen = document.getElementById('imagen').value.trim();

    // Verifica que los campos obligatorios no estén vacíos
    if (!nombre || !fecha || !genero || !imagen) {
        mensajeModal.innerHTML = '⚠️ Todos los campos obligatorios deben ser llenados.';
        modalAlerta.show();
        return;
    }

    // Crea un objeto de película con los datos ingresados
    const nuevaPelicula = {
        nombre,
        director: director || 'Desconocido',  // Si no se ingresa director, se asigna 'Desconocido'
        fecha,
        genero,
        imagen
    };

    // Guarda la película en el localStorage
    guardarPelicula(nuevaPelicula);
});