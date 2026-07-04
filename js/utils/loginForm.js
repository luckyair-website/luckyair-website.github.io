export function loginForm() {
    const btnLogin = document.getElementById("btn-login");

    // Si no estamos en login.html, salir sin romper nada
    if (!btnLogin) return;

    const inputCorreo = document.getElementById("correo-login");
    const inputPass = document.getElementById("contrasena-login");
    const toggleBtn = document.getElementById("toggle-pass");
    const toggleIcon = document.getElementById("toggle-pass-icon");
    const linkRecuperar = document.getElementById("link-recuperar");
    const linkRegistro = document.getElementById("link-registro");

    // ── Navegación por JS ─────────────────────────────────────────────
    linkRecuperar?.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "recuperarcontrasena.html";
    });

    linkRegistro?.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "registro.html";
    });

    // ── Toggle mostrar/ocultar contraseña ─────────────────────────────
    toggleBtn?.addEventListener("click", () => {
        const visible = inputPass.type === "text";
        inputPass.type = visible ? "password" : "text";
        toggleIcon.style.opacity = visible ? "0.5" : "1";
    });

    // ── Prellenar correo si "recordarme" estaba activo ────────────────
    const correoGuardado = localStorage.getItem("login_correo_recordado");
    if (correoGuardado && inputCorreo) {
        inputCorreo.value = correoGuardado;
        const checkRecordar = document.getElementById("recordarme");
        if (checkRecordar) checkRecordar.checked = true;
    }

    // ── Validación en tiempo real (con ícono ✅ / ❌) ──────────────────
    inputCorreo?.addEventListener("input", () => {
        validarCampoEnVivo(
            inputCorreo,
            "grupo-correo-login",
            "error-correo-login",
            esCorreoValido(inputCorreo.value),
            "Ingresa un correo válido."
        );
        ocultarErrorGeneral();
    });

    inputPass?.addEventListener("input", () => {
        validarCampoEnVivo(
            inputPass,
            "grupo-contrasena-login",
            "error-contrasena-login",
            inputPass.value.trim().length >= 8,
            "Mínimo 8 caracteres."
        );
        ocultarErrorGeneral();
    });

    // ── Submit ────────────────────────────────────────────────────────
    btnLogin.addEventListener("click", () => {
        if (validarFormLogin()) procesarLogin();
    });
}

function esCorreoValido(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
}

function validarFormLogin() {
    let valido = true;

    const correo = document.getElementById("correo-login")?.value.trim();
    const contrasena = document.getElementById("contrasena-login")?.value.trim();

    if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        mostrarError("grupo-correo-login", "error-correo-login", "Ingresa un correo válido.");
        valido = false;
    }

    if (!contrasena || contrasena.length < 8) {
        mostrarError("grupo-contrasena-login", "error-contrasena-login", "Mínimo 8 caracteres.");
        valido = false;
    }

    return valido;
}

function procesarLogin() {
    const correo = document.getElementById("correo-login").value.trim();
    const contrasena = document.getElementById("contrasena-login").value.trim();
    const recordarme = document.getElementById("recordarme")?.checked;

    // NUEVO: try/catch alrededor de todo lo que toca localStorage.
    // JSON.parse() puede "explotar" (lanzar un error) si lo que está
    // guardado no es un JSON válido (por ejemplo, si alguien lo edita a
    // mano desde las herramientas del navegador). Sin este try/catch,
    // ese error rompería el login por completo y sin ningún aviso.
    try {
        // BUG CORREGIDO: aquí se leía la clave "usuario_registrado", pero
        // el registro en realidad guarda al usuario bajo la clave
        // "luckyair_usuario" (ver js/utils/registroStorage.js). Por eso,
        // aunque te registraras bien, el login SIEMPRE decía "no hay
        // ningún usuario registrado": estaba buscando en el cajón
        // equivocado.
        const usuarioGuardado = JSON.parse(localStorage.getItem("luckyair_usuario") || "null");

        if (!usuarioGuardado) {
            mostrarErrorGeneral("No hay ningún usuario registrado. Por favor regístrate primero.");
            return;
        }

        if (usuarioGuardado.correo !== correo || usuarioGuardado.contrasena !== contrasena) {
            mostrarErrorGeneral("Correo o contraseña incorrectos.");
            return;
        }

        if (recordarme) {
            localStorage.setItem("login_correo_recordado", correo);
        } else {
            localStorage.removeItem("login_correo_recordado");
        }

        localStorage.setItem("sesion_activa", JSON.stringify({
            correo: usuarioGuardado.correo,
            nombre: usuarioGuardado.nombres
        }));

        window.location.href = "../pages/pago.html";

    } catch (error) {
        // Si algo falla leyendo/guardando en localStorage, se avisa al
        // usuario en vez de dejar la página "muerta" sin explicación.
        console.error("Error al procesar el login:", error);
        mostrarErrorGeneral("Ocurrió un problema al iniciar sesión. Intenta registrarte de nuevo.");
    }
}

function mostrarError(grupoId, errorId, msg) {
    const grupo = document.getElementById(grupoId);
    grupo?.classList.add("input-error");
    grupo?.classList.remove("input-success");
    const el = document.getElementById(errorId);
    if (el) {
        el.textContent = "❌ " + msg;
        el.classList.remove("hidden", "login-campo-exito");
    }
}

// NUEVO: muestra un ícono ✅ verde cuando el campo SÍ es válido
function mostrarExito(grupoId, errorId) {
    const grupo = document.getElementById(grupoId);
    grupo?.classList.add("input-success");
    grupo?.classList.remove("input-error");
    const el = document.getElementById(errorId);
    if (el) {
        el.textContent = "✅ Correcto";
        el.classList.remove("hidden");
        el.classList.add("login-campo-exito");
    }
}

function limpiarError(grupoId, errorId) {
    const grupo = document.getElementById(grupoId);
    grupo?.classList.remove("input-error", "input-success");
    const el = document.getElementById(errorId);
    el?.classList.add("hidden");
    el?.classList.remove("login-campo-exito");
}

// NUEVO: decide si mostrar el ✅, el ❌, o nada (si el campo está vacío
// todavía no se le muestra error, para no molestar antes de que el
// usuario termine de escribir).
function validarCampoEnVivo(input, grupoId, errorId, esValido, mensajeError) {
    if (!input.value.trim()) {
        limpiarError(grupoId, errorId);
        return;
    }
    if (esValido) {
        mostrarExito(grupoId, errorId);
    } else {
        mostrarError(grupoId, errorId, mensajeError);
    }
}

function mostrarErrorGeneral(msg) {
    const div = document.getElementById("login-error-general");
    const small = div?.querySelector(".login-error-msg");
    if (small) small.textContent = msg;
    div?.classList.remove("hidden");
}

function ocultarErrorGeneral() {
    document.getElementById("login-error-general")?.classList.add("hidden");
}