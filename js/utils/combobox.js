/* Utilidad para el input de buscar */

import { destinos } from "../data/destinos.js";

export function cargarOpciones(dataListId, lista) {
    const datalist = document.querySelector(`#${dataListId}`); // usa el parámetro
    if (!datalist) {
        //console.error(`No se encontró un datalist con id="${dataListId}"`);
        return;
    }

    /* lista.forEach(item => {
        const option = document.createElement("option");
        option.value = item;
        datalist.appendChild(option); */
        lista.forEach(destinos => {
        const option = document.createElement("option");
        option.value = destinos.nombre;
        datalist.appendChild(option);
    });
}
