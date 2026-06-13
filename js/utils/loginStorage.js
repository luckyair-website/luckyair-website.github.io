

const LS_USUARIOS    = "luckyair_usuarios";
const LS_SESION      = "luckyair_sesion_activa";

// ── UTILIDADES VISUALES () ─────────────────────────────────
function marcarError(campo, mensaje) {
    const grupo = campo.parentElement;
    const small = grupo.querySelector(".mensaje-error");
    grupo.classList.add("error");
    grupo.classList.remove("correcto");
    if (small) small.textContent = mensaje;
}

function marcarCorrecto(campo) {
    const grupo = campo.parentElement;
    const small = grupo.querySelector(".mensaje-error");
    grupo.classList.remove("error");
    grupo.classList.add("correcto");
    if (small) small.textContent = "";
}

// ── VALIDACIONES BÁSICAS () ────────────────────────────────
function estaVacio(campo) {
    return campo.value.trim() === "";
}

function correoValido(campo) {
    const valor = campo.value.trim();
    return valor.includes("@") && valor.includes(".");
}

// ── LOGIN CONTRA LOCALSTORAGE (S12) ──────────────────────────
function iniciarSesion(correo, password) {
    let usuarios = [];
    try {
        usuarios = JSON.parse(localStorage.getItem(LS_USUARIOS)) || [];
    } catch (e) {
        usuarios = [];
    }

    const usuario = usuarios.find(
        u => u.correo === correo && u.password === password
    );

    if (usuario) {
        // Guardar sesión activa
        localStorage.setItem(LS_SESION, JSON.stringify({
            nombres:   usuario.nombres,
            apellidos: usuario.apellidos,
            correo:    usuario.correo,
        }));
        console.log("✅ Sesión iniciada:");
        console.table({ Nombres: usuario.nombres, Apellidos: usuario.apellidos, Correo: usuario.correo });
        return true;
    }

    console.warn("❌ Credenciales incorrectas.");
    return false;
}

// ── INIT: conectar formulario de login (S11 + S12) ────────────
export function initLogin() {
    const inputCorreo    = document.getElementById("correo");
    const inputPassword  = document.getElementById("contrasena");
    const btnLogin       = document.querySelector(".login-form__submit");

    if (!inputCorreo || !inputPassword || !btnLogin) return;

    // Agregar <small class="mensaje-error"> si no existe
    [inputCorreo, inputPassword].forEach(input => {
        const grupo = input.parentElement;
        if (!grupo.querySelector(".mensaje-error")) {
            const small = document.createElement("small");
            small.className = "mensaje-error";
            grupo.appendChild(small);
        }
    });

    // Validación en tiempo real (S11)
    inputCorreo.addEventListener("input", () => {
        if (estaVacio(inputCorreo)) {
            marcarError(inputCorreo, "Ingrese su correo.");
        } else if (!correoValido(inputCorreo)) {
            marcarError(inputCorreo, "Ingrese un correo válido.");
        } else {
            marcarCorrecto(inputCorreo);
        }
    });

    inputPassword.addEventListener("input", () => {
        if (estaVacio(inputPassword)) {
            marcarError(inputPassword, "Ingrese su contraseña.");
        } else if (inputPassword.value.length < 8) {
            marcarError(inputPassword, "Mínimo 8 caracteres.");
        } else {
            marcarCorrecto(inputPassword);
        }
    });

    // Interceptar clic en INICIAR SESIÓN (S11 preventDefault)
    btnLogin.addEventListener("click", (evento) => {
        evento.preventDefault();
        let valido = true;

        if (estaVacio(inputCorreo) || !correoValido(inputCorreo)) {
            marcarError(inputCorreo, estaVacio(inputCorreo) ? "Ingrese su correo." : "Correo inválido.");
            valido = false;
        } else {
            marcarCorrecto(inputCorreo);
        }

        if (estaVacio(inputPassword)) {
            marcarError(inputPassword, "Ingrese su contraseña.");
            valido = false;
        } else if (inputPassword.value.length < 8) {
            marcarError(inputPassword, "Mínimo 8 caracteres.");
            valido = false;
        } else {
            marcarCorrecto(inputPassword);
        }

        if (!valido) return;

        const correo   = inputCorreo.value.trim();
        const password = inputPassword.value;
        const exito    = iniciarSesion(correo, password);

        if (exito) {
            alert("¡Bienvenido a LuckyAir! ✈");
            window.location.href = "../pages/dashboard.html";
        } else {
            // Marcar ambos campos como error (S11)
            marcarError(inputCorreo, "Correo o contraseña incorrectos.");
            marcarError(inputPassword, "Correo o contraseña incorrectos.");
        }
    });
}