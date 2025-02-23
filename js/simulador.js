

// Función para calcular el monto final con intereses
function calcularMontoFinal(precio, cuotas) {
    let interes = 0;

    if (cuotas === 3) interes = 0.10;
    else if (cuotas === 6) interes = 0.20;
    else if (cuotas === 12) interes = 0.35;

    return precio * (1 + interes);
}

// Función para simular la compra
function simularCompra(precio) {
    const cuotas = parseInt(document.getElementById("cuotas").value);
    
    if (isNaN(precio) || isNaN(cuotas) || cuotas <= 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, ingresa un monto y selecciona las cuotas.",
        });
        return;
    }

    const montoFinal = calcularMontoFinal(precio, cuotas);
    const montoPorCuota = montoFinal / cuotas;

    guardarHistorial(precio, cuotas, montoFinal, montoPorCuota);
    mostrarResultado(precio, cuotas, montoFinal, montoPorCuota); // Llamado a UI.js

    Swal.fire({
        icon: "success",
        title: "¡Simulación exitosa!",
        html: `
            <p>Precio original: <strong>$${precio.toFixed(2)}</strong></p>
            <p>Cuotas: <strong>${cuotas}</strong></p>
            <p>Monto final con intereses: <strong>$${montoFinal.toFixed(2)}</strong></p>
            <p>Monto por cuota: <strong>$${montoPorCuota.toFixed(2)}</strong></p>
        `,
        confirmButtonText: "Aceptar"
    });
}

// Función para guardar historial en localStorage
function guardarHistorial(precio, cuotas, montoFinal, montoPorCuota) {
    const historial = JSON.parse(localStorage.getItem('historialCompras')) || [];
    historial.push({ precio, cuotas, montoFinal, montoPorCuota });
    localStorage.setItem('historialCompras', JSON.stringify(historial));
}

// Evento para capturar el formulario y evitar recarga de la página
document.getElementById("formSimulador").addEventListener("submit", function(event) {
    event.preventDefault();
    const precio = parseFloat(document.getElementById("monto").value);
    simularCompra(precio);
});
