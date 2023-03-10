


const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito</h1>
    `;
    modalContainer.append(modalHeader);
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "X";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    })
    modalHeader.append(modalbutton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
        <img src= "${product.img}">
        <h3>${product.nombre}</h3>
        <p>${product.precio} $</p>
        <span class="restar"> - </span>
        <p>Cantidad: ${product.cantidad}</p>
        <span class="sumar"> + </span>
        <p> Total: ${product.cantidad * product.precio}</p>
        <span class="delete-product"> X </span>
    `;
        modalContainer.append(carritoContent)

        let restar = carritoContent.querySelector(".restar")
        restar.addEventListener("click", () => {
            if (product.cantidad !== 1)
                product.cantidad--;
            saveLocal();
            pintarCarrito();
        })

        let sumar = carritoContent.querySelector(".sumar")
        sumar.addEventListener("click", () => {
            product.cantidad++;
            saveLocal();
            pintarCarrito();
        })

        let eliminar = carritoContent.querySelector(".delete-product");
        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);

        })
        
        
    });


    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalCompra = document.createElement("div")
    totalCompra.className = "total-content"
    totalCompra.innerHTML = `total a pagar : ${total} $ <button class = "botonComprar" > Comprar </button>`
    modalContainer.append(totalCompra);

    const procesarCompra = document.querySelector(".botonComprar")

    procesarCompra.addEventListener("click", () => {

        if (carrito.length === 0) {

            Swal.fire({

                title: "??Tu carrito est?? vacio!",

                text: "Escoje alguno de nuestros productos para poder continuar con el pago",

                icon: "error",

                confirmButtonText: "Aceptar",

            });

        } else {

            Swal.fire({

                title: "??Tu compra fue procesada!",

                text: "A continuaci??n nos contactaremos para realizar la compra solicitada",

                icon: "success",

                confirmButtonText: "Aceptar",

            });

        }

    });

};






verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    const buscarId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== buscarId;
    })
    carritoContador();
    saveLocal()
    pintarCarrito();
}

const carritoContador = () => {
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}

carritoContador();