/*
Flow
	TG ready
	Init ui/ux
	Procceed with authentication

Init ui/ux
	disableVerticalSwipes
	requestFullscreen
*/



//// +FUNCTIONS

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

//Telegram.WebApp.sendData([rgb0.r, rgb1.r, rgb0.g, rgb1.g, rgb0.b, rgb1.b].join(',')); 
