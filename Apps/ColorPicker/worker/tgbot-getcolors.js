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
console.log('dddd: ', msg.web_app_data);

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
  console.log('x1');

  let data = msg.web_app_data.data.split(',');
  console.log('x2', data);
  const c1 = `rgb(${data[0]},${data[2]},${data[4]})`;
  const c2 = `rgb(${data[1]},${data[3]},${data[5]})`;

  console.log('x3', c1, c2);

  const newUrl =
    `https://nikolayrag.github.io/MiniBots/Apps/ColorPicker/webapp/?c1=${encodeURIComponent(c1)}&c2=${encodeURIComponent(c2)}`;

  console.log('url: ', newUrl);


  return tg(
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
}
