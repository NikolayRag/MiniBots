import telebot

BOT_TOKEN = '';
BOT_WEBAPP = ''

bot = telebot.TeleBot(BOT_TOKEN)

def webAppKeyboard(_add=''):
   keyboard = telebot.types.ReplyKeyboardMarkup(row_width=1)
   webAppTest = telebot.types.WebAppInfo(f"{BOT_WEBAPP}#{_add}")
   tgButton = telebot.types.KeyboardButton(text="Pick colors", web_app=webAppTest)
   keyboard.add(tgButton)

   return keyboard

   
@bot.message_handler(commands=['start'])
def start_fun(message):
   print("\nstart")

   rgb = '0,255,0,255,0,255'
   bot.send_message( message.chat.id, rgb, parse_mode="Markdown", reply_markup=webAppKeyboard(rgb))


@bot.message_handler(content_types="text")
def new_mes(message):
   print("\ntext",message)


@bot.message_handler(content_types="web_app_data")
def answer(message):
   print("\n", message.chat.id, message.web_app_data.data)
   rgb = message.web_app_data.data
   bot.send_message( message.chat.id, rgb, parse_mode="Markdown", reply_markup=webAppKeyboard(rgb))

print(1)
bot.infinity_polling()
