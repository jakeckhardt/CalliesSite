<div class="row hero">
	<div class="hero-img">

		<?php while( have_rows('hero_images') ): the_row(); ?>

        <div
				style="background: linear-gradient( rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)),url('<?php the_sub_field('hero_image'); ?>') center/cover"
				>
				</div>

    <?php endwhile; ?>

	</div>
	<div id="hero-texts">
		<p><?php the_sub_field('hero_text'); ?></p>
	</div>
</div>
