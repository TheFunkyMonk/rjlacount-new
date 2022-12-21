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

  anime.set([elements.avatar, elements.one, elements.two, elements.three, elements.four], {
		opacity: 0,
	});
	anime.set(elements.twoWrap, {
		width: 0,
	});
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
			targets: elements.twoWrap,
			width: elements.two.clientWidth + 'px',
			duration: 1000,
			complete: () => {
				window.addEventListener('resize', () => {
					if (elements.twoWrap.style.width) elements.twoWrap.style.width = null;
				});
			}
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
