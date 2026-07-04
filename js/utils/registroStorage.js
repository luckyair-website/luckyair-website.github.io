const LS_KEY = "luckyair_registro";

// ── UTILIDADES VISUALES ──────────────────────────────────────
function marcarError(input, mensaje) {
    const grupo = input.closest(".campo-grupo");
    grupo.classList.add("campo-error");
    grupo.classList.remove("campo-ok");
    let small = grupo.querySelector(".msg-validacion");
    if (!small) {
        small = document.createElement("small");
        small.className = "msg-validacion";
        grupo.appendChild(small);
    }
    small.textContent = "❌ " + mensaje;
}

function marcarOk(input) {
    const grupo = input.closest(".campo-grupo");
    grupo.classList.remove("campo-error");
    grupo.classList.add("campo-ok");
    let small = grupo.querySelector(".msg-validacion");
    if (!small) {
        small = document.createElement("small");
        small.className = "msg-validacion";
        grupo.appendChild(small);
    }
    small.textContent = "✅ Correcto";
}

// ── REGLAS DE VALIDACIÓN ─────────────────────────────────────
function validarNombres(input) {
    const v = input.value.trim();
    if (!v) return marcarError(input, "El nombre es obligatorio.");
    if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(v)) return marcarError(input, "Solo se permiten letras.");
    marcarOk(input);
    return true;
}

function validarApellidos(input) {
    const v = input.value.trim();
    if (!v) return marcarError(input, "El apellido es obligatorio.");
    if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(v)) return marcarError(input, "Solo se permiten letras.");
    marcarOk(input);
    return true;
}

function validarCorreo(input) {
    const v = input.value.trim();
    if (!v) return marcarError(input, "El correo es obligatorio.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return marcarError(input, "Ingresa un correo válido.");
    marcarOk(input);
    return true;
}

function validarNumdoc(input) {
    const v = input.value.trim();
    const esPasaporte = document.querySelector(".doc-btn-activo")?.textContent?.trim() === "Pasaporte";
    if (!v) return marcarError(input, "El número de documento es obligatorio.");
    if (esPasaporte && !/^[A-Z0-9]{6,12}$/i.test(v)) return marcarError(input, "Pasaporte: 6-12 caracteres alfanuméricos.");
    if (!esPasaporte && !/^\d{8}$/.test(v)) return marcarError(input, "El DNI debe tener exactamente 8 dígitos.");
    marcarOk(input);
    return true;
}

function validarPass(input) {
    const v = input.value;
    if (!v) return marcarError(input, "La contraseña es obligatoria.");
    if (v.length < 8) return marcarError(input, "Mínimo 8 caracteres.");
    marcarOk(input);
    return true;
}

function validarConfpass(inputPass, inputConf) {
    const v = inputConf.value;
    if (!v) return marcarError(inputConf, "Confirma tu contraseña.");
    if (v !== inputPass.value) return marcarError(inputConf, "Las contraseñas no coinciden.");
    marcarOk(inputConf);
    return true;
}

// ── GUARDAR EN LOCALSTORAGE ───────────────────────────────────
function guardarRegistro() {
    const datos = {
        nombres: document.getElementById("nombres")?.value || "",
        apellidos: document.getElementById("apellidos")?.value || "",
        correo: document.getElementById("correo")?.value || "",
        numdoc: document.getElementById("numdoc")?.value || "",
        tipoDoc: document.querySelector(".doc-btn-activo")?.textContent?.trim() || "DNI",
    };
    localStorage.setItem(LS_KEY, JSON.stringify(datos));
}

// ── RESTAURAR DESDE LOCALSTORAGE ─────────────────────────────
function restaurarRegistro() {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return;
    try {
        const d = JSON.parse(raw);
        if (d.nombres) document.getElementById("nombres").value = d.nombres;
        if (d.apellidos) document.getElementById("apellidos").value = d.apellidos;
        if (d.correo) document.getElementById("correo").value = d.correo;
        if (d.numdoc) document.getElementById("numdoc").value = d.numdoc;
        if (d.tipoDoc) {
            document.querySelectorAll(".doc-btn").forEach(btn => {
                btn.classList.toggle("doc-btn-activo", btn.textContent.trim() === d.tipoDoc);
            });
        }
        console.log("📋 Borrador restaurado desde localStorage:");
        console.table(d);
    } catch (e) {
        localStorage.removeItem(LS_KEY);
    }
}

// ── MOSTRAR EN CONSOLA ────────────────────────────────────────
function mostrarUsuariosEnConsola() {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) {
        console.log("📋 No hay datos de registro guardados.");
        return;
    }
    console.log("👤 Datos de registro en localStorage:");
    console.table(JSON.parse(raw));
}

// ── REEMPLAZAR irPaso CON VALIDACIÓN ─────────────────────────
function sobreescribirIrPaso() {
    const inputNombres = document.getElementById("nombres");
    const inputApellidos = document.getElementById("apellidos");
    const inputCorreo = document.getElementById("correo");
    const inputNumdoc = document.getElementById("numdoc");

    window.irPaso = function (num) {
        if (num === 2) {
            const v1 = validarNombres(inputNombres);
            const v2 = validarApellidos(inputApellidos);
            const v3 = validarCorreo(inputCorreo);
            if (!v1 || !v2 || !v3) return;
            guardarRegistro();
        }
        if (num === 3) {
            const v4 = validarNumdoc(inputNumdoc);
            if (!v4) return;
            guardarRegistro();
        }
        document.querySelectorAll(".paso").forEach(p => p.classList.add("oculto"));
        document.getElementById("paso-" + num).classList.remove("oculto");
        document.getElementById("paso-label").textContent = num + " de 3";
        document.querySelectorAll(".progreso-segmento").forEach((seg, i) => {
            seg.classList.toggle("activo", i < num);
        });
    };
}

