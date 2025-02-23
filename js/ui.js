function mostrarProductos(productos) {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";
    
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <button onclick="simularCompra(${producto.precio})">Simular Compra</button>
        `;
        contenedor.appendChild(div);
    });
}

// Función para mostrar los resultados de la simulación en la interfaz
function mostrarResultado(precio, cuotas, montoFinal, montoPorCuota) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `
        <h3>Simulación de Compra</h3>
        <p>Precio original: <strong>$${precio.toFixed(2)}</strong></p>
        <p>Cuotas: <strong>${cuotas}</strong></p>
        <p>Monto final con intereses: <strong>$${montoFinal.toFixed(2)}</strong></p>
        <p>Monto por cuota: <strong>$${montoPorCuota.toFixed(2)}</strong></p>
    `;
}

// Función para mostrar el historial de compras
function mostrarHistorial() {
    const historial = JSON.parse(localStorage.getItem('historialCompras')) || [];
    const contenedor = document.getElementById("historial");
    
    contenedor.innerHTML = "<h3>Historial de Compras</h3>";
    if (historial.length === 0) {
        contenedor.innerHTML += "<p>No hay compras registradas.</p>";
        return;
    }

    historial.forEach((compra, index) => {
        contenedor.innerHTML += `
            <div>
                <p><strong>Compra ${index + 1}</strong></p>
                <p>Precio: $${compra.precio.toFixed(2)}</p>
                <p>Cuotas: ${compra.cuotas}</p>
                <p>Monto final: $${compra.montoFinal.toFixed(2)}</p>
                <p>Monto por cuota: $${compra.montoPorCuota.toFixed(2)}</p>
                <hr>
            </div>
        `;
    });
}
// Función para borrar el historial de compras
function borrarHistorial() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará todo el historial de compras.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('historialCompras');
            mostrarHistorial(); // Actualiza la UI
            Swal.fire("¡Eliminado!", "El historial ha sido borrado.", "success");
        }
    });
}


document.addEventListener("DOMContentLoaded", mostrarHistorial);
