import face_recognition
import sys
import os

# orig_foto = face_recognition.load_image_file(os.getcwd() + sys.argv[1])
orig_foto = face_recognition.load_image_file(sys.argv[1])
orig_encodings = face_recognition.face_encodings(orig_foto)[0]
verificacion=False
# val_foto=face_recognition.load_image_file(os.getcwd() + sys.argv[2])
val_foto=face_recognition.load_image_file(sys.argv[2])
val_encodings = face_recognition.face_encodings(val_foto)    
if val_encodings:
	verificacion = face_recognition.compare_faces([orig_encodings], val_encodings[0])[0]
else:
	verificacion=False
print(verificacion)
