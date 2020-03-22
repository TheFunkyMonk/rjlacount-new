import anime from 'animejs/lib/anime.es.js';
import scrollTriggers from 'scroll-triggers';

import { elements } from './elements';

const initScrollTriggers = () => {
	anime.set([elements.enterAnimate, elements.enterFade, elements.enterCardGroup], {
		opacity: 0
	});

	elements.enterAnimate.forEach(item => {
		item.innerHTML = item.textContent.replace(/\S/g, '<span class=\'inline-block\'>$&</span>');
	});

	scrollTriggers([
		{
			el: elements.enterAnimate,
			offset: 150,
			inView: (el, options) => {
				if (!el.classList.contains('entered')) {
					anime.set(el, {
						opacity: 1
					});
					anime({
						targets: el.querySelectorAll('span'),
						easing: 'easeInOutQuart',
						scale: ['0.5', 1],
						opacity: [0, 1],
						translateZ: 0,
						duration: 500,
						delay: (el, i) => 70 * i
					});
					el.classList.add('entered');
				}
			}
		},
		{
			el: elements.enterFade,
			offset: 150,
			inView: (el, options) => {
				if (!el.classList.contains('entered')) {
					anime({
						targets: el,
						easing: 'easeInOutQuart',
						opacity: 1,
						duration: 1000
					});
					el.classList.add('entered');
				}
			}
		},
		{
			el: elements.firstSection,
			offset: 150,
			inView: (el, options) => {
				anime({
					targets: elements.four,
					easing: 'easeInOutQuart',
					opacity: 0,
					translateY: '-1rem',
					duration: 500
				});
				anime({
					targets: elements.scrollUp,
					easing: 'easeInOutQuart',
					opacity: 1,
					translateY: ['1rem', 0],
					duration: 500
				});
			},
			outOfView: (el, options) => {
				anime({
					targets: elements.four,
					easing: 'easeInOutQuart',
					opacity: 1,
					translateY: ['-1rem', 0],
					duration: 500
				});
				anime({
					targets: elements.scrollUp,
					easing: 'easeInOutQuart',
					opacity: 0,
					translateY: [0, '1rem'],
					duration: 500
				});
			}
		},
		{
			el: elements.enterCardGroup,
			offset: 150,
			inView: (el, options) => {
				if (!el.classList.contains('entered')) {
					anime({
						targets: el,
						opacity: 1,
						duration: 0,
					});
					anime({
						targets: el.querySelectorAll('.card'),
						opacity: [0, 1],
						translateY: ['1rem', 0],
						duration: 1000,
						delay: (el, i) => 140 * i,
					});
					el.classList.add('entered');
				}
			}
		}
	]);
}

const initHeroAnimation = () => {

	[elements.one, elements.two, elements.three].forEach(item => {
		item.innerHTML = item.textContent.replace(/\S/g, '<span class=\'inline-block\'>$&</span>');
	});

	const tl = anime.timeline({
		easing: 'easeInOutQuart'
	});

	anime.set([elements.one, elements.two, elements.three, elements.four], {
		opacity: 0,
	});

	tl
		.add({
			targets: elements.one,
			opacity: 1,
			duration: 500
		})
		.add({
			targets: elements.one.querySelectorAll('span'),
			scale: ['0.5', 1],
			opacity: [0, 1],
			translateZ: 0,
			duration: 500,
			delay: (el, i) => 70 * i,
			complete: () => initScrollTriggers()
		})
		.add({
			targets: elements.two,
			opacity: 1,
			duration: 0
		})
		.add({
			targets: elements.two.querySelectorAll('span'),
			scale: ['0.5', 1],
			opacity: [0, 1],
			translateZ: 0,
			duration: 500,
			delay: (el, i) => 70 * i
		}, '+=500')
		.add({
			targets: [elements.three, elements.four],
			opacity: 1,
			duration: 1000
		}, '+=500')
		.add({
			targets: elements.chevron,
			translateY: '0.5rem',
			easing: 'easeInQuart',
			duration: 750
		}, '+=500')
		.add({
			targets: elements.chevron,
			translateY: 0,
			easing: 'easeOutQuart',
			duration: 750
		})
		.add({
			targets: elements.chevron,
			translateY: '0.5rem',
			easing: 'easeInQuart',
			duration: 500
		}, '+=500')
		.add({
			targets: elements.chevron,
			translateY: 0,
			easing: 'easeOutQuart',
			duration: 250
		})
		.add({
			targets: elements.chevron,
			translateY: '0.5rem',
			easing: 'easeInQuart',
			duration: 250
		})
		.add({
			targets: elements.chevron,
			translateY: 0,
			easing: 'easeOutQuart',
			duration: 500
		})
}

const initAnimations = () => {
	initHeroAnimation();
}

export { initAnimations }
