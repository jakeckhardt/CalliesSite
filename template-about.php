<?php
/**
 * Template Name: About Template
 */
?>

<?php while (have_posts()) : the_post(); ?>
  <?php get_template_part('templates/page', 'header'); ?>
  <h1>This is the About page</h1>
<?php endwhile; ?>