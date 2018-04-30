<div id="contact">
  <div id="contactInfo">
  <?php if( have_rows('contact_info') ): ?>

    <?php while( have_rows('contact_info') ): the_row(); ?>

      <p><?php the_sub_field('info_lines'); ?></p>

    <?php endwhile; ?>
  </div>
  <div id="contactForm">
    <?php echo do_shortcode( get_sub_field('contact_shortcode') ); ?>
  </div>
  <?php endif; ?>
</div>
