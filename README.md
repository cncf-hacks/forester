# Forester

## Introduction

This project aims to combat `CHALLENGE 10: SPATIAL DATA FOR BIODIVERSITY CONSERVATION` of the CloudNativeHacks 2024.
It specializes on forest cover loss awareness and detection, leveraging a powerful open-source AI, [pyeo](https://github.com/clcr/pyeo).

The flow is pretty simple at the moment: first, register/login into Keycloak, after which you're redirected to the main page, which contains a world map. Next, you can toggle different layers and basemaps, which show you info regarding the tree cover loss over the course of 20 years. The main functionality of the app is the live monitoring using pyeo: select an enclosed area (using the draw tools) that you want to monitor, enter a starting date for the initial satellite data and wait for an email with the results to be delivered.

## Data acquisition

Map tile rendering is made possible by the [MapLibre JS](https://maplibre.org/maplibre-gl-js/docs/) framework, an open source fork of the [Mapbox](https://docs.mapbox.com/mapbox-gl-js/guides/) library.

There are currently 2 raster tiles sources integrated into the visualization:
- [OpenStreetMap](http://www.openstreetmap.org/copyright)
- [EOX Sentinel-2 Cloudless](https://s2maps.eu)

Layers used for visualizing tree cover loss (raster tiles) and World Database of Protected Areas (vector tiles) are constructed from publicly available data from the [Resource Watch API](http://resourcewatch.org).

## Building and Running

To build and deploy locally, follow the instructions in each directory of this repo.

## AI

The Forester project is linked to the Pyeo Random Forest Classifier ML Model, which is the pre-trained model used to compare images of the environment over time in order to detect deforestations in the areas given as input.

