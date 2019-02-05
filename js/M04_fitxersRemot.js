/*
 * Aplicació que descarrega un fitxer remot a local, cal afegir el plugin
 * phonegap create fitxers edu.fje.daw2 fitxers
 * cordova platform add android
 * phonegap plugin add org.apache.cordova.file
 * phonegap plugin add org.apache.cordova.file-transfer
 * sergi.grau@fje.edu
 * versió 1.0 20.04.2017
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

var directori;

var app = {
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
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.accedirFS, null);
    },

    obtenirNomFitxer: function (url) {
        if (url) {
            var m = url.toString().match(/.*\/(.+?)\./);
            if (m && m.length > 1) {
                return m[1] + '.' + url.split('.').pop();
            }
        }
        return "";
    },

    desar: function () {
        var url = document.getElementById('url').value;
        var nomFitxer = this.obtenirNomFitxer(url);
        document.getElementById('missatge').innerHTML='Descarregant ' + nomFitxer;
        var fileTransfer = new FileTransfer();
        fileTransfer.download(
            url,
            directori.fullPath + '/' + nomFitxer,
            function (entry) {
                document.getElementById('missatge').innerHTML='Descarrega completa, desat a: ' + entry.fullPath;
            },
            function (error) {
                alert("Problema descarrega " + JSON.stringify(error));
            });
    },
    accedirFS: function (sistemaFitxers) {
        sistemaFitxers.root.getDirectory('descarregues', {create: true}, function (dir) {
            directori = dir;
        }, function (error) {
            document.getElementById('missatge').innerHTML='Problema: ' + error.code;
        });
    
    }
};
