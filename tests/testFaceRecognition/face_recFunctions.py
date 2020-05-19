import face_recognition
import sys
import os
import urllib.request   #para python2 : urllib2

def getImageFiles(urlCedula, urlSelfie):
	imgCi = urllib.request.urlopen(urlCedula)		#para python2 : urllib2.urlopen(sys.argv[1])
	imgSelfie = urllib.request.urlopen(urlSelfie) 	#para python2 : urllib2.urlopen(sys.argv[2])
	return [imgCi, imgSelfie]

def getEncodings(img):
	orig_foto = face_recognition.load_image_file(img)
	orig_encodings = face_recognition.face_encodings(orig_foto)
	return orig_encodings

def verifyFaces(encodings1, encodings2):
	verification=False
	if encodings2:
		verification = face_recognition.compare_faces([encodings1[0]], encodings2[0])[0]
	else:
		verification=False
	return verification