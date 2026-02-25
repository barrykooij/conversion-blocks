/**
 * Accordion Frontend JavaScript
 * Adds enhanced accessibility and smooth animations
 */

document.addEventListener('DOMContentLoaded', function() {
	const accordions = document.querySelectorAll('.conversion-blocks-accordion');

	accordions.forEach(function(accordion) {
		const closeOthers = accordion.dataset.closeOthers === 'true';
		const items = accordion.querySelectorAll('.conversion-blocks-accordion-item');

		items.forEach(function(item) {
			const summary = item.querySelector('.conversion-blocks-accordion-header');

			if (summary) {
				summary.addEventListener('click', function() {
					// Close other items if enabled
					if (closeOthers) {
						items.forEach(function(otherItem) {
							if (otherItem !== item && otherItem.hasAttribute('open')) {
								otherItem.removeAttribute('open');
							}
						});
					}

					// Smooth scroll to item if needed
					const rect = item.getBoundingClientRect();
					if (rect.top < 0) {
						item.scrollIntoView({ behavior: 'smooth', block: 'start' });
					}
				});
			}
		});
	});
});
