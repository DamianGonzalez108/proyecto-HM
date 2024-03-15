/* PRODUCTOS */
const losProductos = [
  {
    id: "1",
    url: "/images/american.burger.jpg",
    nombre: "Americana",
    descripcion: "doble medallon,lechuga,tomate,jamon,tibo,huevo",
    precio: "2500",
    categoria: "hamburguesas",
  },
  {
    id: "2",
    url: "/images/la.blue.jpg",
    nombre: "Queso Azul",
    descripcion: "doble medallon,rokefort,cebolla,mozzarella,bacon",
    precio: "2800",
    categoria: "hamburguesas",
  },
  {
    id: "3",
    url: "/images/burger.bros.jpg",
    nombre: "HM burger",
    descripcion: "doble medallon,cheddar,provoleta,tomates confitados",
    precio: "3200",
    categoria: "hamburguesas",
  },
  {
    id: "4",
    url: "/images/full.began.jpg",
    nombre: "Veggie",
    descripcion: "medallon de lenteja,cheddar,tomate,lechuga,tibo",
    precio: "2500",
    categoria: "hamburguesas",
  },
  {
    id: "5",
    url: "/images/papas.jpg",
    nombre: "Papas Fritas",
    descripcion: "porcion de fritas simple",
    precio: "1700",
    categoria: "guarnicion",
  },
  {
    id: "6",
    url: "/images/papas-cheddar-jamon.jpg",
    nombre: "Papas Bacon",
    descripcion: "porcion de fritas c/ cheddar y bacon",
    precio: "1700",
    categoria: "guarnicion",
  },
  {
    id: "7",
    url: "/images/papas-chedar-carne.jpg",
    nombre: "Papas HM",
    descripcion: "porcion de fritas c/ cheddar y carne en trozos",
    precio: "1700",
    categoria: "guarnicion",
  },
  {
    id: "8",
    url: "/images/papas-americanas.jpg",
    nombre: "Papas Americanas",
    descripcion: "porcion de fritas corte americanas",
    precio: "1700",
    categoria: "guarnicion",
  },
  {
    id: "9",
    url: "/images/pepsi.jpg",
    nombre: "Pepsi",
    descripcion: "",
    precio: "1700",
    categoria: "bebidas",
  },  {
    id: "10",
    url: "/images/7up.jpeg",
    nombre: "7UP",
    descripcion: "",
    precio: "1700",
    categoria: "bebidas",
  },  {
    id: "11",
    url: "/images/ipa.jpg",
    nombre: "Patagonia IPA",
    descripcion: "elaborada con trigo y lúpulo",
    precio: "1700",
    categoria: "bebidas",
  },  {
    id: "12",
    url: "/images/agua.con.gas.jpg",
    nombre: "Agua S/GAS",
    descripcion: "agua mineral eco de los andes",
    precio: "1700",
    categoria: "bebidas",
  },
];
const productos = document.querySelector(".div-cards");
const buttonCategory = document.querySelectorAll(".button-category");
const selectProduct = document.querySelector("#productSelect")
/*CARRITO*/
const carritoList = document.querySelector(".list-carrito");
const carrito = [];
const total = document.querySelector(".div-total-final");
const carritoHidde = document.querySelector(".button-show-carrito");
const comprasHidde = document.querySelector("#compras-carrito");


/*PRODUCTOS-CARDS*/
function cards(productosFiltrados) {
  productos.innerHTML = "";
  productosFiltrados.forEach((producto) => {
    productos.innerHTML += `
  <div class="cartas">
      <div class="div-images">
        <img src="${producto.url}" alt="imagenes-del-menu" class="imgs-cards">
      </div>
          <div class="div-txt">
          <div class="div-tittle-precio">
            <h5 class="card-title titulo-cartas">${producto.nombre}</h5>
            <p class="card-text cartas-precio">$${producto.precio}</p>
          </div>  
            <p class="card-text descripcion-txt">${producto.descripcion}</p>
          <div class="div-btn-agregar">
            <button id="${producto.id}" class="btnAgregar">Agregar</button>
          </div>            
          </div>
          
  </div>
  `;
  });
}

