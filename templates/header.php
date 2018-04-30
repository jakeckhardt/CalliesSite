<div class="header">

  <div id="burger">
    <span class="stacked"></span>
    <span class="stacked"></span>
    <span class="stacked"></span>
  </div>

  <div id="logo">
  <?php
  if ( function_exists( 'the_custom_logo' ) ) {
      the_custom_logo();
  }
  ?>
  </div>

  <div class="nav hidden">
  <?php

  $args = array(
    'theme_location' => 'primary'
  );

  ?>

  <?php wp_nav_menu( $args ); ?>
  </div>
</div>
