import { destinos } from "../data/destinos.js";

export function validarInputText (inputId, mensajeId, clearButonId, inputContainerId) {

    const input = document.querySelector(`#${inputId}`);
    const mensajecontainer = document.querySelector(`#${mensajeId}`);
    const clearButon = document.querySelector(`#${clearButonId}`);
    const inputContainer = document.querySelector(`#${inputContainerId}`);

    function validar() {
    const valor = input.value.trim().toLowerCase();

    if (valor === "") {
        // vacío → ocultar todo
        mensajecontainer.classList.add("hidden");
        clearButon.classList.add("hidden");
        return;
    }

    clearButon.classList.remove("hidden");

    // 🔹 Buscar si el valor está en la lista
    const existe = destinos.some(
    destino => destino.nombre.toLowerCase() === valor
    );

    if (existe) {
        mensajecontainer.classList.remove("hidden");
        mensajecontainer.textContent = `${capitalizar(inputId)} válido ✅`;
        mensajecontainer.classList.add("success");
        mensajecontainer.classList.remove("error");
        inputContainer.classList.add("border-success");
        inputContainer.classList.remove("border-error");
    }   else {
        mensajecontainer.classList.remove("hidden");
        mensajecontainer.textContent = `${capitalizar(inputId)} no válido ❌`;
        mensajecontainer.classList.add("error");
        mensajecontainer.classList.remove("success");
        inputContainer.classList.add("border-error");
        inputContainer.classList.remove("border-success");
    }
  }

    input.addEventListener("input", validar);

    clearButon.addEventListener("click", () => {
        input.value = "";
        validar(); // 🔹 fuerza la evaluación → entra al caso vacío
        inputContainer.classList.remove("border-success");
        inputContainer.classList.remove("border-error");
    });

    function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

}
