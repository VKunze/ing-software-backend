from api_test import *
from sof_comparator import create_comparison_matrix as sof_load_matrix
from yale_comparator import create_comparison_matrix as yale_load_matrix
import time

def getMainMetrics(resultadosImgValidas, resultadosImgNoValidas):
    TP = resultadosImgValidas[0]
    FN = resultadosImgValidas[1]
    FP = resultadosImgNoValidas[0]
    TN = resultadosImgNoValidas[1]
    return FP, FN, TP, TN

def calculateErrorRate(FP, FN, TP, TN):
    return (FP + FN) / (TP + TN + FP + FN) 

def calculateFMR(FP, FN, TP, TN):
    new_FP = FP / (FP + TN)
    new_TP = TP / (TP + FN)
    return new_FP / (new_FP + new_TP)

def compare_images(CI_list, images_list, path):
    results_array = [0, 0]
    for i in range(len(CI_list)):
        start_time = time.time()
        results = cmpFotos(CI_list[i], images_list[i], path)
        print(results)
        results_array[0] += results[0]
        results_array[1] += results[1]
        print("Time: " + str(time.time() - start_time))
    print(results_array)
    return results_array

def get_non_valid_images(CI_list, images_list):
    #returns 3 images from each other person
    non_valid_images = [[] for i in range(len(CI_list))]
    for i in range(len(CI_list)):
        for j in range(len(CI_list)):
            if i != j:
                non_valid_images[i] += images_list[j][:3]
    return non_valid_images

def compare_sof_images():
    #Cargar imagenes
    [CI_list, images_list] = sof_load_matrix()
    print('matrix created')
    #Compare images of corresponding person
    resultadosImgValidas = [0, 0]
    path = "../common/sofimages/"
    for i in range(len(CI_list)):
        start_time = time.time()
        results = cmpFotos(CI_list[i], images_list[i], path)
        print(results)
        resultadosImgValidas[0] += results[0]
        resultadosImgValidas[1] += results[1]
        print("Time: " + str(time.time() - start_time))
    print(resultadosImgValidas)

def compare_yale_images():
    #Cargar imagenes
    [CI_list, images_list] = yale_load_matrix()
    print('matrix created')
    path = "../common/newyalefaces/"
    #Compare images of right person
    resultadosImgValidas = compare_images(CI_list, images_list, path)

    #Compare images not of right person
    no_valid_images_list = get_non_valid_images(CI_list, images_list)
    resultadosImgNoValidas = compare_images(CI_list, no_valid_images_list, path)
    
    return resultadosImgValidas, resultadosImgNoValidas

def test(dataset):
    resultadosImgValidas = ''
    resultadosImgNoValidas = ''
    if dataset == "SoF":
        [resultadosImgValidas, resultadosImgNoValidas] = compare_sof_images()
    elif dataset == "Yale":
        [resultadosImgValidas, resultadosImgNoValidas] = compare_yale_images()

    #get FP, FN, TP, TN
    [FP, FN, TP, TN] = getMainMetrics(resultadosImgValidas, resultadosImgNoValidas)
    print(FP, FN, TP, TN)
    #Calculate Error rate
    errorRate = calculateErrorRate(FP, FN, TP, TN)

    #Calculate False match rate (FMR)
    #Probabilidad de que el sistema acepte incorrectamente. Es el porcentaje de caras que no coinciden 
    #que son aceptadas por el sistema. 
    FRM = calculateFMR(FP, FN, TP, TN)
    print(errorRate, FRM)
    return [errorRate, FRM]

test("Yale")
    