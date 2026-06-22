# 🫰 HashComparator

**HashComparator** es una aplicación web sencilla y elegante diseñada para comparar los Hashes de archivos PDF. Fue creada como herramienta de apoyo para **Testigos Digitales** con el fin de auditar y verificar rápidamente si dos copias de las Actas E14 exportadas coinciden.

## 🎯 Objetivo de la Herramienta

La aplicación permite a los usuarios subir dos archivos PDF y determina instantáneamente si se trata del mismo documento evaluando su nombre (el cual contiene un Hash único). El sistema cuenta con lógica incorporada para omitir automáticamente los sufijos que los sistemas operativos agregan al descargar copias (como ` (1)`), logrando una validación de Hash limpia y precisa.

## ✨ Características Principales

- **Validación Rápida y Precisa**: Analiza los nombres de archivo extrayendo y comparando el hash base, con retroalimentación visual inmediata.
- **Soporte Drag & Drop**: Interfaz de usuario moderna y accesible que permite cargar los archivos seleccionándolos o arrastrándolos a la pantalla.
- **Seguridad Garantizada (Client-Side)**: Desarrollada exclusivamente con HTML5, CSS3 y Vanilla JavaScript puro. Ningún archivo se envía a un servidor backend; toda la comprobación se ejecuta localmente en el navegador del usuario.
- **Modo Claro / Oscuro ☀️🌙**: La UI implementa variables CSS dinámicas y "glassmorphism", permitiendo alternar el tema visual mediante un botón integrado para una lectura cómoda en cualquier entorno.
- **Diseño Premium e Inclusivo**: Cuenta con detalles estéticos cuidados como paletas de colores armónicas, animaciones suaves e iconografía representativa (como la variación de tonos de piel en emojis 🫰).

## 🚀 Despliegue en GitHub Pages

Este proyecto es un sitio estático que está configurado para ejecutarse en **GitHub Pages**. 

Si deseas activarlo:
1. Ve a **Settings > Pages** en este repositorio de GitHub.
2. En la sección **Source**, selecciona `Deploy from a branch`.
3. Selecciona la rama `main` y el directorio raíz `/ (root)`.
4. Haz clic en **Save**. En un par de minutos la URL pública de la aplicación estará disponible.

*(Nota: Para optimizar el despliegue estático clásico, se incluyó un archivo `.nojekyll` en la raíz).*

## 📖 Guía Rápida de Uso

Para que la herramienta funcione correctamente:
1. **NO** utilices los documentos descargados con el botón azul que dice "descargar" en el visor de la plataforma de la Registraduría (aquellos que comienzan con formato `14...`).
2. Utiliza **exclusivamente** los archivos que se exportan mediante el botón general indicado en las instrucciones para los testigos (cuyo archivo se guardará con un nombre alfanumérico largo, es decir, el Hash).
3. Sube los dos archivos a la interfaz y haz clic en "Comparar Archivos" para validar su integridad.