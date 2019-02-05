/* Gestor de la navegació de l'aplicació cordova amb ratchet
 * sergi.grau@fje.edu
 * versió 2.0 20.04.2017
 */


var historial = [];
var paginaActual = {};

function init(){

    $("body").load("M00_llistatAPI.html", function(){
        $.getScript("js/M00_llistatAPI.js", function() {
            if (paginaActual.init) {
                paginaActual.init();
            }
        });
    });

}

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
        app.receivedEvent('estat');
    },
    // Actualitzem DOM quan rebem un esdeveniment
    receivedEvent: function(id) {
        document.getElementById(id).innerHTML='correcte';
        console.log('Rebent esdeveniment: ' + id);
    },
};


