document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // CONFIGURACIÓN GENERAL
  // ===============================

  const STYLE_PATH = "./style/";
  const apiKeyInput = document.getElementById("apikey");
  const selector = document.getElementById("style-selector");
  const downloadBtn = document.getElementById("download-btn");
  const legendBtn = document.getElementById("legend-btn");
  const legendContainer = document.getElementById("legend-container");
  const statusBox = document.getElementById("status");

  let legendVisible = false;

  // ===============================
  // MAPAS DE LEYENDAS Y PREVIEWS
  // ===============================

 const legendMap = {
    "outron.map.json": "outron.html",
    "cyclotron.map.json": "cyclotron.html",
    "cyclotron-dark.map.json": "cyclotron-dark.html",
    "hikingtron.map.json": "hikingtron.html",
    "satron.map.json": "satron.html",
    "topo-dark.map.json": "topo-dark.html",
    "topo.map.json": "topo.html",
    "outdoor.map.json": "outdoor.html",
    "openstreetmap.map.json": "openstreetmap.html",
    "winter.map.json": "winter.html",
    "satellite-hb.map.json": "satellite-hb.html",
    "satellite.map.json": "satellite.html",
    "streets.map.json": "street.html"

};


  const previewMap = {
    "outron.map.json": ["outron1.PNG", "outron2.PNG", "outron3.JPG"],
    "cyclotron.map.json": ["cyclotron1.PNG", "cyclotron2.PNG", "cyclotron3.JPG"],
    "cyclotron-dark.map.json": ["cyclotron-dark1.PNG", "cyclotron-dark2.PNG", "cyclotron-dark3.JPG"],
    "hikingtron.map.json": ["hikingtron1.PNG", "hikingtron2.PNG", "hikingtron3.JPG"],
    "satron.map.json": ["satron1.PNG", "satron2.PNG"],
    "topo-dark.map.json": ["topo-dark1.PNG", "topo-dark2.PNG"],
    "topo.map.json": ["topo1.PNG", "topo2.PNG"],
    "outdoor.map.json": ["outdoor1.PNG", "outdoor2.PNG", "outdoor3.JPG"],
    "openstreetmap.map.json": ["openstreetmap1.PNG", "openstreetmap2.PNG"],
    "winter.map.json": ["winter1.PNG", "winter2.PNG", "winter3.JPG"],
    "satellite-hb.map.json": ["satellite-hb1.PNG", "satellite-hb2.PNG"],
    "satellite.map.json": ["satellite1.PNG", "satellite2.PNG"],
    "streets.map.json": ["street1.PNG", "street2.PNG"]
};



  // ===============================
  // DESCARGA DE ESTILOS
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
      json = json.replace(/{{API_KEY}}/g, apiKey);

      downloadFile(json, fileName);
      showStatus("Estilo descargado correctamente: " + fileName, false);

    } catch (error) {
      console.error(error);
      showStatus("Error al procesar el archivo: " + error, true);
      alert("Error al procesar el archivo:\n" + error);
    }
  });

  function downloadFile(content, fileName) {
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);
  }

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
  // VISTA PREVIA AUTOMÁTICA
  // ===============================

  function loadPreview(styleName) {
    const images = previewMap[styleName];

    if (!images || images.length === 0) {
      legendContainer.innerHTML =
        "<div style='padding:10px; font-size:13px; color:#ccc;'>No hay vista previa disponible.</div>";
      return;
    }

    const gallery = images
      .map(img => `<img src="vista/${img}" alt="${styleName}" loading="lazy">`)
      .join("");

    legendContainer.innerHTML = `<div class="preview-gallery">${gallery}</div>`;
  }

  selector.addEventListener("change", () => {
    const style = selector.value;
    loadPreview(style);

    legendVisible = false;
    legendBtn.textContent = "Ver leyenda";
  });

  // ===============================
  // LEYENDA DINÁMICA
  // ===============================

  function loadLegend(styleName) {
    const file = legendMap[styleName];

    if (!file) {
      legendContainer.innerHTML =
        "<div style='padding:10px; font-size:13px; color:#ccc;'>Este estilo no tiene leyenda disponible.</div>";
      return;
    }

    legendContainer.innerHTML = `
      <iframe class="legend-iframe"
        src="https://tronpo.github.io/ExMapTiler/leyend/${file}">
      </iframe>
    `;
  }

  // ===============================
  // BOTÓN DINÁMICO
  // ===============================

  legendBtn.addEventListener("click", () => {
    const style = selector.value;

    if (!legendVisible) {
      loadLegend(style);
      legendBtn.textContent = "Cerrar leyenda";
      legendVisible = true;
    } else {
      loadPreview(style);
      legendBtn.textContent = "Ver leyenda";
      legendVisible = false;
    }
  });

  // ===============================
  // CARGA INICIAL
  // ===============================

  selector.value = "cyclotron.map.json";
  loadPreview("cyclotron.map.json");
  legendBtn.textContent = "Ver leyenda";
  legendVisible = false;

});
