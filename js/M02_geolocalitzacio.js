/*
 * Aplicació que fa us de la geolocalització
 * phonegap create geolocalitzacio edu.fje.daw2 geolocalitzacio
 * cordova platform add android
 * phonegap plugin add org.apache.cordova.geolocation
 * sergi.grau@fje.edu
 * versió 2.0 20.04.2017
 *
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
        var options = { frequency: 3000 };
        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
        //watchID =  navigator.geolocation.watchPosition(app.onSuccess, app.onError, options);

    },
    //callback per a quan obtenim les dades de l'accelerometre
    onSuccess: function(posicio){
        var geoElement =
            document.getElementById('geolocalitzacio');
        geoElement.innerHTML =
            'Latitud: '  + posicio.coords.latitude + '<br />' +
            'Longitud: ' + posicio.coords.longitude + '<br />' +
            'Altitud: '  + posicio.coords.altitude + '<br />' +
            'Precissió: '  + posicio.coords.accuracy + '<br />' +
            'Precissió altitud: ' +posicio.coords.altitudeAccuracy + '<br />' +
            'Bruixola: ' + posicio.coords.heading  + '<br />' +
            'Velocitat: '   + posicio.coords.speed + '<br />' +
            'Marca de temps: ' + posicio.timestamp + '<br />';
    },
    //callback per a un cas d'error
    onError: function(error){
        var tipusError;

        if(error.code) {
            switch(error.code)
            {
                case 1: // PERMISSION_DENIED
                    tipusError ='manca de permisos';
                    break;
                case 2: // POSITION_UNAVAILABLE
                    tipusError ='posició no disponible.';
                    break;
                case 3: // TIMEOUT
                    tipusError = 'Timeout';
                    break;
                default: // UNKOWN_ERROR
                    tipusError ='Error desconegut';
                    break; }
        }
        var element = document.getElementById('dades');
        element.innerHTML = tipusError;

    }
};


window.addEventListener('load', app.initialize());
