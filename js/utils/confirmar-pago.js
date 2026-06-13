import { destinos } from "../data/destinos.js";

export function mostrarConfirmacionPago() {
  const ruta = document.querySelector("#ruta-vuelo");
  const fechas = document.querySelector("#fechas-vuelo");
  const pasajero = document.querySelector("#pasajero");
  const tarjeta = document.querySelector("#tarjeta");
  const total = document.querySelector("#total-pago");

  // ❗ evitar errores si la página no es esta
  if (!ruta || !fechas || !pasajero || !tarjeta || !total) return;

  const origen = localStorage.getItem("origen");
  const destino = localStorage.getItem("destino");
  const ida = localStorage.getItem("ida");
  const vuelta = localStorage.getItem("vuelta");
  const cantidad = Number(localStorage.getItem("cantidad") || 1);

  if (!origen || !destino) return;

  // ✈️ RUTA
  ruta.textContent = `${origen.toUpperCase()} → ${destino.toUpperCase()}`;

  // 📅 FECHAS
  fechas.textContent = `${ida} - ${vuelta}`;

  // 👤 DEMO
  pasajero.textContent = "PASAJERO DEMO";

  // 💳 DEMO
  tarjeta.textContent = "Visa **** **** **** 1234";

  // 🔥 BUSCAR DESTINO REAL
  const destinoObj = destinos.find(d => d.nombre === destino);

  if (!destinoObj) {
    console.error("Destino no encontrado:", destino);
    return;
  }

  // 💰 CALCULO REAL
  const precioBase = Number(destinoObj.costo.replace("$", ""));
  const precioTotal = precioBase * cantidad;

  total.textContent = `$${precioTotal} USD`;
}