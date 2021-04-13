// Js de apertura del carrito

const imagenCarrito = document.querySelector('.img-carrito');
const carrito       = document.querySelector('.carrito');
const listaCarrito  = document.querySelector('#lista-carrito');
const contenedorCarrito = document.querySelector('.contenedor-carrito');
const contenedorCards= document.querySelector('.contenedor-cards');
const tableBody      = document.querySelector('.table-body');
const btnVaciarCarrito=document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

//Eventos
imagenCarrito.addEventListener('click', abrirCarrito);
contenedorCards.addEventListener('click',agregarCurso);
btnVaciarCarrito.addEventListener('click', () => {
    limpiarHTML();
    articulosCarrito=[];
});

//funciones

function abrirCarrito() {
    const carritoOpen = document.querySelector('.open');
    if (!carritoOpen) {
        carrito.classList.add('open');
    }else{
        carrito.classList.remove('open');
    }
}


// Funcionalidad Carrito

//leer datos
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('btn-agregar')){
        const curso = e.target.parentElement.parentElement;
        leerDatos(curso);
    }

}

function leerDatos(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        producto: curso.querySelector('h5').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'), 
        cantidad:1
    }
    
    if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
        const cursos = articulosCarrito.map( curso => {
             if( curso.id === infoCurso.id ) {
                  curso.cantidad++;
                   return curso;
              } else {
                   return curso;
           }
        })
        articulosCarrito = [...cursos];
   }  else {
        articulosCarrito = [...articulosCarrito, infoCurso];
   }

    carritoHTML(articulosCarrito)
}

function carritoHTML(articulosCarrito){
    
    limpiarHTML();
    articulosCarrito.forEach((curso)=>{
        const{imagen,producto,precio,id,cantidad} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${imagen}" width=100></td>
        <td>${producto}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td class="btn btn-danger">X</td>
        `;
        tableBody.appendChild(row);
    })
}

function limpiarHTML() {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
       
    }
}



