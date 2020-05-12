import face_recognition
import sys
import os
import urllib.request   #para python2 : urllib2

urlCedula = sys.argv[1].replace("jpc", "jpg")
imgCi = urllib.request.urlopen(urlCedula)		#para python2 : urllib2.urlopen(sys.argv[1])
imgSelfie = urllib.request.urlopen(sys.argv[2]) 	#para python2 : urllib2.urlopen(sys.argv[2])

orig_foto = face_recognition.load_image_file(imgCi)
orig_encodings = face_recognition.face_encodings(orig_foto)[0]
verificacion=False

val_foto=face_recognition.load_image_file(imgSelfie)
val_encodings = face_recognition.face_encodings(val_foto)  
if val_encodings:
	verificacion = face_recognition.compare_faces([orig_encodings], val_encodings[0])[0]
else:
	verificacion=False

errors = False
if len(val_encodings) == 0:
	errors = 'NoFace'

print(verificacion, errors)
