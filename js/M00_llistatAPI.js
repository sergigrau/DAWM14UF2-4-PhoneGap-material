paginaActual = {};

paginaActual.init = function(){
    console.log("llistatAPI :: init");
};

paginaActual.carregarPagina = function(pageIndex){
    console.log("Llistat API :: carregarPagina :: pageIndex: " + pageIndex);
    $("body").load( pageIndex + ".html");
    $.getScript("js/" + pageIndex +".js", function() {
        if (paginaActual.init) {
            paginaActual.init();
        }
    });
};

