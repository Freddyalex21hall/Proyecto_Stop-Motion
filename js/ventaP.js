function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarCarrito() {
    const carrito = obtenerCarrito();
    const container = document.getElementById('carrito-container');
    container.innerHTML = '';

    carrito.forEach((producto, index) => {
        const cartaP = document.createElement('div');
        cartaP.classList.add('col-md-4', 'col-sm-12', 'my-3');

        const card = document.createElement('div');
        card.classList.add('card', 'mb-3', 'p-3');
        cartaP.appendChild(card);

        const divP = document.createElement('div');
        divP.classList.add('card','m-3');
        card.appendChild(divP);
        
        const imgP = document.createElement('img');
        imgP.src = producto.imagenP;
        imgP.classList.add('card-img-top','img-fluid'); 
        divP.appendChild(imgP);

        const info = document.createElement('div');
        info.classList.add('col-md-8','col-12','mb-2');
        card.appendChild(info);

        const titulo = document.createElement('h5');
        titulo.textContent = producto.nombreP;
        info.appendChild(titulo);

        const cantidad = document.createElement('p');
        cantidad.textContent = `Cantidad seleccionada: ${producto.cantidadSeleccionada}`;
        cantidad.id = `cantidad-${index}`;
        info.appendChild(cantidad);

        const precio = document.createElement('p');
        precio.textContent = `Precio por unidad: ${producto.precioP}`;
        info.appendChild(precio);

        const botonesDiv = document.createElement('div');
        botonesDiv.classList.add('d-flex', 'gap-2');

        // Botón Aumentar
        const btnMas = document.createElement('button');
        btnMas.classList.add('btn', 'btn-success');
        btnMas.textContent = '+';
        btnMas.addEventListener('click', () => {
            if (producto.cantidadSeleccionada < producto.cantidad) {
                producto.cantidadSeleccionada++;
                guardarCarrito(carrito);
                mostrarCarrito();
            } else {
                alert('No puedes seleccionar más de la cantidad disponible');
            }
        });
        botonesDiv.appendChild(btnMas);

        // Botón Disminuir
        const btnMenos = document.createElement('button');
        btnMenos.classList.add('btn', 'btn-danger');
        btnMenos.textContent = '-';
        btnMenos.addEventListener('click', () => {
            if (producto.cantidadSeleccionada > 1) {
                producto.cantidadSeleccionada--;
                guardarCarrito(carrito);
                mostrarCarrito();
            }
        });
        botonesDiv.appendChild(btnMenos);

        info.appendChild(botonesDiv);

        container.appendChild(cartaP);
    });
}

window.onload = function() {
    mostrarCarrito();
}