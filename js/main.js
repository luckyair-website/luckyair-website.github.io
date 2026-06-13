import { menuMobile }           from "./utils/menuMobile.js";
import { themeMain }            from "./utils/theme.js";
import { aplicarTemaGuardado }  from "./utils/themeStorage.js";
import { initRegistroStorage }  from "./utils/registroStorage.js";

document.addEventListener("DOMContentLoaded", () => {
    menuMobile();
    aplicarTemaGuardado();
    themeMain();
    initRegistroStorage();
    // Al inicio del archivo, junto a los demás imports:
import { initLogin } from "./utils/loginStorage.js";

// Dentro del DOMContentLoaded, al final:
initLogin();
});
