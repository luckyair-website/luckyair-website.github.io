import { destinos2 as vuelos } from "../data/destinos2.js";

export function buscarVuelos2() {

    const lista = document.querySelector("#lista-vuelos");
    const input = document.querySelector("#input-destino");
    const filtro = document.querySelector("#filtro-tipo");

    const info = document.querySelector("#info-vuelo");
    const salida = document.querySelector("#salida");
    const duracion = document.querySelector("#duracion");
    const precio = document.querySelector("#precio-vuelo");
    const alerta = document.querySelector("#alerta-vuelo");
    const contador = document.querySelector("#contador-tiempo");

    if (!lista) return;

    let vuelosFiltrados = [...vuelos];

    // -----------------------------
    // RENDER CARDS
    // -----------------------------
    function renderVuelos(data) {

        lista.innerHTML = "";

        data.forEach(vuelo => {

            const card = document.createElement("div");
            card.classList.add("vuelo-card");

            card.innerHTML = `
                <img src="${vuelo.imagen}" alt="${vuelo.nombre}" width="200">
                <h3>${vuelo.nombre}</h3>
                <p>${vuelo.descripcion}</p>
                <p><strong>${vuelo.costo}</strong></p>
                <p>${vuelo.tipo.toUpperCase()}</p>
                
            `;

            card.addEventListener("click", () => {
    mostrarDetalle(vuelo);
    iniciarSimulador(vuelo);

    document.querySelector("#panel-vuelo")
        .scrollIntoView({ behavior: "smooth", block: "start" });
});

lista.appendChild(card);
        });
    }

    // -----------------------------
    // ⏱️ SIMULADOR DE TIEMPO
    // -----------------------------
    let intervalo;

    function iniciarSimulador(vuelo) {

        clearInterval(intervalo);

        const ahora = new Date();

        const salidaHora = new Date();
        const [h, m] = vuelo.salida.split(":");
        salidaHora.setHours(h, m, 0);

        const llegada = new Date(salidaHora.getTime());
        llegada.setMinutes(llegada.getMinutes() + parseInt(vuelo.duracion));

        function actualizar() {

            const ahora = new Date();
            const diff = llegada - ahora;

            if (diff <= 0) {
                contador.textContent = "✈ Ya llegaste a destino";
                clearInterval(intervalo);
                return;
            }

            const horas = Math.floor(diff / 1000 / 60 / 60);
            const minutos = Math.floor((diff / 1000 / 60) % 60);

            contador.textContent = `⏱ Llegas en ${horas}h ${minutos}m`;
        }

        actualizar();
        intervalo = setInterval(actualizar, 1000);
    }

    // -----------------------------
    // PANEL DERECHO
    // -----------------------------
    function mostrarDetalle(vuelo) {

        info.innerHTML = `
            <strong>${vuelo.nombre}</strong>
            <p>${vuelo.descripcion}</p>
            <p>Tipo: ${vuelo.tipo}</p>
            <p>Asientos disponibles: ${vuelo.asientos}</p>
        `;

        salida.textContent = `Salida: ${vuelo.salida}`;
        duracion.textContent = `Duración: ${vuelo.duracion}`;
        precio.textContent = vuelo.costo;

        let mensaje = "";

        if (vuelo.asientos <= 3) {
            mensaje = "🔥 Últimos asientos disponibles";
        } else if (vuelo.variacionPrecio < 0) {
            mensaje = "📉 Este vuelo está en oferta";
        } else {
            mensaje = "✈ Vuelo estable";
        }

        alerta.textContent = mensaje;
    }

    // -----------------------------
    // FILTROS
    // -----------------------------
    function filtrar() {

        const texto = input.value.toLowerCase();
        const tipo = filtro.value;

        vuelosFiltrados = vuelos.filter(v => {

            const coincideTexto = v.nombre.toLowerCase().includes(texto);
            const coincideTipo = tipo === "todos" || v.tipo === tipo;

            return coincideTexto && coincideTipo;
        });

        renderVuelos(vuelosFiltrados);
    }

    input.addEventListener("input", filtrar);
    filtro.addEventListener("change", filtrar);

    renderVuelos(vuelos);
}