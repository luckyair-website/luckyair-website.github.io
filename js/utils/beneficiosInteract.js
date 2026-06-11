// beneficiosInteract.js - Canjear puntos y carrito

export function beneficiosInteract() {

  // ── PUNTOS ───────────────────────────────────
  let puntosDisponibles = 14500;

  const displayPuntos  = document.querySelector(".points-number");
  const levelBadge     = document.querySelector(".level-badge");
  const progressFill   = document.querySelector(".progress-fill");
  const levelMsg       = document.querySelector(".level-info p");

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
    toast.textContent    = mensaje;
    toast.style.background = exito ? "#16a34a" : "#dc2626";
    toast.style.opacity  = "1";
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => { toast.style.opacity = "0"; }, 3000);
  }

  // ── CANJEAR ──────────────────────────────────
  const costos = {
    "EQUIPAJE ADICIONAL":   500,
    "SELECCIÓN DE ASIENTOS": 300,
    "DESCUENTO EN TICKET":  1000,
  };

  document.querySelectorAll(".btn-canjear").forEach((boton) => {
    boton.addEventListener("click", () => {
      const titulo = boton.closest(".save-card")?.querySelector("h3")?.textContent?.trim() || "";
      const costo  = costos[titulo] || 0;

      if (puntosDisponibles < costo) {
        mostrarToast(`Necesitas ${costo} pts. Te faltan ${costo - puntosDisponibles} pts.`, false);
        return;
      }

      puntosDisponibles -= costo;
      actualizarPuntos();
      mostrarToast(`✔ "${titulo}" canjeado. Se descontaron ${costo} pts.`, true);
      boton.textContent  = "✔ Canjeado";
      boton.disabled     = true;
      boton.style.opacity = "0.6";
    });
  });

  // ── CARRITO ──────────────────────────────────
  let carrito = [];

  document.querySelectorAll(".product-card button").forEach((boton) => {
    boton.addEventListener("click", () => {
      const card   = boton.closest(".product-card");
      const nombre = card?.querySelector("h3")?.textContent?.trim() || "Producto";
      const precio = card?.querySelector("p")?.textContent?.trim()  || "";

      carrito.push({ nombre, precio });

      boton.textContent      = "✔ Añadido";
      boton.style.background = "#16a34a";
      boton.disabled         = true;

      mostrarToast(`"${nombre}" añadido al carrito. (${carrito.length} item${carrito.length > 1 ? "s" : ""})`, true);

      setTimeout(() => {
        boton.textContent      = "Añadir a Carrito";
        boton.style.background = "";
        boton.disabled         = false;
      }, 3000);
    });
  });

  // Inicializar display de puntos
  actualizarPuntos();
}
