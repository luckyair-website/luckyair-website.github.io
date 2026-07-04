import { destinos } from "../data/destinos.js";

export function mostrarConfirmacionPago() {
  const ruta = document.querySelector("#ruta-vuelo");
  const fechas = document.querySelector("#content-fecha");
  const pasajero = document.querySelector("#pasajero");
  const tarjeta = document.querySelector("#tarjeta");
  const total = document.querySelector("#total-pago");

  // ❗ evitar errores si la página no es esta
  if (!ruta || !fechas || !pasajero || !tarjeta || !total) return;

  const vueloSeleccionado = JSON.parse(localStorage.getItem("vueloSeleccionado"));
  const usuarioInfo = localStorage.getItem("pagoInfo");
  const usuarioObj = usuarioInfo ? JSON.parse(usuarioInfo) : {};

  // ===================================================
  // NUEVO FLUJO (buscarVuelos2)
  // ===================================================
  if (vueloSeleccionado) {

    document.querySelector("#content-origen").textContent =
      vueloSeleccionado.origen || "---";

    document.querySelector("#content-destino").textContent =
      vueloSeleccionado.nombre || vueloSeleccionado.destino || "---";

    document.querySelector("#content-fecha").textContent =
      vueloSeleccionado.salida || "---";

    document.querySelector("#content-numero-vuelo").textContent =
      vueloSeleccionado.numeroVuelo || "LK2345";

    document.querySelector("#content-duracion").textContent =
      vueloSeleccionado.duracion || "---";

    document.querySelector("#pasajero").textContent =
      usuarioObj.nombre || "Usuario Frecuente";

    document.querySelector("#metodo").textContent =
      usuarioObj.metodo || "Visa";

    document.querySelector("#tarjeta").textContent =
      usuarioObj.cardMask || "**** **** **** 1234";

    document.querySelector("#total-pago").textContent =
      vueloSeleccionado.costo;

    return;
  }

  // ===================================================
  // FLUJO ANTIGUO (NO TOCAR)
  // ===================================================
  const origen = localStorage.getItem("origen");
  const destino = localStorage.getItem("destino");

  if (!origen || !destino) return;

  document.querySelector("#content-origen").textContent = origen;
  document.querySelector("#content-destino").textContent = destino;
}
