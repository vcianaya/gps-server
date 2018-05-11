var gps = require("./../gps-tracking");
var app = require('./http-server');
var options = {
    'debug'                 : true,
    'port'                  : 5000,
    'device_adapter'        : "GT06"
}

var server = gps.server(options,function(device,connection){
    device.on("connected", function (data) {
        console.log("Soy un nuevo dispositivo queriendo conectarme");
    });
    device.on("login_request",function(device_id,msg_parts){
        console.log('¡Oye! Quiero comenzar a transmitir mi posición. Por favor Acéptame. Me llamo ' + device_id);
        this.login_authorized(true); 

    });


    //PING -> When the gps sends their position  
    device.on("ping",function(data){
        app.emmit_socket({latitude:data.latitude, longitude:data.longitude});
        console.log(data);
        return data;

    });
    connection.on('error', function (data) {
        console.log("Connection Error Victor: ");
        console.log(data);
    });
});
//HTPP SERVER
var serv=app.listen(3000,()=>{
    console.log("EL SERVIDOR LOCAL CON NODE Y EXPRESS ESTA CORRIENDO");        
});