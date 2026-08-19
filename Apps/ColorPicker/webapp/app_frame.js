/*
ready
disableVerticalSwipes
requestFullscreen
*/


const tg = window.Telegram?.WebApp;

if (!tg) {
	throw new Error('Telegram WebApp API is unavailable');
}

tg.ready();


function errlog(e){
	if (typeof logContainer != 'undefined')
		logContainer.innerHTML += e;
}


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



var inDataA = location.hash.split('?')[0].substr(1).split(',');
console.log("test:", inDataA);
//Telegram.WebApp.sendData([rgb0.r, rgb1.r, rgb0.g, rgb1.g, rgb0.b, rgb1.b].join(',')); 
