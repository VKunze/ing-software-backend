import os
import time
from array import *
#path = 'C:/Users/Usuario/Desktop/OldandNewYaleFaces/oldyalefaces'
path = 'C:/Users/valek/Documents/UM/2020 s1/IngSoftware/face-recognition-datasets/LAG'

def create_comparison_matrix():
    folders = os.listdir(path)
    normal_list = [0]*len(folders)
    not_normal_list = [[] for i in range(len(folders))]
    i=0
    for folder in folders:
        old_faces = os.listdir(path + '/' + folder)
        if old_faces[0] != 'y':
            not_normal_list[i].append(folder + '/' + old_faces[0])
        else:
            not_normal_list[i].append(old_faces[1])
        young_faces = os.listdir(path + '/' + folder + '/y')
        normal_list[i] = '/' + folder + '/y/' + young_faces[0]
        i+=1
    return [normal_list, not_normal_list]
    
#print(create_comparison_matrix())