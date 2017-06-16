from socketIO_client import SocketIO
from mcpi.minecraft import Minecraft

print("Starting WebSocket connection...")
socket = SocketIO('http://api-summit-2017-apis-at-home.azurewebsites.net')

mc = Minecraft.create()

def onConnect():
    print('Connected to Cloud, Dude', socket.transport_name)

def onClawCommand(command):
    text = 'CLAW Command: ' + command
    print(text)
    mc.postToChat(text)

def onMoveCommand(command):
    print('MOVE Command ' + command)

socket.on('connect', onConnect)
socket.on('claw', onClawCommand)
socket.on('move', onMoveCommand)

socket.wait()