const initDarkMode = () => {
	const checkDarkMode = () => {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			return true;
		}
		return false;
	}

	if (checkDarkMode()) {
		document.documentElement.classList.add('mode-dark');
	} else {
		document.documentElement.classList.remove('mode-dark');
	}
}

export { initDarkMode }
