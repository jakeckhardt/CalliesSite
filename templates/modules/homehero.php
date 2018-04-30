<div class="row hero">
	<div class="hero-img">

		<?php while( have_rows('hero_images') ): the_row(); ?>

        <div
				style="background: url('<?php the_sub_field('hero_image'); ?>') center/cover"
				>
				</div>

    <?php endwhile; ?>

	</div>
	<div id="hero-texts">
		<p><?php the_sub_field('hero_text'); ?></p>
	</div>
</div>
