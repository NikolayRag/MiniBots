/*
ready
disableVerticalSwipes
requestFullscreen
*/



//// +FUNCTIONS


async function fetchUserProfile(_initData){
  const response = await fetch('https://profile-minibot.nikolayr.workers.dev/', {
    headers: {
      'X-Telegram-Init-Data': _initData
    }
  });

  return await response.json();
}

function errlog(e){
	if (typeof logContainer != 'undefined')
		logContainer.innerHTML += e;
}






const tg = window.Telegram?.WebApp;
if (!tg)
	throw new Error('Telegram WebApp API is unavailable');

tg.ready();


if (typeof tg.disableVerticalSwipes === 'function')
	try {
		tg.disableVerticalSwipes();
		errlog(`<br><br>disableVerticalSwipes`);
	} catch(e) {
		errlog(`${e}`);
	}



if (typeof tg.requestFullscreen === 'function')
	try {
		tg.requestFullscreen();
		errlog(`<br><br>requestFullscreen`);
	} catch(e) {
		errlog(`${e}`);
	}




cUser = await fetchUserProfile(tg.initData);
alert(JSON.stringify(cUser));


//Telegram.WebApp.sendData([rgb0.r, rgb1.r, rgb0.g, rgb1.g, rgb0.b, rgb1.b].join(',')); 
