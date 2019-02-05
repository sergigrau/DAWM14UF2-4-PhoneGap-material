/*
 * Aplicació que permet accedir a la camera del dispositiu
 * sergi.grau@fje.edu
 * cordova plugin add cordova-plugin-camera
 * versió 2.0 20.04.2017
 */
paginaActual = {};

paginaActual.init = function () {
    console.log("cridant :: init");
};

paginaActual.enrera = function () {
    console.log("detall :: enrera");
    $("body").load("M00_llistatAPI.html", function () {
        $.getScript("js/M00_llistatAPI.js", function () {
            if (paginaActual.init) {
                paginaActual.init();
            }
        });
    });
};

var app = {
    origenFoto: '',
    tipusDestinacio: '',
    // Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Esdeveniments possibles en la inicialització de l'app:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // callback per a esdeveiniment deviceready
    // this representa l'esdeveniment
    onDeviceReady: function () {
        origenFoto = navigator.camera.PictureSourceType;
        tipusDestinacio = navigator.camera.DestinationType;
    }
    ,
    onFotoDesada: function (imageData) {
        var miniatura = document.getElementById('miniatura');
        miniatura.style.display = 'block';
        miniatura.src = "data:image/jpeg;base64," + imageData;
    },
    onRecuperarFoto: function (imageURI) {
        var imatgeGran = document.getElementById('imatgeGran');
        imatgeGran.style.display = 'block';
        imatgeGran.src = imageURI;
    },
    ferFoto: function () {
        console.log('fa foto');
        // fer una foto i desa la imatge com a cadena base64-encoded
        navigator.camera.getPicture(app.onFotoDesada, app.onError, {
            quality: 50,
            destinationType: tipusDestinacio.DATA_URL
        });
    },
    ferFotoEditable: function () {
        // fer una foto i desa la imatge com a cadena base64-encoded
        navigator.camera.getPicture(this.onFotoDesada, this.onError, {
            quality: 20, allowEdit: true,
            destinationType: tipusDestinacio.DATA_URL
        });
    },
    obtenirFoto: function (source) {
        // recupera una imatge des d'un origen
        navigator.camera.getPicture(this.onRecuperarFoto, this.onError, {
            quality: 50,
            destinationType: tipusDestinacio.FILE_URI,
            sourceType: source
        });
    },
    onError: function (message) {
        alert('Failed because: ' + message);
    }
}

window.addEventListener('load', app.initialize());
