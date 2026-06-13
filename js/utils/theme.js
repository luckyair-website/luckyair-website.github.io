import { guardarTema } from "./themeStorage.js";

export function themeMain() {
    const themeLight = document.querySelector("#theme-bg");
    const root = document.documentElement;

    // ❗ IMPORTANTE: evitar error si no existe el elemento
    if (!themeLight) return;

    themeLight.addEventListener("click", () => {

        const boxShadow = document.querySelectorAll(".card");

        let currentBgColor = getComputedStyle(root)
            .getPropertyValue("--color-primary")
            .trim();

        let nuevoTema = currentBgColor === "#041936" ? "claro" : "oscuro";

        if (currentBgColor === "#041936") {
            // 🌞 TEMA CLARO
            root.style.setProperty("--color-primary", "#FFFFFF");
            root.style.setProperty("--font-color-primary", "#041936");
            root.style.setProperty("--color-accent", "#8B0000");
            root.style.setProperty("--box-shadow-dark", "0 2px 8px rgba(0,0,0,0.5)");
            root.style.setProperty("--border-color-primary", "#041936");

            themeLight.src = "../assets/images/header/luna.svg";

            boxShadow.forEach(card => {
                card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.5)";
            });

        } else {
            // 🌙 TEMA OSCURO
            root.style.setProperty("--color-primary", "#041936");
            root.style.setProperty("--font-color-primary", "#FFFFFF");
            root.style.setProperty("--color-accent", "#F0BE2B");
            root.style.setProperty("--box-shadow-dark", "0 4px 12px rgba(255,255,255,0.1)");
            root.style.setProperty("--border-color-primary", "#041936");

            themeLight.src = "../assets/images/header/sol.svg";

            boxShadow.forEach(card => {
                card.style.boxShadow = "0 4px 12px rgba(255,255,255,0.1)";
            });
        }

        guardarTema(nuevoTema);
    });
}