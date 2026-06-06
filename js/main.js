
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



document.addEventListener("DOMContentLoaded", () => {
    // Menu mobile
    menuMobile();
    // Cambiar tema
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
    // Inputcantidad
        validarInputNumber("cantidad", "mensaje-error-cantidad", "clear-cantidad", "buscar-cantidad");
    // Ofertas cards
        renderCards();
        enableDragScroll("cards-container");
    //beneficios cards
        beneficiosCards();
    // Footer form
        validarInputForm("nombresyapellidos", "mensaje-error-nya", "clear-nya", "input-nya");
        validarInputForm("asunto", "mensaje-error-asunto", "clear-asunto", "input-asunto");
        validarInputForm("email", "mensaje-error-email", "clear-email", "input-email");
        validarInputForm("mensaje", "mensaje-error-mensaje", "clear-mensaje", "input-mensaje");
});