

export function mostrarInfoVuelos() {
  const pagoHeader = document.querySelector("#pago-header");
  if (!pagoHeader) return;

  const vueloSeleccionado = JSON.parse(localStorage.getItem("vueloSeleccionado"));
  if (!vueloSeleccionado) return;

  document.querySelector("#content-origen").textContent = vueloSeleccionado.origen;
  document.querySelector("#content-destino").textContent = vueloSeleccionado.destino;

  // Mostrar costoTotal si existe (inputs), si no usar costo (cards)
  document.querySelector("#content-precio").textContent = vueloSeleccionado.costoTotal || vueloSeleccionado.costo;

  console.log("mostrarInfoVuelos");
  console.log(vueloSeleccionado);

 
}
