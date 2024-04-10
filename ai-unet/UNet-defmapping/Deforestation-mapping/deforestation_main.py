# -*- coding: utf-8 -*-
"""
Created on Wed Mar 25 11:34:48 2020

@author: Lucimara Bragagnolo
"""

import os

# scripts that must be in the same path that this one
from deforestation_mapping import *

dir_path = os.path.dirname(os.path.realpath(__file__))
parent_dir = os.path.abspath(os.path.join(dir_path, os.pardir))

# zsradu: File path prefix
prefix_output = os.path.join(parent_dir, 'UNet-Output')
prefix_input = os.path.join(parent_dir, 'Files')

# .GEOjson file of the area to be monitored
geojson_file = prefix_input + '/rondonia_square3.geojson'

# path to save the downloaded images
save_imgs = prefix_output + '/Downloaded'

# save RGB files
save_rgb = prefix_output + '/rgb_files'

# save tiles
save_tiles = prefix_output + '/tiles_imgs'

# Unet weights file
unet_weights = prefix_input + "/unet_forest.hdf5"

# Unet weights clouds file
unet_clouds = prefix_input + '/unet_clouds.hdf5'

# classificated images path
class_path = prefix_output + "/predicted"

# classificated clouds images path
class_clouds = prefix_output + "/predicted_clouds"

# polygons save
poly_path = prefix_output + '/polygons'

# files saved after the trained UNet
percentiles_forest = [prefix_input + "/bands_third.npy",
                      prefix_input + "/bands_nin.npy"]

percentiles_clouds = [prefix_input + "/bands_third_clouds.npy",
                      prefix_input + "/bands_nin_clouds.npy"]

def_main(save_imgs, save_rgb, save_tiles, unet_weights, unet_clouds,
         class_path, class_clouds, poly_path,
         percentiles_forest, percentiles_clouds, geojson_file)
