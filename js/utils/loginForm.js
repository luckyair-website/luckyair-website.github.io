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

    // ── Limpiar errores en tiempo real (evento input) ─────────────────
    inputCorreo?.addEventListener("input", () => {
        limpiarError("grupo-correo-login", "error-correo-login");
        ocultarErrorGeneral();
    });

    inputPass?.addEventListener("input", () => {
        limpiarError("grupo-contrasena-login", "error-contrasena-login");
        ocultarErrorGeneral();
    });

    // ── Submit ────────────────────────────────────────────────────────
    btnLogin.addEventListener("click", () => {
        if (validarFormLogin()) procesarLogin();
    });
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

    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario_registrado") || "null");

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
}

function mostrarError(grupoId, errorId, msg) {
    document.getElementById(grupoId)?.classList.add("input-error");
    const el = document.getElementById(errorId);
    if (el) {
        el.textContent = msg;
        el.classList.remove("hidden");
    }
}

function limpiarError(grupoId, errorId) {
    document.getElementById(grupoId)?.classList.remove("input-error");
    document.getElementById(errorId)?.classList.add("hidden");
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