import face_recognition
import sys
import os
import urllib.request   #para python2 : urllib2
from face_recFunctions import *

urlCedula = sys.argv[1].replace("jpc", "jpg")
[imgCi, imgSelfie] = getImageFiles(urlCedula, sys.argv[2])
encodingsCedula = getEncodings(imgCi)
encodingsSelfie = getEncodings(imgSelfie)

verification = verifyFaces(encodingsCedula, encodingsSelfie)

errors = False
if len(encodingsSelfie) == 0:
	errors = 'NoFace'

print(verification, errors)
