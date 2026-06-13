import { menuMobile } from "./utils/menuMobile.js";
import { themeMain } from "./utils/theme.js";
import { destinos } from "./data/destinos.js";
import { destinos2 } from "./data/destinos2.js";
import { cargarOpciones } from "./utils/combobox.js";
import { clearList } from "./utils/clearList.js";
import { inputBuscar } from "./utils/inputBuscar.js";
import { inputCantidad } from "./utils/inputCantidad.js";
import { inputDate } from "./utils/inputDate.js";
import { renderCards } from "./utils/ofertasCards.js";
import { beneficiosCards } from "./utils/beneficiosCards.js";
import { validarInputText } from "./utils/validarInputText.js";
import { validarInputNumber } from "./utils/validarInputNumber.js";
import { validarInputDate } from "./utils/validarInputDate.js";
import { validarInputForm } from "./utils/validarInputForm.js";
import { enableDragScroll } from "./utils/dragScrollSlider.js";
import { aplicarTemaGuardado, guardarTema } from "./utils/themeStorage.js";
import { buscarVuelos2 } from "./utils/buscarvuelos.js";
import { mostrarConfirmacionPago } from "./utils/confirmar-pago.js";
import { loginForm } from "./utils/loginForm.js";
import { recuperarForm } from "./utils/recuperarForm.js";
import { registroForm } from "./utils/registroForm.js";

// Forms
import { buscarVuelos } from "./forms/buscarVuelos.js";
import { mostrarInfoVuelos } from "./forms/mostrarInfoVuelos.js";

document.addEventListener("DOMContentLoaded", () => {
    // Menú mobile
    menuMobile();
    // Tema
    aplicarTemaGuardado();
    themeMain();
    // Origen
    cargarOpciones("lista-origen", destinos);
    inputBuscar("origen", "clear-origen", "buscar-origen");
    validarInputText("origen", "mensaje-error-origen", "clear-origen", "buscar-origen");
    // Destino
    cargarOpciones("lista-destinos", destinos);
    inputBuscar("destino", "clear-destinos", "buscar-destino");
    validarInputText("destino", "mensaje-error-destinos", "clear-destinos", "buscar-destino");
    // Fechas
    validarInputDate("ida", "mensaje-error-ida", "buscar-date");
    validarInputDate("vuelta", "mensaje-error-vuelta", "buscar-date");
    // Cantidad
    validarInputNumber("cantidad", "mensaje-error-cantidad", "clear-cantidad", "buscar-cantidad");
    // Ofertas cards
    renderCards();
    enableDragScroll("cards-container");
    // Beneficios cards
    beneficiosCards();
    // Footer form
    validarInputForm("nombresyapellidos", "mensaje-error-nya", "clear-nya", "input-nya");
    validarInputForm("asunto", "mensaje-error-asunto", "clear-asunto", "input-asunto");
    validarInputForm("email", "mensaje-error-email", "clear-email", "input-email");
    validarInputForm("mensaje", "mensaje-error-mensaje", "clear-mensaje", "input-mensaje");
    // Forms
    buscarVuelos();
    mostrarInfoVuelos();
    mostrarConfirmacionPago();
    buscarVuelos2(destinos2);
    // Páginas específicas
    loginForm();
    recuperarForm();
    registroForm();
});