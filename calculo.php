<?php $title = 'Calculo de volumen';
      $scripts = '/scripts/jquery.fs.stepper.min.js';
      require("header.php");
       ?>
    <link rel="stylesheet" type="text/css" href="/scripts/jquery.fs.stepper.css" />
    <style>
      #contenido {
		  background: url(/img/avion.png) 100% 250% no-repeat;
	  }
    </style>
    <div id='calculo'>
      <h1>CALCULO DE VOLUMEN</h1>
      <div id='dimensiones'>
        <div id="divAncho" class="float">
          <span>Ancho (m)</span>
          <br />
          <input type="number" id="width" min='10' max='30' class='spinner' size="5" value="20" max='30' min='1' />
        </div>
        <div id="divVelocidad" class="float">
          <span>Velocidad (km/h)</span>
          <br />
          <input type="number" id="speed" min='80' max='300' class='spinner' size="5" value="190"/>
          <br />
          m/h <input type="checkbox" id="checkVelocidad">
        </div>
        <div id="divSuperficie" class="float">
          <span>Superficie (hect/minuto)</span><br />
          <input type="textfield" id="surface" readonly='readonly' size="5" value="2.67"/>
        </div>
        <div style="clear:both"></div>
      </div>
      <div id='atomizadores'>
        <div id="divAtomizador6" class="float atomizador">
          <span>Atomizador 6</span><br />
          <input id="atomizador6" class='hole disabled' disabled='disabled' readonly='readonly' /><br />
          Deshabilitar <input type="checkbox" class='disable_atom' checked='checked'>
        </div>
        <div id="divAtomizador5" class="float atomizador">
          <span>Atomizador 5</span><br />
          <input id="atomizador5" class="hole disabled" disabled='disabled' readonly='readonly' /><br />
          Deshabilitar <input type="checkbox" class='disable_atom' checked='checked'>
        </div>
        <div id="divAtomizador4" class="float atomizador">
          <span>Atomizador 4</span><br />
          <input id="atomizador4" class="hole" readonly='readonly' /><br />
          Deshabilitar <input type="checkbox" class='disable_atom'>
        </div>
        <div id="divAtomizador3" class="float atomizador">
          <span>Atomizador 3</span><br />
          <input id="atomizador3" class="hole" readonly='readonly' /><br />
          Deshabilitar <input type="checkbox" class='disable_atom'>
        </div>
        <div id="divAtomizador2" class="float atomizador">
          <span>Atomizador 2</span><br />
          <input id="atomizador2" class="hole" readonly='readonly' /><br />
          Deshabilitar <input type="checkbox" class='disable_atom'>
        </div>
        <div id="divAtomizador1" class="float atomizador">
          <span>Atomizador 1</span><br />
          <input id="atomizador1" class="hole" readonly='readonly' /><br />
          Deshabilitar <input type="checkbox" class='disable_atom'>
        </div>
        <div style="clear:both"></div>
      </div>
      <div id="chorro">
  		  <div id="divPresion" class="float">
    			<span>Presión</span><br />
    			<input type="number" id="presure" min='20' max='60' step='10' size="5" value="40" />
  		  </div>
  		  <div id="divCaudal" class="float">
    			<span>Caudal (L/hect)</span><br />
    			<input type="number" id="caudal" min='1' max='100' size="5" value="0"/>
  		  </div>
  		  <div id='divAtom' class='float'>
    			<span>Modelo</span><br />
    			<select id='atom_type'>
    			  <option value='a-50'>A-50</option>
    			  <option value='a-90-1' selected='selected'>A-90</option>
    			  <option value='a-90-2'>A-90 con 2VRU</option>
    			</select>
  		  </div>
  		  <div id='input_error'>
  			  Los valores ingresados no permiten un cálculo posible.
  		  </div>
        <div id='hints'>
          * Cada atomizador habilitado representa el de ambas alas. Ej: 4 atomizadores son en total 8 sumando las dos.
          <br />
          * El orificio y presión calculados son aproximados, el ajuste final se debe hacer manualmente con el equipo en marcha.
        </div>
  	  </div>
    </div>
<?php require("footer.php"); ?>
