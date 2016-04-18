var sp = require('serialport');
var SerialPort = sp.SerialPort;
var wpi = require('wiring-pi');

// relay
wpi.setup('gpio');
wpi.pinMode(4, wpi.OUTPUT);

// xbee
var port = new SerialPort('/dev/ttyUSB0', {
    baudrate: 9600,
    parser: sp.parsers.readline('\n')
});
port.on('open', function () {
    console.log('connected to xbee, waiting for data...');
    
    port.on('data', function (data) {
        console.log('Data: ' + data);

        openRelay();
    });
});

function openRelay() {
    console.log('opening');
    wpi.digitalWrite(4, wpi.HIGH);

    setTimeout(function () {
        console.log('closing');
        wpi.digitalWrite(4, wpi.LOW);
    }, 3000);
}

// sockets for push
/*var socket = require('socket.io-client')('http://localhost');
socket.on('connect', function(){
    console.log('connected');
});
socket.on('event', function(data){
    console.log(data);
});
socket.on('disconnect', function(){
    console.log('connection lost');
});*/