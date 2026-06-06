
export function validarInputDate(inputId, mensajeId, inputContainerId) {
  const input = document.querySelector(`#${inputId}`);
  const mensajecontainer = document.querySelector(`#${mensajeId}`);
  const inputContainer = document.querySelector(`#${inputContainerId}`);

  input.addEventListener("change", () => {
    const valor = input.value.trim();

    if (valor === "") {
      // vacío → ocultar mensaje y resetear estilos
      mensajecontainer.classList.add("hidden");
      inputContainer.classList.remove("border-success", "border-error");
      return;
    }

    // Si hay valor, el navegador ya garantiza que es una fecha válida
    const fecha = new Date(valor);

    if (!isNaN(fecha.getTime())) {
      mensajecontainer.classList.remove("hidden");
      mensajecontainer.textContent = `Valor de ${capitalizar(inputId)} válido ✅`;
      mensajecontainer.classList.add("success");
      mensajecontainer.classList.remove("error");
      inputContainer.classList.add("border-success");
      inputContainer.classList.remove("border-error");
    } else {
      mensajecontainer.classList.remove("hidden");
      mensajecontainer.textContent = `Valor de ${capitalizar(inputId)} no válido ❌`;
      mensajecontainer.classList.add("error");
      mensajecontainer.classList.remove("success");
      inputContainer.classList.add("border-error");
      inputContainer.classList.remove("border-success");
    }
  });

  function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
}
