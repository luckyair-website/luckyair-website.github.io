import { destinos } from "../data/destinos.js";

export function mostrarConfirmacionPago() {
  const ruta = document.querySelector("#ruta-vuelo");
  const fechas = document.querySelector("#content-fecha");
  const pasajero = document.querySelector("#pasajero");
  const tarjeta = document.querySelector("#tarjeta");
  const total = document.querySelector("#total-pago");

  const vueloSeleccionado = JSON.parse(localStorage.getItem("vueloSeleccionado"));
  const usuarioInfo = localStorage.getItem("pagoInfo");

  // ❗ evitar errores si la página no es esta
  if (!ruta || !fechas || !pasajero || !tarjeta || !total) return;

  const usuarioObj = JSON.parse(usuarioInfo);

  const origen = localStorage.getItem("origen");
  const destino = localStorage.getItem("destino");

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

    document.querySelector("#pasajero").textContent = usuarioObj.nombre || "Usuario Frecuente"; 
    
    document.querySelector("#metodo").textContent = usuarioObj.metodo; 
    document.querySelector("#tarjeta").textContent = usuarioObj.cardMask; 

    document.querySelector("#total-pago").textContent = vueloSeleccionado.costo || vueloSeleccionado.costoTotal; 

}
