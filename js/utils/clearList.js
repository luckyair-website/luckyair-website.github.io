
export function clearList (clearButonId, inputId, containerId){
    const clearButon = document.querySelector(`#${clearButonId}`);
    const input = document.querySelector(`#${inputId}`);
    const container = document.querySelector(`#${containerId}`);
    const root = document.documentElement;

    clearButon.addEventListener("click", () => {
        // limpiar valor
        input.value = "";
        clearButon.style.display = "none";

        // quitar estados previos
        container.classList.remove("success", "error");
        container.classList.add("standby");
        container.style.borderColor = "";
        

        // aplicar color standby usando tu variable
        /* let currentBorderColor = getComputedStyle(root).getPropertyValue("--border-color-primary").trim();

        container.style.borderColor = currentBorderColor;

        console.log("borde reseteado a", currentBorderColor); */
  });
}