document.addEventListener("DOMContentLoaded", () => {

  const STYLE_PATH = "./style/";
  const apiKeyInput = document.getElementById("apikey");
  const selector = document.getElementById("style-selector");
  const downloadBtn = document.getElementById("download-btn");
  const legendBtn = document.getElementById("legend-btn");
  const legendContainer = document.getElementById("legend-container");
  const statusBox = document.getElementById("status");

  let legendVisible = false;

  /* ========================= */
  /*   MAPA DE LEYENDAS        */
  /* ========================= */

  const legendMap = {
    "cyclotron.map.json": "cyclotron.html",
    "outron.map.json": "outron.html",
    "cyclotron-dark.map.json": "cyclotron-dark.html",
    "hikingtron.map.json": "hikingtron.html",
    "satron.map.json": "satron.html",
    "topo-dark.map.json": "topo-dark.html"
  };

  /* ========================= */
  /*   MAPA DE PREVIEWS        */
  /* ========================= */

  const previewMap = {
    "cyclotron.map.json": ["cyclotron1.PNG", "cyclotron2.PNG"],
    "outron.map.json": ["outron1.PNG", "outron2.PNG"],
    "cyclotron-dark.map.json": ["cyclotron-dark1.PNG"],
    "hikingtron.map.json": ["hikingtron1.PNG"],
    "satron.map.json": ["satron1.PNG"],
    "topo-dark.map.json": ["topo-dark1.PNG"]
  };

  /* ========================= */
  /*   DESCARGA DE ESTILOS     */
  /* ========================= */

  downloadBtn.addEventListener("click", async () => {
    statusBox.textContent = "";

    const apiKey = apiKeyInput.value.trim();
    if (!apiKey) {
      statusBox.textContent = "Introduce tu API Key.";
      return;
    }

    const fileName = selector.value;
    const fullPath = STYLE_PATH + fileName;

    try {
      const response = await fetch(fullPath);
      let json = await response.text();
      json = json.replace(/{{API_KEY}}/g, apiKey);

      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();

      URL.revokeObjectURL(url);
      statusBox.textContent = "Estilo descargado correctamente.";

    } catch (e) {
      statusBox.textContent = "Error al descargar el estilo.";
    }
  });

  /* ========================= */
  /*     VISTA PREVIA          */
  /* ========================= */

  function loadPreview(style) {
    const imgs = previewMap[style] || [];

    legendContainer.innerHTML = `
      <div class="preview-gallery">
        ${imgs.map(i => `<img src="vista/${i}" loading="lazy">`).join("")}
      </div>
    `;
  }

  /* ========================= */
  /*         LEYENDA           */
  /* ========================= */

  function loadLegend(style) {
    const file = legendMap[style];

    legendContainer.innerHTML = `
      <iframe class="legend-iframe"
              src="https://tronpo.github.io/ExMapTiler/leyend/${file}">
      </iframe>
    `;
  }

  /* ========================= */
  /*     BOTÓN DINÁMICO        */
  /* ========================= */

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

  /* ========================= */
  /*     CAMBIO DE ESTILO      */
  /* ========================= */

  selector.addEventListener("change", () => {
    const style = selector.value;
    loadPreview(style);
    legendBtn.textContent = "Ver leyenda";
    legendVisible = false;
  });

  /* ========================= */
  /*     CARGA INICIAL         */
  /* ========================= */

  loadPreview("cyclotron.map.json");

});
