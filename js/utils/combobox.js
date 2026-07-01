/* Utilidad para el input de buscar */
/* Empleando el .json de ofertas */

import { destinos } from "../data/destinos.js";

export async function cargarOpciones(dataListId) {
    const datalist = document.querySelector(`#${dataListId}`); 
    if (!datalist) return;

    try {
        // fetch con await
        //console.log("Cargando estado1 ...");
        const respuesta = await fetch("./js/data/ofertas.json");
        if (!respuesta.ok) {
            throw new Error("No se pudieron cargar los datos");
        }

        const data = await respuesta.json();
        // recorrer las ofertas del JSON si la promesa se resuelve
        data.ofertas.forEach(oferta => {
            const option = document.createElement("option");
            option.value = oferta.origen; // solo origen
            datalist.appendChild(option);
    });
        //console.log("Cargando correctamente estado2 ...");
    } catch (error) {
        console.error("Error al cargar el JSON:", error);
        //console.log("error estado3 ...");
    }


    
}
