import { destinos } from "../data/destinos.js";

export function renderCards() {
  const container = document.querySelector(".cards-container");
  if (!container) return;

  destinos.forEach(destino => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="img-container">
        <img class="img-ofertas" src="${destino.imagen}" alt="${destino.nombre}">
      </div>
      <div class="content-container flex-column align-center justify-between">
        <h2>${destino.nombre}</h2>
        <h1 class="color-accent">${destino.costo}</h1>
        <button class="ofertas-card-boton flex-column align-center justify-center font-bold size-20">COMPRAR</button>
      </div>
    `;

    const boton = card.querySelector(".ofertas-card-boton");
    boton.addEventListener("click", () => {
      localStorage.setItem("destinoSeleccionado", JSON.stringify(destino));

      // Limpio lo otro
      localStorage.removeItem("origen");
      localStorage.removeItem("destino");
      localStorage.removeItem("ida");
      localStorage.removeItem("vuelta");
      localStorage.removeItem("cantidad");

      window.location.href = "../../pages/pago.html";
    });

    container.appendChild(card);
  });
}
