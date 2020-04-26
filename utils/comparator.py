import face_recognition

orig_foto = face_recognition.load_image_file('C:/Users/Usuario/Desktop/labticCotto/labticv_2019-detector_mrz/Imagenes_Cara/foto.png')
orig_encodings = face_recognition.face_encodings(orig_foto)[0]
verificacion=False
val_foto=face_recognition.load_image_file('C:/Users/Usuario/Desktop/labticCotto/labticv_2019-detector_mrz/Imagenes_Cara/real.jpg')
val_encodings = face_recognition.face_encodings(val_foto)    
if val_encodings:
	verificacion = face_recognition.compare_faces([orig_encodings], val_encodings[0])[0]
else:
	verificacion=False
print(verificacion)
