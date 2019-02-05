/*
 * Aplicació que fa us de l'accelerometre, cal afegir el plugin
 * phonegap create accelerometre edu.fje.daw2 accelerometre
 * cordova platform add android
 * phonegap plugin add org.apache.cordova.device-motion
 * sergi.grau@fje.edu
 * versió 2.0 20.04.2017
 */
paginaActual={};

paginaActual.init = function() {
    console.log("cridant :: init");
};

paginaActual.enrera = function(){
    console.log("detall :: enrera");
    $("body").load("M00_llistatAPI.html", function(){
        $.getScript("js/M00_llistatAPI.js", function() {
            if (paginaActual.init) {
                paginaActual.init();
            }
        });
    });
};

var watchID = null;

var app = {
    // Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Esdeveniments possibles en la inicialització de l'app:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // callback per a esdeveiniment deviceready
    // this representa l'esdeveniment
    onDeviceReady: function() {
        //navigator.accelerometer.getCurrentAcceleration(app.onSuccess, app.onError);
        var options = { frequency: 3000 };
        watchID = navigator.accelerometer.watchAcceleration(app.onSuccess, app.onError, options);

        //navigator.accelerometer.clearWatch(watchID);
    },

    //callback per a quan obtenim les dades de l'accelerometre
    onSuccess: function(acceleracio){
        var accElement =
            document.getElementById('accelerometre');
        accElement.innerHTML    =
            'Acceleració X: ' + acceleracio.x + '<br />' +
            'Acceleració Y: ' + acceleracio.y + '<br />' +
            'Acceleració Z: ' + acceleracio.z + '<br />' +
            'Marca de temps: '      + acceleracio.timestamp;
    },
    //callback per a un cas d'error
    onError: function(){
        alert('error');
    }
};

window.addEventListener('load', app.initialize());


