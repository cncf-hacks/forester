from deforestation_mapping import *
import os
import os.path
import glob
import datetime

# download Sentinel-2 images
def download_images_test(save_imgs):

    # set the timerange
    N_DAYS_AGO = 5
    today = datetime.datetime.now().date() 
    n_days_ago = today - datetime.timedelta(days=N_DAYS_AGO)

    start_date = n_days_ago
    end_date = today
    data_collection = "SENTINEL-2"

    aoi_example = "POLYGON((4.220581 50.958859,4.521264 50.953236,4.545977 50.906064,4.541858 50.802029,4.489685 50.763825,4.23843 50.767734,4.192435 50.806369,4.189689 50.907363,4.220581 50.958859))'"
    # aoi_kenya = "POLYGON((34.249968 0.794542,34.260065 1.371677,34.768306 1.423832,34.859184 0.831563,34.249968 0.794542))'"
    # set your area of interest
    # aoi = "POLYGON((long0 lat0,long1 lat1,......,long0 lat0))'"
    aoi = aoi_example

    # make the request
    json = requests.get(f"https://catalogue.dataspace.copernicus.eu/odata/v1/Products?$filter=Collection/Name eq '{data_collection}' and OData.CSC.Intersects(area=geography'SRID=4326;{aoi}) and Attributes/OData.CSC.StringAttribute/any(att:att/Name eq 'productType' and att/OData.CSC.StringAttribute/Value eq 'S2MSI2A') and ContentDate/Start gt {start_date}T00:00:00.000Z and ContentDate/Start lt {end_date}T00:00:00.000Z&$top=1000").json()
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
        

        url = f"https://catalogue.dataspace.copernicus.eu/odata/v1/Products({pr})/$value"
        response = session.get(url, allow_redirects=False)
        while response.status_code in (301, 302, 303, 307):
            url = response.headers['Location']
            response = session.get(url, allow_redirects=False)

        file = session.get(url, verify=False, allow_redirects=True)
        print("Downloading data...")

        path_zip_name = save_imgs+'/'+prName+'.zip'
        
        with open(f"{download_dir}/{prName}.zip", 'wb') as p:
            p.write(file.content)
        print("Download complete!")

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


download_images_test('.')