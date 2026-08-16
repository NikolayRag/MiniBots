

const tg = window.Telegram?.WebApp;

if (!tg) {
	throw new Error('Telegram WebApp API is unavailable');
}

tg.ready();



if (typeof tg.disableVerticalSwipes === 'function') {
	try {
		tg.disableVerticalSwipes();
		testcontent.innerHTML += `<br><br>disableVerticalSwipes`;
	} catch(e) {
		testcontent.innerHTML += `${e}`;
	}
}



if (typeof tg.requestFullscreen === 'function') {
	try {
		tg.requestFullscreen();
		testcontent.innerHTML += `<br><br>requestFullscreen`;
	} catch(e) {
		testcontent.innerHTML += `${e}`;
	}
}

