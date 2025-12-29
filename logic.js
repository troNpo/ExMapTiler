// ===============================
// CONFIGURACIÓN MODULAR DE ESTILOS
// ===============================

// Carpeta de estilos clásicos
const CLASSIC_PATH = "./Style/Clasic/";

// Carpeta de estilos personalizados
const CUSTOM_PATH = "./Custom/";

// Selectores del HTML
const apiKeyInput = document.getElementById("apikey");
const selectClassic = document.getElementById("style-maptile");
const selectCustom = document.getElementById("style-tronpo");
const downloadBtn = document.querySelector(".btn");

// ===============================
// FUNCIÓN PRINCIPAL DE DESCARGA
// ===============================

downloadBtn.addEventListener("click", async () => {
  const apiKey = apiKeyInput.value.trim();

  if (!apiKey) {
    alert("Introduce tu API key de MapTiler");
    return;
  }

  // Determinar qué selector está activo
  const classicValue = selectClassic.value;
  const customValue = selectCustom.value;

  // Si el usuario selecciona un estilo clásico
  let fileName = classicValue || customValue;
  let filePath = classicValue ? CLASSIC_PATH : CUSTOM_PATH;

  const fullPath = filePath + fileName;

  try {
    // Descargar el archivo original
    const response = await fetch(fullPath);

    if (!response.ok) {
      alert("No se pudo cargar el estilo: " + fullPath);
      return;
    }

    let json = await response.text();

    // Reemplazar la API key antigua por la nueva
    json = json.replace(/key=[A-Za-z0-9]+/g, `key=${apiKey}`);

    // Descargar el archivo modificado
    downloadFile(json, fileName);

  } catch (error) {
    alert("Error al procesar el archivo: " + error);
  }
});

// ===============================
// FUNCIÓN PARA DESCARGAR ARCHIVOS
// ===============================

function downloadFile(content, fileName) {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();

  URL.revokeObjectURL(url);
}
