# 🌐 LuckyAir Website

## 📌 Descripción
Este proyecto corresponde a la primera etapa del desarrollo de **LuckyAir Website**, una aplicación web colaborativa construida inicialmente con **HTML puro**.  
El objetivo es diseñar la estructura básica de la página y sus principales componentes.

## 🚀 Funcionalidades implementadas
- **Header**:
  - Logo de la empresa.
  - Barra de navegación funcional.
  - Ícono de usuario que redirige al login.

- **Banner principal**:
  - Slogan corporativo destacado.

- **Página de registro**:
  - Formulario con campos: nombres, apellidos, correo, documento de identidad, número de documento, contraseña y confirmación.
  - Validaciones básicas (`required`, `minlength`, `type`).
  - Checkboxes para aceptar T&C y suscribirse a promociones.
  - Botón de envío funcional.
  - Opciones de ingreso alternativo con íconos de Google, Microsoft, Facebook y Apple.

## 📂 Estructura del proyecto
LUCKYAIR-WEBSITE.GITHUB.IO/
│
├── assets/
│   ├── images/
│   │   ├── png/ (logo, banner, íconos)
│   │   └── svg/ (ícono usuario)
│   ├── css/ (pendiente)
│   ├── js/ (pendiente)
│   └── videos/ (pendiente)
│
├── pages/
│   ├── beneficios.html
│   ├── login.html
│   ├── registro.html
│   └── vuelos.html
│
├── index.html
└── README.md


## 🛠️ Tecnologías utilizadas
- HTML5
- Validaciones nativas de formularios
- Sin CSS ni JS en esta primera etapa

## 📌 Próximos pasos
- Implementar estilos con CSS para mejorar la presentación.
- Añadir interactividad con JavaScript.
- Conectar el formulario de registro a un backend.
- Extender la navegación con más páginas y funcionalidades.

---

✍️ **Nota:** Este README se irá actualizando conforme avance el proyecto y se integren nuevas tecnologías.

## 🧩 Descripción de cambios recientes 12/04 -> Jose Torres
En esta actualización se realizaron ajustes y mejoras tanto en index.html como en registro.html, centrados en accesibilidad y experiencia de usuario:
- **fix:** Se aplicó un color de fondo azul (bgcolor="#1E3A8A") y texto en blanco (text="#FFFFFF") para mejorar el contraste y la legibilidad general.
- **fix:** En el archivo registro.html, se optimizó la accesibilidad conectando correctamente las etiquetas <label> con sus respectivos elementos de formulario (checkbox y campos de entrada).
- **fix:** Se ajustó el color del vínculo de acceso al login, que anteriormente no contrastaba adecuadamente con el fondo.
- **feat:** Se implementaron enlaces externos navegables en los iconos de login alternativo, añadiendo el atributo target="_blank" para abrirlos en una nueva pestaña.

## 🧩 Descripción de cambios recientes 15/04 -> Jose Torres
En esta actualizacion se inserto el header y footer empleando la etiqueta "<iframe>" en el index, vuelos, beneficios y login.