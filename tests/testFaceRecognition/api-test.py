import sys
import numpy as np
sys.path.append('../../utils/')
print("iniciando")
from face_recFunctions import *

def cmpFotos(fotoCedula, arrayFotos):
    encodingsCedula = getEncodings(fotoCedula)
    amountTrue = 0
    amountFalse = 0
    for foto in arrayFotos:
        encodings = getEncodings(foto)
        verification = verifyFaces(encodingsCedula, encodings)
        if true in verification:
            amountTrue += 1
        else:
            amountFalse += 1
    return amountTrue, amountFalse

print(cmpFotos("../common/1.jpg", ["../common/1.jpg", "../common/1.jpg"]))