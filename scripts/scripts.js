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
    init_map();
    $('#sem').mouseover(function() {centerMarker("sem");});
    $('#tec').mouseover(function() {centerMarker("tec");});
  }

  if ($('#calculo').length > 0) init_calculo();
});

var values = {'a-50' : {'2': {'40': 1.8},
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
              'a-90-2' : {'4': {'20': 14,
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
  $('#atomizadores input[type=number]').on('change', orificioChanged);
  $('#presion').on('change', presionChanged);
  $('#caudal, #atom_type').on('change',recalcularOrificios);

  $('.disable_atom').on('change', function(){
    input = $(this).siblings('.hole');
    if ($(this).is(':checked')) {
      input.attr('disabled','disabled');
      input.addClass('disabled');
    } else {
      input.removeAttr('disabled');
      input.removeClass('disabled');
    }
    recalcularCaudal();
  })
  $('#checkVelocidad').on('change', function(){
    text = $(this).is(':checked') ? 'Velocidad (m/h)' : 'Velocidad (km/h)';
    $(this).siblings('span').html(text);
    recalcularCaudal();
  })
  $('#recalculate a').on('click', function(e){
    e.preventDefault();
    recalcularCaudal();
  })
  $('#atom_type').on('change', function(){
	recalcularCaudal();
  });
  $('.hole').on('change',recalcularCaudal);
  recalcularSuperficie();
  recalcularCaudal();
}

function presionChanged() {
  if ($('#presion').val() > 40) {
	$('.hole').val(5);
  }
}

function orificioChanged() {
  recalcularPresion();
  recalcularCaudal();
}

function recalcularOrificios(){
	atom_type = $('#atom_type').val();
	pre = $('#presion').val();
	min = '1';
	max = '5';
	if (atom_type == 'a-50') min = '2';
    else if (atom_type == 'a-90-2') min = '4';

    var hole = min*1;
    var finished = false;
    var calculated = 0;
    while(!finished && hole <= 5) {
      caudal = 0;
      $('.hole:not(:disabled)').each(function(idx, el){
        caudal += values[atom_type][hole][pre]/2;
      })
      calculated = caudal;
      if (caudal >= $('#caudal').val()) finished = true;
      else hole++;
	}

	if (finished) $('.hole:not(:disabled)').val(hole)
	else {
		$('#caudal').val(calculated);
		alert("No se puede generar el caudal desado con esta configuración.");
	}

	$('.hole').attr('min',min).attr('max',max).each(function(idx,el){
	  if ($(el).val() < min || $(el).val() > max) $(el).val(min);
	});
};

function recalcularPresion(){
	min_pre = '20';
	max_pre = '60';
	atom_type = $('#atom_type').val();
	$('.hole:not(.disabled)').each(function(idx, el){
	  pres_aux = values[atom_type][$(el).val()];
	  pres = []; for(var property in pres_aux) pres.push(property);

	  min = Math.min.apply(Math, pres);
	  max = Math.max.apply(Math, pres);

	  if (min > min_pre) min_pre = min;
	  if (max < max_pre) max_pre = max;
	})
	cur_pre = $('#presion').val();
	new_pre = cur_pre;
	if (cur_pre < min_pre) new_pre = min_pre;
	if (cur_pre > max_pre) new_pre = max_pre;
	$('#presion').val(new_pre);
}

function recalcularSuperficie(){
  multiplier = $('input#checkVelocidad:checked').length == 0 ? 600 : 373;
  ancho = parseInt($('input#ancho').val());
  velocidad = parseInt($('input#velocidad').val());
  $('input#superficie').val((ancho*velocidad/multiplier).toFixed(2));
}

function recalcularCaudal(){
  pre = $('#presion').val();
  atom_type = $('#atom_type').val();
  new_caudal = 0;
  $('.hole:not(:disabled)').each(function(idx, el){
    hole = $(el).val();
    new_caudal += values[atom_type][hole][pre]/2
  })
  $('#caudal').val(new_caudal);
}

function recalcular(){
    recalcularSuperficie();
    recalcularOrificios();
	recalcularPresion();
	recalcularCaudal();
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
var mymap = false
function init_map() {
  mymap = L.map('mapa').setView([-34.71714803840951, -58.30205535624998], 14);
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: ['a','b','c']
  }).addTo(mymap)

  //tec
  var marker1 = L.marker([-34.71714803840951, -58.30205535624998]).addTo(mymap);

  //semat
  var marker2 = L.marker([-34.71520787519164, -58.29338645671385]).addTo(mymap);

  markers["tec"] = marker1;
  markers["sem"] = marker2;

  mymap.flyTo(markers["tec"].getLatLng(), 14);
}

function centerMarker(id){
  mymap.setView(markers[id].getLatLng(), 14);
}
