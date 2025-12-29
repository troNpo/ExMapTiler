// ===============================
// CONFIGURACIÓN MODULAR DE ESTILOS
// ===============================

const CLASSIC_PATH = "./Style/Clasic/";
const CUSTOM_PATH = "./Custom/";

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

  const classicValue = selectClassic.value;
  const customValue = selectCustom.value;

  let fileName = classicValue || customValue;
  let filePath = classicValue ? CLASSIC_PATH : CUSTOM_PATH;

  const fullPath = filePath + fileName;

  try {
    const response = await fetch(fullPath);

    if (!response.ok) {
      alert("No se pudo cargar el estilo: " + fullPath);
      return;
    }

    let json = await response.text();

    // Sustituir marcador {{API_KEY}} por la clave real
    json = json.replace(/{{API_KEY}}/g, apiKey);

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

