import { menuMobile }           from "./utils/menuMobile.js";
import { themeMain }            from "./utils/theme.js";
import { aplicarTemaGuardado }  from "./utils/themeStorage.js";
import { initRegistroStorage }  from "./utils/registroStorage.js";

document.addEventListener("DOMContentLoaded", () => {
    menuMobile();
    aplicarTemaGuardado();
    themeMain();
    initRegistroStorage();
});
