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
var objecteFitxer; //apuntador al fitxer

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
    desar: function () {
        objecteFitxer.createWriter(this.escriureFitxer, error);
    },
    accedirFS: function (sistemaFitxers) {
        sistemaFitxers.root.getFile("readme.txt", {create: true, exclusive: false},
            this.obtenirFitxer, function (error) {
                document.getElementById('missatge').innerHTML = 'Problema: ' + error.code;
            });

    },
    obtenirFitxer: function (fileEntry) {
        objecteFitxer = fileEntry;
    },

    escriureFitxer: function (writer) {
        var text = document.getElementById('text').value;
        writer.write(text);
        writer.onwriteend = function (evt) {
            document.getElementById('contingut').innerHTML = '<p>Desat.<br /><strong>File path:</strong> ' +
                objecteFitxer.fullPath + '</p>';
            var reader = new FileReader();
            reader.readAsText(objecteFitxer);
            reader.onload = function (evt) {
                document.getElementById('contingut').innerHTML = '<strong> Fitxer:</strong> <br />' + evt.target.result;

            }
        }
    },
}



