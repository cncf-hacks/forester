import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatasetService } from './dataset.service';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  romanianFrontierFile: string = '/assets/data/ro_frontiera_poligon.geojson';
  romanianCountiesFile: string = '/assets/data/ro_judete_poligon.geojson';
  romanianCitiesFile: string = '/assets/data/ro_localitati_punct.geojson'; // too many

  constructor(
    private http: HttpClient,
    private datasetService: DatasetService
  ) {}

  async popupContentForWdpa(f: any) {
    // WDPA identifier string
    const wdpaId = f.properties['wdpaid'];
    // start assembling the string of HTML that will be displayed
    // first make a hyperlink to a details page for this geometry (external site)
    let content =
      '<span>name: ' +
      '<a target="_blank" ' +
      'href="https://protectedplanet.net/' +
      wdpaId +
      '" >' +
      f.properties['name'] +
      '</a></span>';
    // add the identifier, since that is being used it should also be displayed
    content += '<br><span>wdpaId: ' + wdpaId + '</span>';
    return content;
  }

  async popupContentForWdpaNotWorking(f: any) {
    // subtract marine area from total area and convert from square km to hectare
    let landAreaHectare =
      (f.properties['rep_area'] - f.properties['rep_m_area']) * 100;
    // WDPA identifier will be used to query the TCL data table
    let wdpaId = f.properties['wdpaid'];
    // get the Tree Cover Loss area, which is returned in units of hectare
    let tclResponse = await this.datasetService.callApiWdpaTreeCoverLoss(
      wdpaId,
      2019,
      30
    );

    // start assembling the string of HTML that will be displayed
    // first make a hyperlink to a details page for this geometry (external site)
    let content =
      '<span>name: ' +
      '<a target="_blank" ' +
      'href="https://protectedplanet.net/' +
      wdpaId +
      '" >' +
      f.properties['name'] +
      '</a></span>';
    // add the identifier, since that is being used it should also be displayed
    content += '<br><span>wdpaid: ' + wdpaId + '</span>';
    // add the land area, truncating to two digits past the decimal
    content +=
      '<br><span>land area (ha): ' + landAreaHectare.toFixed(2) + '</span>';
    // add the TCL area, truncating to two digits past the decimal
    content +=
      '<br><span>2019 TCL area (ha): ' +
      tclResponse['data'][0]['tcl_ha'].toFixed(2) +
      '</span>';
    return content;
  }

  // createCountiesBorders(map: L.Map) {
  //   this.http.get(this.romanianCountiesFile).subscribe((data: any) => {
  //     L.geoJSON(data).addTo(map);
  //   });
  // }

  // createCountryBorders(map: L.Map) {
  //   this.http.get(this.romanianFrontierFile).subscribe((data: any) => {
  //     L.geoJSON(data).addTo(map);
  //   });
  // }
}
