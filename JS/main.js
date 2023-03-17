const productosPetShop = [
    {
        id: "Comida-DogXtreme",
        titulo: "Comida DogXtreme",
        imagen: "/assets/img/dogxtreme-dog-senior-light-3-kg.jpg",
        categoria:{
            nombre: "Alimento para perro",
            id: "Alimento"},
        precio: 155
    },
    {
        id: "Brit-medium-breeds",
        titulo: "Brit Medium Breeds",
        imagen: "/assets/img/brit-care-adult-medium-breed-lr-adulto-raza-mediana-cordero-y-arroz.webp",
        categoria:{
            nombre: "Alimento para perro",
            id: "Alimento"},
        precio: 290
    },
    {
        id: "Brit-premium-cachorros",
        titulo: "Brit Premium Cachorros",
        imagen: "/assets/img/brit-premium-acu-li-pet-shop-store-comida-alimento-seco-perros-cachorro-bebe-raza-mediana-pollo.jpg",
        categoria:{
            nombre: "Alimento para perro",
            id: "Alimento"},
        precio: 210
    },
    {
        id: "Correa-Chubi-sky",
        titulo: "Correa Chubi Sky Mint",
        imagen: "/assets/img/collar chubi Sky mint.jpg",
        categoria:{
            nombre: "Correas y Collares para Perro",
            id: "Correas y collares"},
        precio: 90
    },
    {
        id: "Juguete-para-Perro",
        titulo: "Juguete para Perro",
        imagen: "/assets/img/juguetesPerro.jfif",
        categoria:{
            nombre: "Correas y Collares para Perro",
            id: "Correas y collares"},
        precio: 90
    },
    {
        id: "Bandana-para-Perro",
        titulo: "Bandana para perro",
        imagen: "/assets/img/bandanaParaPerro.jfif",
        categoria:{
            nombre: "Ropa y accesorios",
            id: "ropa y accesorio"},
        precio: 30
    },
    {
        id: "Bandana-para-Gato",
        titulo: "Bandana para Gato",
        imagen: "/assets/img/BANDANAparaGatos.jfif",
        categoria:{
            nombre: "Ropa y accesorios",
            id: "ropa y accesorio"},
        precio: 25
    },
    {
        id: "Correa-Chubi-Pink",
        titulo: "Correa Chubi Pink Mint",
        imagen: ".assets/img/correa chubi pink mint.jfif",
        categoria:{
            nombre: "Correas y Collares para Perro",
            id: "Correas y collares"},
        precio: 90
    },
]

const contenedorProductos = document.querySelector ("#container-productos")
const botonesCategorías = document.querySelectorAll (".boton-categoria")
const tituloPrincipal = document.querySelector("#tituloPrincipal")
let botonesAgregar = document.querySelectorAll (".productoAgregar")
const number = document.querySelector ("#number")

function cargarProductos(productosPetShop){
    
    contenedorProductos.innerHTML = ""

    productosPetShop.forEach (producto=>{

        const div = document.createElement ("div");
        div.classList.add("producto")
        div.innerHTML =`<img class="productoImagen" src= "${producto.imagen}." alt="${producto.titulo}">
        <div class="productoDetalles">
            <h3 class="productoTitulo">${producto.titulo}</h3>
            <p class="productoPrecio">${producto.precio}</p>
            <button class="productoAgregar" id="${producto.id}">Agregar</button>
        </div> `;
        
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
} 

cargarProductos (productosPetShop);

botonesCategorías.forEach (boton => {
    boton.addEventListener ("click", (evento)=>{

        botonesCategorías.forEach (boton => boton.classList.remove("active"))
        evento.currentTarget.classList.add ("active");
        if(evento.currentTarget.id != "todos"){
            const productoCategoria = productosPetShop.find (producto => producto.categoria.id === evento.target.id)
            tituloPrincipal.innerHTML = productoCategoria.categoria.nombre
        const productosBoton = productosPetShop.filter (producto => producto.categoria.id === evento.currentTarget.id)
        cargarProductos (productosBoton)
    } else{
        tituloPrincipal.innerHTML = "Un poco de todo"
        cargarProductos (productosPetShop)
    }
    }
    )
});

function actualizarBotonesAgregar (){
    botonesAgregar = document.querySelectorAll (".productoAgregar")

    botonesAgregar.forEach (boton => {
        boton.addEventListener ("click", agregarAlCart)
    })
}


let productosEnCart;
let productosEnCartLS = JSON.parse(localStorage.getItem ("producto-en-cart"))
;
if (productosEnCartLS){
    productosEnCart = productosEnCartLS;

    refreshNumber ();
    
} else {
    productosEnCart = []
}






function agregarAlCart (evento){
    const idBoton = evento.currentTarget.id
    const productoAgregado = productosPetShop.find (producto => producto.id === idBoton)

    if (productosEnCart.some(producto => producto.id === idBoton)){
        const indice = productosEnCart.findIndex (producto => producto.id === idBoton)
        productosEnCart[indice].cantidad++
    } else {
        productoAgregado.cantidad=1;
        productosEnCart.push (productoAgregado)
    }
    refreshNumber()

    localStorage.setItem ("producto-en-cart", JSON.stringify (productosEnCart));

}

function refreshNumber (){
    let newNumber = productosEnCart.reduce ((acc,producto)=> acc + producto.cantidad,0);
    number.innerText = newNumber
}