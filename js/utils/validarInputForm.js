
export function validarInputForm(inputId, mensajeId, clearButonId, inputContainerId) {
  const input = document.querySelector(`#${inputId}`);
  const mensajecontainer = document.querySelector(`#${mensajeId}`);
  const clearButon = document.querySelector(`#${clearButonId}`);
  const inputContainer = document.querySelector(`#${inputContainerId}`);

  // Si alguno de los elementos no existe, no hacemos nada
  if (!input || !mensajecontainer || !clearButon || !inputContainer) return;

  function validar() {
    const valor = input.value.trim();

    if (valor === "") {
      // vacío → ocultar todo
      mensajecontainer.classList.add("hidden");
      clearButon.classList.add("hidden");
      inputContainer.classList.remove("border-success", "border-error");
      return;
    }

    clearButon.classList.remove("hidden");

    let esValido = false;

    // 🔹 Validación según tipo de input
    if (input.type === "email") {
      // Regex simple para email
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      esValido = regexEmail.test(valor);
    } else if (input.type === "text") {
        // Al menos dos palabras, cada una con 2+ letras, sin importar mayúsculas/minúsculas
        const regexTexto = /^[a-záéíóúñ]{2,}(\s[a-záéíóúñ]{2,})+$/i;
        esValido = regexTexto.test(valor);
    }   else if (input.tagName.toLowerCase() === "textarea") {
        // Ejemplo: mínimo 10 caracteres, permite letras, números y signos de puntuación básicos
        const regexTextarea = /^[a-záéíóúñ0-9\s.,;:!?]{10,}$/i;
        esValido = regexTextarea.test(valor);
    }

    if (esValido) {
      mensajecontainer.classList.remove("hidden");
      mensajecontainer.textContent = "Ingreso válido ✅";
      mensajecontainer.classList.add("success");
      mensajecontainer.classList.remove("error");
      inputContainer.classList.add("border-success");
      inputContainer.classList.remove("border-error");
    } else {
      mensajecontainer.classList.remove("hidden");
      mensajecontainer.textContent = "Ingreso no válido ❌";
      mensajecontainer.classList.add("error");
      mensajecontainer.classList.remove("success");
      inputContainer.classList.add("border-error");
      inputContainer.classList.remove("border-success");
    }
  }

  input.addEventListener("input", validar);

  clearButon.addEventListener("click", () => {
    input.value = "";
    validar(); // fuerza evaluación → entra al caso vacío
    inputContainer.classList.remove("border-success", "border-error");
  });

  function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
}
