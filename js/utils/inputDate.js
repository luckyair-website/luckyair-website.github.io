export function inputDate(inputId, containerId) {
  const input = document.querySelector(`#${inputId}`);
  const container = document.querySelector(`#${containerId}`);

  input.addEventListener("change", () => {
    if (input.value) {
      // fecha seleccionada → success
      container.classList.remove("error", "standby");
      container.classList.add("success");
    } else {
      // vacío → standby
      container.classList.remove("success", "error");
      container.classList.add("standby");
    }
  });
}
