function obtenerProductos() {
    return JSON.parse(localStorage.getItem('productos')) || [];
};

function mostrarProductos(){
    const productos = obtenerProductos();
    const productosDiv = document.getElementById('catalogoP');
    productosDiv.innerHTML='';
    
    productos.forEach(productos =>{
        const cartaP = document.createElement('div');
        cartaP.classList.add('col-md-4', 'col-sm-12', 'my-3');

        const divP = document.createElement('div');
        divP.classList.add('card','m-3');
        cartaP.appendChild(divP);
        
        const imgP = document.createElement('img');
        imgP.src = productos.imagenP;
        imgP.classList.add('card-img-top','img-fluid'); 
        divP.appendChild(imgP);

        const divT = document.createElement('div');
        divT.classList.add('card-body');
        divP.appendChild(divT);

        const producP = document.createElement('h5');
        producP.classList.add('card-title');
        producP.textContent = productos.nombreP
        divT.appendChild(producP);

        const precio = document.createElement('p');
        precio.classList.add('card-text')
        precio.textContent = `Precio: ${productos.precioP}`;
        divT.appendChild(precio);

        const cant = document.createElement('p');
        cant.classList.add('card-text')
        cant.textContent = `Cantidad: ${productos.cantidad}`;
        divT.appendChild(cant);

        const fecha = document.createElement('p');
        fecha.classList.add('card-text');
        fecha.textContent = `Fecha de ingreso: ${productos.fechaP}`;
        divT.appendChild(fecha);

        const btnVender = document.createElement('button');
        btnVender.classList.add('btn-cine2');
        btnVender.textContent = `Comprar`;
        divT.appendChild(btnVender);

        btnVender.addEventListener('click', ()=>{
            localStorage.setItem('localid', productos.name);
            alert('Producto añadido al carrito');
        });


        productosDiv.appendChild(cartaP);
    });
};

function buscarProductos() {
    const busqueda = document.getElementById('busqueda').value.toLowerCase();  // Obtiene el texto de búsqueda
    const productos = obtenerProductos();
    const resultadoBusqueda = productos.filter(producto => 
        producto.nombreP.toLowerCase().includes(busqueda)
    );
    mostrarCartas(resultadoBusqueda);  // Muestra las películas que coinciden con la búsqueda
};
function mostrarCartas(productos) {
    const catalogoDiv = document.getElementById('catalogoP');
    catalogoDiv.innerHTML = '';  // Limpia el catálogo

    productos.forEach(productos => {
        const cartaP = document.createElement('div');
        cartaP.classList.add('col-md-4', 'col-sm-12', 'my-3');

        const divP = document.createElement('div');
        divP.classList.add('card','m-3','carta','zoom-hover');
        cartaP.appendChild(divP);

        const divIMG = document.createElement('div');
        divIMG.classList.add('col-12');
        divP.appendChild(divIMG);
        
        const imgP = document.createElement('img');
        imgP.src = productos.imagenP;
        imgP.classList.add('card-img-top','img-fluid'); 
        divIMG.appendChild(imgP);

        const divT = document.createElement('div');
        divT.classList.add('card-body');
        divP.appendChild(divT);

        const producP = document.createElement('h5');
        producP.classList.add('card-title');
        producP.textContent = productos.nombreP
        divT.appendChild(producP);

        const precio = document.createElement('p');
        precio.classList.add('card-text')
        precio.textContent = productos.precioP;
        divT.appendChild(precio);

        const cant = document.createElement('p');
        cant.classList.add('card-text')
        cant.textContent = productos.cantidad;
        divT.appendChild(cant);

        const fecha = document.createElement('p');
        fecha.classList.add('card-text');
        fecha.textContent = productos.fechaP;
        divT.appendChild(fecha);


        productosDiv.appendChild(cartaP);
    });
};



window.onload = function(){
    mostrarProductos();

    document.getElementById('busqueda').addEventListener('input',buscarProductos)
};
// localStorage.clear();