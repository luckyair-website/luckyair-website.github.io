export function usuarioFrecuente(buttonId) {
  const button = document.querySelector(`#${buttonId}`);

  const containerId = document.querySelectorAll(".pago-tarjeta");

  const radioCards = document.querySelectorAll('input[name="tarjeta"]');
  const errorId = document.querySelectorAll("#card-error");

  if (!button) return;

  button.addEventListener("click", (event) => {
    event.preventDefault();

    // Buscar el radio seleccionado
    const seleccionado = document.querySelector('input[name="tarjeta"]:checked');

    if (!seleccionado) {
      // No hay ninguno → mostrar error
      errorId.forEach(errorMessage => {
        errorMessage.classList.remove("hidden");
        errorMessage.classList.add("color-error");
        
      });

      containerId.forEach(container => {
        container.classList.add("pago-tarjeta--activa");
        container.classList.add("color-accent");
      });
      
      return;
    }

    // Crear objeto de pago simulado
    const pagoInfo = {
      metodo: seleccionado.id, // "visa" o "mastercard"
      cardMask: seleccionado.id === "visa" ? "**** **** **** 1234" : "**** **** **** 4321",
      vence: seleccionado.id === "visa" ? "08/30" : "01/28"
    };

    // Guardar en localStorage como objeto
    localStorage.setItem("pagoInfo", JSON.stringify(pagoInfo));
    console.log(pagoInfo);

    // Redirigir
    window.location.href = "../../pages/confirmar-pago.html";
  });
}

export function nuevoUsuario(buttonId) {

    const numberInput = document.querySelector("#num-tarjeta");
    const nombreInput = document.querySelector("#nombre-tarjeta");
    const fechaInput = document.querySelector("#fecha-exp");
    const button = document.querySelector(`#${buttonId}`);//pagar-nuevo-usuario
    const errorBox = document.querySelector("#errorNew");


  

    if (!button) return;



    button.addEventListener("click", (event) => {
        event.preventDefault();
        
        let cardNumber = numberInput.value.trim();
        let cardNombre = nombreInput.value.trim();
        let cardVence = fechaInput.value.trim();
        //let cardCVV = cvvInput.value.trim();
        let errores = [];

        // Validaciones simples
        if (!cardNumber || cardNumber.length < 16) {
        errores.push("El número de tarjeta debe tener al menos 16 dígitos.");
        }
        if (!cardNombre) {
        errores.push("El nombre del titular es obligatorio.");
        }
        if (!cardVence) {
        errores.push("La fecha de vencimiento es obligatoria.");
        }

        if (errores.length > 0) {
        errorBox.innerHTML = errores.join("<br>");
        errorBox.classList.remove("hidden");
        return;
        }

        // Crear objeto seguro (simulado)
    const pagoInfo = {
      metodo: "nuevo-usuario",
      cardMask: "**** **** **** " + cardNumber.slice(-4), // solo últimos 4 dígitos
      nombre: cardNombre,
      vence: cardVence,
      cvvMask: "***" // nunca guardar el CVV real
    };

    // Guardar en localStorage
    localStorage.setItem("pagoInfo", JSON.stringify(pagoInfo));

    // Ocultar errores si todo está bien
    errorBox.classList.add("hidden");
    console.log(pagoInfo);
    // Redirigir
    window.location.href = "../../pages/confirmar-pago.html";
    });
}
