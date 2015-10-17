<?php $title = 'Galeria';
      require("header.php"); ?>
    <h1>GALERIA</h1>
    <div id='galeria'>
      <?php $cantidad = 19;
            $actual = 0;
      ?>
        <div id="galimgdiv">
          <img id='img1' class="galimg" src="./img/fotos/t/<?php echo $actual ?>_t.jpg" alt="img0" />
          <img id='img2' class="galimg" src="./img/fotos/t/<?php echo $actual+1 ?>_t.jpg" alt="img1" />
          <img id='img3' class="galimg" src="./img/fotos/t/<?php echo $actual+2 ?>_t.jpg" alt="img2" />
        </div>
        <div class='hidden'>
          <img id="a1" src="./img/fotos/t/<?php echo $actual+3 ?>_t.jpg" alt="a1" />
          <img id="a2" src="./img/fotos/t/<?php echo $actual+4 ?>_t.jpg" alt="a2" />
          <img id="a3" src="./img/fotos/t/<?php echo $actual+5 ?>_t.jpg" alt="a3" />
        </div>
        <div style="clear:both"></div>
        <br />
        <div class="flecha">
          <img id="atras" class="flecha" src="./img/anterior.gif" alt="atras" />
        </div>
        <div class="flecha">
          <img id="adelante" class="flecha" src="./img/siguiente.gif" alt="adelante" />
        </div>
    </div>
<?php require("footer.php"); ?>
