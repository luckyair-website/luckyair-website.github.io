
export function estadosJson(containerId) {
    const container = document.querySelector(`#${containerId}`);
    
    if(!container) return;

    

    function loadingState () {
        container.textContent = "Cargando info ...";
        container.classList.remove("color-error");
        container.classList.remove("hidden");
        container.classList.add("color-success");
    }

    function successState (count) {
        container.textContent = `Se cargaron ${count} oferta${count > 1 ? "s" : ""} correctamente ✅`;;
        container.classList.remove("color-error");
        container.classList.remove("hidden");
        container.classList.add("color-success");
    }

    function errorState () {
        container.textContent = "No se pudo cargar la info ...";
        container.classList.remove("hidden");
        container.classList.remove("color-success");
        container.classList.add("color-error");
    }
    

    return { loadingState, successState, errorState };
}