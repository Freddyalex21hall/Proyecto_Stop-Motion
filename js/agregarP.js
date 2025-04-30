const formularioProducto = document.getElementById('formularioProducto');
const modalAlerta = document.getElementById('modalAlerta');
const mensajeModal = document.getElementById('mensajeModal');
const modalExito = document.getElementById('modalExito');


const modalAlertaBootstrap = new bootstrap.Modal(modalAlerta);
const modalExitoBootstrap = new bootstrap.Modal(modalExito);
function guardarProducto(producto){
    let productos = JSON.parse(localStorage.getItem('productos'))||[];

    const productoExistente = productos.find(p=>p.nombreP.toLowerCase() === producto.nombreP.toLowerCase());
    if(productoExistente){

        //Sumar cantidad
        productoExistente.cantidad += producto.cantidad;

        //Guardar el arreglo actualizado
        localStorage.setItem('productos', JSON.stringify(productos));

        mensajeModal.innerHTML = '📦 Cantidad actualizada para el producto ya existente.';
        formularioProducto.reset();
        modalAlertaBootstrap.show();
        return;
    }else{
        productos.push(producto);
        localStorage.setItem('productos',JSON.stringify(productos));
        formularioProducto.reset();
        modalExitoBootstrap.show();
    };
    
    
};

formularioProducto.addEventListener('submit', function(e){
    e.preventDefault();

    const nombreP = document.getElementById('nombreP').value.trim();
    const precioP = parseInt(document.getElementById('precio').value.trim());
    const cantidad = parseInt(document.getElementById('cantidad').value.trim());
    const fechaP = document.getElementById('fechaP').value.trim();
    const imagenP = document.getElementById('imagenP').value.trim();


    if(!nombreP||isNaN(precioP)||isNaN(cantidad)||!fechaP||!imagenP){
        mensajeModal.innerHTML = '⚠️ Este producto ya esta registrado ya está registrada en el catálogo.';
        modalAlertaBootstrap.show();
        return;
    };
    
    const productoNuevo = {
        nombreP,
        precioP,
        cantidad,
        fechaP,
        imagenP
    };
    console.log(productoNuevo);
    guardarProducto(productoNuevo);
});