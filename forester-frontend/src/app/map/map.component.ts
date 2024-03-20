//TODO find a better workaround for the MapboxDraw import
// @ts-nocheck
import { AfterViewInit, Component, Input } from '@angular/core';
import * as M from 'maplibre-gl';
import { MarkerService } from '../marker.service';
import { DatasetService } from '../dataset.service';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,

  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {
  private map: M.Map = {} as M.Map;

  private isOsm: boolean = false;
  private isTreeCoverLoss: boolean = false;
  private isWdpa: boolean = false;
  @Input() selectedLayer: string = '';

  showDatePicker: Boolean = false;
  public date = new Date;

  private initMap(): void {
    // create new map with OpenStreetMap tiles
    this.map = new M.Map({
      container: 'map',
      style: {
        version: 8,
        sources: {
          's2cloudless-2020_3857': {
            type: 'raster',
            tiles: [
              'https://tiles.maps.eox.at/wms?service=WMS&request=GetMap&layers=s2cloudless-2020_3857&styles=&format=image/png&transparent=true&version=1.1.1&width=256&height=256&srs=EPSG:3857&bbox={bbox-epsg-3857}',
            ],
            tileSize: 256,
            attribution:
              '<a href="https://s2maps.eu">Sentinel-2 cloudless</a> by &copy; EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2022)',
          },
        },
        layers: [
          {
            id: 's2cloudless-2020_3857-layer',
            type: 'raster',
            source: 's2cloudless-2020_3857',
            layout: {
              visibility: 'visible',
            },
          },
        ],
      },
      center: [24.9667, 45.9431], // Romania
      zoom: 6,
      minZoom: 4,
      maxZoom: 18,
    });

    // disable rotation
    this.map.dragRotate.disable();
    this.map.touchZoomRotate.disableRotation();

    // load layers after map load
    this.map.on('load', () => {
      // create Sentinel 2 cloudless layer
      this.map.addSource('osm', {
        type: 'raster',
        tiles: ['https://b.tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      });
      this.map.addLayer({
        id: 'osm-layer',
        type: 'raster',
        source: 'osm',
        paint: {
          'raster-opacity': 1,
        },
        layout: {
          visibility: 'none',
        },
        minzoom: 4,
        maxzoom: 18,
      });

      // create WDPA layer
      this.datasetService
        .callApiDataset('a8360d91-06af-4f2d-bd61-4e50c8687ad8')
        .then((metadata) => {
          this.map.addSource('wdpa', {
            type: 'vector',
            tiles: [this.datasetService.getTileUrlForWDPA(metadata)],
            attribution:
              'powered by &copy; <a href="http://resourcewatch.org">Resource Watch</a>',
          });
          this.map.addLayer({
            id: 'wdpa-layer',
            type: 'fill',
            source: 'wdpa',
            'source-layer': 'wdpa_protected_areas',
            paint: {
              'fill-color': '#add8e6',
              'fill-opacity': 0.25,
            },
            layout: {
              visibility: 'none',
            },
            minzoom: 3,
            maxzoom: 9,
          });
        });

      // create Tree Cover Loss layer
      this.datasetService
        .callApiDataset('b584954c-0d8d-40c6-859c-f3fdf3c2c5df')
        .then((metadata) => {
          this.map.addSource('tree-cover-loss', {
            type: 'raster',
            tiles: [
              this.datasetService.getTileLayerUrlForTreeCoverLoss(metadata),
            ],
            tileSize: 256,
            attribution:
              'powered by &copy; <a href=http://resourcewatch.org>Resource Watch</a>',
          });
          this.map.addLayer({
            id: 'tree-cover-loss-layer',
            type: 'raster',
            source: 'tree-cover-loss',
            paint: {
              'raster-opacity': 1,
            },
            layout: {
              visibility: 'none',
            },
            minzoom: 4,
            maxzoom: 18,
          });
        });
    });

    // add events for popups
    this.map.on('click', 'wdpa-layer', async (e) => {
      // get the features underneath the clicked point
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ['wdpa-layer'],
      });
      // create a popup at the clicked point
      new M.Popup()
        .setLngLat(e.lngLat)
        .setHTML(await this.markerService.popupContentForWdpa(features[0]))
        .addTo(this.map);
    });
    this.map.on('mouseenter', 'wdpa-layer', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });
    this.map.on('mouseleave', 'wdpa-layer', () => {
      this.map.getCanvas().style.cursor = '';
    });

    // enable drawing
    this.enableDrawing();
  }

  private enableDrawing(): void {
    MapboxDraw.constants.classes.CONTROL_BASE = 'maplibregl-ctrl';
    MapboxDraw.constants.classes.CONTROL_PREFIX = 'maplibregl-ctrl-';
    MapboxDraw.constants.classes.CONTROL_GROUP = 'maplibregl-ctrl-group';

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    });
    this.map.addControl(draw as any);
    this.map.on('draw.create', (e) => {
      //TODO RADU
      // date = new Date();
      this.showDatePicker = true;
    });
  }

  confirmDateSelection() {
    this.showDatePicker = false;
  }

  constructor(
    private markerService: MarkerService,
    private datasetService: DatasetService,
    private snackBar: MatSnackBar,
  ) { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  onToggleLayer(): void {
    if (this.isOsm) {
      this.map.setLayoutProperty('osm-layer', 'visibility', 'none');
      this.map.setLayoutProperty(
        's2cloudless-2020_3857-layer',
        'visibility',
        'visible'
      );
      this.isOsm = false;
    } else {
      this.map.setLayoutProperty('osm-layer', 'visibility', 'visible');
      this.map.setLayoutProperty(
        's2cloudless-2020_3857-layer',
        'visibility',
        'none'
      );
      this.isOsm = true;
    }
  }

  onToggleOverlay(): void {
    if (this.isTreeCoverLoss) {
      this.map.setLayoutProperty('tree-cover-loss-layer', 'visibility', 'none');
      this.isTreeCoverLoss = false;
    } else {
      this.map.setLayoutProperty(
        'tree-cover-loss-layer',
        'visibility',
        'visible'
      );
      this.isTreeCoverLoss = true;
    }
  }

  onToggleWdpa(): void {
    if (this.isWdpa) {
      this.map.setLayoutProperty('wdpa-layer', 'visibility', 'none');
      this.isWdpa = false;
    } else {
      this.map.setLayoutProperty('wdpa-layer', 'visibility', 'visible');
      this.isWdpa = true;
    }
  }

  onDateSelected(event: any) {
    this.date = event;

    this.showDatePicker = false;
    this.snackBar.open('Start date for monitoring forests selected!', 'Close', {
      duration: 5000,
    });
    // send to backend
  }
}
