function obtenerProductos() {
    return JSON.parse(localStorage.getItem('productos')) || [];
};


function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();
    const existe = carrito.find(item => item.nombreP === producto.nombreP);

    if (existe) {
        if (existe.cantidadSeleccionada < producto.cantidad) {
            existe.cantidadSeleccionada += 1;
        } else {
            alert('No puedes agregar más de la cantidad disponible');
        }
    } else {
        carrito.push({
            ...producto,
            cantidadSeleccionada: 1  // Nueva propiedad
        });
    }

    guardarCarrito(carrito);
    alert('Producto añadido al carrito');
}
function mostrarProductos(){
    const productos = obtenerProductos();
    const productosDiv = document.getElementById('catalogoP');
    productosDiv.innerHTML = '';
    
    productos.forEach(producto => {
        const cartaP = document.createElement('div');
        cartaP.classList.add('col-md-4', 'col-sm-12', 'my-3');
        
        const divP = document.createElement('div');
        divP.classList.add('card','m-3');
        cartaP.appendChild(divP);
        
        const imgP = document.createElement('img');
        imgP.src = producto.imagenP;
        imgP.classList.add('card-img-top','img-fluid'); 
        divP.appendChild(imgP);

        const divT = document.createElement('div');
        divT.classList.add('card-body');
        divP.appendChild(divT);

        const producP = document.createElement('h5');
        producP.classList.add('card-title');
        producP.textContent = producto.nombreP;
        divT.appendChild(producP);

        const precio = document.createElement('p');
        precio.classList.add('card-text');
        precio.textContent = `Precio: ${producto.precioP}`;
        divT.appendChild(precio);

        const cant = document.createElement('p');
        cant.classList.add('card-text');
        cant.textContent = `Cantidad: ${producto.cantidad}`;
        divT.appendChild(cant);

        const fecha = document.createElement('p');
        fecha.classList.add('card-text');
        fecha.textContent = `Fecha de ingreso: ${producto.fechaP}`;
        divT.appendChild(fecha);

        // Botón Agregar al carrito
        const btnAgregar = document.createElement('button');
        btnAgregar.classList.add('btn', 'btn-success', 'm-1');
        btnAgregar.textContent = 'Agregar al Carrito';
        divT.appendChild(btnAgregar);

        btnAgregar.addEventListener('click', () => {
            agregarAlCarrito(producto);
        });

        // Botón Comprar ahora
        const btnComprar = document.createElement('button');
        btnComprar.classList.add('btn', 'btn-primary', 'm-1');
        btnComprar.textContent = 'Comprar Ahora';
        divT.appendChild(btnComprar);

        btnComprar.addEventListener('click', () => {
            agregarAlCarrito(producto);
            window.location.href = 'carrito.html';
        });

        productosDiv.appendChild(cartaP);
    });
}

function buscarProductos() {
    const busquedaInput = document.getElementById('busqueda');  // id correcto
    const busqueda = busquedaInput.value.trim().toLowerCase();  // texto limpio
    const productos = obtenerProductos();

    if (busqueda === '') {
        mostrarProductos();  // si no hay texto, mostrar todo
    } else {
        const resultadoBusqueda = productos.filter(producto =>
            producto.nombreP.toLowerCase().includes(busqueda)
        );
        mostrarCartas(resultadoBusqueda);  // muestra solo resultados
    }
}
function mostrarCartas(productos) {
    const catalogoDiv = document.getElementById('catalogoP');
    catalogoDiv.innerHTML = '';  // Limpia el catálogo

    productos.forEach(producto => {
        const cartaP = document.createElement('div');
        cartaP.classList.add('col-md-4', 'col-sm-12', 'my-3');

        const divP = document.createElement('div');
        divP.classList.add('card', 'm-3');
        cartaP.appendChild(divP);

        const imgP = document.createElement('img');
        imgP.src = producto.imagenP;
        imgP.classList.add('card-img-top', 'img-fluid');
        divP.appendChild(imgP);

        const divT = document.createElement('div');
        divT.classList.add('card-body');
        divP.appendChild(divT);

        const producP = document.createElement('h5');
        producP.classList.add('card-title');
        producP.textContent = producto.nombreP;
        divT.appendChild(producP);

        const precio = document.createElement('p');
        precio.classList.add('card-text');
        precio.textContent = `Precio: ${producto.precioP}`;
        divT.appendChild(precio);

        const cant = document.createElement('p');
        cant.classList.add('card-text');
        cant.textContent = `Cantidad: ${producto.cantidad}`;
        divT.appendChild(cant);

        const fecha = document.createElement('p');
        fecha.classList.add('card-text');
        fecha.textContent = `Fecha: ${producto.fechaP}`;
        divT.appendChild(fecha);

        const btnAgregar = document.createElement('button');
        btnAgregar.classList.add('btn', 'btn-success', 'm-1');
        btnAgregar.textContent = 'Agregar al Carrito';
        btnAgregar.addEventListener('click', () => {
            agregarAlCarrito(producto);
        });
        divT.appendChild(btnAgregar);

        const btnComprar = document.createElement('button');
        btnComprar.classList.add('btn', 'btn-primary', 'm-1');
        btnComprar.textContent = 'Comprar Ahora';
        btnComprar.addEventListener('click', () => {
            agregarAlCarrito(producto);
            window.location.href = 'carrito.html';
        });
        divT.appendChild(btnComprar);

        catalogoDiv.appendChild(cartaP);
    });
}



window.onload = function(){
    mostrarProductos();
    document.getElementById('busqueda').addEventListener('input', buscarProductos);
    window.addEventListener('storage', function (event) {
        if (event.key === 'productos') {
            mostrarProductos(); // Vuelve a cargar los productos desde localStorage
        }
    });
};