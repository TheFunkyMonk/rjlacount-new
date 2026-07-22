import { initAnimations } from './animations';
import { setElements } from './elements';
import { setEventHandlers } from './events';

if (document.querySelector('#hero-wrap')) {
	// The hero animation measures the rendered width of "I'm R.J." (via
	// clientWidth) to animate its wrapper open. If Montserrat hasn't finished
	// loading yet, that measurement uses fallback-font metrics, and the text
	// overflows the (too-narrow) wrapper once the real font swaps in.
	document.fonts.ready.then(() => {
		setElements();
		setEventHandlers();
		initAnimations();
	});
}
