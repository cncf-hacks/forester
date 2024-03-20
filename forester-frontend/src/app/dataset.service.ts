import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatasetService {
  constructor() {}

  async callApiDataset(uuid: string) {
    return await fetch(
      'https://api.resourcewatch.org/v1/dataset/' +
        uuid +
        '?includes=layer,metadata'
    )
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  //NO DATASET CURRENTLY EXISTS FOR THIS
  async callApiWdpaTreeCoverLoss(
    wdpaId: string,
    year: number,
    threshold: number
  ) {
    const sqlQuery =
      'https://api.resourcewatch.org/v1/query/' +
      '?sql=SELECT SUM(umd_tree_cover_loss__ha) AS tcl_ha ' +
      'FROM 29758f3d-c4d0-4a82-a15b-76aa6036e94c ' +
      ' WHERE wdpa_protected_area__id=' +
      wdpaId +
      ' AND umd_tree_cover_loss__year=' +
      year +
      ' AND umd_tree_cover_density__threshold=' +
      threshold;
    return (await fetch(sqlQuery)).json();
  }

  getTileLayerUrlForTreeCoverLoss(metadata: any): string {
    const layerConfig =
      metadata['data']['attributes']['layer'][0]['attributes']['layerConfig'];
    const defaultParams = layerConfig['params_config'];

    // get the full templated URL
    let url = layerConfig['source']['tiles'][0];
    // substitute default parameters iteratively
    for (const param of defaultParams) {
      url = url.replace('{' + param['key'] + '}', param['default'].toString());
    }

    return url;
  }

  getTileIdentifierForTreeCoverLoss(metadata: any): string {
    return metadata['data']['attributes']['layer'][0]['attributes']['slug'];
  }

  getTileUrlForWDPA(metadata: any): string {
    return metadata['data']['attributes']['layer'][0]['attributes'][
      'layerConfig'
    ]['source']['tiles'][0];
  }
}
