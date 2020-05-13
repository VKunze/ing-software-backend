from api-test import *

def calculateErrorRate():
    

def calculateFMR():


def loadImages():
    #Cargar imagenes de carar válidas
    resultadosImgValidas = []


    #Cargar imagenes de la caras no validas
    resultadosImgNoValidas = []


    #get FP, FN, TP, TN
    [FP, FN, TP, TN] = getMainMetrics(resultadosImgValidas, resultadosImgNoValidas)

    #Calcular Error rate
    errorRate = calculateErrorRate()

    #Calcular False match rate (FMR)
    #Probabilidad de que el sistema acepte incorrectamente. Es el porcentaje de caras que no coinciden 
    #que son aceptadas por el sistema. 
    FRM = calculateFMR()

    return [errorRate, FRM]


    