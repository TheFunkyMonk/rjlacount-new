import domready from 'domready';
import anime from 'animejs/lib/anime.es.js';
import scrollTriggers from 'scroll-triggers';

const initScrollTriggers = () => {
	const enterAnimate = document.querySelectorAll('.enter-animate');
	const enterFade = document.querySelectorAll('.enter-fade');

	const firstSection = document.querySelector('#section-one');
	const four = document.querySelector('#intro-four');

	[enterAnimate, enterFade].forEach((el) => {
		anime.set(el, {
			opacity: 0
		});
	});

	enterAnimate.forEach(item => {
		item.innerHTML = item.textContent.replace(/\S/g, '<span class=\'inline-block\'>$&</span>');
	});

	scrollTriggers([
		{
			el: enterAnimate,
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
		}
	]);

	scrollTriggers([
		{
			el: enterFade,
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
		}
	]);

	scrollTriggers([
		{
			el: firstSection,
			inView: (el, options) => {
				anime({
					targets: four,
					easing: 'easeInOutQuart',
					opacity: 0,
					translateY: '-1rem',
					duration: 500
				});
			}
		}
	]);
}

const initHeroAnimation = () => {
	const one = document.querySelector('#intro-one');
	const two = document.querySelector('#intro-two');
	const three = document.querySelector('#intro-three');
	const four = document.querySelector('#intro-four');
	const chevron = four.querySelector('svg');

	[one, two, three].forEach(item => {
		item.innerHTML = item.textContent.replace(/\S/g, '<span class=\'inline-block\'>$&</span>');
	});

	const tl = anime.timeline({
		easing: 'easeInOutQuart'
	});

	anime.set([one, two, three, four], {
		opacity: 0,
	});

	tl
		.add({
			targets: one,
			opacity: 1,
			duration: 0
		})
		.add({
			targets: one.querySelectorAll('span'),
			scale: ['0.5', 1],
			opacity: [0, 1],
			translateZ: 0,
			duration: 500,
			delay: (el, i) => 70 * i
		})
		.add({
			targets: two,
			opacity: 1,
			duration: 0
		})
		.add({
			targets: two.querySelectorAll('span'),
			scale: ['0.5', 1],
			opacity: [0, 1],
			translateZ: 0,
			duration: 500,
			delay: (el, i) => 70 * i
		}, '+=500')
		.add({
			targets: [three, four],
			opacity: 1,
			duration: 1000
		}, '+=500')
		.add({
			targets: chevron,
			translateY: '0.5rem',
			easing: 'easeInQuart',
			duration: 750
		}, '+=500')
		.add({
			targets: chevron,
			translateY: 0,
			easing: 'easeOutQuart',
			duration: 750
		})
		.add({
			targets: chevron,
			translateY: '0.5rem',
			easing: 'easeInQuart',
			duration: 500
		}, '+=500')
		.add({
			targets: chevron,
			translateY: 0,
			easing: 'easeOutQuart',
			duration: 250
		})
		.add({
			targets: chevron,
			translateY: '0.5rem',
			easing: 'easeInQuart',
			duration: 250
		})
		.add({
			targets: chevron,
			translateY: 0,
			easing: 'easeOutQuart',
			duration: 500
		})
}

const initAnimations = () => {
	initHeroAnimation();
	domready(() => initScrollTriggers());
}

export { initAnimations }
