const root = document.documentElement;
const themeLight = document.querySelector("#theme-bg");
const boxShadow = document.querySelectorAll(".card");

export function aplicarTemaGuardado() {
    const tema = localStorage.getItem("tema") || "oscuro";
    root.setAttribute("data-theme", tema);

    if (tema === "claro") {
        root.style.setProperty("--color-primary", "#FFFFFF");
        root.style.setProperty("--font-color-primary", "#041936");
        if (themeLight) themeLight.src = "../assets/images/header/luna.svg";
        root.style.setProperty("--icon-color", "#FFFFFF");
        root.style.setProperty("--color-accent", "#8B0000");
        root.style.setProperty("--box-shadow-dark", "0 2px 8px rgba(0,0,0,0.5)");
        root.style.setProperty("--border-color-primary", "#041936");
        boxShadow.forEach(card => {
            card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.5)";
        });
    } else {
        root.style.setProperty("--color-primary", "#041936");
        if (themeLight) themeLight.src = "../assets/images/header/sol.svg";
        root.style.setProperty("--font-color-primary", "#FFFFFF");
        root.style.setProperty("--color-accent", "#F0BE2B");
        root.style.setProperty("--box-shadow-dark", "0 4px 12px rgba(255,255,255,0.1)");
        root.style.setProperty("--border-color-primary", "#041936");
        boxShadow.forEach(card => {
            card.style.boxShadow = "0 4px 12px rgba(255,255,255,0.1)";
        });
    }
}

export function guardarTema(tema) {
    localStorage.setItem("tema", tema);
    root.setAttribute("data-theme", tema);
}
