import anime from 'animejs/lib/anime.es.js';
import scrollTriggers from 'scroll-triggers';

import { elements } from './elements';

const initScrollTriggers = () => {

	anime.set([elements.enterAnimate, elements.enterFade, elements.enterCardGroup, elements.enterCard], {
		opacity: 0
	});

	elements.enterSocial.forEach((group) => {
		anime.set(group.querySelectorAll('.social-icon'), {
			opacity: 0,
			translateY: '1rem'
		});
	});

	elements.enterAnimate.forEach(item => {
		item.innerHTML = item.textContent.replace(/\S/g, '<span class=\'inline-block\'>$&</span>');
	});

	scrollTriggers([
		{
			el: elements.enterAnimate,
			offset: 250,
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
					}, '-=250');
					el.classList.add('entered');
				}
			}
		},
		{
			el: elements.enterFade,
			offset: 250,
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
			offset: 250,
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
			offset: 250,
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
		},
		{
			el: elements.enterCard,
			offset: 300,
			inView: (el, options) => {
				if (!el.classList.contains('entered')) {
					anime({
						targets: el,
						opacity: [0, 1],
						scale: ['1.0125', 1],
						duration: 1500
					});
					el.classList.add('entered');
				}
			}
		},
		{
			el: elements.enterSocial,
			offset: 100,
			inView: (el, options) => {
				if (!el.classList.contains('entered')) {
					anime({
						targets: el.querySelectorAll('.social-icon'),
						easing: 'easeInOutQuart',
						opacity: [0, 1],
						translateY: ['1rem', 0],
						duration: 500,
						delay: (el, i) => 70 * i
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

  // anime.js v3 doesn't reliably recognize CSS custom properties (e.g.
	// `--reveal`) as an animatable DOM target, so instead we tween a plain
	// number and push it into the custom property ourselves on each frame.
	const twoReveal = { percent: 100 };

	// "Hi!" no longer gets shoved left as a side effect of #intro-two-wrap
	// growing (that box is full-width and stable from frame one now, so
	// centering never recalculates). To keep the same slide-into-place look,
	// start "Hi!" shifted right by half of the wrap's width — so it reads as
	// centered on its own — then animate that offset back to 0 in step with
	// the reveal. The wrap gets the exact same translateX applied to it, so
	// it moves in lockstep with "Hi!" instead of clip-revealing in its fixed
	// final position — otherwise the reveal starts directly underneath
	// wherever "Hi!" still is, and the two overlap.
	const halfWrapWidth = elements.twoWrap.clientWidth / 2;

	anime.set([elements.avatar, elements.one, elements.two, elements.three, elements.four], {
		opacity: 0,
	});
	anime.set([elements.one, elements.twoWrap], {
		translateX: halfWrapWidth,
	});
	elements.twoWrap.style.setProperty('--reveal', `${twoReveal.percent}%`);
	elements.heroWrap.classList.remove('opacity-0');

	tl
		.add({
			targets: elements.avatar,
			opacity: [0, 1],
			duration: 1000,
			delay: 500
		})
		.add({
			targets: elements.avatar.querySelector('.avatar-main').querySelectorAll('.row div'),
			scale: {
				value: [0, 1],
				easing: 'easeOutSine',
				duration: 100
			},
			delay: anime.stagger(30, {grid: [19, 30], from: 'center'})
		}, '-=750')
		.add({
			targets: elements.one,
			opacity: 1,
			duration: 500
		}, '-=750')
		.add({
			targets: elements.one.querySelectorAll('span'),
			scale: ['0.5', 1],
			opacity: [0, 1],
			translateZ: 0,
			duration: 500,
			delay: (el, i) => 70 * i,
			endDelay: 500,
			complete: () => initScrollTriggers()
		}, '-=750')
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
			duration: 750,
			delay: (el, i) => 70 * i
		})
		.add({
			targets: twoReveal,
			percent: 0,
			duration: 1000,
			update: () => {
				elements.twoWrap.style.setProperty('--reveal', `${twoReveal.percent}%`);
			}
		}, '-=1000')
		.add({
			targets: [elements.one, elements.twoWrap],
			translateX: 0,
			duration: 1000,
		}, '-=1000')
		.add({
			targets: elements.three,
			opacity: 1,
			duration: 2000
		}, '+=250')
		.add({
			targets: elements.four,
			opacity: 1,
			duration: 2000
		}, '-=2000')
		.add({
			targets: elements.chevron,
			translateY: '0.5rem',
			easing: 'easeInQuart',
			duration: 750
		})
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
