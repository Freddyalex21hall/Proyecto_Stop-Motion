// Función que recupera las películas almacenadas en localStorage
function obtenerPeliculas() {
    return JSON.parse(localStorage.getItem('peliculas')) || [];
}

// Función que genera las cartas de las películas y las muestra en el catálogo
function mostrarPeliculas() {
    const peliculas = obtenerPeliculas();  // Obtiene las películas desde localStorage
    const catalogoDiv = document.getElementById('catalogo');
    catalogoDiv.innerHTML = '';  // Limpia el contenido actual del catálogo

    // Itera sobre las películas y genera una carta para cada una
    peliculas.forEach(pelicula => {
        const carta = document.createElement('div');
        carta.classList.add('col-md-4', 'col-sm-12', 'my-3');
        carta.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${pelicula.imagen}" class="card-img-top img-fluid" alt="Imagen de la película">
                <div class="card-body">
                    <h5 class="card-title">${pelicula.nombre}</h5>
                    <p class="card-text">Director: ${pelicula.director}</p>
                    <p class="card-text">Año: ${pelicula.fecha}</p>
                    <p class="card-text">Género: ${pelicula.genero}</p>
                </div>
            </div>
        `;
        catalogoDiv.appendChild(carta);  // Añade la carta al catálogo
    });
}

// Función que filtra las películas por género
function filtrarPorGenero(genero) {
    const peliculas = obtenerPeliculas();
    return peliculas.filter(pelicula => pelicula.genero.toLowerCase() === genero.toLowerCase());
}

// Función que maneja la búsqueda por nombre
function buscarPeliculas() {
    const busqueda = document.getElementById('busqueda').value.toLowerCase();  // Obtiene el texto de búsqueda
    const peliculas = obtenerPeliculas();
    const resultadoBusqueda = peliculas.filter(pelicula => 
        pelicula.nombre.toLowerCase().includes(busqueda)
    );
    mostrarCartas(resultadoBusqueda);  // Muestra las películas que coinciden con la búsqueda
}

// Función para mostrar las cartas filtradas (por búsqueda o por género)
function mostrarCartas(peliculas) {
    const catalogoDiv = document.getElementById('catalogo');
    catalogoDiv.innerHTML = '';  // Limpia el catálogo

    peliculas.forEach(pelicula => {
        const carta = document.createElement('div');
        carta.classList.add('col-md-4', 'col-sm-12', 'my-3');
        carta.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${pelicula.imagen}" class="card-img-top img-fluid" alt="Imagen de la película">
                <div class="card-body">
                    <h5 class="card-title">${pelicula.nombre}</h5>
                    <p class="card-text">Director: ${pelicula.director}</p>
                    <p class="card-text">Año: ${pelicula.fecha}</p>
                    <p class="card-text">Género: ${pelicula.genero}</p>
                </div>
            </div>
        `;
        catalogoDiv.appendChild(carta);
    });
}

// Función que maneja el filtro de género
function aplicarFiltro() {
    const generoSeleccionado = document.getElementById('filtroGenero').value;
    if (generoSeleccionado === 'todos') {
        mostrarPeliculas();  // Muestra todas las películas si no se selecciona un género específico
    } else {
        const peliculasFiltradas = filtrarPorGenero(generoSeleccionado);
        mostrarCartas(peliculasFiltradas);  // Muestra solo las películas del género seleccionado
    }
}

// Inicializa la visualización de las películas al cargar la página
window.onload = function() {
    mostrarPeliculas();

    // Añade el evento de búsqueda
    document.getElementById('busqueda').addEventListener('input', buscarPeliculas);

    // Añade el evento del filtro de género
    document.getElementById('filtroGenero').addEventListener('change', aplicarFiltro);
};