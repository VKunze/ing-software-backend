import os
import time
import shutil
#path = 'C:/Users/Usuario/Desktop/OldandNewYaleFaces2/oldyalefaces'
path = 'C:/Users/valek/Documents/UM/2020 s1/IngSoftware/face-recognition-datasets/SoF/whole images'
new_path = 'C:/Users/valek/Documents/UM/2020 s1/IngSoftware/face-recognition-datasets/SoF/possible CI'
faces = os.listdir(path)

def selector(faces):
    for file_name in faces:
        split_name = file_name.split('_')
        #print(split_name)
        if split_name[-1] == 'o.jpg':
            print(split_name)
            shutil.copy(os.path.join(path, file_name), os.path.join(new_path, file_name))
            #os.rename(os.path.join(path, file_name), os.path.join(path, new_name))
        
       
        
selector(faces)
	
