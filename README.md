# ExMapTiler
<img width="1600" height="900" alt="IMG_1125" src="https://github.com/user-attachments/assets/e9af63ae-8a47-46d1-bd47-d790749c7256" />

Repository of **vector and raster map styles** adapted for **OruxMaps** (Android/iOS), using **MapTiler** data sources.  
This project includes two web consoles that allow users to download styles using their own MapTiler API key.

---

## What this repository provides

- Vector styles ready to use in OruxMaps  
- Raster styles in `onlinemapsources.xml` format  
- Two web consoles for downloading styles with your API key  
- Compatibility with Android and iOS  

---

## Web consoles

### Vector console  
Download `.map.json` styles for OruxMaps.  
👉 https://tronpo.github.io/ExMapTiler/

### Raster console  
Download `onlinemapsources.xml` raster styles.  
👉 https://tronpo.github.io/ExMapTiler/raster.html

---

## Useful links

- **OruxMaps on Google Play**  
  https://play.google.com/store/apps/details?id=com.orux.oruxmapsDonate

- **OruxMaps on the App Store**  
  https://apps.apple.com/app/oruxmaps-gps-maps/id1615192826

- **MapTiler**  
  https://www.maptiler.com/

- **Mapbox**  
  https://www.mapbox.com/

---

## How to obtain your MapTiler API key

1. Go to https://www.maptiler.com/cloud/  
2. Sign up or log in  
3. Open your user dashboard  
4. Copy your API key from the **Credentials** section  

The console will automatically insert your key before downloading the style.

---

## Using the vector style console

1. Open the console:  
   https://tronpo.github.io/ExMapTiler/

2. Enter your API key  
3. Select a vector style  
4. Click **Download style**  
5. Save the `.json` file into:  
   `OruxMaps/mapfiles/`  
6. Select the style inside OruxMaps  

**Note:** Vector styles require an OruxMaps Premium subscription to access the 3D viewer and advanced features.

---

## Using the raster style console

1. Open the console:  
   https://tronpo.github.io/ExMapTiler/raster.html

2. Enter your API key  
3. Select a raster style  
4. Click **Download style**  
5. Save the `.xml` file into:  
   - **Android:** `OruxMaps/mapfiles/customonlinemaps/`  
   - **iOS:** `OruxMaps/mapfiles/`  
6. Activate the map inside OruxMaps  

Raster styles work without a Premium subscription.

---

## Attributions

This project uses resources from:

- **MapTiler** — styles, tiles, and vector/raster data  
  https://www.maptiler.com/

- **Mapbox** — technical compatibility with the style specification  
  https://www.mapbox.com/

All styles respect the licenses and terms of use of both platforms.
