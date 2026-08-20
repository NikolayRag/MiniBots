/*
ready
disableVerticalSwipes
requestFullscreen
*/



//// +FUNCTIONS

function fetchUserProfile(_initData){
  const response = fetch('https://profile-minibot.nikolayr.workers.dev/', {
    headers: {
      'X-Telegram-Init-Data': _initData
    }
  });
  if (response)
  	return response.json();
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


errlog(`initData: ${JSON.stringify(tg.initData)}`);
let cUser;
try{
	cUser = fetchUserProfile(tg.initData);
} catch(e){
	errlog(`Fetch Error: ${e}`);
}

errlog(`cUser: ${JSON.stringify(cUser)}`);


//Telegram.WebApp.sendData([rgb0.r, rgb1.r, rgb0.g, rgb1.g, rgb0.b, rgb1.b].join(',')); 
