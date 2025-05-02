const formulario = document.getElementById('formularioPelicula');
const modalAlerta = new bootstrap.Modal(document.getElementById('modalAlerta'));
const mensajeModal = document.getElementById('mensajeModal');
const modalExito = new bootstrap.Modal(document.getElementById('modalExito'));

function guardarPelicula(pelicula) {
    let peliculas = JSON.parse(localStorage.getItem('peliculas')) || [];  
    const peliculaExistente = peliculas.some(p => p.nombre.toLowerCase() === pelicula.nombre.toLowerCase());
    if (peliculaExistente) {
        mensajeModal.innerHTML = '⚠️ Esta película ya está registrada en el catálogo.';
        modalAlerta.show();
        return;
    };
    peliculas.push(pelicula);
    localStorage.setItem('peliculas', JSON.stringify(peliculas));
    formulario.reset(); 
    modalExito.show();
};

formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const director = document.getElementById('director').value.trim();
    const fecha = document.getElementById('date').value.trim();
    const genero = document.getElementById('genero').value.trim();
    const imagen = document.getElementById('imagen').value.trim();

    if (!nombre || !fecha || !genero || !imagen) {
        mensajeModal.innerHTML = '⚠️ Todos los campos obligatorios deben ser llenados.';
        modalAlerta.show();
        return;
    };

    const nuevaPelicula = {
        nombre,
        director: director || 'Desconocido',  
        fecha,
        genero,
        imagen
    };

    guardarPelicula(nuevaPelicula);
});