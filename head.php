<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php require_once('common.php'); ?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head profile="http://www.w3.org/2005/10/profile">
  <title>Atomizadores Argentinos - <?php echo $title ?></title>
  <link rel="stylesheet" type="text/css" href="estilo.css" />
  <!--[if lt IE 9 ]> <link rel='stylesheet' type='text/css' href='ie.css' /> <![endif]-->
  <link rel="shortcut icon" href="./img/favicon.ico" />
  <link  href="http://fonts.googleapis.com/css?family=Ubuntu:300,300italic,regular,italic,500,500italic,bold,bolditalic&v1" rel="stylesheet" type="text/css" >
  <?php if (!is_ie("5")) { ?>
    <!--<script type='text/javascript' src="./scripts/jquery.js"></script>-->
    <script type='text/javascript' src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
    <script type="text/javascript" src="./scripts/scripts.js"></script>
    <?php if (isset($scripts)) { ?>
      <script type="text/javascript" src="<?php echo $scripts; ?>"></script>
  <?php  }
  }
  ?>
	<meta name="description" content="Empresa dedicada a la producción de Atomizadores Rotativos para la agroindustria" />
	<meta name="keywords" content="tecmoliq, semat, picos, atomizadores, transland, argentinos, daniel, juodziukynas, murillo, bombas, picos, t-jet" />
	<meta name="author" content="Ariel Juodziukynas" />
  <meta http-equiv="Content-type" content="text/html;charset=utf-8" />
</head>
