<footer class="footerNav">
  <div id="footerItems">
    <div id="footer-logo">
      <?php

      if(is_active_sidebar('footer-logo')){
      dynamic_sidebar('footer-logo');
      }

      ?>

    </div>
    
  <?php

  $args = array(
    'theme_location' => 'footer'
  );

  ?>

  <?php wp_nav_menu( $args ); ?>

  <?php

  if(is_active_sidebar('footer-social-media')){
  dynamic_sidebar('footer-social-media');
  }

  if(is_active_sidebar('footer-contact-info')){
  dynamic_sidebar('footer-contact-info');
  }

  ?>

  </div>

  <p>©2018 Callie's Website</p>
</footer>
