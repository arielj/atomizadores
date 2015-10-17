<?php require_once('common.php');
if (is_ie("5")) {
  require('inicio.php');
  exit;
}
require('head.php')
?>
<body>
<?php if (is_ie("567")){ ?>
<div id='iewarning'>
  Tu navegador no está actualizado,<br />
  para una mejor visualización se recomienda:
  <a href='http://www.opera.com'>Opera</a>
  <a href='http://www.firefox.com'>Mozilla Firefox</a>
  <a href='http://www.google.com/chrome?hl=es'>Google Chrome</a>
</div>
<?php } ?>
<div id='todo'>
  <div id='intro'>
    <span id='loader'>Cargando...<span id='cargado'>0</span>%</span>
    <img id='fondopre' src='./img/fondopre.jpeg' alt='fondo' onload="update_loader();"/>
    <img id='pres1' src='./img/pres1.jpeg' alt='fondo' onload="update_loader();"/>
    <img id='pres2' src='./img/pres2.jpeg' alt='fondo' onload="update_loader();"/>
    <img id='pres3' src='./img/pres3.jpeg' alt='fondo' onload="update_loader();"/>
    <div>
      <div id='pres4'>
        <img src='./img/semat.gif' alt='semat' />
        <img src='./img/tecmoliq.gif' alt='tecmoliq' />
      </div>
      <div id='pres5'>
        <img src='./img/atomizadores.gif' />
      </div>
      <div id='pres6'>
        <a href='./inicio.php'>ENTRAR</a>
      </div>
    </div>
  </div>
  <div id='skip'>
    <a href='./inicio.php'>SALTAR INTRO</a>
  </div>
  <div id='copyright'><a href="http://www.aurynweb.com.ar">Auryn Diseño</a> / <a href="http://www.arieljuod.com.ar">Ariel Juodziukynas</a></div>
</div>
</body>
</html>
