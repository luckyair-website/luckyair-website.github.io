let pasoActual = 1;

export function registroForm() {
    const card = document.querySelector(".registro-card");

    // Si no estamos en registro.html, salir sin romper nada
    if (!card) return;

    // ── Navegación por JS ─────────────────────────────────────────────
    document.getElementById("link-ir-login-reg")?.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "login.html";
    });

    // ── Botones pasos ─────────────────────────────────────────────────
    document.getElementById("btn-sig-1")?.addEventListener("click", () => {
        if (validarPaso1()) irPaso(2);
    });

    document.getElementById("btn-volver-2")?.addEventListener("click", () => {
        irPaso(1);
    });

    document.getElementById("btn-sig-2")?.addEventListener("click", () => {
        if (validarPaso2()) irPaso(3);
    });

    document.getElementById("btn-registrar-final")?.addEventListener("click", () => {
        if (validarPaso3()) registrar();
    });

    // ── Selector tipo documento ───────────────────────────────────────
    document.querySelectorAll(".doc-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            document
                .querySelectorAll(".doc-btn")
                .forEach((b) => b.classList.remove("doc-btn-activo"));

            btn.classList.add("doc-btn-activo");
        });
    });

    // ── Limpiar errores en tiempo real ────────────────────────────────
    ["nombres", "apellidos", "correo-reg", "numdoc", "pass", "confpass"].forEach((id) => {
        document.getElementById(id)?.addEventListener("input", () => {
            limpiarError(`grupo-${id}`, `error-${id}`);
        });
    });
}

function irPaso(num) {
    document.querySelectorAll(".paso").forEach((p) => {
        p.classList.add("oculto");
    });

    document.getElementById(`paso-${num}`)?.classList.remove("oculto");

    const pasoLabel = document.getElementById("paso-label");
    if (pasoLabel) {
        pasoLabel.textContent = `${num} de 3`;
    }

    document.querySelectorAll(".progreso-segmento").forEach((seg, i) => {
        seg.classList.toggle("activo", i < num);
    });

    pasoActual = num;
}

function validarPaso1() {
    let valido = true;

    const nombres = document.getElementById("nombres")?.value.trim() || "";
    const apellidos = document.getElementById("apellidos")?.value.trim() || "";
    const correo = document.getElementById("correo-reg")?.value.trim() || "";

    if (!nombres || nombres.length < 2) {
        mostrarError(
            "grupo-nombres",
            "error-nombres",
            "Ingresa tus nombres."
        );
        valido = false;
    }

    if (!apellidos || apellidos.length < 2) {
        mostrarError(
            "grupo-apellidos",
            "error-apellidos",
            "Ingresa tus apellidos."
        );
        valido = false;
    }

    if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        mostrarError(
            "grupo-correo-reg",
            "error-correo-reg",
            "Ingresa un correo válido."
        );
        valido = false;
    }

    return valido;
}

function validarPaso2() {
    let valido = true;

    const numdoc = document.getElementById("numdoc")?.value.trim() || "";

    if (!numdoc || numdoc.length < 7) {
        mostrarError(
            "grupo-numdoc",
            "error-numdoc",
            "Número de documento inválido."
        );
        valido = false;
    }

    return valido;
}

function validarPaso3() {
    let valido = true;

    const pass = document.getElementById("pass")?.value.trim() || "";
    const confpass = document.getElementById("confpass")?.value.trim() || "";
    const checkTc = document.getElementById("check-tc")?.checked;

    if (!pass || pass.length < 8) {
        mostrarError(
            "grupo-pass",
            "error-pass",
            "Mínimo 8 caracteres."
        );
        valido = false;
    }

    if (!confpass || confpass !== pass) {
        mostrarError(
            "grupo-confpass",
            "error-confpass",
            "Las contraseñas no coinciden."
        );
        valido = false;
    }

    if (!checkTc) {
        alert("Debes aceptar los términos y condiciones.");
        valido = false;
    }

    return valido;
}

function registrar() {
    const usuario = {
        nombres: document.getElementById("nombres")?.value.trim() || "",
        apellidos: document.getElementById("apellidos")?.value.trim() || "",
        correo: document.getElementById("correo-reg")?.value.trim() || "",
        tipoDoc:
            document.querySelector(".doc-btn-activo")?.textContent?.trim() ||
            "DNI",
        numdoc: document.getElementById("numdoc")?.value.trim() || "",
        contrasena: document.getElementById("pass")?.value.trim() || "",
    };

    localStorage.setItem(
        "usuario_registrado",
        JSON.stringify(usuario)
    );

    alert(`¡Registro exitoso! Bienvenido, ${usuario.nombres}.`);

    window.location.href = "login.html";
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