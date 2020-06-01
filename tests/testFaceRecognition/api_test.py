
#import sys
import numpy as np
#sys.path.append('../../utils/')
print("iniciando")
from face_recFunctions import *

def cmpFotos(fotoCedula, arrayFotos, path):
    encodingsCedula = getEncodings(path + fotoCedula) 
    amountTrue = 0
    amountFalse = 0
    for foto in arrayFotos:
        try:
            encodings = getEncodings(path + foto)
            verification = verifyFaces(encodingsCedula, encodings)        
            if verification == True:
                amountTrue += 1
            else:
                amountFalse += 1
        except:
            print("ERROR WITH COMPARISON")
    return amountTrue, amountFalse


#print(cmpFotos("1.jpg", ["1.jpg", "1.jpg"]))
