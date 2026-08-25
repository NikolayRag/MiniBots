// -todo 8 (worker, template, web_app) +0: make standalone app capable of sending message to bot (requestWriteAccess)

import { encodePNG } from "./minipng.js";

//a and b colors: [r,g,b]
function gradient(w, h, a, b) {
  const rgba = new Uint8Array(w * h * 4);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const t = x / (w - 1);
      const i = (y * w + x) * 4;

      rgba[i]     = a[0] + (b[0] - a[0]) * t;
      rgba[i + 1] = a[1] + (b[1] - a[1]) * t;
      rgba[i + 2] = a[2] + (b[2] - a[2]) * t;
      rgba[i + 3] = 255;
    }
  }

  return encodePNG(w, h, rgba);
}

function hex(s) {
  return [
    parseInt(s.slice(1, 3), 16),
    parseInt(s.slice(3, 5), 16),
    parseInt(s.slice(5, 7), 16)
  ];
}

//gradient(w, h, hex(c1), hex(c1));




const TG = "https://api.telegram.org/bot";

export default {
  async fetch(request, env) {

    if (request.method !== "POST") {
      return new Response("OK");
    }

    const update = await request.json();

    if (update.message) {
      await handleMessage(update.message, env);
    }

    return new Response("OK");
  }
};



async function tg(method, token, data) {

  const res = await fetch(
    `${TG}${token}/${method}`,
    {
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(data)
    }
  );

  return await res.json();
}



async function handleMessage(msg, env){

  const token = env.BOT_TOKEN;


  if(msg.text === "/start"){

    const chatId = msg.chat.id;


    const c1="#ff0000";
    const c2="#0000ff";


    await sendColorMessage(
      chatId,
      token,
      c1,
      c2
    );
  }


  if(msg.web_app_data){

    await handleWebAppData(
      msg,
      env
    );
  }
}





async function sendColorMessage(
  chatId,
  token,
  c1,
  c2
){

  const url =
    `https://nikolayrag.github.io/MiniBots/Apps/ColorPicker/webapp/?c1=${encodeURIComponent(c1)}&c2=${encodeURIComponent(c2)}`;


  return tg(
    "sendMessage",
    token,
    {
      chat_id:chatId,
      text:
      `Выберите цвета:\n\n${c1}\n${c2}`,

      reply_markup:{
        keyboard:[
          [
            {
              text:"🎨 Изменить цвета",
              web_app:{
                url
              }
            }
          ]
        ]
      }
    }
  );
}





async function handleWebAppData(msg,env){
console.log('Web: ', msg.web_app_data);

  const token=env.BOT_TOKEN;

  const chatId=msg.chat.id;

/*
  let data;

  try{
    data=JSON.parse(
      msg.web_app_data.data
    );
  }
  catch(e){
    return;
  }

  const c1=data.c1;
  const c2=data.c2;


  state.c1=c1;
  state.c2=c2;
*/

  /*
      Обновляем кнопку
  */

  let data = msg.web_app_data.data.split(',');
  const c1 = `rgb(${data[0]},${data[2]},${data[4]})`;
  const c2 = `rgb(${data[1]},${data[3]},${data[5]})`;

  const newUrl =
    `https://nikolayrag.github.io/MiniBots/Apps/ColorPicker/webapp/?c1=${encodeURIComponent(c1)}&c2=${encodeURIComponent(c2)}`;

  console.log('url: ', newUrl);


  await tg(
//      "editMessageReplyMarkup",
      "sendMessage",
      token,
      {
        chat_id:chatId,

//        message_id:msg.message_id,
        text:
        `Выберите цвета:\n\n${c1}\n${c2}`,

        reply_markup:{
          keyboard:[
            [
              {
                text:"🎨 Изменить цвета на",
                web_app:{
                  url:newUrl
                }
              }
            ]
          ]
        }
      }
    );


  /*
      Градиентом
  */




    const png = gradient(
    512,
    128,
    [data[0]|0, data[2]|0, data[4]|0],
    [data[1]|0, data[3]|0, data[5]|0]
//    hex('#1469ab'),
//    hex('#eb4816')
  );

  await sendGradient(chatId, png, env);
}




function sendGradient(
 chatId,
 png,
 env
){
 const form=new FormData();
 form.append("chat_id", chatId);

 form.append(
   "photo",
   new Blob([png], {type:"image/png"}),
   "gradient.png"
 );

 const token=env.BOT_TOKEN;
 return fetch(
   `${TG}${token}/sendPhoto`,
   {
     method:"POST",
     body:form
   }
 ).then(r=>r.json());

}
