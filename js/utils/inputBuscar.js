import { destinos } from "../data/destinos.js";

export function inputBuscar (inputId, clearButonId, buscarId) {
    const inputBuscar = document.querySelector(`#${inputId}`);
    const clearButon = document.querySelector(`#${clearButonId}`);
    const container = document.querySelector(`#${buscarId}`);

    // Si alguno de los elementos no existe, no hacemos nada
    if (!inputBuscar || !clearButon || !container) return;

    inputBuscar.addEventListener("input", () => {
        container.classList.remove("success", "error");
        
        if (inputBuscar.value.trim() === "") {
            // standby
            clearButon.style.display = "none";
        } else if (
            destinos.some(
                destino => destino.nombre.toLowerCase() === inputBuscar.value.trim().toLowerCase()
        )
        ) {
            // válido → success
            clearButon.style.display = "block";
            /* container.classList.add("success"); */
        } else {
            // inválido → error
            clearButon.style.display = "block";
            /* container.classList.add("error"); */
        }
  });
}