import os
import time
from array import *
path = '../common/newyalefaces'
#path = 'C:/Users/Usuario/Desktop/OldandNewYaleFaces/oldyalefaces'
from api_test import cmpFotos

def create_comparison_matrix(path):
    faces = os.listdir(path)
    normal_list = [0]*15 
    not_normal_list = [[] for i in range(15)]
    for file_name in faces:
        split_file_name = file_name.split('_')
        subject_number = split_file_name[0]
        subject_type = (split_file_name[1]).split('.')[0]
        int_subject_number = int(subject_number)
        if subject_type == 'normal':
            normal_list[int_subject_number - 1 ] = path + "/" + file_name                       #os.path.join(path, file_name)
        else: 
            not_normal_list[int_subject_number - 1].append(path + "/" + file_name)             #os.path.join(path, file_name))
    return [normal_list, not_normal_list]


face_lists = create_comparison_matrix(path)
normal_list = face_lists[0]
not_normal_list = face_lists[1]
    
def compare_same_subject_x(subject_x, subject_y):
    results = cmpFotos(normal_list[subject_x - 1], not_normal_list[subject_y - 1])
    print(results)

compare_same_subject_x(1, 1)


