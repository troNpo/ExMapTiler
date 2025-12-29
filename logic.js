// ===============================
// CONFIGURACIÓN DE RUTA ÚNICA
// ===============================

const STYLE_PATH = "./style/";

const apiKeyInput = document.getElementById("apikey");
const selector = document.getElementById("style-selector");
const downloadBtn = document.getElementById("download-btn");
const statusBox = document.getElementById("status");

// ===============================
// FUNCIÓN PRINCIPAL DE DESCARGA
// ===============================

downloadBtn.addEventListener("click", async () => {
  clearStatus();

  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    showStatus("Introduce tu API Key de MapTiler.", true);
    alert("La API Key es obligatoria para descargar el estilo.");
    return;
  }

  const fileName = selector.value;
  if (!fileName) {
    showStatus("Selecciona un estilo válido.", true);
    return;
  }

  const fullPath = STYLE_PATH + fileName;

  try {
    const response = await fetch(fullPath);

    if (!response.ok) {
      showStatus("No se pudo cargar el estilo: " + fullPath, true);
      alert("No se pudo cargar el estilo:\n" + fullPath);
      return;
    }

    let json = await response.text();

    // Sustituir marcador {{API_KEY}} por la clave real
    json = json.replace(/{{API_KEY}}/g, apiKey);

    downloadFile(json, fileName);
    showStatus("Estilo descargado correctamente: " + fileName, false);

  } catch (error) {
    console.error(error);
    showStatus("Error al procesar el archivo: " + error, true);
    alert("Error al procesar el archivo:\n" + error);
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

// ===============================
// FUNCIONES DE ESTADO VISUAL
// ===============================

function showStatus(message, isError) {
  statusBox.textContent = message;
  statusBox.style.color = isError ? "#ff9b9b" : "#9bffb5";
}

function clearStatus() {
  statusBox.textContent = "";
}
// ===============================
// AYUDA DESPLEGABLE
// ===============================

const helpToggle = document.getElementById("help-toggle");
const guideBox = document.getElementById("guide");

helpToggle.addEventListener("click", () => {
  const isVisible = guideBox.style.display === "block";

  guideBox.style.display = isVisible ? "none" : "block";
  helpToggle.textContent = isVisible ? "Ayuda ▾" : "Ayuda ▴";
});

