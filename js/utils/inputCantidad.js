export function inputCantidad(inputId, clearButtonId, containerId) {
  const input = document.querySelector(`#${inputId}`);
  const clearButton = document.querySelector(`#${clearButtonId}`);
  const container = document.querySelector(`#${containerId}`);

  input.addEventListener("input", () => {
    // Solo permitir números
    input.value = input.value.replace(/\D/g, "");

    // Mostrar/ocultar la ❌
    if (input.value.length > 0) {
      clearButton.style.display = "inline";
    } else {
      clearButton.style.display = "none";
    }
  });

  // Al hacer click en la ❌
  clearButton.addEventListener("click", () => {
    input.value = "";
    clearButton.style.display = "none";
  });
}
