const LS_BORRADOR = "luckyair_pago_borrador";
const LS_TARJETAS = "luckyair_tarjetas_guardadas";

// ── UTILIDADES VISUALES ──────────────────────────────────────
function marcarError(input, mensaje) {
    const grupo = input.closest(".pago-field") || input.parentElement;
    grupo.classList.add("pago-error");
    grupo.classList.remove("pago-ok");
    let small = grupo.querySelector(".msg-pago");
    if (!small) {
        small = document.createElement("small");
        small.className = "msg-pago";
        grupo.appendChild(small);
    }
    small.textContent = "❌ " + mensaje;
}

function marcarOk(input) {
    const grupo = input.closest(".pago-field") || input.parentElement;
    grupo.classList.remove("pago-error");
    grupo.classList.add("pago-ok");
    let small = grupo.querySelector(".msg-pago");
    if (!small) {
        small = document.createElement("small");
        small.className = "msg-pago";
        grupo.appendChild(small);
    }
    small.textContent = "✅ Correcto";
}

// ── REGLAS DE VALIDACIÓN ─────────────────────────────────────
function validarNumTarjeta(input) {
    const digits = input.value.replace(/\s/g, "");
    if (!digits) return marcarError(input, "Ingresa el número de tarjeta.");
    if (!/^\d{16}$/.test(digits)) return marcarError(input, "Debe tener 16 dígitos.");
    marcarOk(input); return true;
}

function validarFechaExp(input) {
    const v = input.value.trim();
    if (!v) return marcarError(input, "Ingresa la fecha de expiración.");
    if (!/^\d{2}\/\d{2}$/.test(v)) return marcarError(input, "Formato MM/AA.");
    const [mm, aa] = v.split("/").map(Number);
    if (mm < 1 || mm > 12) return marcarError(input, "Mes inválido.");
    const ahora = new Date();
    const exp = new Date(2000 + aa, mm - 1);
    if (exp < new Date(ahora.getFullYear(), ahora.getMonth())) return marcarError(input, "Tarjeta vencida.");
    marcarOk(input); return true;
}

function validarCVV(input) {
    const v = input.value.trim();
    if (!v) return marcarError(input, "Ingresa el CVV.");
    if (!/^\d{3}$/.test(v)) return marcarError(input, "El CVV debe tener 3 dígitos.");
    marcarOk(input); return true;
}

function validarNombreTarjeta(input) {
    const v = input.value.trim();
    if (!v) return marcarError(input, "Ingresa el nombre en la tarjeta.");
    if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{3,}$/.test(v)) return marcarError(input, "Solo letras, mínimo 3 caracteres.");
    marcarOk(input); return true;
}

// ── GUARDAR BORRADOR ─────────────────────────────────────────
function guardarBorrador() {
    const datos = {
        numTarjeta:    document.getElementById("num-tarjeta")?.value    || "",
        fechaExp:      document.getElementById("fecha-exp")?.value      || "",
        nombreTarjeta: document.getElementById("nombre-tarjeta")?.value || "",
    };
    localStorage.setItem(LS_BORRADOR, JSON.stringify(datos));
}

// ── RESTAURAR BORRADOR ────────────────────────────────────────
function restaurarBorrador() {
    const raw = localStorage.getItem(LS_BORRADOR);
    if (!raw) return;
    try {
        const d = JSON.parse(raw);
        if (d.numTarjeta)    document.getElementById("num-tarjeta").value    = d.numTarjeta;
        if (d.fechaExp)      document.getElementById("fecha-exp").value      = d.fechaExp;
        if (d.nombreTarjeta) document.getElementById("nombre-tarjeta").value = d.nombreTarjeta;
    } catch (e) { localStorage.removeItem(LS_BORRADOR); }
}

// ── GUARDAR TARJETA EN LISTA ──────────────────────────────────
function guardarTarjeta() {
    const num     = document.getElementById("num-tarjeta")?.value.replace(/\s/g, "") || "";
    const fecha   = document.getElementById("fecha-exp")?.value    || "";
    const nombre  = document.getElementById("nombre-tarjeta")?.value || "";
    const ultimos4 = num.slice(-4);

    let tarjetas = [];
    try { tarjetas = JSON.parse(localStorage.getItem(LS_TARJETAS)) || []; } catch (e) { tarjetas = []; }

    const yaExiste = tarjetas.some(t => t.numero.endsWith(ultimos4));
    if (!yaExiste) {
        tarjetas.push({
            numero:     `**** **** **** ${ultimos4}`,
            fechaExp:   fecha,
            nombre:     nombre,
            guardadaEl: new Date().toLocaleString("es-PE"),
        });
        localStorage.setItem(LS_TARJETAS, JSON.stringify(tarjetas));
    }
}

