var geocoder = null;
$(document).ready(function() {
  if ($('#slideIndex').length > 0) {
    $('#slideIndex').load(function() {$('#slideIndex').fadeIn(300);});
    setInterval(function(){rotate("slideIndex","auxIndex","home/",6);}, 4000);
  }

  if ($('.galimg').length > 0) {
    $('.galimg').click(function() {
      url = $(this).attr('src');
      window.open(url.replace("/t","").replace("_t",""));
    });
    
    $('.galimg').load(function() {$(this).fadeIn(300);});
    
    $('#atras').click(function() {mover("-");});
    
    $('#adelante').click(function() {mover("+");});
  }

  if ($(this).attr('title').search('Productos') != -1) {
    $('#image').click(function() {
      url = $(this).attr('src');
      window.open(url.replace("/t","").replace("_t",""));
    });
    
    $('#image').load(function() {$(this).fadeIn(300);});
    titulo = $('#titulo').attr("prod");
    folder = "t/vru_";
    total = 3;
    if (titulo == "A-50") {
      folder = "t/a_50_";
      total=3;
    } else if (titulo == "A-90") {
      folder = "t/a_90_";
      total=4;
      $('#opcionales').mouseover(function () {$('#producto div.opcionales').toggle();});
      $('#opcionales').mouseout(function () {$('#producto div.opcionales').toggle();});
    }      
    setInterval(function(){rotate("image","aux",folder,total);}, 4000);
  }
  
  if ($(this).attr('title').search('Contacto') != -1) {
    geocoder = new google.maps.Geocoder();
    init_gmap();
    $('#sem').mouseover(function() {centerMarker("sem");});
    $('#tec').mouseover(function() {centerMarker("tec");});
  }
  
  if ($('#calculo').length > 0) init_calculo();
});

var values = {'a-50' : {'1': {},
                        '2': {'40': 1.8},
                        '3': {'20': 2.7,
                              '30': 4.4,
                              '40': 5.5
                             },
                        '4': {'20': 3.6,
                              '30': 6.6,
                              '40': 8.6
                             },
                        '5': {'20': 4.7,
                              '30': 8.6,
                              '40': 12.5
                             }
                        },
              'a-90-1' : {'1': {'20': 0.37,
                                '30': 0.69,
                                '40': 1
                               },
                          '2': {'20': 1.3,
                                '30': 2.27,
                                '40': 2.8
                               },
                          '3': {'20': 2.72,
                                '30': 4.54,
                                '40': 6.20
                               },
                          '4': {'20': 4.37,
                                '30': 7.69,
                                '40': 9.75
                               },
                          '5': {'20': 6.10,
                                '30': 11.23,
                                '40': 14.30,
                                '50': 17.75,
                                '60': 20.30
                               }
                         },
              'a-90-2' : {'1': {},
                          '2': {},
                          '3': {},
                          '4': {'20': 14,
                                '30': 17,
                                '40': 20.5
                               },
                          '5': {'20': 14,
                                '30': 18,
                                '40': 21,
                                '50': 30,
                                '60': 34
                               }
                         }
              };

function init_calculo() {
  $('.spinner').each(function(){
    min = null;
    max = null;
    step = 1;
    v = $(this).attr('min');
    if (v != undefined && v.match(/^\d+$/)) min = parseInt(v);
    v = $(this).attr('max');
    if (v != undefined && v.match(/^\d+$/)) max = parseInt(v);
    v = $(this).attr('step');
    if (v != undefined && v.match(/^\d+$/)) step = parseInt(v);
    $(this).stepper({
      type: 'int',
      wheel_step: step,
      arrow_step: step,
      limit: [min,max],
      onStep: function( val, up ) {
        recalcular();
      }
    });
  })  
  
  $('.disable_atom').change(function(){
    parent = $(this).parents('.atomizador');
    input = parent.find('.spinner');
    if ($(this).is(':checked')) {
      input.attr('disabled','disabled');
      input.addClass('disabled');
    } else {
      input.removeAttr('disabled');
      input.removeClass('disabled');
    }
  })
  $('#checkVelocidad').change(function(){
    text = $(this).is(':checked') ? 'Velocidad (m/h)' : 'Velocidad (km/h)';
    $(this).siblings('span').html(text);
    recalcularSuperficie();
  })
  $('#recalculate a').click(function(){
    recalcular();
  })
}

