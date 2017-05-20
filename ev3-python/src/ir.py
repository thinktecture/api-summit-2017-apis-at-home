from ev3dev.ev3 import *

ir = InfraredSensor() 
assert ir.connected, "Connect a single infrared sensor to any sensor port"

ts = TouchSensor()
assert ts.connected, "Connect a touch sensor to any port" 

ir.mode = 'IR-PROX'

while not ts.value():
    distance = ir.value()
    print('DISTANCE: ' + str(distance))

    if distance < 60:
        Leds.set_color(Leds.LEFT, Leds.RED)
    else:
        Leds.set_color(Leds.LEFT, Leds.GREEN)

Sound.beep()       

Leds.set_color(Leds.LEFT, Leds.GREEN)  
