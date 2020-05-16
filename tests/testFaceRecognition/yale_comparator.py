import os
import time
from array import *
path = 'C:/Users/Usuario/Desktop/OldandNewYaleFaces/oldyalefaces'

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
            normal_list[int_subject_number - 1 ] = file_name
        else: 
            not_normal_list[int_subject_number - 1].append(file_name)
    not_normal_list[0] = 11
    not_normal_list[0] = 12
    
create_comparison_matrix(path)
time.sleep(100)
