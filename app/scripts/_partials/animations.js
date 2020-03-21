import anime from 'animejs/lib/anime.es.js';
import scrollTriggers from 'scroll-triggers';

const initScrollTriggers = () => {
	const enterAnimate = document.querySelectorAll('.enter-animate');
	const enterFade = document.querySelectorAll('.enter-fade');

	[enterAnimate, enterFade].forEach((el) => {
		anime({
			targets: el,
			opacity: 0
		});
	});

	enterAnimate.forEach(item => {
		item.innerHTML = item.textContent.replace(/\S/g, '<span class=\'inline-block\'>$&</span>');
	});

	scrollTriggers([
		{
			el: enterAnimate,
			inView: (el, options) => {
				if (!el.classList.contains('entered')) {
					anime({
						targets: el,
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
			inView: (el, options) => {
				if (!el.classList.contains('entered')) {
					anime({
						targets: el,
						easing: 'easeInOutQuart',
						opacity: 1,
						duration: 500
					});
					el.classList.add('entered');
				}
			}
		}
	]);
}

const initHeroAnimation = () => {
	const one = document.querySelector('#intro-one');
	const two = document.querySelector('#intro-two');
	const three = document.querySelector('#intro-three');
	const four = document.querySelector('#intro-four');

	[one, two, three].forEach(item => {
		item.innerHTML = item.textContent.replace(/\S/g, '<span class=\'inline-block\'>$&</span>');
	});

	const tl = anime.timeline({
		easing: 'easeInOutQuart'
	});

	tl
		.add({
			targets: [one, two, three, four],
			opacity: 0,
			duration: 0
		})
		.add({
			targets: [one],
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
			targets: [two],
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
			targets: [three],
			opacity: 1,
			duration: 0
		})
		.add({
			targets: three.querySelectorAll('span'),
			scale: ['0.5', 1],
			opacity: [0, 1],
			translateZ: 0,
			duration: 300,
			delay: (el, i) => 40 * i
		}, '+=500')
		.add({
			targets: [four],
			opacity: 1,
			duration: 1000
		}, '-=1000')
}

const initAnimations = () => {
	initHeroAnimation();
	initScrollTriggers();
}

export { initAnimations }
