function mostrarHistorial() {
    const historial = JSON.parse(localStorage.getItem('historialVentas')) || [];
    const container = document.getElementById('historial-container');

    container.innerHTML = '';

    historial.forEach((venta, i) => {
        const div = document.createElement('div');
        div.classList.add('card', 'mb-3', 'p-3');

        const encabezado = document.createElement('h5');
        encabezado.textContent = `Venta ${i + 1} - ${venta.fecha}`;
        div.appendChild(encabezado);

        const lista = document.createElement('ul');
        venta.productos.forEach(p => {
            const item = document.createElement('li');
            item.textContent = `${p.nombreP} (x${p.cantidadSeleccionada}) - $${p.precioP}`;
            lista.appendChild(item);
        });

        div.appendChild(lista);

        const resumen = document.createElement('p');
        resumen.innerHTML = `
            Subtotal: $${venta.subtotal} <br>
            IVA: $${venta.iva} <br>
            Total: <strong>$${venta.total}</strong>
        `;
        div.appendChild(resumen);

        container.appendChild(div);
    });
}

window.onload = function () {
    mostrarHistorial();
};