/*
ready
disableVerticalSwipes
requestFullscreen
*/




async function procceedAuthenticate(_initData, _botName){
	errlog(`"${_botName}" initData: ${decodeURIComponent(JSON.stringify(tg.initData))}`);

	let response;
	try{
		response = await fetch('https://minibot-authgate.nikolayr.workers.dev/', {
			headers: {
				'X-Telegram-Init-Data': _initData,
				'bound-to-bot': _botName
			}
		});
	} catch(e){
		errlog(`Fetch Error: ${e}`);
	}

	response && errlog(`Fetch: ${response.status}; ${await response.text()}`);
}

function errlog(e){
	if (typeof logContainer != 'undefined')
		logContainer.innerHTML += `<br><br>${e}`;
}



//// -FUNCTIONS



const tg = window.Telegram?.WebApp;
if (!tg)
	throw new Error('Telegram WebApp API is unavailable');

tg.ready();


if (typeof tg.disableVerticalSwipes === 'function')
	try {
		tg.disableVerticalSwipes();
		errlog(`disableVerticalSwipes`);
	} catch(e) {
		errlog(`${e}`);
	}



if (typeof tg.requestFullscreen === 'function')
	try {
		tg.requestFullscreen();
		errlog(`requestFullscreen`);
	} catch(e) {
		errlog(`${e}`);
	}


procceedAuthenticate(tg.initData, botBound);

