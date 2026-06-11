import { menuMobile } from "./utils/menuMobile.js";
import { themeMain } from "./utils/theme.js";
import { destinos } from "./data/destinos.js";
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
import { pagoFinal } from "./utils/pagoFinal.js";
import { beneficiosInteract } from "./utils/beneficiosInteract.js";

document.addEventListener("DOMContentLoaded", () => {
    // Menu mobile
    menuMobile();
    // Cambiar tema
    themeMain();

    // Origen (solo index)
    if (document.querySelector("#lista-origen")) {
        cargarOpciones("lista-origen", destinos);
        inputBuscar("origen", "clear-origen", "buscar-origen");
        validarInputText("origen", "mensaje-error-origen", "clear-origen", "buscar-origen");
    }
    // Destino (solo index)
    if (document.querySelector("#lista-destinos")) {
        cargarOpciones("lista-destinos", destinos);
        inputBuscar("destino", "clear-destinos", "buscar-destino");
        validarInputText("destino", "mensaje-error-destinos", "clear-destinos", "buscar-destino");
    }
    // Fechas (solo index)
    if (document.querySelector("#ida")) {
        validarInputDate("ida", "mensaje-error-ida", "buscar-date");
        validarInputDate("vuelta", "mensaje-error-vuelta", "buscar-date");
    }
    // Cantidad (solo index)
    if (document.querySelector("#cantidad")) {
        validarInputNumber("cantidad", "mensaje-error-cantidad", "clear-cantidad", "buscar-cantidad");
    }
    // Ofertas cards (solo index)
    if (document.querySelector("#cards-container")) {
        renderCards();
        enableDragScroll("cards-container");
    }
    // Beneficios cards (solo index)
    if (document.querySelector(".beneficios-container")) {
        beneficiosCards();
    }
    // Footer form (todas las páginas que lo tengan)
    if (document.querySelector("#nombresyapellidos")) {
        validarInputForm("nombresyapellidos", "mensaje-error-nya", "clear-nya", "input-nya");
        validarInputForm("asunto", "mensaje-error-asunto", "clear-asunto", "input-asunto");
        validarInputForm("email", "mensaje-error-email", "clear-email", "input-email");
        validarInputForm("mensaje", "mensaje-error-mensaje", "clear-mensaje", "input-mensaje");
    }
    // Pago final (solo pagofinal)
    if (document.querySelector(".btn-download")) {
        pagoFinal();
    }
    // Beneficios interact (solo beneficios)
    if (document.querySelector(".btn-canjear")) {
        beneficiosInteract();
    }
});