const coleccionProductos = firebase.firestore().collection("productos");

let productos = []
let dataProductos = []
let suplementosNaturales = []
let hogar = []
let alimentosOrganicos = []

async function getDB() {
    await coleccionProductos.get()
        .then((results) => {
            console.log(results)
            const data = results.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            dataProductos.push(...data)


            console.log("Toda data en la colección 'productos' ", dataProductos);

            for (var i = 0; i < dataProductos.length; i++) {
                if (dataProductos[i].categoria == "Suplemento Natural") {
                    suplementosNaturales.push(dataProductos[i])
                }
                else if (dataProductos[i].categoria == "Hogar") {
                    hogar.push(dataProductos[i])
                }
                else if (dataProductos[i].categoria == "Alimentos Organicos") {
                    alimentosOrganicos.push(dataProductos[i])

                }
                else {
                    productosSinLactosa.push(dataProductos[i])
                }
            }

        })
}; getDB()
console.log(suplementosNaturales)

var botones = document.getElementsByClassName("nav-link")

for (var i = 0; i < botones.length; i++) {
    const elementos = botones[i];

    elementos.addEventListener("click", function (e) {
        navegacion(e.target.id);
        // console.log(e.target.id)

    })
}

function navegacion(id) {
    switch (id) {
        case "alimentosOrganicos":
            imprimir(alimentosOrganicos)
            document.getElementById("tituloSec").innerHTML="ALIMENTOS ORGANICOS"
            document.getElementById("seccionProductos").style.display = "flex"
            document.getElementById("carouselExampleFade").style.display="none"
            document.getElementById("mapau").style.display="none"
            break;
        case "productosSinLactosa":
            imprimir(productosSinLactosa)
            document.getElementById("tituloSec").innerHTML="PRODUCTOS SIN LACTOSA"
            document.getElementById("seccionProductos").style.display = "flex"
            document.getElementById("carouselExampleFade").style.display="none"
            document.getElementById("mapau").style.display="none"
            break;
        case "suplementosNaturales":
            imprimir(suplementosNaturales)
            document.getElementById("seccionProductos").style.display = "flex"
            document.getElementById("carouselExampleFade").style.display="none"
            document.getElementById("mapau").style.display="none"
            document.getElementById("tituloSec").innerHTML="SUPLEMENTOS NATURALES"
            break;
        case "hogar":
            imprimir(hogar)
            document.getElementById("tituloSec").innerHTML="HOGAR"
            document.getElementById("seccionProductos").style.display = "flex"
            document.getElementById("carouselExampleFade").style.display="none"
            document.getElementById("mapau").style.display="none"
            break;
        case "contact":
            console.log("form de contactos")
            document.getElementById("carouselExampleFade").style.display="none"
            document.getElementById("mapau").style.display="none"
            break;
        default:
            document.getElementById("carouselExampleFade").style.display = "flex"
            document.getElementById("mapau").style.display="flex"
            document.getElementById("seccionProductos").style.display = "none"
    }
}

function imprimir(array) {

    var html = "";
    for (var i = 0; i < array.length; i++) {
        html +=
            `
    <div class="card cardProducto">
        <div class="imageProducContent"><img src="${array[i].image}" alt="foto ${array[i].nombre}"></div>
        <div class="card-body bodyProducto">
          <p class="card-title tituloProducto">${array[i].nombre}</p>
          <p class="card-text">Presentacion: ${array[i].presentacion}</p>
          <p class="card-text">Precio:${array[i].precio} </p>
        </div>
        <div class="card-body footProducto">
        <button id=${array[i].id} class="btn btnInfo"><i class="fa-solid fa-plus">Mas info</i></button>
          <a href="#" class="btn btnShop"><i class="fa-solid fa-cart-shopping">Comprar</i></a>
        
        </div>
      </div>
    `
    }
    document.getElementById("productosDietetica").innerHTML = html;
      var botonesInfo = document.querySelectorAll(".btnInfo")
      console.log(botonesInfo)
      for (var m = 0; m < botonesInfo.length; m++) {
        botonesInfo[m].addEventListener("click", function (e) {
        //   console.log(e.target.parentElement.id)
     imprimirDetalle(e.target.parentElement.id)

        })
      }

      var botonesCompra = document.getElementsByClassName("btnShop")
      for (var u = 0; u < botonesCompra.length; u++) {
        botonesCompra[u].addEventListener("click", function (e) {

          compras()

        })
      }
}

function compras(){
    console.log("llame a la funcion compras")
}
function imprimirDetalle(id){
    console.log("imprimo el detalle del id", id)
}