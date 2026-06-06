
const themeLight = document.querySelector("#theme-bg");
const root = document.documentElement;

export function themeMain () {
    
    themeLight.addEventListener("click", () => {
        const header = document.querySelector("header");
        // Leer el valor actual de la variable
        let currentBgColor = getComputedStyle(root).getPropertyValue("--color-primary").trim();
        let currentFontColor = getComputedStyle(root).getPropertyValue("--font-color-primary").trim();
        let currentFontColorAccent = getComputedStyle(root).getPropertyValue("--color-accent").trim();
        let currentBoxShadowDark = getComputedStyle(root).getPropertyValue("--box-shadow-dark").trim();
        let currentBorderColor = getComputedStyle(root).getPropertyValue("--border-color-primary").trim();
        const boxShadow = document.querySelectorAll(".card");

        if (currentBgColor === "#041936") {
            // Cambiar a tema claro
            root.style.setProperty("--color-primary", "#FFFFFF");
            root.style.setProperty("--font-color-primary", "#041936");
            themeLight.src = "../assets/images/header/luna.svg";
            root.style.setProperty("--icon-color", "#FFFFFF");
            root.style.setProperty("--color-accent", "#8B0000");
            root.style.setProperty("--box-shadow-dark", "0 2px 8px rgba(0,0,0,0.5)");
            root.style.setProperty("--border-color-primary", "#041936");
            boxShadow.forEach(card => {
                card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.5)";
            });
        } else {
            // Cambiar a tema oscuro
            root.style.setProperty("--color-primary", "#041936");
            themeLight.src = "../assets/images/header/sol.svg";
            root.style.setProperty("--font-color-primary", "#FFFFFF");

            root.style.setProperty("--color-accent", "#F0BE2B");
            root.style.setProperty("--box-shadow-dark", "0 4px 12px rgba(255,255,255,0.1)");
            root.style.setProperty("--border-color-primary", "#041936");
            boxShadow.forEach(card => {
                card.style.boxShadow = "0 4px 12px rgba(255,255,255,0.1)";
            });
        };
    })
    
}