import sys
import numpy as np
sys.path.append('../../utils/')
print("iniciando")
from face_recFunctions import *

def cmpFotos(fotoCedula, arrayFotos):
    encodingsCedula = getEncodings(fotoCedula)
    results = []
    for foto in arrayFotos:
        encodings = getEncodings(foto)
        verification = verifyFaces(encodingsCedula, encodings)
        results.append(verification)
    return results

print(cmpFotos("../common/1.jpg", ["../common/1.jpg", "../common/1.jpg"]))