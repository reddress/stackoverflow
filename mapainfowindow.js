var map;
var idInfoBoxAberto;
var infoBox = [];
var markers = [];
var localizacao = [];
//var markerPonto = new google.maps.Marker({});
var markerPonto;
var contador = 0;
var l = 0;
var infowindow = new google.maps.InfoWindow({
    maxWidth: 300
});

/*Método que inicia configurações iniciados do mapa*/
function initialize() {
    var latlng = new google.maps.LatLng(-23.5514565,-46.6224739);

    var options = {
        zoom: 6,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("mapa"), options);

    /*Novo parte - adiciona ponteiro geolocalizador(de acordo com as coordenadas informadas em 'latlng'*/
    geocoder = new google.maps.Geocoder();

    marker = new google.maps.Marker({
        map: map,
        draggable: true,
    });

    marker.setPosition(latlng);

    /*Parte de loop com banco de dados*/

/*
  $.ajax({
        url : 'verificaAjax.php',
        success : function(msg){
            if (msg.status == 0) {
                msg.errorMsg.forEach(ShowResults);
                //JSON.parse(msg.errorMsg).forEach(ShowResults);

            }
        },
        error:function (xhr, ajaxOptions, thrownError) {
            alert("Erro no Processamento dos Dados. Entre em contato com o setor de Tecnologia e informe a mensagem abaixo:\n"+xhr.responseText);
        }

    });
*/

  ShowResults({'razao_social': 'Joao Alfredo Jorge Mario 1993',
               'latitude': -23.24,
               'longitude': -46.22,
              });

  ShowResults({'razao_social': 'Beto Paulo Da Costa Mariani 2001',
               'latitude': -22.24,
               'longitude': -45.22,
              });

  

              
}

// Função para retornar os valores
function ShowResults(value, index, ar) {
    contentString = '<h2>'+value['razao_social']+'</h2>';

    localizacao.push({
        nome: value['razao_social'],
        latlng: new google.maps.LatLng(value['latitude'],value['longitude'])
    });


    /*
    markerPonto.position(localizacao[l].latlng);
    markerPonto.icon('img/marcador.png');
    markerPonto.map(map);
    markerPonto.title(localizacao[l].nome);
    */


    var markerPonto = new google.maps.Marker({
        position: localizacao[l].latlng,
//        icon: 'img/marcador.png',
        map: map,
        title: localizacao[l].nome
    });

  (function(contentString) {
    google.maps.event.addListener(markerPonto, 'click', function() {
      //infowindow.setContent('<div style="white-space: nowrap; overflow: hidden; line-height: 1.35;">' + contentString + '</div>');
      infowindow.setContent('<div style="overflow: visible !important;">' + contentString + '</div>');

      infowindow.open(map,markerPonto);
    });
  })(contentString);

    ++l;


}

initialize();
