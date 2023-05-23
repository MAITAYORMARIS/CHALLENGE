let fechaBase
let eventos = []
let eventosPasados = []
let eventosFuturos = []
var buttonNav = document.getElementsByClassName("nav-link")

function botonesActive() {
    buttonNav[0].classList.remove("active"),
        buttonNav[1].classList.remove("active"),
        buttonNav[2].classList.remove("active"),
        buttonNav[3].classList.remove("active"),
        buttonNav[4].classList.remove("active")
}
async function getDatosDetalle() {
    let datosApi;
    await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
        .then(response => response.json())
        .then(json => datosApi = json)

    eventos = datosApi.eventos
    fechaBase = datosApi.fechaActual
    let id = location.search.split("?id=").filter(Number)
    console.log(id)
    let selectedId = id[0]


    let detalleEvento = []

    for (var i = 0; i < eventos.length; i++) {
        if (eventos[i].id == selectedId) {
            console.log(eventos[i])
            detalleEvento.push(eventos[i])
        }
    }
    console.log(detalleEvento)
    displayDetalle(detalleEvento)
    botonesActive()
}
getDatosDetalle()


function displayDetalle(detalleEvento) {
    if (detalleEvento[0].date > fechaBase) {
        detalleEvento[0].assistance = `Estimada(${detalleEvento[0].estimate})`
    }
    var contenido
    contenido =
        `
    <div class="col">
    <div class="fecha ">
    <p> ${(detalleEvento[0].date)}</p>
</div>
        <div class="card-detalle">
            <div class="col-md-5">
                <img src="${detalleEvento[0].image}" class="img-fluid" alt="foto de ${detalleEvento[0].name}">
                <section class="datosUno">
                    <div class="monto">
                        <p class="parrafoUno">Entradas desde: <i class="fa-solid fa-dollar-sign"></i></p>
                        <p class="parrafoDos">${detalleEvento[0].price}</p>
                    </div>
                </section>
            </div>
            <div class="col-md-7">
                <div class="card-body">
                    <h5 class="card-title">${detalleEvento[0].name}</h5>
                    <section class="descripcion">
                        <p class="card-text">${detalleEvento[0].description}</p>
                     </section>
                     <section class="datos">
                        <p class="card-text"><small class="text-muted">Categoria: ${detalleEvento[0].category}</small></p>
                        <p class="card-text"><small class="text-muted">Lugar:${detalleEvento[0].place}</small></p>
                        <p class="card-text"><small class="text-muted">Capacidad:${detalleEvento[0].capacity}</small></p>
                        <p class="card-text"><small class="text-muted">Asistencia: ${detalleEvento[0].assistance}</small></p>
    
                    </section>
                </div>
            </div>
        </div>
    </div>
        `
    console.log(contenido)
    document.getElementById("detallesDeLosProductos").innerHTML = contenido
}

