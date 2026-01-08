document.addEventListener("DOMContentLoaded", () => {

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

  // ===============================
  // LEYENDAS DINÁMICAS
  // ===============================

  const legendBtn = document.getElementById("legend-btn");
  const legendContainer = document.getElementById("legend-container");

  const legendMap = {
    "outron.map.json": "outron.html",
    "cyclotron.map.json": "cyclotron.html",
    "cyclotron-dark.map.json": "cyclotron-dark.html",
    "hikingtron.map.json": "hikingtron.html",
    "satron.map.json": "satron.html",
    "topo-dark.map.json": "topo-dark.html"
  };

  function loadLegend(styleName) {
    const file = legendMap[styleName];

    if (!file) {
      legendContainer.innerHTML =
        "<div style='padding:10px; font-size:13px; color:#ccc;'>Este estilo no tiene leyenda disponible.</div>";
      return;
    }

    legendContainer.innerHTML = `
      <iframe src="https://tronpo.github.io/ExMapTiler/leyend/${file}"
              style="width:100%; height:520px; border:none; border-radius:8px;">
      </iframe>`;
  }

  legendBtn.addEventListener("click", () => {
    const style = selector.value;
    loadLegend(style);
  });

}); 

