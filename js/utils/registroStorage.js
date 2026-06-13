
const LS_USUARIOS = "luckyair_usuarios";

// ── 1. FUNCIONES marcarError / marcarCorrecto (S11) ──────────
function marcarError(campo, mensaje) {
    const grupo = campo.parentElement;
    const mensajeError = grupo.querySelector(".mensaje-error");
    grupo.classList.add("error");
    grupo.classList.remove("correcto");
    if (mensajeError) mensajeError.textContent = mensaje;
}

function marcarCorrecto(campo) {
    const grupo = campo.parentElement;
    const mensajeError = grupo.querySelector(".mensaje-error");
    grupo.classList.remove("error");
    grupo.classList.add("correcto");
    if (mensajeError) mensajeError.textContent = "";
}

// ── 2. FUNCIONES DE VALIDACIÓN (S11) ─────────────────────────
function estaVacio(campo) {
    return campo.value.trim() === "";
}

function correoValido(campo) {
    const valor = campo.value.trim();
    return valor.includes("@") && valor.includes(".");
}

function soloLetras(campo) {
    return /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(campo.value.trim());
}

function dniValido(campo) {
    return /^\d{8}$/.test(campo.value.trim());
}

function pasaporteValido(campo) {
    return /^[A-Z0-9]{6,12}$/i.test(campo.value.trim());
}

function passSegura(campo) {
    return campo.value.trim().length >= 8;
}

// ── 3. GUARDAR USUARIO EN LOCALSTORAGE (S12) ─────────────────
export function guardarUsuario() {
    const usuario = {
        nombres:       document.getElementById("nombres").value.trim(),
        apellidos:     document.getElementById("apellidos").value.trim(),
        correo:        document.getElementById("correo").value.trim(),
        tipoDoc:       document.querySelector(".doc-btn-activo")?.textContent.trim() || "DNI",
        numdoc:        document.getElementById("numdoc").value.trim(),
        password:      document.getElementById("pass").value,
        fechaRegistro: new Date().toLocaleString("es-PE"),
    };

    let usuarios = [];
    try {
        usuarios = JSON.parse(localStorage.getItem(LS_USUARIOS)) || [];
    } catch (e) {
        usuarios = [];
    }

    const yaExiste = usuarios.some(u => u.correo === usuario.correo);
    if (yaExiste) {
        console.warn("⚠️ Ya existe un usuario registrado con ese correo.");
        return false;
    }

    usuarios.push(usuario);
    localStorage.setItem(LS_USUARIOS, JSON.stringify(usuarios));
    mostrarUsuariosEnConsola();
    return true;
}

// ── 4. MOSTRAR USUARIOS EN CONSOLA (S12) ─────────────────────
export function mostrarUsuariosEnConsola() {
    let usuarios = [];
    try {
        usuarios = JSON.parse(localStorage.getItem(LS_USUARIOS)) || [];
    } catch (e) {
        usuarios = [];
    }

    if (usuarios.length === 0) {
        console.log("📋 No hay usuarios registrados aún.");
        return;
    }

    console.log(`👥 Usuarios registrados (${usuarios.length}):`);
    console.table(usuarios.map(u => ({
        Nombres:    u.nombres,
        Apellidos:  u.apellidos,
        Correo:     u.correo,
        TipoDoc:    u.tipoDoc,
        NroDoc:     u.numdoc,
        Contraseña: u.password,
        Fecha:      u.fechaRegistro,
    })));
}

