import os
import time
from array import *
#path = 'C:/Users/Usuario/Desktop/OldandNewYaleFaces/oldyalefaces'
path = 'C:/Users/valek/Documents/UM/2020 s1/IngSoftware/face-recognition-datasets/SoF/whole images'
foldsPath = 'C:/Users/valek/Documents/UM/2020 s1/IngSoftware/face-recognition-datasets/SoF/5-folds'

def create_comparison_matrix(path):
    f = open(foldsPath + '/foldNormal.txt', "r")
    normal_list = f.read().split("\n")

    #for i in range(5):
    f = open(foldsPath + '/fold' + str(1) + ".txt", "r")
    faces = f.read().split("\n")
    
    id_mappings = []
    not_normal_list = [[] for i in range(12)]
    for file_name in faces:
        split_file_name = file_name.split('_')
        subject_id = split_file_name[0]
        if not subject_id in id_mappings:
            id_mappings.append(subject_id)
        not_normal_list[id_mappings.index(subject_id)].append(file_name)

    return [normal_list, not_normal_list]
    
print(create_comparison_matrix(path))

