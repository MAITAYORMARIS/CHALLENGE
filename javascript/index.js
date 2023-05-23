let fechaBase
let eventos = []
var eventosPasados = []
var eventosFuturos = []
let arrayBusqueda = []
let selectedBox = []
let datosInput = ""
var inputSearch = document.getElementById("search")

async function getData() {
    let dataApi;
    await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
        .then(response => response.json())
        .then(json => dataApi = json)

    fechaBase = dataApi.fechaActual
    eventos = dataApi.eventos
    for (var i = 0; i < eventos.length; i++) {
        if (eventos[i].date > fechaBase) {
            eventosFuturos.push(eventos[i])
        }
        else {
            eventosPasados.push(eventos[i])
        }
    }
   
rutas()
}   getData()

// capturando el id de la seccion a la que se hace click en la barra de navegacion
var buttonNav = document.getElementsByClassName("nav-link")
console.log(buttonNav)

for (var i = 0; i < buttonNav.length; i++) {
    const elementos = buttonNav[i];

    elementos.addEventListener("click", function (e) {
        navegacion(e.target.id);
    })
}

// esta funcion evalua a que seccion corresponde el id capturado para generar el template
function navegacion(id) {
    
    switch (id) {
        case "upcoming":
                     
            break;

        case "past":
             
            break;

        default:
           
                display(eventos),
       
    }
}


function display(array) {

    var html = "";
    for (var i = 0; i < array.length; i++) {
        html += `
    <div class="col">
        <div class="card h-100">
          <img src="${array[i].image}" class="card-img-top" alt="foto ${array[i].name}">
          <div class="card-body">
            <h5 class="card-title">${array[i].name}</h5>
            <p class="card-text">${array[i].description}</p>
          </div>
          <div class="card-footer">
            <small class="badge text-bg-info">Precio: $ ${array[i].price}</small>
            <a href="./pages/detalle.html?id=${array[i].id}" class="btn btn-outline-light">Ver más</a>
          </div>
        </div>
    </div>
        `
    }

    document.getElementById("cartasDeProductos").innerHTML = html;
}

// Creando checkbox dinamicos
function creaCategorias(array) {
    let checkboxList = array.map(evento => evento.category)
    let checkboxListUnica = new Set(checkboxList)
    let categoriesList = [...checkboxListUnica]

    let categoriasDeEventos = ""
    categoriesList.map(category =>
        categoriasDeEventos +=
        `
    <div class="form-check">
    <input class="form-check-input" type="checkbox"  id="categoria1" value="${category}">
    <label class="form-check-label" for="categoria1">${category}</label>
    </div>
    `
    )
    document.getElementById("check").innerHTML = categoriasDeEventos
    selectedBoxListener()
}

function selectedBoxListener() {
    var box = document.querySelectorAll('input[type=checkbox')

    for (i = 0; i < box.length; i++) {
        box[i].addEventListener("change", function () {
            selectedBox = []
            for (var i = 0; i < box.length; i++) {
                if (box[i].checked) {
                    console.log(box[i].value)
                    selectedBox.push(box[i].value)
                }
            }
            filtradoMultiple()
        })
    }
}

function filtradoMultiple() {
    var filtroBusqueda = []

    if (datosInput !== "" && selectedBox.length > 0) {

        for (var i = 0; i < selectedBox.length; i++) {
            var eventoCoincidencia = arrayBusqueda.filter(evento => evento.name.toLowerCase().includes(datosInput) &&
                evento.category === selectedBox[i])
            filtroBusqueda.push(...eventoCoincidencia)
        }
    }
    else if (datosInput !== "" && selectedBox.length == 0) {
        filtroBusqueda = arrayBusqueda.filter(evento => evento.name.toLowerCase().includes(datosInput))
    }
    else if (datosInput == "" && selectedBox.length > 0) {
        for (var i = 0; i < selectedBox.length; i++) {
            var eventoCoincidencia = arrayBusqueda.filter(evento => evento.category === selectedBox[i])
            filtroBusqueda.push(...eventoCoincidencia)
        }
    }
    else {
        filtroBusqueda = arrayBusqueda
    }

    filtroBusqueda.length > 0 ?
        display(filtroBusqueda) :
        document.getElementById("cartasDeEventos").innerHTML = `<div class="aviso"><p >No se encontraron resultados. Intenta nuevamente</p></div>`
    console.log(datosInput)
    console.log(selectedBox)
}