// ── 5. INIT: validación + eventos (S11 + S12) ─────────────────
export function initRegistro() {
    const inputNombres    = document.getElementById("nombres");
    const inputApellidos  = document.getElementById("apellidos");
    const inputCorreo     = document.getElementById("correo");
    const inputNumdoc     = document.getElementById("numdoc");
    const inputPass       = document.getElementById("pass");
    const inputConfpass   = document.getElementById("confpass");

    mostrarUsuariosEnConsola();

    // ── Validación en tiempo real (S11) ──────────────────────
    inputNombres.addEventListener("input", () => {
        if (estaVacio(inputNombres)) {
            marcarError(inputNombres, "Ingrese su nombre.");
        } else if (!soloLetras(inputNombres)) {
            marcarError(inputNombres, "Solo se permiten letras.");
        } else {
            marcarCorrecto(inputNombres);
        }
    });

    inputApellidos.addEventListener("input", () => {
        if (estaVacio(inputApellidos)) {
            marcarError(inputApellidos, "Ingrese sus apellidos.");
        } else if (!soloLetras(inputApellidos)) {
            marcarError(inputApellidos, "Solo se permiten letras.");
        } else {
            marcarCorrecto(inputApellidos);
        }
    });

    inputCorreo.addEventListener("input", () => {
        if (estaVacio(inputCorreo)) {
            marcarError(inputCorreo, "Ingrese su correo.");
        } else if (!correoValido(inputCorreo)) {
            marcarError(inputCorreo, "Ingrese un correo válido.");
        } else {
            marcarCorrecto(inputCorreo);
        }
    });

    inputNumdoc.addEventListener("input", () => {
        const esPasaporte = document.querySelector(".doc-btn-activo")?.textContent.trim() === "Pasaporte";
        if (estaVacio(inputNumdoc)) {
            marcarError(inputNumdoc, "Ingrese su número de documento.");
        } else if (esPasaporte && !pasaporteValido(inputNumdoc)) {
            marcarError(inputNumdoc, "Pasaporte: 6 a 12 caracteres alfanuméricos.");
        } else if (!esPasaporte && !dniValido(inputNumdoc)) {
            marcarError(inputNumdoc, "El DNI debe tener exactamente 8 dígitos.");
        } else {
            marcarCorrecto(inputNumdoc);
        }
    });

    inputPass.addEventListener("input", () => {
        if (estaVacio(inputPass)) {
            marcarError(inputPass, "Ingrese una contraseña.");
        } else if (!passSegura(inputPass)) {
            marcarError(inputPass, "Mínimo 8 caracteres.");
        } else {
            marcarCorrecto(inputPass);
        }
    });

    inputConfpass.addEventListener("input", () => {
        if (estaVacio(inputConfpass)) {
            marcarError(inputConfpass, "Confirme su contraseña.");
        } else if (inputConfpass.value !== inputPass.value) {
            marcarError(inputConfpass, "Las contraseñas no coinciden.");
        } else {
            marcarCorrecto(inputConfpass);
        }
    });

    // ── Sobreescribir irPaso con validación por paso ─────────
    window.irPaso = function (num) {
        if (num === 2) {
            let valido = true;
            if (estaVacio(inputNombres) || !soloLetras(inputNombres)) {
                marcarError(inputNombres, estaVacio(inputNombres) ? "Ingrese su nombre." : "Solo letras."); valido = false;
            } else { marcarCorrecto(inputNombres); }

            if (estaVacio(inputApellidos) || !soloLetras(inputApellidos)) {
                marcarError(inputApellidos, estaVacio(inputApellidos) ? "Ingrese sus apellidos." : "Solo letras."); valido = false;
            } else { marcarCorrecto(inputApellidos); }

            if (estaVacio(inputCorreo) || !correoValido(inputCorreo)) {
                marcarError(inputCorreo, estaVacio(inputCorreo) ? "Ingrese su correo." : "Correo inválido."); valido = false;
            } else { marcarCorrecto(inputCorreo); }

            if (!valido) return;
        }

        if (num === 3) {
            const esPasaporte = document.querySelector(".doc-btn-activo")?.textContent.trim() === "Pasaporte";
            let valido = true;
            if (estaVacio(inputNumdoc)) {
                marcarError(inputNumdoc, "Ingrese su número de documento."); valido = false;
            } else if (esPasaporte && !pasaporteValido(inputNumdoc)) {
                marcarError(inputNumdoc, "Pasaporte inválido."); valido = false;
            } else if (!esPasaporte && !dniValido(inputNumdoc)) {
                marcarError(inputNumdoc, "El DNI debe tener 8 dígitos."); valido = false;
            } else { marcarCorrecto(inputNumdoc); }

            if (!valido) return;
        }

        document.querySelectorAll(".paso").forEach(p => p.classList.add("oculto"));
        document.getElementById("paso-" + num).classList.remove("oculto");
        document.getElementById("paso-label").textContent = num + " de 3";
        document.querySelectorAll(".progreso-segmento").forEach((seg, i) => {
            seg.classList.toggle("activo", i < num);
        });
    };

    // ── Sobreescribir registrar() con validación + localStorage
    window.registrar = function () {
        let valido = true;

        if (estaVacio(inputPass) || !passSegura(inputPass)) {
            marcarError(inputPass, estaVacio(inputPass) ? "Ingrese una contraseña." : "Mínimo 8 caracteres."); valido = false;
        } else { marcarCorrecto(inputPass); }

        if (estaVacio(inputConfpass) || inputConfpass.value !== inputPass.value) {
            marcarError(inputConfpass, estaVacio(inputConfpass) ? "Confirme su contraseña." : "Las contraseñas no coinciden."); valido = false;
        } else { marcarCorrecto(inputConfpass); }

        const tc = document.getElementById("check-tc");
        if (!tc.checked) { alert("Debes aceptar los Términos y Condiciones."); return; }

        if (!valido) return;

        const exito = guardarUsuario();
        if (exito) {
            alert("¡Registro exitoso! Bienvenido a LuckyAir ✈");
        } else {
            alert("Este correo ya está registrado.");
        }
    };
}