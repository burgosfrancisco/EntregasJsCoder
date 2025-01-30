const formSimulador = document.getElementById("formSimulador");
const resultadoDiv = document.getElementById("resultado");
const historialUl = document.getElementById("historial");

//calcular cuotas 
function calcularCuotas(monto, cuotas) {
    let interes = 0;

    if (cuotas === 1) {
        interes = 0;
    } else if (cuotas === 3) {
        interes = 10;
    } else if (cuotas === 6) {
        interes = 20;
    } else if (cuotas === 12) {
        interes = 35;
    }

   //monto final 
    const montoFinal = monto + (monto * interes) / 100;
    const montoPorCuota = montoFinal / cuotas;

    return { montoFinal, montoPorCuota, interes };
}

// manejar el formulario
function manejarFormulario(event) {
    event.preventDefault(); //no recarga la pagina
    const monto = parseFloat(document.getElementById("monto").value);
    const cuotas = parseInt(document.getElementById("cuotas").value);

    if (isNaN(monto) || monto <= 0) {
        resultadoDiv.innerHTML = `<p style="color:red;">Ingrese un monto válido.</p>`;
        return;
    }

    const resultado = calcularCuotas(monto, cuotas);

    // resultado
    resultadoDiv.innerHTML = `
        <p><strong>Monto ingresado:</strong> $${monto.toFixed(2)}</p>
        <p><strong>Interés aplicado:</strong> ${resultado.interes}%</p>
        <p><strong>Monto final a pagar:</strong> $${resultado.montoFinal.toFixed(2)}</p>
        <p><strong>Monto por cuota (${cuotas} cuotas):</strong> $${resultado.montoPorCuota.toFixed(2)}</p>
    `;

    // guardar en localStorage
    guardarEnHistorial(monto, cuotas, resultado.montoFinal, resultado.montoPorCuota);
}

// guardar en localstorage
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
//mostrar historial
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

function eliminarDelHistorial(index) {
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    historial.splice(index, 1);
    localStorage.setItem("historial", JSON.stringify(historial));
    mostrarHistorial();
}
document.addEventListener("DOMContentLoaded", mostrarHistorial);
formSimulador.addEventListener("submit", manejarFormulario);
