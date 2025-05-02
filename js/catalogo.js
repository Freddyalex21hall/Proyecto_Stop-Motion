function obtenerPeliculas() {
    return JSON.parse(localStorage.getItem('peliculas')) || [];
};

function mostrarPeliculas() {
    const peliculas = obtenerPeliculas();
    const catalogoDiv = document.getElementById('catalogo');
    catalogoDiv.innerHTML = '';

    peliculas.forEach(pelicula => {
        const carta = document.createElement('div');
        carta.classList.add('col-md-4', 'col-sm-12', 'my-3');

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card', 'm-3');
        carta.appendChild(cardContainer);

        const imagen = document.createElement('img');
        imagen.src = pelicula.imagen;
        imagen.alt = "Imagen de la película";
        imagen.classList.add('card-img-top', 'img-fluid');
        cardContainer.appendChild(imagen);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardContainer.appendChild(cardBody);

        const titulo = document.createElement('h5');
        titulo.classList.add('card-title');
        titulo.textContent = pelicula.nombre;
        cardBody.appendChild(titulo);

        const director = document.createElement('p');
        director.classList.add('card-text');
        director.textContent = `Director: ${pelicula.director}`;
        cardBody.appendChild(director);

        const fecha = document.createElement('p');
        fecha.classList.add('card-text');
        fecha.textContent = `Año: ${pelicula.fecha}`;
        cardBody.appendChild(fecha);

        const genero = document.createElement('p');
        genero.classList.add('card-text');
        genero.textContent = `Género: ${pelicula.genero}`;
        cardBody.appendChild(genero);

        catalogoDiv.appendChild(carta);
    });
};

function filtrarPorGenero(genero) {
    const peliculas = obtenerPeliculas();
    return peliculas.filter(pelicula => pelicula.genero.toLowerCase() === genero.toLowerCase());
};

function buscarPeliculas() {
    const busqueda = document.getElementById('busqueda').value.toLowerCase();
    const peliculas = obtenerPeliculas();
    const resultadoBusqueda = peliculas.filter(pelicula => 
        pelicula.nombre.toLowerCase().includes(busqueda)
    );
    mostrarCartas(resultadoBusqueda);
};

function mostrarCartas(peliculas) {
    const catalogoDiv = document.getElementById('catalogo');
    catalogoDiv.innerHTML = ''; 

    peliculas.forEach(pelicula => {
        const carta = document.createElement('div');
        carta.classList.add('col-md-4', 'col-sm-12', 'my-3');

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card', 'm-3');
        carta.appendChild(cardContainer);

        const imagen = document.createElement('img');
        imagen.src = pelicula.imagen;
        imagen.alt = "Imagen de la película";
        imagen.classList.add('card-img-top', 'img-fluid');
        cardContainer.appendChild(imagen);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardContainer.appendChild(cardBody);

        const titulo = document.createElement('h5');
        titulo.classList.add('card-title');
        titulo.textContent = pelicula.nombre;
        cardBody.appendChild(titulo);

        const director = document.createElement('p');
        director.classList.add('card-text');
        director.textContent = `Director: ${pelicula.director}`;
        cardBody.appendChild(director);

        const fecha = document.createElement('p');
        fecha.classList.add('card-text');
        fecha.textContent = `Año: ${pelicula.fecha}`;
        cardBody.appendChild(fecha);

        const genero = document.createElement('p');
        genero.classList.add('card-text');
        genero.textContent = `Género: ${pelicula.genero}`;
        cardBody.appendChild(genero);

        catalogoDiv.appendChild(carta);
    });
};

function aplicarFiltro() {
    const generoSeleccionado = document.getElementById('filtroGenero').value;
    if (generoSeleccionado === 'todos') {
        mostrarPeliculas();
    } else {
        const peliculasFiltradas = filtrarPorGenero(generoSeleccionado);
        mostrarCartas(peliculasFiltradas);
    };
};

window.onload = function() {
    mostrarPeliculas();

    document.getElementById('busqueda').addEventListener('input', buscarPeliculas);

    document.getElementById('filtroGenero').addEventListener('change', aplicarFiltro);
};