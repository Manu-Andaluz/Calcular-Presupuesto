const formulario = document.getElementById('forma')

formulario.addEventListener('submit', (e) => e.preventDefault())

//Cabecero section starts
const ingresos = [
    new Ingreso(`Sueldo`, 2000.00),
    new Ingreso('Venta coche', 1500.00)
];

const egresos = [
    new Egreso('Alquiler', 900.00),
    new Egreso(`Ropa`, 400.00)
];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () => {
    let totalIngreso = 0;
    for (let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = () => {
    let totalEgreso = 0;
    for (let egreso of egresos) {
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString('en-AR', { style: 'currency', currency: 'ARG', minimumFractionDigits: 2 });
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 2 });
}
//Cabecero section ends
//Ingresos and Egresos section starts
const cargarIngresos = () => {
    let ingresosHTML = '';
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <p class="elemento_descripcion">${ingreso.descripcion}</p>
    <div class="derecha limpiarEstilos">
        <p class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</p>
            <i class="far fa-trash-alt"
                <button class="elemento-btn"
                onclick='eliminarIngreso(${ingreso.id})' >
                </button>
            </i>
    </div>
</div>
    `;
    return ingresoHTML;
}

const eliminarIngreso = (id) => {
    let indiceELiminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceELiminar, 1);
    cargarCabecero();
    cargarIngresos();
}

const cargarEgresos = () => {
    let egresosHTML = '';
    for (let egreso of egresos) {
        egresosHTML += crearEgresosHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresosHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <p class="elemento_descripcion">${egreso.descripcion}</p>
    <div class="derecha limpiarEstilos">
        <p class="elemento_valor">- ${formatoMoneda(egreso.valor)}</p>
        <p class="elemento_porcentaje">${formatoPorcentaje(egreso.valor / totalEgresos())}</p>
            <i class="far fa-trash-alt"
                <button class="elemento-btn"
            onclick='eliminarEgreso(${egreso.id})' >
            </button>
            </i>
    </div>
</div>
    `;
    return egresoHTML;
}

const eliminarEgreso = (id) => {
    let indiceELiminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceELiminar, 1);
    cargarCabecero();
    cargarEgresos();
}
//Ingresos and Egresos section ends
//Form section starts
let agregarDato = () => {
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];

    if (descripcion.value !== '' && valor.value !== '') {
        if (tipo.value === 'ingreso') {
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }
        else if (tipo.value === 'egreso') {
            egresos.push(new Egreso(descripcion.value, + valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
    descripcion.value = ''
    valor.value = ''
}
//Form section ends