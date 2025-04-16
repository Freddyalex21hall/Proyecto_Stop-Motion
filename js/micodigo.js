const agregar = document.getElementById('agregar');

let nameP = localStorage.getItem('nombreP');
let nombre = nameP ? JSON.parse(nameP):[];

let direcP = localStorage.getItem('directorP');
let director = direcP ? JSON.parse(direcP):[];

let fecha = localStorage.getItem('fechaP');
let date = fecha ? JSON.parse(fecha):[];

let gene = localStorage.getItem('generoP');
let genero = gene ? JSON.parse(gene):[];

agregar.addEventListener('click', () => {
    agregar.preventDefault();

    const nombre = document.getElementById('nombre');
    const director = document.getElementById('director');
    const date = document.getElementById('date');
    const genero = document.getElementById('genero');

    


})