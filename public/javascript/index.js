const coleccionProductos = firebase.firestore().collection("productos");

let productos=[]
let dataProductos=[]
let suplementosNaturales=[]
let hogar=[]
let alimentosOrganicos=[]

async function getDB() {
    await coleccionProductos.get()
      .then((results) => {
        console.log(results)
        const data = results.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dataProductos.push(...data)
  
       productos = dataProductos
        console.log("Toda data en la colección 'productos' ", data); 
  
        for (var i = 0; i < productos.length; i++) {
          if (productos[i].categoria === "Suplemento Natural") {
            suplementosNaturales.push(productos[i])
          }
          else if (productos[i].categoria === "Hogar") {
            hogar.push(productos[i])
          }
          else if (productos[i].categoria === "Alimentos Organicos"){
            alimentosOrganicos.push(productos[i])
  
          }
          else{
            productosSinLactosa.push(productos[i])
          }
        }
  
      })
  }; getDB()

  var botones=document.getElementsByClassName("nav-link")
  for (var i = 0; i < botones.length; i++) {
    const elementos = botones[i];
  
    elementos.addEventListener("click", function (e) {
      navegacion(e.target.id);
    })
  }

  function navegacion(id) {
    switch (id) {
      case "alimentosOrganicos":
        imprimir(alimentosOrganicos)
        break;
        case "productosSinLactosa":
        imprimir(productosSinLactosa)
        break;
        case "suplementosNaturales":
        imprimir(suplementosNaturales)
        break;
        case "hogar":
        imprimir(hogar)
        break;
        case "contact":
        console.log("form de contactos")
        break;
        default:
            document.getElementById("carouselExampleFade").style.display="flex"
    }}
  
