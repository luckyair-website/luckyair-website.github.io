import { destinos } from "../data/destinos.js";

export function mostrarConfirmacionPago() {
  const ruta = document.querySelector("#ruta-vuelo");
  const fechas = document.querySelector("#content-fecha");
  const pasajero = document.querySelector("#pasajero");
  const tarjeta = document.querySelector("#tarjeta");
  const total = document.querySelector("#total-pago");

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

    // 🔥 AQUÍ VA (FECHA)
    let fechaFinal = "";

    if (
      vueloSeleccionado.fecha &&
      vueloSeleccionado.fecha !== "CURRENT_DATE"
    ) {
      fechaFinal = vueloSeleccionado.fecha;
    } else if (vueloSeleccionado.salida) {
      fechaFinal = `Salida: ${vueloSeleccionado.salida}`;
    } else {
      /* fechaFinal = "---"; */
      const hoy = new Date();
      // Formato YYYY-MM-DD
      fechaFinal = hoy.toISOString().split("T")[0];
    }

    document.querySelector("#content-fecha").textContent = fechaFinal;

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

      console.log(vueloSeleccionado);
      console.log(usuarioInfo);

    return;
  }

  // ===================================================
  // FLUJO ANTIGUO (NO TOCAR)
  // ===================================================
  const origen = localStorage.getItem("origen");
  const destino = localStorage.getItem("destino");

  if (!origen || !destino) return;

    document.querySelector("#pasajero").textContent = usuarioObj.nombre || "Usuario Frecuente"; 
    
    document.querySelector("#metodo").textContent = usuarioObj.metodo; 
    document.querySelector("#tarjeta").textContent = usuarioObj.cardMask; 

    document.querySelector("#total-pago").textContent = vueloSeleccionado.costo || vueloSeleccionado.costoTotal; 

}
