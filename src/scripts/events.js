import { elements } from './elements';
import animateScrollTo from 'animated-scroll-to';

const scrollTo = (el) => {
	const options = {
		speed: el ? 1000 : 500,
		verticalOffset: el ? -20 : 0,
	}
	animateScrollTo(el ? el : 0, options);
}

const clickHandlers = (e) => {
	const target = e.target;
	if (elements.scrollUp === target) scrollTo();
	if (elements.four === target) scrollTo(elements.firstSection);
}

const setEventHandlers = () => {
	document.addEventListener('click', clickHandlers);
}

export { setEventHandlers }
