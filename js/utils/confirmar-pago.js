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

  console.log("Vuelo recibido:", vueloSeleccionado);

  const origen = localStorage.getItem("origen");
  const destino = localStorage.getItem("destino");

  // Solo salir si no hay información de ningún flujo
  if (!vueloSeleccionado && (!origen || !destino)) return;

  document.querySelector("#content-origen").textContent =
    vueloSeleccionado?.origen || "---";

  document.querySelector("#content-destino").textContent =
    vueloSeleccionado?.destino || vueloSeleccionado?.nombre || "---";

  let fechaMostrar = vueloSeleccionado?.fecha;

  if (fechaMostrar === "CURRENT_DATE") {
    const hoy = new Date();
    fechaMostrar = hoy.toISOString().split("T")[0];
  } else {
    const ida = vueloSeleccionado?.ida || "";
    const vuelta = vueloSeleccionado?.vuelta || "";
    fechaMostrar = `${ida} ${vuelta}`;
  }

  document.querySelector("#content-fecha").textContent = fechaMostrar || "---";
  document.querySelector("#content-numero-vuelo").textContent =
    vueloSeleccionado?.numeroVuelo || "---";
  document.querySelector("#content-duracion").textContent =
    vueloSeleccionado?.duracion || "---";

  document.querySelector("#pasajero").textContent =
    usuarioObj.nombre || "Usuario Frecuente";

  document.querySelector("#metodo").textContent =
    usuarioObj.metodo || "---";

  document.querySelector("#tarjeta").textContent =
    usuarioObj.cardMask || "Visa **** **** **** 1234";

  document.querySelector("#total-pago").textContent =
    vueloSeleccionado?.costo || vueloSeleccionado?.costoTotal || "---";
}
