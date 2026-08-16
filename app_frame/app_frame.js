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

