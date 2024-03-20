from flask import Flask
from pyeo import acd_national

app = Flask(__name__)

@app.route("/api/detect")
def run_pyeo():
    acd_national.automatic_change_detection_national("../pyeo/pyeo_linux.ini")