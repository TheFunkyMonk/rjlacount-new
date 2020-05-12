const elements = {};

const setElements = () => {
	elements.enterAnimate = document.querySelectorAll('.enter-animate');
	elements.enterFade = document.querySelectorAll('.enter-fade');
	elements.enterCardGroup = document.querySelectorAll('.enter-card-group');
	elements.enterCard = document.querySelectorAll('.enter-card');
	elements.enterSocial = document.querySelectorAll('.enter-social');
	elements.firstSection = document.querySelector('#section-one');
	elements.heroWrap = document.querySelector('#hero-wrap');
	elements.zero = document.querySelector('#intro-zero');
	elements.one = document.querySelector('#intro-one');
	elements.two = document.querySelector('#intro-two');
	elements.three = document.querySelector('#intro-three');
	elements.four = document.querySelector('#intro-four');
	elements.chevron = elements.four.querySelector('svg');
	elements.scrollUp = document.querySelector('#scroll-up')
};

export { setElements, elements }
