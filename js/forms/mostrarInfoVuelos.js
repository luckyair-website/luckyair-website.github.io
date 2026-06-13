import { destinos } from "../data/destinos.js";

export function mostrarInfoVuelos() {
  const pagoHeader = document.querySelector("#pago-header");
  if (!pagoHeader) return;

  const destinoSeleccionado = localStorage.getItem("destinoSeleccionado");
  const origen = localStorage.getItem("origen");
  const destino = localStorage.getItem("destino");

  if (destinoSeleccionado) {
    // --- Flujo de cards ---
    const destinoObj = JSON.parse(destinoSeleccionado);

    document.querySelector("#content-origen").textContent = "Xi’an"; // siempre se mostrara como origen en los cards
    document.querySelector("#content-destino").textContent = destinoObj.nombre;
    document.querySelector("#content-precio").textContent = destinoObj.costo;

    console.log("B - flujo cards");

  } else if (origen && destino) {
    // --- Flujo de inputs ---
    const cantidad = parseInt(localStorage.getItem("cantidad"), 10);
    const destinoObj = destinos.find(d => d.nombre === destino);
    if (!destinoObj) return;

    const precioBase = parseInt(destinoObj.costo.replace("$", ""), 10);
    const precioTotal = precioBase * cantidad;

    document.querySelector("#content-origen").textContent = origen;
    document.querySelector("#content-destino").textContent = destino;
    document.querySelector("#content-precio").textContent = `$${precioTotal}`;

    console.log("A - flujo inputs");
    console.log(cantidad);
    console.log(precioBase);
  }
}