// ── REEMPLAZAR registrar() CON VALIDACIÓN ────────────────────
function sobreescribirRegistrar() {
    const inputNombres   = document.getElementById("nombres");
    const inputApellidos = document.getElementById("apellidos");
    const inputCorreo    = document.getElementById("correo");
    const inputNumdoc    = document.getElementById("numdoc");
    const inputPass      = document.getElementById("pass");
    const inputConfpass  = document.getElementById("confpass");

    window.registrar = function () {
        const v1 = validarPass(inputPass);
        const v2 = validarConfpass(inputPass, inputConfpass);
        const tc = document.getElementById("check-tc");
        if (!tc.checked) { alert("Debes aceptar los T&C"); return; }
        if (!v1 || !v2) return;

        // NUEVO: try/catch alrededor del guardado. localStorage.setItem()
        // puede fallar en casos raros (por ejemplo si el navegador está
        // en modo privado y bloquea el almacenamiento, o si se llenó el
        // espacio disponible). Sin esto, ese error dejaría al usuario sin
        // ningún aviso, pensando que sí se registró cuando en realidad no.
        try {
            // BUG CORREGIDO: antes se guardaba el "borrador" de los pasos 1
            // y 2 (localStorage.getItem(LS_KEY)), pero ese borrador NUNCA
            // incluía la contraseña (se pedía recién en el paso 3).
            // Resultado: el usuario se guardaba SIN contraseña, y el login
            // nunca podía comparar nada. Ahora se arma el objeto completo,
            // tomando todos los datos directamente de los inputs en este
            // mismo momento.
            const usuario = {
                nombres: inputNombres.value.trim(),
                apellidos: inputApellidos.value.trim(),
                correo: inputCorreo.value.trim(),
                numdoc: inputNumdoc.value.trim(),
                tipoDoc: document.querySelector(".doc-btn-activo")?.textContent?.trim() || "DNI",
                contrasena: inputPass.value,
                fechaRegistro: new Date().toLocaleString("es-PE"),
            };

            // Guardamos el usuario en localStorage. Esta es la MISMA clave
            // ("luckyair_usuario") que después revisa js/utils/loginForm.js
            // para dejarte entrar.
            localStorage.setItem("luckyair_usuario", JSON.stringify(usuario));
            localStorage.removeItem(LS_KEY); // el borrador ya no se necesita

            // Requisito: mostrar el usuario creado en la consola del navegador
            console.log("✅ Nuevo usuario registrado:");
            console.table(usuario);

            alert(`¡Registro exitoso! Bienvenido a LuckyAir, ${usuario.nombres} ✈`);

            // Llevamos al usuario a la pantalla de login para que inicie sesión
            window.location.href = "login.html";

        } catch (error) {
            console.error("Error al guardar el usuario registrado:", error);
            alert("No se pudo completar el registro. Intenta de nuevo.");
        }
    };
}

// ── CSS ESTADOS VISUALES ─────────────────────────────────────
function inyectarEstilos() {
    const style = document.createElement("style");
    style.textContent = `
        .campo-grupo.campo-error .registro-input {
            border: 1.5px solid #dc2626;
            background-color: #fef2f2;
        }
        .campo-grupo.campo-ok .registro-input {
            border: 1.5px solid #16a34a;
            background-color: #f0fdf4;
        }
        .msg-validacion {
            font-size: 12px;
            margin-top: 3px;
            display: block;
            min-height: 16px;
        }
        .campo-error .msg-validacion { color: #dc2626; }
        .campo-ok    .msg-validacion { color: #16a34a; }
    `;
    document.head.appendChild(style);
}

// ── INIT PRINCIPAL ────────────────────────────────────────────
export function initRegistroStorage() {
    inyectarEstilos();
    restaurarRegistro();
    mostrarUsuariosEnConsola();
    sobreescribirIrPaso();
    sobreescribirRegistrar();

    // Validación en tiempo real
    const campos = [
        { id: "nombres", fn: (i) => validarNombres(i) },
        { id: "apellidos", fn: (i) => validarApellidos(i) },
        { id: "correo", fn: (i) => validarCorreo(i) },
        { id: "numdoc", fn: (i) => validarNumdoc(i) },
        { id: "pass", fn: (i) => validarPass(i) },
    ];
    campos.forEach(({ id, fn }) => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener("input", () => { fn(input); guardarRegistro(); });
        }
    });

    // Validar confirmación en tiempo real
    const inputConf = document.getElementById("confpass");
    const inputPass = document.getElementById("pass");
    if (inputConf) {
        inputConf.addEventListener("input", () => validarConfpass(inputPass, inputConf));
    }

    // Guardar al cambiar tipo de documento
    document.querySelectorAll(".doc-btn").forEach(btn => {
        btn.addEventListener("click", guardarRegistro);
    });
}
