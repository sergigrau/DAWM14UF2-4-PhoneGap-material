/*
 * Aplicació que fa us del dibuix de mapes
 * https://developers.google.com/maps/documentation/javascript/
 * phonegap create mapes edu.fje.daw2 mapes
 * cordova platform add android
 * phonegap plugin add org.apache.cordova.geolocation
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
        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
        //watchID =  navigator.geolocation.watchPosition(onSuccess, onError, options);

    },
    //callback per a quan obtenim les dades de l'accelerometre
    onSuccess: function(posicio){
        var latLng  =
            new google.maps.LatLng(
                posicio.coords.latitude,
                posicio.coords.longitude);
        var opcionsMapa = {
            center: latLng,
            panControl: false,
            zoomControl: true,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var mapa = new google.maps.Map(
            document.getElementById('mapa'),
            opcionsMapa
        );
        var marker = new google.maps.Marker({
            position: latLng,
            map: mapa });
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

