<?php
/**
 * Template Name: Custom Template
 */
?>

<?php while (have_posts()) : the_post(); ?>

  <?php if( have_rows('flex_content') ): ?>
    <?php  while ( have_rows('flex_content') ) : the_row(); ?>

    <?php if( get_row_layout() == 'home_text_columns' ): ?>
        <?php get_template_part('templates/modules/hometext'); ?>

	    <?php elseif( get_row_layout() == 'image' ): ?>
	      <?php get_template_part('templates/modules/image'); ?>

      <?php elseif( get_row_layout() == 'home_hero' ): ?>
        <?php get_template_part('templates/modules/homehero'); ?>

      <?php elseif( get_row_layout() == 'home_featured_photos' ): ?>
        <?php get_template_part('templates/modules/featured-photos'); ?>

      <?php elseif( get_row_layout() == 'contact' ): ?>
        <?php get_template_part('templates/modules/contact'); ?>

      <?php else: ?>
        <?php the_content(); ?>

      <?php endif; ?>
    <?php endwhile; ?>

  <?php else:?>
    <?php the_content(); ?>
  <?php endif;?>
<?php endwhile; ?>
