export function buscarVuelos() {
  const formulario = document.querySelector("#buscar-vuelo-form");
  const origen = document.querySelector("#origen");
  const destino = document.querySelector("#destino");
  const ida = document.querySelector("#ida");
  const vuelta = document.querySelector("#vuelta");
  const cantidad = document.querySelector("#cantidad");

  if (!formulario) return;

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    let valido = true;

    if (origen.value.trim() === "") {
      console.error("ingrese su origen");
      valido = false;
    } else if (destino.value.trim() === "") {
      console.error("ingrese su destino");
      valido = false;
    } else if (ida.value.trim() === "") {
      console.error("ingrese su ida");
      valido = false;
    } else if (vuelta.value.trim() === "") {
      console.error("ingrese su vuelta");
      valido = false;
    } else if (cantidad.value.trim() === "") {
      console.error("ingrese su cantidad");
      valido = false;
    }

    if (valido) {
      // Guardar valores como strings
      localStorage.setItem("origen", origen.value);
      localStorage.setItem("destino", destino.value);
      localStorage.setItem("ida", ida.value);
      localStorage.setItem("vuelta", vuelta.value);
      localStorage.setItem("cantidad", cantidad.value);

      // Limpio lo otro
      localStorage.removeItem("destinoSeleccionado");

      // Redirigir
      window.location.href = "../../pages/pago.html";
    }
  });
}
