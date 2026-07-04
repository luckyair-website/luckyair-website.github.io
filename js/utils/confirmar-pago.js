import { destinos } from "../data/destinos.js";

export function mostrarConfirmacionPago() {
  const ruta = document.querySelector("#ruta-vuelo");
  const fechas = document.querySelector("#content-fecha");
  const pasajero = document.querySelector("#pasajero");
  const tarjeta = document.querySelector("#tarjeta");
  const total = document.querySelector("#total-pago");

<<<<<<< HEAD
  if (!ruta || !fechas || !pasajero || !tarjeta || !total) return;

  const vueloSeleccionado = JSON.parse(localStorage.getItem("vueloSeleccionado"));
  const usuarioInfo = localStorage.getItem("pagoInfo");
  const usuarioObj = usuarioInfo ? JSON.parse(usuarioInfo) : {};

  // ===================================================
  // NUEVO FLUJO (buscarVuelos2)
  // ===================================================
  if (vueloSeleccionado) {
=======
  const vueloSeleccionado = JSON.parse(localStorage.getItem("vueloSeleccionado"));
  const usuarioInfo = localStorage.getItem("pagoInfo");

  // ❗ evitar errores si la página no es esta
  if (!ruta || !fechas || !pasajero || !tarjeta || !total) return;

  const usuarioObj = JSON.parse(usuarioInfo);
>>>>>>> 9425a7b (Update confirmar-pago.js)

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

<<<<<<< HEAD
  if (!origen || !destino) return;
=======
   if (!origen || !destino) return;
    document.querySelector("#content-origen").textContent = vueloSeleccionado.origen; 
    document.querySelector("#content-destino").textContent = vueloSeleccionado.destino; 
    let fechaMostrar = vueloSeleccionado.fecha;
    
    if (fechaMostrar === "CURRENT_DATE") {
      const hoy = new Date();
      // Formato YYYY-MM-DD
      fechaMostrar = hoy.toISOString().split("T")[0];
    } else {
      const ida = vueloSeleccionado.ida || "";
      const vuelta = vueloSeleccionado.vuelta || "";
      fechaMostrar = `${ida}  ${vuelta}`;
    }
    console.log(vueloSeleccionado);
    console.log(usuarioObj);
    document.querySelector("#content-fecha").textContent = fechaMostrar; 
    document.querySelector("#content-numero-vuelo").textContent = vueloSeleccionado.numeroVuelo; 
    document.querySelector("#content-duracion").textContent = vueloSeleccionado.duracion; 
>>>>>>> 9425a7b (Update confirmar-pago.js)

    document.querySelector("#pasajero").textContent = usuarioObj.nombre || "Usuario Frecuente"; 
    
    document.querySelector("#metodo").textContent = usuarioObj.metodo; 
    document.querySelector("#tarjeta").textContent = usuarioObj.cardMask; 

    document.querySelector("#total-pago").textContent = vueloSeleccionado.costo || vueloSeleccionado.costoTotal; 

}
