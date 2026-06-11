// pagoFinal.js - Confirmación de pago

export function pagoFinal() {
  const btnDescargar = document.querySelector(".btn-download");

  if (!btnDescargar) return;

  btnDescargar.addEventListener("click", (e) => {
    e.preventDefault();

    const codigo = document.querySelector(".reservation-code")?.textContent?.trim() || "LKQ4R7";
    const ruta   = document.querySelector(".route")?.textContent?.trim()            || "LIMA → CUSCO";
    const fechas = document.querySelector(".detail-item p")?.textContent?.trim()    || "25 - 30 Junio";

    const contenido = `
====================================
       LUCKY AIR - COMPROBANTE
====================================
Código de Reserva: ${codigo}
Ruta:              ${ruta}
Fechas:            ${fechas}
Estado:            CONFIRMADO ✔
====================================
Gracias por volar con Lucky Air.
    `.trim();

    const blob = new Blob([contenido], { type: "text/plain" });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href     = url;
    link.download = `comprobante-${codigo}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    btnDescargar.textContent   = "✔ DESCARGADO";
    btnDescargar.style.opacity = "0.7";
    btnDescargar.style.cursor  = "default";
  });
}
