from socketIO_client import SocketIO

def onConnect():
    print('connected')

socket = SocketIO('http://localhost:8080')
socket.on('connect', onConnect)
socket.wait() 
