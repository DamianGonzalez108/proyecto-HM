let imagenes = [
  {
    url: "images/img-carrusel1.webp",
    nombre: "hm1",
    descripcion: "Esta semana tenemos estas ofertas y promciones solo para vos",
  },
  {
    url: "images/img-carrusel2.webp",
    nombre: "hm2",
    descripcion: "Esta semana tenemos estas ofertas y promciones solo para vos",
  },
  {
    url: "images/img-carrusel3.webp",
    nombre: "hm3",
    descripcion: "Esta semana tenemos estas ofertas y promciones solo para vos",
  },
];

const imagen = document.querySelector("#img");
const puntos = document.querySelector(".puntos");
const texto = document.querySelector(".texto");
const atras = document.querySelector(".atras");
const adelante = document.querySelector(".adelante");
let actual = 0;
posicionCarrusel();

atras.addEventListener("click", function () {
  actual -= 1;
  if (actual == -1) {
    actual = imagenes.length - 1;
  }
  imagen.innerHTML = `  <img src=${imagenes[actual].url} alt="publicidad-promociones" class="img" loading="lazy">`;
  texto.innerHTML = `  <h3>${imagenes[actual].nombre}</h3>
<p>${imagenes[actual].descripcion}</p>`;
  posicionCarrusel();
  console.log([actual]);
});

adelante.addEventListener("click", function () {
  actual += 1;
  if (actual == imagenes.length) {
    actual = 0;
  }
  imagen.innerHTML = ` <img src="${imagenes[actual].url}" alt="publicidad-promociones" class="img" loading="lazy">`;
  texto.innerHTML = `  <h3>${imagenes[actual].nombre}</h3>
  <p>${imagenes[actual].descripcion}</p>`;
  posicionCarrusel();
});

function posicionCarrusel() {
  puntos.innerHTML = "";
  for (var i = 0; i < imagenes.length; i++) {
    if (i == actual) {
      puntos.innerHTML += `<p class="bold">.<p>`;
    } else {
      puntos.innerHTML += `<p>.<p>`;
    }
  }
}

/** PRODUCTOS */
const losProductos = [
  {
    id: "1",
    url: "",
    nombre: "Americana",
    descripcion: "90gr de carne, lechuga, tomates, cebolla cruda, danbo, bacon",
    precio: "2500",
  },
  {
    id: "2",
    url: "",
    nombre: "Queso Azul",
    descripcion: "90gr de carne, queso azul, nueces, cebolla salteada, bacon",
    precio: "2800",
  },
  {
    id: "3",
    url: "",
    nombre: "HM burger",
    descripcion:
      "120gr de carne, morrones asados, cebolla asada, cheddar, provoleta, bacon, salsa HM (ajo,mayonesa de olivas,ketchup)",
    precio: "3200",
  },
  {
    id: "4",
    url: "",
    nombre: "Veggie",
    descripcion:
      "90 gr de medallon (lentejas), cheddar veggie, cebolla salteada,morrones, provoleta",
    precio: "2500",
  },
  {
    id: "5",
    url: "",
    nombre: "Papas HM",
    descripcion:
      "guarnicion de papas, queso cheddar, verdeo, bacon, salsa HM (ajo,mayonesa de olivas,ketchup)",
    precio: "1700",
  },
];
const productos = document.querySelector(".div-cards");

/*CARRITO*/
const carritoList = document.querySelector(".list-carrito")
const carrito = []
const total = document.querySelector("#total")

/*PRODUCTOS-CARDS*/ 
function cards() {
  productos.innerHTML = "";

  losProductos.forEach((producto) => {
    productos.innerHTML += `      
  <div class="cartas">
      <div>
        <img src="${producto.url}" alt="...">
      </div>
          <div>
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}</p>
            <p class="card-text">$${producto.precio}</p>
            <button id="${producto.id}" class="btnAgregar">Agregar</button>
          </div>
  </div>`;
  });
}

function buscarProducto(id,array){
 const producto = array.find((producto) => producto.id == id)
 return producto
}

/*EVENTOS-BUTTON */
document.addEventListener("click",(e) => {
const btnAgregar = document.querySelectorAll(".btnAgregar")
const btnEliminar = document.querySelectorAll(".btnEliminar")

  btnAgregar.forEach((btn) =>{
    if(e.target == btn){
      const id = parseInt(e.target.id)
      const producto = losProductos.find((producto) => producto.id == id);
      agregarAlCarrito(producto);
    }
  })

  btnEliminar.forEach((btnBorrar) => {
    if (e.target == btnBorrar) {
      const id = e.target.id;
      eliminarDelCarrito(id);
      totalCarrito();
    }
  });
})

/*CARRITO*/
function totalCarrito(){
  const totalFinal = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad,0)
  total.innerHTML= totalFinal
}

function agregarAlCarrito(producto){
  if(producto){
    const productoEncontrado = buscarProducto(producto.id,carrito)
    if(productoEncontrado){
      productoEncontrado.cantidad++
    }
    else{
      carrito.push({
        ...producto,
        cantidad: 1,
      })
    }
    reenderizarCarrito();
    totalCarrito()
  }
}
function eliminarDelCarrito(id) {
  const producto = buscarProducto(id, carrito);
  if (producto.cantidad > 1) {
    producto.cantidad--;
  } else {
    const index = carrito.indexOf(producto);
    carrito.splice(index, 1);
  }
  reenderizarCarrito();
}

function reenderizarCarrito(){
  carritoList.innerHTML = ""
  carrito.forEach((producto) =>{
    carritoList.innerHTML += ` <li class="producto-carrito">
    <img src="${producto.url}" alt="">
    <h3>${producto.nombre}</h3>
    <p>${producto.precio}</p>
    <p>cantidad=${producto.cantidad}</p> 
    <button id="${producto.id}" class="btnEliminar">X</button>
  </li>`
  })
}

//DOM

document.addEventListener("DOMContentLoaded", () => {
  cards()
})