// ── MOSTRAR EN CONSOLA ────────────────────────────────────────
function mostrarPagoEnConsola() {
    const borrador = localStorage.getItem(LS_BORRADOR);
    if (borrador) {
        console.log("💳 Borrador del formulario de pago:");
        console.table(JSON.parse(borrador));
    } else {
        console.log("💳 No hay borrador de pago guardado.");
    }
    const tarjetas = localStorage.getItem(LS_TARJETAS);
    if (tarjetas) {
        const lista = JSON.parse(tarjetas);
        console.log(`💾 Tarjetas guardadas (${lista.length}):`);
        console.table(lista);
    } else {
        console.log("💾 No hay tarjetas guardadas.");
    }
}

// ── CSS ESTADOS VISUALES ─────────────────────────────────────
function inyectarEstilos() {
    const style = document.createElement("style");
    style.textContent = `
        .pago-field.pago-error .pago-input {
            border: 1.5px solid #dc2626;
            background-color: #fef2f2;
        }
        .pago-field.pago-ok .pago-input {
            border: 1.5px solid #0a160f;
            background-color: #f0fdf4;
        }
        .msg-pago {
            font-size: 12px;
            margin-top: 3px;
            display: block;
            min-height: 16px;
        }
        .pago-error .msg-pago { color: #dc2626; }
        .pago-ok    .msg-pago { color: #16a34a; }
    `;
    document.head.appendChild(style);
}

// ── INIT PRINCIPAL ────────────────────────────────────────────
export function initPagoStorage() {
    inyectarEstilos();
    restaurarBorrador();
    mostrarPagoEnConsola();

    const inputNum    = document.getElementById("num-tarjeta");
    const inputFecha  = document.getElementById("fecha-exp");
    const inputCVV    = document.getElementById("cvv");
    const inputNombre = document.getElementById("nombre-tarjeta");

    if (!inputNum) return; // no estamos en pago.html

    // Formato automático número tarjeta
    inputNum.addEventListener("input", () => {
        let raw = inputNum.value.replace(/\D/g, "").slice(0, 16);
        inputNum.value = raw.match(/.{1,4}/g)?.join(" ") || raw;
        validarNumTarjeta(inputNum);
        guardarBorrador();
    });

    // Formato automático fecha
    inputFecha.addEventListener("input", () => {
        let raw = inputFecha.value.replace(/\D/g, "").slice(0, 4);
        if (raw.length >= 3) raw = raw.slice(0, 2) + "/" + raw.slice(2);
        inputFecha.value = raw;
        validarFechaExp(inputFecha);
        guardarBorrador();
    });

    // Solo números en CVV
    inputCVV.addEventListener("input", () => {
        inputCVV.value = inputCVV.value.replace(/\D/g, "").slice(0, 3);
        validarCVV(inputCVV);
    });

    inputNombre.addEventListener("input", () => {
        validarNombreTarjeta(inputNombre);
        guardarBorrador();
    });

    // Interceptar botón PAGAR
    const btnPagar = [...document.querySelectorAll(".pago-btn")]
        .find(btn => btn.textContent.trim() === "PAGAR");

    if (btnPagar) {
        btnPagar.removeAttribute("onclick");
        btnPagar.addEventListener("click", (e) => {
            e.preventDefault();

            const v1 = validarNumTarjeta(inputNum);
            const v2 = validarFechaExp(inputFecha);
            const v3 = validarCVV(inputCVV);
            const v4 = validarNombreTarjeta(inputNombre);

            if (!v1 || !v2 || !v3 || !v4) return;

            const checkGuardar = document.getElementById("guardar");
            if (checkGuardar?.checked) {
                guardarTarjeta();
                console.log("✅ Tarjeta guardada:");
                mostrarPagoEnConsola();
            }

            localStorage.removeItem(LS_BORRADOR);
            window.location.href = "confirmar-pago.html";
        });
    }
}