<div id="featuredPhotos">
<?php if( have_rows('featured_items') ): ?>
  <h2>Featured Products</h2>
  <div id="items">
    <?php while( have_rows('featured_items') ): the_row(); ?>

        <div class="featuredPhoto">
          <a href="<?php the_sub_field('item_url'); ?>">
            <div class="itemInfo">
              <h3><?php the_sub_field('item_title'); ?></h3>
              <p>$<?php the_sub_field('item_price'); ?></p>
            </div>
            <img src="<?php the_sub_field('item_photo'); ?>" />
          </a>
				</div>

    <?php endwhile; ?>
  </div>
<?php endif; ?>
</div>