

const tg = window.Telegram?.WebApp;

if (!tg) {
	throw new Error('Telegram WebApp API is unavailable');
}

tg.ready();




if (typeof tg.requestFullscreen === 'function') {
	try {
		tg.requestFullscreen();
	} catch(e) {
		testcontent.innerHTML += `<br><br>${e}`;
	}
}