function buscarProducto(id, array) {
  const producto = array.find((producto) => producto.id == id);
  return producto;
}

/* FILTRADO DE OBJETOS */

buttonCategory.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    buttonCategory.forEach((boton) => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");
    if (e.currentTarget.id != "todos") {
      const botonProductosFiltrados = losProductos.filter(
        (producto) => producto.categoria === e.currentTarget.id
      );
      cards(botonProductosFiltrados);
    } else {
      cards(losProductos);
    }
  });
});

/* ORDEN DE PRODUCTOS */

function reenderizarselect (){
const masRelevante = document.querySelector(".mas-relevante")
}
 
losProductos.sort((a,b) => {
  if(a.precio < b.precio){
    return -1
  }

})



/*EVENTOS-BUTTON */
carritoHidde.addEventListener("click", () => {
  const currentDisplay = comprasHidde.style.display;
if (currentDisplay === "none") {
    comprasHidde.style.display = "block";
  } else {
    comprasHidde.style.display = "none";
  }
});
document.addEventListener("click", (e) => {

  const btnAgregar = document.querySelectorAll(".btnAgregar");
  const btnEliminar = document.querySelectorAll(".btnEliminar");
  
  btnAgregar.forEach((btn) => {
    if (e.target == btn) {
      const id = parseInt(e.target.id);
      const producto = losProductos.find((producto) => producto.id == id);
      comprasHidde.style.display = "block";
      agregarAlCarrito(producto);
    }
  });

  btnEliminar.forEach((btnBorrar) => {
    if (e.target == btnBorrar) {
      const id = e.target.id;
      eliminarDelCarrito(id);
      totalCarrito();
    }
  }); 
});

/*BOTON SCROLL MAIN*/
const scrollButton = document.querySelector("#scroll-button");
scrollButton.addEventListener("click", () => {
  window.scrollTo({
    top: 700,
    behavior: "smooth",
  });
});

/*CARRITO*/
function totalCarrito() {
  total.innerHTML = ""
  if(carrito <1){
  }
  else{
     const totalFinal = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  total.innerHTML += `<p class="total">Total:$${totalFinal}</p>` ;
  }
 
}

function agregarAlCarrito(producto) {
  if (producto) {
    const productoEncontrado = buscarProducto(producto.id, carrito);
    if (productoEncontrado) {
      productoEncontrado.cantidad++;
    } else {
      carrito.push({
        ...producto,
        cantidad: 1,
      });
    }
    reenderizarCarrito();
    totalCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
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
  totalCarrito()
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function reenderizarCarrito() {
  if(carrito == 0){
    carritoList.innerHTML=`<p class="carrito-txt">No hay productos en el carrito.</p>`
  }
  else{
      carritoList.innerHTML = "";
  carrito.forEach((producto) => {
    carritoList.innerHTML += ` <li class="producto-carrito">
    <img src="${producto.url}" alt="" class="img-producto">
    <div class="div-padre-carrito">
    <div class="div-producto-carrito">
    <div class="nombre-cantidad-carrito">
    <h3>${producto.cantidad}x${producto.nombre}</h3>
    </div>
    <div>
    <h3>$${producto.precio}</h3>
    </div>
    </div>
    
   <div class="div-eliminar-carrito">
   <button id="${producto.id}" class="btnEliminar">ELIMINAR</button>
   </div>
   </div>
   </li>`;
  });
  }
}

//DOM

document.addEventListener("DOMContentLoaded", () => {
  cards(losProductos);
  comprasHidde.style.display = "none";
  const carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carritoStorage.length > 0) {
    carritoStorage.forEach((producto) => {
      carrito.push(producto);
    });
    reenderizarCarrito();
    totalCarrito();
  } else {
    Toastify({
      text: "No hay productos en el carrito",
      duration: 2000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  }
});
