// ===============================
//  LOGIC RASTER — troNpo Edition
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  const apiKeyInput = document.getElementById("apikey");
  const styleSelector = document.getElementById("style-selector");
  const downloadBtn = document.getElementById("download-btn");
  const statusBox = document.getElementById("status");
  const helpToggle = document.getElementById("help-toggle");
  const guideBox = document.getElementById("guide");

  // -------------------------------
  //  Mostrar / ocultar guía rápida
  // -------------------------------
  helpToggle.addEventListener("click", () => {
    const visible = guideBox.style.display === "block";
    guideBox.style.display = visible ? "none" : "block";
    helpToggle.textContent = visible ? "Ayuda ▾" : "Ayuda ▴";
  });

  // -------------------------------
  //  Función para descargar archivos
  // -------------------------------
  function downloadFile(filename, content) {
    const blob = new Blob([content], { type: "application/xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  // -------------------------------
  //  Evento principal: Descargar XML
  // -------------------------------
  downloadBtn.addEventListener("click", async () => {

    const apiKey = apiKeyInput.value.trim();
    const selectedFile = styleSelector.value;

    statusBox.textContent = "";

    if (!apiKey) {
      statusBox.textContent = "⚠ Debes introducir tu API Key.";
      statusBox.style.color = "#ff6b6b";
      return;
    }

    try {
      statusBox.textContent = "Cargando estilo...";
      statusBox.style.color = "#bbbbbb";

      // Cargar XML base desde la carpeta onlinemapsources
      const response = await fetch(`onlinemapsources/${selectedFile}`);

      if (!response.ok) {
        throw new Error("No se pudo cargar el archivo XML.");
      }

      let xmlText = await response.text();

      // Reemplazar marcador por la API Key real
      xmlText = xmlText.replace(/{{API_KEY}}/g, apiKey);

      // Descargar archivo final
      downloadFile(selectedFile, xmlText);

      statusBox.textContent = "✔ Estilo descargado correctamente.";
      statusBox.style.color = "#4cff4c";

    } catch (err) {
      statusBox.textContent = "❌ Error al generar el archivo.";
      statusBox.style.color = "#ff6b6b";
      console.error(err);
    }
  });

});
