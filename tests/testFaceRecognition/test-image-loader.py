from api-test import *

def getMainMetrics(resultadosImgValidas, resultadosImgNoValidas):
    TP = resultadosImgValidas[0]
    FN = resultadosImgValidas[1]
    TN = resultadosImgNoValidas[0]
    FP = resultadosImgNoValidas[1]
    return FP, FN, TP, TN

def calculateErrorRate(FP, FN, TP, TN):
    return (FP + FN) / (TP + TN + FP + FN) 

def calculateFMR(FP, TP):
    return FP / (FP + TP)

def loadImages():
    #Cargar imagenes de carar válidas
    resultadosImgValidas = []
    

    #Cargar imagenes de la caras no validas
    resultadosImgNoValidas = []


    #get FP, FN, TP, TN
    [FP, FN, TP, TN] = getMainMetrics(resultadosImgValidas, resultadosImgNoValidas)

    #Calcular Error rate
    errorRate = calculateErrorRate(FP, FN, TP, TN)

    #Calcular False match rate (FMR)
    #Probabilidad de que el sistema acepte incorrectamente. Es el porcentaje de caras que no coinciden 
    #que son aceptadas por el sistema. 
    FRM = calculateFMR(FP, TP)

    return [errorRate, FRM]


    