function recalcularSuperficie(){
  multiplier = $('input#checkVelocidad:checked').length == 0 ? 600 : 373;
  ancho = parseInt($('input#ancho').val());
  velocidad = parseInt($('input#velocidad').val());
  $('input#superficie').val((ancho*velocidad/multiplier).toFixed(2));
}

function recalcularOrificios(){
  pre = parseInt($('#presion').val());
  c = parseInt($('#caudal').val());
}

function recalcular(){
  recalcularSuperficie();
}

/*function limit_spinner_value(spinner) {
  max = parseInt(spinner.attr('max'));
  min = parseInt(spinner.attr('min'));
  value = spinner.val();
  if (value > max) value = max;
  if (value < min) value = min;
  spinner.val(value);
}
function value_out_of_bound(spinner,val) {
  max = parseInt(spinner.attr('max'));
  min = parseInt(spinner.attr('min'));
  return (val > max || val < min);
}*/


var rotateIndex = 1;
function rotate(id, auxId, folder, total) {
  index = rotateIndex;
  rotateIndex = (rotateIndex+1)%total;
  $('#'+id).fadeOut(300, function(){ $('#'+id).attr('src',"./img/fotos/"+folder+index+".jpg");}
  );
  $('#'+auxId).attr('src',"./img/fotos/"+folder+rotateIndex+".jpg");
}

var galIndex = 0;
var total = 20;
function mover(direccion){
  if (direccion == "+"){
    if (galIndex == total-3){
      return;
    } else if (galIndex > total-6){
      galIndex = total-3
    } else {
      galIndex = galIndex+3;
    }
  } else {
    if (galIndex == 0){
      return;
    } else if (galIndex-3 < 0){
      galIndex = 0;
    } else {
      galIndex = galIndex-3;
    }
  }

  src1 = "./img/fotos/t/"+galIndex+"_t.jpg";
  src2 = "./img/fotos/t/"+(galIndex+1)+"_t.jpg";
  src3 = "./img/fotos/t/"+(galIndex+2)+"_t.jpg";

  $('#img1').fadeOut(300, function() {$('#img1').attr('src', src1);});
  $('#img2').fadeOut(300, function() {$('#img2').attr('src', src2);});
  $('#img3').fadeOut(300, function() {$('#img3').attr('src', src3);});
}

var intro_counter = 0;
function update_loader(){
  intro_counter++;
  $('#cargado').html(intro_counter/4*100);
  if (intro_counter == 4) {
    $('#loader').remove();
    $('#fondopre').show();
    frame(1);
  }
}


function frame(index){
  if (index < 6) {
    $('#pres'+index).fadeIn('1500', function() {setTimeout(function() {
                                                  frame(index+1);
                                                  if (index < 4) {
                                                    $('#pres'+index).fadeOut('fast');
                                                  }
                                                }, '3000');});
  } else if (index == 6) {
    $('#pres'+index).fadeIn('1500');
  }
}

var startZoom = 9;
var map;
var markers = [];

//Crea el mapa vacio
function init_gmap() {
  var options = {
    zoom: startZoom,
    center: new google.maps.LatLng(-34.71714803840951, -58.30205535624998),
    zoomControl: true,
    panControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("mapa"), options);
  var infoWindow = new google.maps.InfoWindow({ maxWidth: 100 });

  //tec
  var marker1 = new google.maps.Marker({
     map: map,
     position: new google.maps.LatLng(-34.71714803840951, -58.30205535624998)
  })

  //semat
  var marker2 = new google.maps.Marker({
     map: map,
     position: new google.maps.LatLng(-34.71520787519164, -58.29338645671385)
  })
  markers["tec"] = marker1;
  markers["sem"] = marker2;

  map.setCenter(markers["tec"].position);
  map.setZoom(14);
}

function centerMarker(id){
  map.setCenter(markers[id].position);
  map.setZoom(14);
}