function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function calcularTotales() {
    const carrito = obtenerCarrito();
    let subtotal = 0;

    carrito.forEach(producto => {
        subtotal += producto.precioP * producto.cantidadSeleccionada;
    });

    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    document.getElementById('subtotal').textContent = `$ ${subtotal.toFixed(0)}`;
    document.getElementById('iva').textContent = `$ ${iva.toFixed(0)}`;
    document.getElementById('total').textContent = `$ ${total.toFixed(0)}`;
}

function mostrarCarrito() {
    const carrito = obtenerCarrito();
    const container = document.getElementById('carrito-container');
    container.innerHTML = '';

    carrito.forEach((producto, index) => {
        const cartaP = document.createElement('div');
        cartaP.classList.add('col-12', 'my-3');

        const card = document.createElement('div');
        card.classList.add('card', 'p-3', 'd-flex', 'flex-column', 'flex-md-row', 'align-items-center', 'gap-3');
        cartaP.appendChild(card);

        const imgP = document.createElement('img');
        imgP.src = producto.imagenP;
        imgP.classList.add('img-fluid');
        imgP.style.maxWidth = '150px';
        imgP.style.height = 'auto';
        card.appendChild(imgP);

        const info = document.createElement('div');
        info.classList.add('flex-grow-1');
        card.appendChild(info);

        const titulo = document.createElement('h5');
        titulo.textContent = producto.nombreP;
        info.appendChild(titulo);

        const cantidad = document.createElement('p');
        cantidad.textContent = `Cantidad seleccionada: ${producto.cantidadSeleccionada}`;
        cantidad.id = `cantidad-${index}`;
        info.appendChild(cantidad);

        const precio = document.createElement('p');
        precio.textContent = `Precio por unidad: $${producto.precioP}`;
        info.appendChild(precio);

        const botonesDiv = document.createElement('div');
        botonesDiv.classList.add('d-flex', 'gap-2');

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

        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn', 'btn-warning');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', () => {
            carrito.splice(index, 1);  // Eliminar el producto del array
            guardarCarrito(carrito);
            mostrarCarrito();
        });
        botonesDiv.appendChild(btnEliminar);

        info.appendChild(botonesDiv);
        container.appendChild(cartaP);
    });

    calcularTotales();
}

function guardarHistorialVenta(venta) {
    const historial = JSON.parse(localStorage.getItem('historialVentas')) || [];
    historial.push(venta);
    localStorage.setItem('historialVentas', JSON.stringify(historial));
}

function venderCarrito() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        alert('No hay productos en el carrito para vender.');
        return;
    }

    // Calcular totales
    let subtotal = 0;
    carrito.forEach(producto => {
        subtotal += producto.precioP * producto.cantidadSeleccionada;
    });
    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    // Guardar en historial
    const venta = {
        fecha: new Date().toLocaleString(),
        productos: carrito,
        subtotal: subtotal.toFixed(0),
        iva: iva.toFixed(0),
        total: total.toFixed(0)
    };
    guardarHistorialVenta(venta);

    // ↓↓↓ ACTUALIZACIÓN DEL STOCK EN TIENDA ↓↓↓
let productos = JSON.parse(localStorage.getItem('productos')) || [];

carrito.forEach(itemCarrito => {
    const index = productos.findIndex(p => p.nombreP === itemCarrito.nombreP);
    if (index !== -1) {
        productos[index].cantidad -= itemCarrito.cantidadSeleccionada;
        if (productos[index].cantidad <= 0) {
            productos.splice(index, 1); // Eliminar producto si se agota
        }
    }
});

localStorage.setItem('productos', JSON.stringify(productos));
    // Vaciar carrito y mostrar mensaje
    alert('¡Venta realizada con éxito!');
    localStorage.removeItem('carrito');
    mostrarCarrito();
    calcularTotales();

    // Opcional: refrescar productos si estás en la tienda
    if (typeof mostrarProductos === 'function') {
        mostrarProductos();
    }
}

window.onload = function () {
    mostrarCarrito();

    const btnVender = document.getElementById('venta');
    if (btnVender) {
        btnVender.addEventListener('click', venderCarrito);
    }
};