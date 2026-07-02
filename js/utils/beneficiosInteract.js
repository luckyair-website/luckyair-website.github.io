// beneficiosInteract.js - Canjear puntos y carrito
// Lucky Air - AA3 JavaScript | Omar Vargas
// Semana 13: try/catch | Semana 14: fetch + async/await + JSON

export function beneficiosInteract() {

  // ── PUNTOS ───────────────────────────────────
  let puntosDisponibles = 14500;

  const displayPuntos = document.querySelector(".points-number");
  const levelBadge    = document.querySelector(".level-badge");
  const progressFill  = document.querySelector(".progress-fill");
  const levelMsg      = document.querySelector(".level-info p");

  function actualizarPuntos() {
    if (displayPuntos) {
      displayPuntos.textContent = puntosDisponibles.toLocaleString("es-PE") + " pts";
    }
    if (levelBadge) {
      if (puntosDisponibles >= 15000) {
        levelBadge.textContent = "Nivel: ORO 🥇";
        if (levelMsg) levelMsg.innerHTML = "¡Felicidades! Alcanzaste el nivel <strong>ORO</strong> 🎉";
        if (progressFill) progressFill.style.width = "100%";
      } else {
        const falta = 15000 - puntosDisponibles;
        levelBadge.textContent = "Nivel: Plata 🥈";
        if (levelMsg) levelMsg.innerHTML = `Gana ${falta.toLocaleString("es-PE")} pts más para el nivel <strong>ORO</strong>`;
        if (progressFill) progressFill.style.width = ((puntosDisponibles - 10000) / 5000 * 100) + "%";
      }
    }
  }

  function mostrarToast(mensaje, exito = true) {
    let toast = document.querySelector("#toast-beneficios");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast-beneficios";
      toast.style.cssText = `
        position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
        padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: bold;
        z-index: 9999; transition: opacity 0.4s; color: #fff;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent      = mensaje;
    toast.style.background = exito ? "#16a34a" : "#dc2626";
    toast.style.opacity    = "1";
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => { toast.style.opacity = "0"; }, 3000);
  }

  // ── FETCH BENEFICIOS CANJEAR (JSON) ──────────
  async function cargarBeneficios() {
    try {
      const response = await fetch("../js/data/beneficiosCanjear.json");

      if (!response.ok) {
        throw new Error(`Error al cargar beneficios: ${response.status}`);
      }

      const beneficios = await response.json();
      renderBeneficios(beneficios);

    } catch (error) {
      console.error("Error cargando beneficiosCanjear.json:", error);
      mostrarToast("No se pudieron cargar los beneficios.", false);
    }
  }

  function renderBeneficios(beneficios) {
    const savingsGrid = document.querySelector(".savings-grid");
    if (!savingsGrid) return;

    savingsGrid.innerHTML = "";

    beneficios.forEach((beneficio) => {
      const div = document.createElement("div");
      div.classList.add("save-card", "flex-column", "align-center");
      div.innerHTML = `
        <div class="save-icon">
          <img src="${beneficio.img}" alt="${beneficio.nombre}">
        </div>
        <h3>${beneficio.nombre}</h3>
        <p>${beneficio.descripcion}</p>
        <button class="btn-canjear" data-costo="${beneficio.costo}" data-nombre="${beneficio.nombre}">
          Canjear
        </button>
      `;
      savingsGrid.appendChild(div);
    });

    // Activar botones canjear
    activarCanjear();
  }

  function activarCanjear() {
    document.querySelectorAll(".btn-canjear").forEach((boton) => {
      boton.addEventListener("click", () => {
        const costo  = parseInt(boton.dataset.costo) || 0;
        const titulo = boton.dataset.nombre || "";

        if (puntosDisponibles < costo) {
          mostrarToast(`Necesitas ${costo} pts. Te faltan ${costo - puntosDisponibles} pts.`, false);
          return;
        }

        puntosDisponibles -= costo;
        actualizarPuntos();
        mostrarToast(`✔ "${titulo}" canjeado. Se descontaron ${costo} pts.`, true);
        boton.textContent   = "✔ Canjeado";
        boton.disabled      = true;
        boton.style.opacity = "0.6";
      });
    });
  }

  // ── FETCH PRODUCTOS TIENDA (JSON) ─────────────
  async function cargarProductos() {
    try {
      const response = await fetch("../js/data/productos.json");

      if (!response.ok) {
        throw new Error(`Error al cargar productos: ${response.status}`);
      }

      const productos = await response.json();
      renderProductos(productos);

    } catch (error) {
      console.error("Error cargando productos.json:", error);
      mostrarToast("No se pudieron cargar los productos.", false);
    }
  }

  function renderProductos(productos) {
    const shopGrid = document.querySelector(".shop-grid");
    if (!shopGrid) return;

    shopGrid.innerHTML = "";

    productos.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("product-card");
      div.innerHTML = `
        <div class="product-img">
          <img src="${producto.img}" alt="${producto.nombre}">
        </div>
        <h3>${producto.nombre}</h3>
        <p>${producto.precio}</p>
        <button>Añadir a Carrito</button>
      `;
      shopGrid.appendChild(div);
    });

    // Activar botones carrito
    activarCarrito();
  }

  // ── CARRITO ───────────────────────────────────
  let carrito = [];

  try {
    const guardado = localStorage.getItem("carrito");
    if (guardado) carrito = JSON.parse(guardado);
  } catch (e) {
    carrito = [];
  }

  function activarCarrito() {
    document.querySelectorAll(".product-card button").forEach((boton) => {
      boton.addEventListener("click", () => {
        const card   = boton.closest(".product-card");
        const nombre = card?.querySelector("h3")?.textContent?.trim() || "Producto";
        const precio = card?.querySelector("p")?.textContent?.trim()  || "";
        const img    = card?.querySelector("img")?.src || "";

        carrito.push({ nombre, precio, img });
        localStorage.setItem("carrito", JSON.stringify(carrito));

        boton.textContent      = "✔ Añadido";
        boton.style.background = "#16a34a";
        boton.disabled         = true;

        mostrarToast(`"${nombre}" añadido al carrito. (${carrito.length} item${carrito.length > 1 ? "s" : ""})`, true);

        let btnVerCarrito = document.querySelector("#btn-ver-carrito");
        if (!btnVerCarrito) {
          btnVerCarrito = document.createElement("a");
          btnVerCarrito.id   = "btn-ver-carrito";
          btnVerCarrito.href = "carrito.html";
          btnVerCarrito.textContent = "🛒 Ver carrito";
          btnVerCarrito.style.cssText = `
            position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
            background: #1e3a5f; color: #fff; padding: 10px 24px;
            border-radius: 8px; font-weight: bold; z-index: 9999;
            text-decoration: none; font-size: 14px;
          `;
          document.body.appendChild(btnVerCarrito);
        }

        setTimeout(() => {
          boton.textContent      = "Añadir a Carrito";
          boton.style.background = "";
          boton.disabled         = false;
        }, 3000);
      });
    });
  }

  // Inicializar
  actualizarPuntos();
  cargarBeneficios();
  cargarProductos();
}

// Auto-ejecutar
document.addEventListener("DOMContentLoaded", () => {
  beneficiosInteract();
});
