let codigoGenerado = "";

export function recuperarForm() {
    const btnEnviar = document.getElementById("btn-enviar-codigo");

    // Si no estamos en recuperarcontrasena.html, salir sin romper nada
    if (!btnEnviar) return;

    // ── Navegación por JS ─────────────────────────────────────────────
    document.getElementById("link-ir-login")?.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "login.html";
    });

    document.getElementById("link-ir-registro")?.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "registro.html";
    });

    // ── Paso 1: enviar código ─────────────────────────────────────────
    btnEnviar.addEventListener("click", () => {
        const correo = document.getElementById("correo-rec")?.value.trim();

        if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            mostrarError(
                "grupo-correo-rec",
                "error-correo-rec",
                "Ingresa un correo válido."
            );
            return;
        }

        const usuarioGuardado = JSON.parse(
            localStorage.getItem("usuario_registrado") || "null"
        );

        if (!usuarioGuardado || usuarioGuardado.correo !== correo) {
            mostrarError(
                "grupo-correo-rec",
                "error-correo-rec",
                "No encontramos ese correo registrado."
            );
            return;
        }

        limpiarError("grupo-correo-rec", "error-correo-rec");

        codigoGenerado = generarCodigo();

        localStorage.setItem("codigo_recuperacion", codigoGenerado);
        localStorage.setItem("correo_recuperacion", correo);

        console.log(`[LuckyAir] Código para ${correo}: ${codigoGenerado}`);

        alert(`Código enviado (simulado).\nTu código es: ${codigoGenerado}`);

        irPaso(2);
    });

    // ── Limpiar errores en tiempo real ────────────────────────────────
    document.getElementById("correo-rec")?.addEventListener("input", () => {
        limpiarError("grupo-correo-rec", "error-correo-rec");
    });

    document.getElementById("codigo")?.addEventListener("input", () => {
        limpiarError("grupo-codigo", "error-codigo");
    });

    document.getElementById("nueva-pass")?.addEventListener("input", () => {
        limpiarError("grupo-nueva-pass", "error-nueva-pass");
    });

    document.getElementById("conf-nueva-pass")?.addEventListener("input", () => {
        limpiarError("grupo-conf-pass", "error-conf-pass");
    });

    // ── Paso 2: cambiar contraseña ────────────────────────────────────
    document.getElementById("btn-cambiar-pass")?.addEventListener("click", () => {
        cambiarContrasena();
    });
}

function irPaso(num) {
    document.querySelectorAll(".paso").forEach((p) => {
        p.classList.add("oculto");
    });

    document.getElementById(`paso-${num}`)?.classList.remove("oculto");

    const pasoLabel = document.getElementById("paso-label");
    if (pasoLabel) {
        pasoLabel.textContent = `${num} de 2`;
    }

    document.querySelectorAll(".progreso-segmento").forEach((seg, i) => {
        seg.classList.toggle("activo", i < num);
    });
}

function cambiarContrasena() {
    const codigoIngresado =
        document.getElementById("codigo")?.value.trim() || "";

    const nuevaPass =
        document.getElementById("nueva-pass")?.value.trim() || "";

    const confPass =
        document.getElementById("conf-nueva-pass")?.value.trim() || "";

    const codigoEsperado =
        localStorage.getItem("codigo_recuperacion") || "";

    const correoRecuperar =
        localStorage.getItem("correo_recuperacion") || "";

    let valido = true;

    if (
        !codigoIngresado ||
        codigoIngresado.toUpperCase() !== codigoEsperado.toUpperCase()
    ) {
        mostrarError(
            "grupo-codigo",
            "error-codigo",
            "El código no es válido."
        );
        valido = false;
    }

    if (!nuevaPass || nuevaPass.length < 8) {
        mostrarError(
            "grupo-nueva-pass",
            "error-nueva-pass",
            "Mínimo 8 caracteres."
        );
        valido = false;
    }

    if (!confPass || confPass !== nuevaPass) {
        mostrarError(
            "grupo-conf-pass",
            "error-conf-pass",
            "Las contraseñas no coinciden."
        );
        valido = false;
    }

    if (!valido) return;

    const usuarioGuardado = JSON.parse(
        localStorage.getItem("usuario_registrado") || "null"
    );

    if (
        usuarioGuardado &&
        usuarioGuardado.correo === correoRecuperar
    ) {
        usuarioGuardado.contrasena = nuevaPass;

        localStorage.setItem(
            "usuario_registrado",
            JSON.stringify(usuarioGuardado)
        );
    }

    localStorage.removeItem("codigo_recuperacion");
    localStorage.removeItem("correo_recuperacion");

    document.getElementById("recuperar-exito")?.classList.remove("hidden");

    const btnCambiar = document.getElementById("btn-cambiar-pass");
    if (btnCambiar) {
        btnCambiar.disabled = true;
    }

    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);
}

function generarCodigo() {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";

    const p1 = Array.from({ length: 4 }, () =>
        letras[Math.floor(Math.random() * letras.length)]
    ).join("");

    const p2 = Array.from({ length: 2 }, () =>
        nums[Math.floor(Math.random() * nums.length)]
    ).join("");

    const p3 = Array.from({ length: 2 }, () =>
        nums[Math.floor(Math.random() * nums.length)]
    ).join("");

    return `${p1}-${p2}-${p3}`;
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