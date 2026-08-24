/*
ready
disableVerticalSwipes
requestFullscreen
*/



//// +FUNCTIONS

async function fetchUserProfile(_initData, _botName){
	errlog(`${_botName} initData: ${decodeURIComponent(JSON.stringify(tg.initData))}`);


	let response;
	try{
		response = await fetch('https://minibot-authgate.nikolayr.workers.dev/', {
			headers: {
				'X-Telegram-Init-Data': _initData
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


//fetchUserProfile(tg.initData, botBound);

const ii = 'query_id=AAG9Xk4VAAAAAL1eThVIvCkC&user={"id":357457597,"first_name":"Nikolaу","last_name":"Ragozin","username":"ki_privet","language_code":"en","allows_write_to_pm":true,"photo_url":"https:\/\/t.me\/i\/userpic\/320\/ILa5pGzjRz1i8JntV2VFW9fnS0CmE7VyTRWdBlZWDUE.svg"}&auth_date=1787530134&signature=fKWIMzkX-4A3tZl6Zau7P8wL3vBGwpD3SQ-dKjh0Q0M7Z19hd1ShYS6zkRPz3eoonNmD6tyynrR-6OCbSFY5Aw&hash=1e9eb971b74a25169c3761256a1bc56b67135045aa8483afa8c575631551ff6f';
fetchUserProfile(ii, botBound);

//Telegram.WebApp.sendData([rgb0.r, rgb1.r, rgb0.g, rgb1.g, rgb0.b, rgb1.b].join(',')); 
