<?php
function is_ie($version=''){
  if (isset($_SERVER['HTTP_USER_AGENT'])) {
    $agent = $_SERVER['HTTP_USER_AGENT'];
    foreach (str_split($version) as $version) {
      if (strpos($agent, 'MSIE '.$version) != false) return true;
    }
  }
  return false;
}
?>
