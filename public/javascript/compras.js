var carritoVisible = false;

let totalGeneral = 0
let carrito = []
let cantidad = 0
let totalItem = 0

function compras() {
  document.getElementById("seccionProductos").style.display = "none"
  document.getElementById("detalleProducto").style.display = "none"
  document.getElementById("seccionCompras").style.display = "flex"
  displaycompras(dataProductos)
}


function displaycompras(dataProductos) {
  var htmlcompras = " ";
  for (var i = 0; i < dataProductos.length; i++) {

    htmlcompras += `
    <div class="col col-compras">
    <div class="card card-compra">
      <div class="img-card-compra"><img src="${dataProductos[i].image}" alt="imagen ${dataProductos[i].nombre}">
      </div>
      <div class="card-body body-compras">
        <p class="card-title title-compras">${dataProductos[i].nombre}</p>
        <p class="card-text"><small class="text-body-secondary">Tipo: ${dataProductos[i].categoria}</small></p>
        <p class="card-text text-body-secondary">Precio:$${dataProductos[i].precio} </p>
      </div>

      <div class="footer-compras">
        <button class="btn btnShop botonagregar" id="id${dataProductos[i].id}">Agregar al Carrito</button>

      </div>

    </div>
  </div>
        `
  }

  document.getElementById("compras").innerHTML = htmlcompras


  var articulo = document.querySelectorAll(".botonagregar")
  console.log(articulo)
  for (var n = 0; n < articulo.length; n++) {
    articulo[n].addEventListener("click", function (e) {
      console.log(e.target.id)

      var idSel = parseInt(e.target.id.replace("id", ""));

      console.log(idSel)
      var articuloSelect = idSel
      console.log(articuloSelect)
      // Buscar el artículo en el carrito
      var itemExistente = carrito.find(item => item.id === articuloSelect)
      if (itemExistente) {
        // El artículo ya está en el carrito, incrementar la cantidad
        itemExistente.cantidad = itemExistente.cantidad + 1
      }
      else //El articulo no esta en el carrito, se agrega
      {
        for (var m = 0; m < dataProductos.length; m++) {
          if (dataProductos[m].id == articuloSelect) {
            dataProductos[m].cantidad = 1;
            carrito.push(dataProductos[m])
          }
        }

      }
      displayCarrito(carrito)

    })
  }
}


function displayCarrito(carrito) {

  var htmlCarrito = " ";

  for (var b = 0; b < carrito.length; b++) {

    htmlCarrito += `
          <div class="carrito-item" id="${carrito[b].id}">
              <div class="cont-carritoImage">
                <img src="${carrito[b].image}" alt="${carrito[b].nombre}">
              </div>
              <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${carrito[b].nombre}</span>
                  <div class="selector-cantidad">
                  <span class="carrito-item-precio">Precio: $${carrito[b].precio}</span>
                  <label for="cantidad" class="form-label" style="display:none;">Cantidad</label>
                  <input type="number" class="form-control introCar" id="cantidad${carrito[b].id}" placeholder="Cantidad" value="${carrito[b].cantidad}">
                  <i class="fa-solid fa-trash"></i>
                </div>
                <p id="totalItem${carrito[b].id}">Total:$${(carrito[b].precio) * (carrito[b].cantidad)}</p>
              </div>
            </div>
            `
  }
  document.getElementById("tuPedido").innerHTML = htmlCarrito;
  if (htmlCarrito !== "") { document.getElementById("carrito").style.display = "flex" }

  var botonEliminar = document.getElementsByClassName("fa-trash")
  console.log(botonEliminar)
  for (var o = 0; o < botonEliminar.length; o++) {
    var boton = botonEliminar[o]
    boton.addEventListener("click", function (e) {
      eliminarItemCarrito(e)
    })
    calculadoraTotal()
    var cantidadItem = document.getElementsByClassName("introCar")

    for (var im = 0; im < cantidadItem.length; im++) {
      cantidadItem[im].addEventListener("change", function (e) {

        actualizarCantidad(e)
      })
    }
  }
}

function actualizarCantidad(e) {

  var cantidad = parseInt(e.target.value)
  console.log("la cantidad change es:", cantidad)
  var idItem = e.target.id.replace("cantidad", "")
  console.log("el item es:", idItem)
  // Actualizar la cantidad del artículo en el carrito
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id == idItem) {
      carrito[i].cantidad = cantidad;
      break;
    }
  }
  calculadoraItem(idItem);
}

function calculadoraItem(id) {
  console.log(id)

  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id == id) {
      totalItem = (carrito[i].precio * carrito[i].cantidad)

    }
  }
  document.getElementById(`totalItem${id}`).innerHTML = `Total:$${totalItem}`
  calculadoraTotal()
}


function eliminarItemCarrito(e) {
  var buttonClicked = e.target;
  var elementoPadre = buttonClicked.offsetParent;
  console.log(elementoPadre)

  var itemId = parseInt(elementoPadre.id); // Obtener el ID del elemento a eliminar
  elementoPadre.remove();
  // Eliminar el elemento del array carrito
  carrito = carrito.filter((item) => item.id !== itemId);

  calculadoraTotal();
    ocultarCarrito();

}

function ocultarCarrito() {
  var carritoItems = document.getElementsByClassName("carrito-items")[0]

  if (carritoItems.childElementCount == 0) {
    var carrito = document.getElementById("carrito")
    carrito.style.display = "none"

    var items = document.getElementById("compras")
    items.style.margin = "0% 17%"

  }
}


function calculadoraTotal() {
  totalGeneral = 0; // Reiniciamos el valor a 0 antes de recalcular

  for (var i = 0; i < carrito.length; i++) {
    var totalInput = document.getElementById(`totalItem${carrito[i].id}`)
    console.log(totalInput)

    var obtenerInput = totalInput.textContent;
    console.log(obtenerInput)
    var numeroInput = obtenerInput.split("Total:$")
    console.log(numeroInput)

    var total = parseInt(numeroInput[1])
    if (total > 0) {
      totalGeneral = totalGeneral + total;
    }

  }

  document.getElementById("final").innerHTML = `<p>Tu total:$ ${totalGeneral}</p>`
}
