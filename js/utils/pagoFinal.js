// pagoFinal.js - Confirmación de pago con localStorage
// Lucky Air - AA3 JavaScript | Omar Vargas

export function pagoFinal() {

  // ── LEER DATOS DEL LOCALSTORAGE ──────────────
  /* const destinoSeleccionado = localStorage.getItem("destinoSeleccionado");
  const origenLS    = localStorage.getItem("origen");
  const destinoLS   = localStorage.getItem("destino");
  const idaLS       = localStorage.getItem("ida");
  const vueltaLS    = localStorage.getItem("vuelta");
  const cantidadLS  = localStorage.getItem("cantidad"); */

  const vueloSeleccionado = JSON.parse(localStorage.getItem("vueloSeleccionado"));


  let origen   = "";
  let destino  = "";
  let precio   = "$0";
  let fechaIda = "---";
  let fechaVuelta = "---";
  let pasajeros = "";
  let numeroVuelo = "";

  const hoy = new Date().toISOString().split("T")[0];

  if (vueloSeleccionado) {
    console.log(vueloSeleccionado);
    origen  = vueloSeleccionado.origen;
    destino = vueloSeleccionado.destino;
    precio =
  vueloSeleccionado.costo ||
  vueloSeleccionado.costoTotal ||
  vueloSeleccionado.precio ||
  "$0";
    fechaIda = vueloSeleccionado.ida || hoy;
    fechaVuelta = vueloSeleccionado.vuelta || "";
    pasajeros = vueloSeleccionado.cantidad || 1;
    numeroVuelo = vueloSeleccionado.numeroVuelo;
    

  } /* else if (origenLS && destinoLS) {
    origen  = origenLS;
    destino = destinoLS;
    precio  = "Ver resumen";
  } */

/*   if (idaLS)      fechaIda    = idaLS;
  if (vueltaLS)   fechaVuelta = vueltaLS;
  if (cantidadLS) pasajeros   = cantidadLS; */

  // ── ACTUALIZAR EL HTML ────────────────────────
  const routeSpans = document.querySelectorAll(".route span:not(.arrow-route)");
  if (routeSpans.length >= 2) {
    routeSpans[0].textContent = origen.toUpperCase();
    routeSpans[1].textContent = destino.toUpperCase();
  }

  const fechasEl = document.querySelector(".detail-item:nth-child(1) p");
  if (fechasEl) fechasEl.textContent = `${fechaIda} → ${fechaVuelta}`;

  const pasajerosEl = document.querySelector(".detail-item:nth-child(2) p");

  if (pasajerosEl) {
    pasajerosEl.textContent = `${pasajeros} Pasajero${pasajeros > 1 ? "s" : ""}`;
  } 

  // Generar código de reserva único
  const codigoEl = document.querySelector(".reservation-code");
  if (codigoEl) {
    const codigoGuardado = localStorage.getItem("codigoReserva");
    if (codigoGuardado) {
      codigoEl.textContent = numeroVuelo;
    } else {
      /* const nuevo = "LK" + Math.random().toString(36).substring(2, 7).toUpperCase();
      localStorage.setItem("codigoReserva", nuevo); */
      codigoEl.textContent = numeroVuelo;
      
    }
  }
  const costoUni = document.querySelector("#costo-unitario");
  const costoTot = document.querySelector("#costo-total");
  costoUni.textContent = vueloSeleccionado.costoUnitario || vueloSeleccionado.costo;
  costoTot.textContent = vueloSeleccionado.costoTotal || vueloSeleccionado.costo;

  // ── BOTÓN DESCARGAR COMPROBANTE ───────────────
  const btnDescargar = document.querySelector(".btn-download");
  if (!btnDescargar) return;

  btnDescargar.addEventListener("click", (e) => {
    e.preventDefault();

    const codigo = document.querySelector(".reservation-code")?.textContent?.trim() || "LK00000";
    const ruta   = `${origen.toUpperCase()} → ${destino.toUpperCase()}`;

    const contenido = `
====================================
       LUCKY AIR - COMPROBANTE
====================================
Código de Reserva: ${codigo}
Ruta:              ${ruta}
Fecha Ida:         ${fechaIda}
Fecha Vuelta:      ${fechaVuelta}
Pasajeros:         ${pasajeros}
Precio:            ${precio}
Estado:            CONFIRMADO ✔
====================================
Gracias por volar con Lucky Air.
    `.trim();

    const blob = new Blob([contenido], { type: "text/plain" });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href     = url;
    link.download = `comprobante-${codigo}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    btnDescargar.textContent   = "✔ DESCARGADO";
    btnDescargar.style.opacity = "0.7";
    btnDescargar.style.cursor  = "default";
  });
}

// Auto-ejecutar
document.addEventListener("DOMContentLoaded", () => {
    pagoFinal();
});
