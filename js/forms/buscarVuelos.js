export async function buscarVuelos() {
  const formulario = document.querySelector("#buscar-vuelo-form");
  const origen = document.querySelector("#origen");
  const destino = document.querySelector("#destino");
  const ida = document.querySelector("#ida");
  const vuelta = document.querySelector("#vuelta");
  const cantidad = document.querySelector("#cantidad");

  const respuesta = await fetch("/js/data/ofertas.json");
  const data = await respuesta.json();
  const destinos = data.ofertas;

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

      // Buscar la oferta en tu JSON que coincida con origen y destino
      

      const oferta = destinos.find(d => d.origen === origen.value && d.destino === destino.value);
      
      if (!oferta) {
        console.error("No se encontró la oferta para esa ruta");
        return;
      }

      // Calcular precio total
      const cantidadAsientos = parseInt(cantidad.value, 10);
      const precioBase = parseInt(oferta.costo.replace("$", ""), 10);
      const precioTotal = precioBase * cantidadAsientos;

      // Guardar valores como strings
      /* localStorage.setItem("origen", origen.value);
      localStorage.setItem("destino", destino.value);
      localStorage.setItem("ida", ida.value);
      localStorage.setItem("vuelta", vuelta.value);
      localStorage.setItem("cantidad", cantidad.value); */

      // Crear objeto completo
      const vueloSeleccionado = {
        origen: origen.value,
        destino: destino.value,
        ida: ida.value,
        vuelta: vuelta.value,
        cantidad: cantidadAsientos,
        costoUnitario: oferta.costo,
        costoTotal: `$${precioTotal}`,
        numeroVuelo: oferta.numeroVuelo,
        duracion: oferta.duracion,
        imagen: oferta.imagen
      };

      // Guardar en localStorage
      localStorage.setItem("vueloSeleccionado", JSON.stringify(vueloSeleccionado));

      // Limpio lo otro
      //localStorage.removeItem("destinoSeleccionado");

      // Redirigir
      window.location.href = "../../pages/pago.html";
    }
  });
}
