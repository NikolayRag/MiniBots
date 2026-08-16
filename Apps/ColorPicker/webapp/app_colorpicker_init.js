/*
ready
disableVerticalSwipes
requestFullscreen
*/

function errlog(e){
	if (logContainer)
		logContainer.innerHTML += e;
}



const tg = window.Telegram?.WebApp;

if (!tg) {
	throw new Error('Telegram WebApp API is unavailable');
}

tg.ready();



if (typeof tg.disableVerticalSwipes === 'function') {
	try {
		tg.disableVerticalSwipes();
		errlog(`<br><br>disableVerticalSwipes`);
	} catch(e) {
		errlog(`${e}`);
	}
}



if (typeof tg.requestFullscreen === 'function') {
	try {
		tg.requestFullscreen();
		errlog(`<br><br>requestFullscreen`);
	} catch(e) {
		errlog(`${e}`);
	}
}

