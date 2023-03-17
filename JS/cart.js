let productosEnCarrito = JSON.parse(localStorage.getItem("producto-en-cart"))
productosEnCarrito = JSON.parse (productosEnCarrito)

const containerCarritoVacio = document.querySelector ("#carritoVacio")
const containerCarritoProductos = document.querySelector ("#carritoProductos")
const containerCarritoAcciones = document.querySelector ("#carritoAcciones")
const containerCarritoComprado = document.querySelector ("#carritoComprado")
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")

containerCarritoProductos.innerHTML ="";


function cargarProductosCart(){
    if (productosEnCarrito){
        
        containerCarritoVacio.classList.add ("disabled")
        containerCarritoProductos.classList.remove ("disabled")
        containerCarritoAcciones.classList.remove ("disabled")
        containerCarritoComprado.classList.add ("disabled")
    
        productosEnCarrito.forEach(producto => {
            const div = document.createElement ("div")
            div.classList.add ("carrito-producto")
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-nombre">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>${producto.precio}</p>
                </div>
                <div class="carrito-productos-subtotal">
                    <small>Subtotal</small>
                    <p>${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3"></i></button>`;
    
                containerCarritoProductos.append(div)
    
        });
    
    } else {
    
        containerCarritoVacio.classList.add ("disabled")
        containerCarritoProductos.classList.remove ("disabled")
        containerCarritoAcciones.classList.remove ("disabled")
        containerCarritoComprado.classList.add ("disabled")
    
    }
    actualizarBotonesEliminar ()

}

cargarProductosCart()



function actualizarBotonesEliminar (){
    botonesEliminar = document.querySelectorAll (".carrito-producto-eliminar")

    botonesEliminar.forEach (boton => {
        boton.addEventListener ("click", eliminarDelCarrito)
    })
}

function eliminarDelCarrito (evento){
    const idBoton = evento.currentTarget.id
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(index,1)

    cargarProductosCart ()
    
}

localStorage.setItem ("producto-en-cart", JSON.stringify(productosEnCarrito))