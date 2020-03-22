const elements = {};

const setElements = () => {
	elements.enterAnimate = document.querySelectorAll('.enter-animate');
	elements.enterFade = document.querySelectorAll('.enter-fade');
	elements.enterCardGroup = document.querySelectorAll('.enter-card-group');
	elements.firstSection = document.querySelector('#section-one');
	elements.one = document.querySelector('#intro-one');
	elements.two = document.querySelector('#intro-two');
	elements.three = document.querySelector('#intro-three');
	elements.four = document.querySelector('#intro-four');
	elements.chevron = elements.four.querySelector('svg');
	elements.scrollUp = document.querySelector('#scroll-up')
};

export { setElements, elements }
