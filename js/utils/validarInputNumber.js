
export function validarInputNumber (inputId, mensajeId, clearButonId, inputContainerId) {
  const input = document.querySelector(`#${inputId}`);
  const mensajecontainer = document.querySelector(`#${mensajeId}`);
  const clearButon = document.querySelector(`#${clearButonId}`);
  const inputContainer = document.querySelector(`#${inputContainerId}`);

  // Si alguno de los elementos no existe, no hacemos nada
  if (!input || !mensajecontainer || !clearButon || !inputContainer) return;

  input.addEventListener("input", () => {
    const valor = input.value.trim();

    if (valor === "") {
      mensajecontainer.classList.add("hidden");
      clearButon.classList.add("hidden");
      return;
    }

    clearButon.classList.remove("hidden");

    const numero = Number(valor);

    if (!isNaN(numero) && numero > 0 && numero <= 9) {
        mensajecontainer.classList.remove("hidden");
        mensajecontainer.textContent = `${capitalizar(inputId)} válido ✅`;
        mensajecontainer.classList.add("success");
        mensajecontainer.classList.remove("error");
        inputContainer.classList.add("border-success");
        inputContainer.classList.remove("border-error");
    } else {
        mensajecontainer.classList.remove("hidden");
        mensajecontainer.textContent = `${capitalizar(inputId)} no válido ❌`;
        mensajecontainer.classList.add("error");
        mensajecontainer.classList.remove("success");
        inputContainer.classList.add("border-error");
        inputContainer.classList.remove("border-success");
    }
  });

    clearButon.addEventListener("click", () => {
        input.value = "";
        mensajecontainer.classList.add("hidden");
        clearButon.classList.add("hidden");
        inputContainer.classList.remove("border-success");
        inputContainer.classList.remove("border-error");
    });

    function capitalizar(texto) {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }
}
