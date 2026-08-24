## BOTS/APPS LIST

	Bots/Apps List
		@locker_minibot (Profile and Payments)
		@colors_minibot
			colorpicker
			sticker
		@live_minibot
			timer
			tasks
			urlmonitor
		@letters_minibot
			QR
		@numbers_minibot
			dice


## WEBAPP AUTHENTICATION ##

	WebApp request flow
		WebApp
		AuthGate Worker
		Endpoints Workers
			Profile Worker
			BotX Worker
			AppN Worker


AuthGate Worker is the only gateway server for all WebApps requests.

AuthGate Worker handles all Minibots Tokens for Webapp authentication.

	AuthGate Worker
		validate WebApp request
			? Sign passing requests
		Request Profile/Bot/App Worker for action/data


	Profile Worker / TG Webhook
		Handle user profile
		Handle payment and tier



## ENVIRONMENT #

	###### BOT_TOKEN
.....

###### TG_URL  
* https://api.telegram.org/bot

###### WEBAPP_URL  

* https://nikolayrag.github.io/MiniBots/Apps/ColorPicker/webapp/app_colorpicker.html


## Worker

```Auth worker is at Profile_minibot site, serving all related Bots and Apps access.```

* Colors_minibot auth
	* https://minibots-auth.nikolayr.workers.dev

* Colors_minibot worker
	* https://minibots-colorpickers.nikolayr.workers.dev/

```
Set Webhook:

	https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=<Worker>

```



## todo
// -todo 3 (manage) +0: move colorpicker app to @colors_minibot  
// -todo 4 (ux, colorpicker) +0: return basic colors to bot from colorpicker  
// -todo 5 (ux, colorpicker, manage) +0: make return harmonic palette as an experemental feature (extended candidate /testers should have pro reward/)  
// =todo 6 (profile) +0: bind pro state to extended features  
//  todo 7 (promote) +0: spam minipots
