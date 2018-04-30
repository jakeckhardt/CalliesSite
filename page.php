<!-- Default Template - Flexible Content Components -->

<?php while (have_posts()) : the_post(); ?>

  <?php if( have_rows('flex_content') ): ?>
    <?php  while ( have_rows('flex_content') ) : the_row(); ?>

      <h1>what</h1>

      <?php endif; ?>
    <?php endwhile; ?>

  <?php else:?>
    <?php the_content(); ?>
  <?php endif;?>
<?php endwhile; ?>
