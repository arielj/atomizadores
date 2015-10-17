<?php $title = 'Calculo de volumen';
      $scripts = '/scripts/stepper/jquery.stepper.min.js';
      require("header.php");
       ?>
    <link rel="stylesheet" type="text/css" href="/scripts/stepper/jquery.stepper.min.css" />
    <div id='calculo'>
      <h1>CALCULO DE VOLUMEN</h1>
      <div id='chorro'>
        <div id="divAncho" class="float">
          <span>Ancho (m)</span>
          <br />
          <input type="textfield" id="ancho" min='10' max='30' class='spinner' size="5" value="20" max='30' min='1' />
        </div>
        <div id="divVelocidad" class="float">
          <span>Velocidad (km/h)</span>
          <br />
          <input type="textfield" id="velocidad" min='80' max='300' class='spinner' size="5" value="80"/>
          <br />
          m/h <input type="checkbox" id="checkVelocidad">
        </div>
        <div id="divSuperficie" class="float">
          <span>Superficie (hect/minuto)</span><br />
          <input type="textfield" id="superficie" readonly='readonly' size="5" value="2.67"/>
        </div>
        <div style="clear:both"></div>
      </div>
      <div id='atomizadores'>
        <div id="divAtomizador6" class="float atomizador">
          <span>Atomizador 6</span><br />
          <input type="textfield" id="atomizador6" min='1' max='5' class='spinner' size="5" value="1" class="disabled" disabled='disabled' /><br />
          Deshabilitar <input type="checkbox" class='disable_atom' checked='checked'>
        </div>
        <div id="divAtomizador5" class="float atomizador">
          <span>Atomizador 5</span><br />
          <input type="textfield" id="atomizador5" min='1' max='5' class='spinner' size="5" value="1" class="disabled" disabled='disabled'/><br />
          Deshabilitar <input type="checkbox" class='disable_atom' checked='checked'>
        </div>
        <div id="divAtomizador4" class="float atomizador">
          <span>Atomizador 4</span><br />
          <input type="textfield" id="atomizador4" min='1' max='5' class='spinner' size="5" value="1"/><br />
          Deshabilitar <input type="checkbox" class='disable_atom'>
        </div>
        <div id="divAtomizador3" class="float atomizador">
          <span>Atomizador 3</span><br />
          <input type="textfield" id="atomizador3" min='1' max='5' class='spinner' size="5" value="1"/><br />
          Deshabilitar <input type="checkbox" class='disable_atom'>
        </div>
        <div id="divAtomizador2" class="float atomizador">
          <span>Atomizador 2</span><br />
          <input type="textfield" id="atomizador2" min='1' max='5' class='spinner' size="5" value="1"/><br />
          Deshabilitar <input type="checkbox" class='disable_atom'>
        </div>
        <div id="divAtomizador1" class="float atomizador">
          <span>Atomizador 1</span><br />
          <input type="textfield" id="atomizador1" min='1' max='5' class='spinner' size="5" value="1"/><br />
          Deshabilitar <input type="checkbox" class='disable_atom'>
        </div>
        <div style="clear:both"></div>
      </div>
      <div id="divPresion" class="float">
        <span>Presión</span><br />
        <input type="textfield" id="presion" min='20' max='60' step='10' class='spinner' size="5" value="20"/>
      </div>
      <div id="divCaudal" class="float">
        <span>Caudal (L/hect)</span><br />
        <input type="textfield" id="caudal" class='spinner' min='1' max='100' size="5" value="20"/>
      </div>
      <div id='divAtom' class='float'>
        <span>Modelo</span><br />
        <select>
          <option value='a-50'>A-50</option>
          <option value='a-90-1'>A-90</option>
          <option value='a-90-2'>A-90 con 2VRU</option>
        </select>
      </div>
      <div id='recalculate'>
        <a href='#'>Recalcular</a>
      </div>
    </div>
<?php require("footer.php"); ?>
