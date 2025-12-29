# ExMapTiler

Repository of vector map styles adapted for **OruxMaps** (Android/iOS), using **MapTiler** data sources.  
This project is designed to make it easier for OruxMaps users to load external styles (non‑Mapbox) in the 3D viewer.

A valid OruxMaps subscription to premium maps is required to access advanced features such as the 3D viewer.

---

## What this repository provides

- Vector styles compatible with MapTiler and OruxMaps.
- Adaptations specifically tuned for full 3D viewer functionality.
- Clear separation between classic MapTiler styles and custom styles (Outron).
- A web console to download styles using your own MapTiler API key.

---

## Useful links

- OruxMaps on Google Play  
  https://play.google.com/store/apps/details?id=com.orux.oruxmapsDonate

- OruxMaps on the App Store  
  https://apps.apple.com/app/oruxmaps-gps-maps/id1615192826

- MapTiler  
  https://www.maptiler.com/

- Mapbox  
  https://www.mapbox.com/

---

## How to obtain your MapTiler API key

1. Go to https://www.maptiler.com/cloud/  
2. Sign up or log in.  
3. Open your user dashboard.  
4. Copy your API key from the **Credentials** section.

This key will be inserted into the style before downloading.

---

## How to use the style download console

Open the web interface here:  
https://tronpo.github.io/ExMapTiler/

Steps:

1. Enter your MapTiler API key.  
2. Select the style you want (Outron, Outdoor, Topo, etc.).  
3. Click **Download style**.  
4. The `.json` file will download with its exact name.  
5. Save the file into the folder:  
   `OruxMaps/Maps`  
   (on Android or iOS, depending on your installation).  
6. Select the style from the **map selector** inside OruxMaps.

---


---

## Attributions

This project uses resources from:

- MapTiler — styles, tiles, and vector data  
  https://www.maptiler.com/

- Mapbox — technical compatibility with the style specification  
  https://www.mapbox.com/

All styles respect the licenses and terms of use of both platforms.

---
