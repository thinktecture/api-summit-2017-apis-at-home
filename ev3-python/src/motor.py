import ev3dev.ev3 as ev3

m = ev3.MediumMotor('outA')
m.run_timed(time_sp=3000, speed_sp=500)
