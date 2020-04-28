import sys

print('Hello from python')
try:
    print('Param 1 : ' + sys.argv[1])
except:
    print('error')