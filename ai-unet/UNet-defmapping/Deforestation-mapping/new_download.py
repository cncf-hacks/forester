import os, requests
from datetime import datetime, timedelta
import pandas as pd
from creds import *
import zipfile

def new_download_images(save_imgs, save_rgb, save_tiles, unet_weights, unet_clouds,
                    class_path, class_clouds, poly_path, percentiles_forest, 
                    percentiles_clouds, boundsdata):

    # set the timerange
    N_DAYS_AGO = 5
    today = datetime.now().date() 
    n_days_ago = today - timedelta(days=N_DAYS_AGO)

    start_date = n_days_ago
    end_date = today
    data_collection = "SENTINEL-2"

    aoi_example = "POLYGON((4.220581 50.958859,4.521264 50.953236,4.545977 50.906064,4.541858 50.802029,4.489685 50.763825,4.23843 50.767734,4.192435 50.806369,4.189689 50.907363,4.220581 50.958859))'"

    # set your area of interest
    # aoi = "POLYGON((long0 lat0,long1 lat1,......,long0 lat0))'"
    aoi = aoi_example

    # make the request
    json = requests.get(f"https://catalogue.dataspace.copernicus.eu/odata/v1/Products?$filter=Collection/Name eq '{data_collection}' and OData.CSC.Intersects(area=geography'SRID=4326;{aoi}) and ContentDate/Start gt {start_date}T00:00:00.000Z and ContentDate/Start lt {end_date}T00:00:00.000Z&$top=1000").json()
    df=pd.DataFrame.from_dict(json['value'])

    # connect to the API
    user = 'rzamfir@dvloper.io'
    password = 'Rz@mfir12345' 

    # Import credentials
    keycloak_token = get_keycloak(user, password)

    session = requests.Session()
    session.headers.update({'Authorization': f'Bearer {keycloak_token}'})

    download_dir = save_imgs
    for i in range(len(df)):
        pr = df.Id.values[i]
        prName = df.Name.values[i][:-5]
        
        print("Downloading: ", df)


        url = f"https://catalogue.dataspace.copernicus.eu/odata/v1/Products({pr})/$value"
        response = session.get(url, allow_redirects=False)
        while response.status_code in (301, 302, 303, 307):
            url = response.headers['Location']
            response = session.get(url, allow_redirects=False)

        file = session.get(url, verify=False, allow_redirects=True)

        path_zip_name = save_imgs+'/'+prName+'.zip'

        with open(f"{download_dir}/{prName}.zip", 'wb') as p:
            p.write(file.content)
        
        if os.path.isfile(path_zip_name):                  
            # extract files 
            zip_ref = zipfile.ZipFile(path_zip_name, 'r')
            zip_ref.extractall(save_imgs)
            zip_ref.close()
            os.remove(path_zip_name) # remove .zip file
            print("%s has been removed successfully" %prName) 
            
            path_to_folder = save_imgs + '/' + extracted_name[k] + '/GRANULE/'
            
            # calls the rgb_tiles function
            dir_save_tiles = save_tiles+ '/' + prName
            if os.path.isdir(dir_save_tiles) is False:
                    print('Creating RGB tiles')
                    os.mkdir(dir_save_tiles)
                    rgb_tiles(path_to_folder, save_rgb, dir_save_tiles, prName)
            
            # calls the application() Unet function
            save_class_path = class_path + '/' + prName
            if os.path.isdir(save_class_path) is False:
                print('Applying UNet')
                os.mkdir(save_class_path)
                application(dir_save_tiles, unet_weights, save_class_path, percentiles_forest, clouds = 0)

                # merge predicted tiles into one GeoTiff                    
                join_tiles(save_class_path,class_path, path_to_folder)
                print("Tiles merged!")
                
            save_class_clouds = class_clouds + '/' + prName
            if os.path.isdir(save_class_clouds) is False:
                print('Applying UNet clouds')
                os.mkdir(save_class_clouds)
                application(dir_save_tiles, unet_clouds, save_class_clouds, percentiles_clouds, clouds = 1)
                        
                # merge the clouds predicted tiles into one GeoTiff
                join_tiles(save_class_clouds, class_clouds, path_to_folder)
                print("Clouds tiles merged!")
            
            # polygons evalutation
            print("Polygons evaluation")
            polygons(prName, class_path, class_clouds, path_to_folder, save_class_path, save_imgs, poly_path,time_spaced=None)
        
            k = k + 1
            
        else:
            raise ValueError("%s isn't a file!" %path_zip_name)


def get_keycloak(username: str, password: str) -> str:
    data = {
        "client_id": "cdse-public",
        "username": username,
        "password": password,
        "grant_type": "password",
        }
    try:
        r = requests.post("https://identity.dataspace.copernicus.eu/auth/realms/CDSE/protocol/openid-connect/token",
    data=data)
        r.raise_for_status()
    except Exception as e:
        raise Exception(
            f"Keycloak token creation failed. Response from the server was: {r.json()}")
    return r.json()["access_token"] 
