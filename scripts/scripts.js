var geocoder = null;
$(document).ready(function() {
  if ($('#slideIndex').length > 0) {
    $('#slideIndex').on('load',function() {$('#slideIndex').fadeIn(300);});
    setInterval(function(){rotate("slideIndex","auxIndex","home/",6);}, 4000);
  }

  if ($('.galimg').length) {
    $('.galimg').click(function() {
      url = $(this).attr('src');
      window.open(url.replace("/t","").replace("_t",""));
    });

    $('.galimg').on('load', function() {$(this).fadeIn(300);});

    $('#atras').click(function() {mover("-");});

    $('#adelante').click(function() {mover("+");});
  }

  if ($(this).attr('title').search('Productos') != -1) {
    $('#image').click(function() {
      url = $(this).attr('src');
      window.open(url.replace("/t","").replace("_t",""));
    });

    $('#image').on('load',function() {$(this).fadeIn(300);});
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

  if ($('#calculo').length) init_calculo();
});



// Cálculo de volúmen //

var values = {'a-50' : {2: {40: 1.8},
                        3: {20: 2.7,
                            30: 4.4,
                            40: 5.5
                           },
                        4: {20: 3.6,
                            30: 6.6,
                            40: 8.6
                           },
                        5: {20: 4.7,
                            30: 8.6,
                            40: 12.5
                           }
                        },
              'a-90-1' : {1: {20: 0.37,
                              30: 0.69,
                              40: 1
                             },
                          2: {20: 1.3,
                              30: 2.27,
                              40: 2.8
                             },
                          3: {20: 2.72,
                              30: 4.54,
                              40: 6.20
                             },
                          4: {20: 4.37,
                              30: 7.69,
                              40: 9.75
                             },
                          5: {20: 6.10,
                              30: 11.23,
                              40: 14.30,
                              50: 17.75,
                              60: 20.30
                             }
                         },
              'a-90-2' : {4: {20: 14,
                              30: 17,
                              40: 20.5
                             },
                          5: {20: 14,
                              30: 18,
                              40: 21,
                              50: 30,
                              60: 34
                             }
                         }
              };

var values = {'a-50' : {
                20: {
                  3: 2.7,
                  4: 3.6,
                  5: 4.7
                },
                30: {
                  3: 4.4,
                  4: 6.6,
                  5: 8.6
                },
                40: {
                  2: 1.8,
                  3: 5.5,
                  4: 8.6,
                  5: 12.5
                }
              },
              'a-90-1' : {
                20: {
                  1: 0.37,
                  2: 1.3,
                  3: 2.72,
                  4: 4.37,
                  5: 6.10,
                },
                30: {
                  1: 0.69,
                  2: 2.27,
                  3: 4.54,
                  4: 7.69,
                  5: 11.23,
                },
                40: {
                  1: 1,
                  2: 2.8,
                  3: 6.20,
                  4: 9.75,
                  5: 14.30
                },
                50: {
                  5: 17.75,
                },
                60: {
                  5: 20.30,
                }
              },
              'a-90-2' : {
                20: {
                  4: 14,
                  5: 14
                },
                30: {
                  4: 17,
                  5: 18,
                },
                40: {
                  4: 20.5,
                  5: 21
                },
                50: {
                  5: 30,
                },
                60: {
                  5: 34
                }
              }
            };

current_data = values['a-90-1'];
presure_values = [];
current_presure = 40;
hole_values = [];
current_hole = 4;
width_i = false;
speed_i = false;
surface_i = false;
caudal_i = false;
enabled_atoms = 4;

function setPresureData(e) {
  // ajusto presión a valores posibles según atomizador
  current_presure = parseInt($('#presure').val());

  current_data = values[$(this).val()];
  presure_values = _.keys(current_data);
  min_pre = _.min(presure_values);
  max_pre = _.max(presure_values);

  if (current_presure < min_pre) current_presure = min_pre;
  if (current_presure > max_pre) current_presure = max_pre;

  $('#presure').val(current_presure).attr('min',min_pre).attr('max',max_pre);

  hole_values = _.keys(current_data[current_presure]);
}

function calcSurface(e) {
  // calculo superficie según velocidad y ancho
  multi = $('#checkVelocidad').is(':checked') ? 373 : 600;
  width = parseInt(width_i.val());
  speed = parseInt(speed_i.val());
  surface_i.val((width*speed/multi).toFixed(2));
}

function calcHoles(e) {
  // valor esperado
  expected = parseFloat(surface_i.val())*parseFloat(caudal_i.val());
  //console.log(expected);

  // calculo para cada tamaño de orificio
  calcs = []
  _.each(presure_values, function(pre) {
    _.each(_.keys(current_data[pre]), function(hole) {
      hole = parseInt(hole);
      calc = enabled_atoms*2*current_data[pre][hole];
      calcs.push([calc,[hole,pre]]);
    })
  });
  //console.log(calcs);

  min_pair = false;
  // busco par [orificio,presión] mínimo para cubrir valor esperado
  _.each(calcs, function(pair) {
    if (pair[0] > expected) {
      if (!min_pair) min_pair = pair;
      if (pair[0] < min_pair[0]) min_pair = pair;
    }
  });

  // seteo orificio mínimo o muestro error
  if (min_pair) {
    //console.log(min_pair[0]+" "+min_pair[1][0]+" "+min_pair[1][1]);
    $('.hole').val(min_pair[1][0]);
    $('.hole.disabled').val('');
    current_presure = min_pair[1][1];
    $('#presure').val(current_presure);
    $('#calculo').removeClass('with_error');
  } else {
    $('#calculo').addClass('with_error');
  }
}

function checkAtom(e) {
  check = $(this);
  atom = check.siblings('.hole');
  if (check.is(':checked')) {
    atom.prop('disabled', true).addClass('disabled');
  } else {
    atom.prop('disabled', false).removeClass('disabled');
  }
  enabled_atoms = $('.hole:not(.disabled)').length;
  calcHoles();
}

function init_calculo() {
  width_i = $('#width');
  speed_i = $('#speed');
  surface_i = $('#surface');
  caudal_i = $('#caudal');
  $('#atom_type').on('change', setPresureData).on('input', setPresureData).trigger('change');
  $('#width, #speed').on('change', calcSurface).on('input', calcSurface).trigger('change');
  $('#presure, #caudal').on('change', calcHoles).on('input', calcHoles).trigger('change');
  $('.disable_atom').on('change', checkAtom);
}







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
