from socketIO_client import SocketIO
import ev3dev.ev3 as ev3

m = ev3.MediumMotor('outA')

def onConnect():
    print('Connected to Cloud, dude!')

def onClawCommand(command):
    print('CLAW Command: ' + command);

    if (command == 'open'):
        m.run_timed(time_sp=200, speed_sp=500)
    else:
        m.run_timed(time_sp=200, speed_sp=-500)

socket = SocketIO('http://api-summit-2017-apis-at-home.azurewebsites.net')

socket.on('connect', onConnect)
socket.on('claw', onClawCommand)

socket.wait() 
