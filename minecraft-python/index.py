from socketIO_client import SocketIO
from mcpi.minecraft import Minecraft
import time

print("Starting WebSocket connection...")
socket = SocketIO('http://api-summit-2017-apis-at-home.azurewebsites.net')

mc = Minecraft.create()
player = mc.player
pos = mc.player.getPos()

x = pos.x


def onConnect():
    print('Connected to Cloud, Dude', socket.transport_name)


def onMoveCommand(command):
    print('MOVE Command ' + command)

    if (command == 'forward'):
        moveForward()
    elif(command == 'backward'):
        moveBackward()
    else:
        stopMoving()


def moveForward():
    print('Moving forward...')
    global x

    while(True):
        x += 1
        player.setPos(x, pos.y, pos.z)
        time.sleep(1)


def moveBackward():
    print('Moving backward...')


def stopMoving():
    print('Stopping...')
    player.setPos(x, pos.y, pos.z)


socket.on('connect', onConnect)
socket.on('move', onMoveCommand)

socket.wait()
