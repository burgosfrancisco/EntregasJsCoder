// Obtener elementos del DOM
const formSimulador = document.getElementById("formSimulador");
const resultadoDiv = document.getElementById("resultado");
const historialUl = document.getElementById("historial");

// Función para calcular el monto final
function calcularCuotas(monto, cuotas) {
    let interes = 0;

    // Asignar interés según la cantidad de cuotas
    if (cuotas === 1) {
        interes = 0;
    } else if (cuotas === 3) {
        interes = 10;
    } else if (cuotas === 6) {
        interes = 20;
    } else if (cuotas === 12) {
        interes = 35;
    }

    // Calcular monto final e importe por cuota
    const montoFinal = monto + (monto * interes) / 100;
    const montoPorCuota = montoFinal / cuotas;

    return { montoFinal, montoPorCuota, interes };
}

// Función para manejar el formulario
function manejarFormulario(event) {
    event.preventDefault(); // Evitar recarga de página

    // Obtener valores del formulario
    const monto = parseFloat(document.getElementById("monto").value);
    const cuotas = parseInt(document.getElementById("cuotas").value);

    // Validar entrada
    if (isNaN(monto) || monto <= 0) {
        resultadoDiv.innerHTML = `<p style="color:red;">Ingrese un monto válido.</p>`;
        return;
    }

    // Calcular resultado
    const resultado = calcularCuotas(monto, cuotas);

    // Mostrar resultado
    resultadoDiv.innerHTML = `
        <p><strong>Monto ingresado:</strong> $${monto.toFixed(2)}</p>
        <p><strong>Interés aplicado:</strong> ${resultado.interes}%</p>
        <p><strong>Monto final a pagar:</strong> $${resultado.montoFinal.toFixed(2)}</p>
        <p><strong>Monto por cuota (${cuotas} cuotas):</strong> $${resultado.montoPorCuota.toFixed(2)}</p>
    `;

    // Guardar en localStorage
    guardarEnHistorial(monto, cuotas, resultado.montoFinal, resultado.montoPorCuota);
}

// Función para guardar historial en localStorage
function guardarEnHistorial(monto, cuotas, montoFinal, montoPorCuota) {
    let historial = JSON.parse(localStorage.getItem("historial")) || [];

    const nuevoCalculo = {
        monto,
        cuotas,
        montoFinal,
        montoPorCuota,
    };

    historial.push(nuevoCalculo);
    localStorage.setItem("historial", JSON.stringify(historial));

    mostrarHistorial();
}

// Función para mostrar historial
function mostrarHistorial() {
    historialUl.innerHTML = "";
    let historial = JSON.parse(localStorage.getItem("historial")) || [];

    historial.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `Compra de $${item.monto.toFixed(2)} en ${item.cuotas} cuotas - Total: $${item.montoFinal.toFixed(2)}, Cuota: $${item.montoPorCuota.toFixed(2)}`;
        
        // Botón para eliminar historial
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.style.marginLeft = "10px";
        botonEliminar.onclick = () => eliminarDelHistorial(index);
        
        li.appendChild(botonEliminar);
        historialUl.appendChild(li);
    });
}

// Función para eliminar un cálculo del historial
function eliminarDelHistorial(index) {
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    historial.splice(index, 1);
    localStorage.setItem("historial", JSON.stringify(historial));
    mostrarHistorial();
}

// Cargar historial al iniciar
document.addEventListener("DOMContentLoaded", mostrarHistorial);

// Asociar evento al formulario
formSimulador.addEventListener("submit", manejarFormulario);
