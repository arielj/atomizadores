<?php $title = 'Productos';
      require("header.php"); ?>
    <h1>PRODUCTOS</h1>
    <div id='productos'>
      <div id='listado'>
        <table cellspacing="30px">
          <tr><td><a href="productos.php?ver=a50">modelo<br /><span class="grande">A-50</span></a></td></tr>
          <tr><td><a href="productos.php?ver=a90">modelo<br /><span class="grande">A-90</span></a></td></tr>
          <tr><td><a href="productos.php?ver=vru"><span class="grande">VRU</span></a></td></tr>
        </table>
      </div>
      <div id='producto'>
        <?php $ver = $_GET['ver'];
          if ($ver == 'a50') {
            include('a50.php');
          } else if ($ver == 'a90'){
            include('a90.php');
          } else if ($ver == 'vru') {
            include('vru.php');
          } else {
            include('a50.php');
          }
        ?>
      </div>
    </div>
<?php require('footer.php'); ?>
