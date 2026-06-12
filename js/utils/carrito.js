// carrito.js - Página de carrito de compras
// Lucky Air - AA3 JavaScript | Omar Vargas

export function carrito() {

  const carritoItems  = document.querySelector("#carrito-items");
  const carritoVacio  = document.querySelector("#carrito-vacio");
  const carritoResumen = document.querySelector("#carrito-resumen");
  const resumenCantidad = document.querySelector("#resumen-cantidad");
  const resumenTotal  = document.querySelector("#resumen-total");
  const btnVaciar     = document.querySelector("#btn-vaciar");

  // Leer carrito del localStorage
  let items = [];
  try {
    const guardado = localStorage.getItem("carrito");
    if (guardado) items = JSON.parse(guardado);
  } catch (e) {
    items = [];
  }

  function renderCarrito() {
    carritoItems.innerHTML = "";

    if (items.length === 0) {
      carritoVacio.classList.remove("hidden");
      carritoResumen.classList.add("hidden");
      return;
    }

    carritoVacio.classList.add("hidden");
    carritoResumen.classList.remove("hidden");

    let totalDolares = 0;

    items.forEach((item, index) => {
      // Extraer precio en dólares del texto "3,500 pts + $15"
      const matchDolar = item.precio.match(/\$(\d+)/);
      const precioDolar = matchDolar ? parseInt(matchDolar[1]) : 0;
      totalDolares += precioDolar;

      const div = document.createElement("div");
      div.classList.add("carrito-item", "flex-row", "align-center", "box-shadow");
      div.innerHTML = `
        <div class="carrito-item-info flex-column">
          <span class="font-bold size-16">${item.nombre}</span>
          <span class="size-12 color-accent">${item.precio}</span>
        </div>
        <button class="btn-eliminar" data-index="${index}">✖ Eliminar</button>
      `;
      carritoItems.appendChild(div);
    });

    resumenCantidad.textContent = items.length;
    resumenTotal.textContent = `$${totalDolares}`;

    // Botones eliminar
    document.querySelectorAll(".btn-eliminar").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.index);
        items.splice(idx, 1);
        localStorage.setItem("carrito", JSON.stringify(items));
        renderCarrito();
      });
    });
  }

  // Vaciar carrito
  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      items = [];
      localStorage.removeItem("carrito");
      renderCarrito();
    });
  }

  renderCarrito();
}

// Auto-ejecutar
document.addEventListener("DOMContentLoaded", () => {
  carrito();
});
