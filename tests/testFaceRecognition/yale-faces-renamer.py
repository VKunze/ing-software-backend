import os
import time
path = '../common/newyalefaces'
#path = 'C:/Users/Usuario/Desktop/OldandNewYaleFaces2/oldyalefaces'
faces = os.listdir(path)

def yale_name_changer(faces):
    for file_name in faces:
        
        split_name = file_name.split('.')
        subject_number = split_name[0].split('subject')
        new_name = subject_number[1] + '_' + split_name[1] + '.jpg'
        
        os.rename(os.path.join(path, file_name), os.path.join(path, new_name))
        
yale_name_changer(faces)
	
