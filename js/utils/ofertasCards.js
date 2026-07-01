import { estadosJson } from "./estadosJson.js";

export async function renderCards() {
  
  const container = document.querySelector(".cards-container");
  const estados = estadosJson("estados-card");
  
  if (!container) return;

  try {
    // Estado 1
    estados.loadingState();
    const respuesta = await fetch("./js/data/ofertas.json");

    const data = await respuesta.json();
    // Estado 2
    const ofertas = data.ofertas;
    estados.successState(ofertas.length);

    // Renderizar con descuento del 60%
    container.innerHTML = ofertas.map(oferta => {
      // Paso 1: convertir costo a número
      const costoOriginal = parseFloat(oferta.costo.replace("$", ""));
      // Paso 2: aplicar descuento (40% del precio)
      const costoDescuento = (costoOriginal * 0.4).toFixed(2); // dos decimales
      // Paso 3: formatear
      const costoOferta = `$${costoDescuento}`;
      


      return `
      <div class="card">
        <div class="img-container">
          <img class="img-ofertas" src="${oferta.imagen}" alt="${oferta.origen}">
        </div>
        <div class="content-container flex-column align-center justify-between">
          <h2 class="text-center dest-ori">${oferta.origen} - ${oferta.destino}</h2>
          <h1 class="color-accent">${costoOferta}</h1>
          <button class="ofertas-card-boton flex-column align-center justify-center font-bold size-20">COMPRAR</button>
        </div>
      </div>
    `}).join(""); // join para unir todo en un solo string)

    container.addEventListener("click", e => {
    if (e.target.classList.contains("ofertas-card-boton")) {
      const cardIndex = [...container.querySelectorAll(".ofertas-card-boton")].indexOf(e.target);
      const vueloSeleccionado = ofertas[cardIndex]; // objeto completo del JSON

      // aplicar descuento al objeto antes de guardar
      const costoOriginal = parseFloat(vueloSeleccionado.costo.replace("$", ""));
      const costoDescuento = (costoOriginal * 0.4).toFixed(2);
      vueloSeleccionado.costoOriginal = vueloSeleccionado.costo;
      vueloSeleccionado.costo = `$${costoDescuento}`;

      localStorage.setItem("vueloSeleccionado", JSON.stringify(vueloSeleccionado));

      window.location.href = "../../pages/pago.html";
    }
  });
  } catch (error) {
    console.error("error:", error);
    // Estado 3
    estados.errorState();
  }
}
