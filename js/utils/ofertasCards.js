import { destinos } from "../data/destinos.js";

export function renderCards() {
    const container = document.querySelector(".cards-container");
    destinos.forEach(destinos => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML= `
        <div class="img-container">
            <img class="img-ofertas" src="${destinos.imagen}" alt="${destinos.nombre}">
        </div>
        <div class="content-container flex-column align-center justify-between">
            <h2>${destinos.nombre}</h2>
            <h1 class="color-accent">${destinos.costo}</h1>
            <a href="../../pages/pago.html" class="ofertas-card-boton flex-column align-center justify-center font-bold size-20">COMPRAR</a>
        </div>
    `;
    container.appendChild(card);
});
}



