// Simulador de Cuotas

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
    } else {
        return null; 
    }

    // calcula monto finall
    const montoFinal = monto + (monto * interes) / 100;
    const montoPorCuota = montoFinal / cuotas;

    return { montoFinal, montoPorCuota, interes };
}

function simuladorCuotas() {
    const monto = parseFloat(prompt("Ingrese el monto de la compra:"));
    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingrese un monto válido.");
        return;
    }

    const cuotas = parseInt(prompt("Ingrese la cantidad de cuotas (1, 3, 6, 12):"));
    if (![1, 3, 6, 12].includes(cuotas)) {
        alert("Por favor, seleccione una cantidad de cuotas válida (1, 3, 6, 12).");
        return;
    }

    const resultado = calcularCuotas(monto, cuotas);
    if (!resultado) {
        alert("Hubo un error en el cálculo. Intente nuevamente.");
        return;
    }

    // Muestra resultados
    const divResultado = document.getElementById("resultado");
    divResultado.innerHTML =
        `<p>Monto ingresado: $${monto.toFixed(2)}</p>` +
        `<p>Interés aplicado: ${resultado.interes}%</p>` +
        `<p>Monto final a pagar: $${resultado.montoFinal.toFixed(2)}</p>` +
        `<p>Monto por cuota (${cuotas} cuotas): $${resultado.montoPorCuota.toFixed(2)}</p>`;
}

document.getElementById("btnSimular").addEventListener("click", simuladorCuotas);
