/*
 * Aplicació que manipula una base de dades, No cal plugin
 * doncs utilitza la base de dades del propi navegador
 * phonegap create baseDades edu.fje.daw2 baseDades
 * cordova platform add android
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

var db;
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

        db = app.obtenirBaseDades();
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS LLISTA(accio)');
        }, app.error, app.obtenirItems);

    },
    obtenirBaseDades: function () {
        return window.openDatabase("llistaBD", "1.0", "Llista BD", 200000);
    },
    desar: function () {
        console.log('desar');
        var valor = document.getElementById('accio').value;
        db.transaction(function (tx) {
            tx.executeSql('INSERT INTO LLISTA (accio) VALUES ("' + valor + '")');
        }, this.error, app.obtenirItems);
        document.getElementById('accio').value = '';
    },
    error: function (error) {
        console.log('error');
        document.getElementById('missatge').innerHTML = "SQL Error: " + error.code;
    },
    obtenirItems: function () {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM LLISTA', [], app.consultar, app.error);
        }, this.error);
    },
    consultar: function (tx, resultats) {
        var len = resultats.rows.length;
        var sortida = '';
        for (var i = 0; i < len; i++) {
            sortida = sortida +
                '<li class="table-view-cell" id="' + resultats.rows.item(i).id + '">' +
                resultats.rows.item(i).accio + '</li>';
        }
        document.getElementById('missatge').innerHTML = 'total items:'+len;
        document.getElementById('llista').innerHTML = '<ul>' + sortida + '</ul>';
    },
    esborrar:  function () {
        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE IF EXISTS LLISTA');
        }, this.error);
    }
}

window.addEventListener('load', app.initialize());
