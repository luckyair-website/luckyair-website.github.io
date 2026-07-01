import { menuMobile }          from "./utils/menuMobile.js";
import { themeMain }           from "./utils/theme.js";
import { aplicarTemaGuardado } from "./utils/themeStorage.js";
import { initRegistro }        from "./utils/registroStorage.js";
import { menuMobile }           from "./utils/menuMobile.js";
import { themeMain }            from "./utils/theme.js";
import { aplicarTemaGuardado }  from "./utils/themeStorage.js";
import { initRegistroStorage }  from "./utils/registroStorage.js";

document.addEventListener("DOMContentLoaded", () => {
    menuMobile();
    aplicarTemaGuardado();
    themeMain();
    initRegistro();

    initRegistroStorage();
});

    
