<?php $count = count(get_sub_field('columns')); ?>

<div class="textWrapper">

<?php if( have_rows('columns') ): ?>

    <?php while( have_rows('columns') ): the_row(); ?>

				<?php if($count == 1): ?>

	        <div class="singleText">
						<p>
							<?php the_sub_field('text'); ?>
						</p>
					</div>

				<?php elseif($count == 2 ): ?>

					<div class="doubleText">
						<p>
							<?php the_sub_field('text'); ?>
						</p>
					</div>

				<?php endif; ?>

    <?php endwhile; ?>

<?php endif; ?>

<?php if( have_rows('images') ): ?>

    <div class="textImage">

    <?php while( have_rows('images') ): the_row(); ?>

					<img src="<?php the_sub_field('image'); ?>" />

    <?php endwhile; ?>
    </div>

<?php endif; ?>

</div>
