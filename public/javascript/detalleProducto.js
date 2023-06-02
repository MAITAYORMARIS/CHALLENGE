function imprimirDetalle(id) {


    var detalleProducto = []

    for (var i = 0; i < dataProductos.length; i++) {
        if (dataProductos[i].id == id) {
            detalleProducto.push(dataProductos[i]);

        }
    }

    var contenidoDetalle = ""
    // var ingesta = detalleProducto[i].ingesta;
    // var ingestaVisible = ingesta !== "" ? "" : "hidden";
    contenidoDetalle =
        `
        <p class="titulo">${detalleProducto[0].categoria}</p>
        <div class="detalleContent card">
        <div class="detalleIzquierda">
          <div class="imgDetalleContent">
            <img src="${detalleProducto[0].image}" alt="${detalleProducto[0].nombre}">
          </div>
          <div class="iconos">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-brands fa-whatsapp"></i>
            <i class="fa-regular fa-envelope-open"></i>
          </div>
        </div>
        
        <div class="detalleDerecha card-body">
          <div class="tituloDetalle">
            <p>${detalleProducto[0].nombre}</p>
          </div>
          <div class="infoDetalle">
            <p>Tipo: ${detalleProducto[0].categoria}</p>
            <p>Precio: $ ${detalleProducto[0].precio}</p>
            <p>Presentación: ${detalleProducto[0].presentacion}</p>
          </div>
          <hr class="misc gray-misc">
          <p style="font-weight: bold">Mas detalles de este producto</p>
          <div class="masDetalles">
            <p>Marca: ${(detalleProducto[0].marca).toLowerCase()}</p>
            <p class="">Dosis: ${detalleProducto[0].ingesta}</p>
            <p>Info: ${detalleProducto[0].descripcion}</p>
          </div>
          <a href="#" class="btn btnShop"><i class="fa-solid fa-cart-shopping">Comprar</i></a>
        </div>
      </div>


    `

    var htmlDetalle = document.getElementById("detalleProducto")
    htmlDetalle.style.display = "flex"
    htmlDetalle.innerHTML = contenidoDetalle
    document.getElementById("seccionProductos").style.display="none"
    
    
    var botonCompra = document.getElementsByClassName("btnShop")
    botonCompra.addEventListener("click", function (e) {
        compras()

    })
}

