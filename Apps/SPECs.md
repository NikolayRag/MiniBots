## BOTS/APPS LIST

	Bots/Apps List
		-
			__authGate

		@locker_minibot (Profile and Payments)
			__locker
			* __list
			owner_app
			admin_app
		@colors_minibot
			__colors
			* __list
			picker_app
			sticker_app
		@live_minibot
			__live
			* __list
			timer_app
			tasks_app
			urlmonitor_app
		@letters_minibot
			__letters
			* __list
			QR_app
		@numbers_minibot
			* __numbers
			* __list
			dice_app


--
`__authGate` is a standalone gate to verify WebApps request to deal with TG and data.

--
`__list` is the same WebApp used at Main and Menu for every ~minibot. 
It displays all tools grouped by collection and allow navigation to any.

	List Structure
		Group 1
			Tool 1a, ...
		Group 2
			...
		...

Group name is used to navigate to at opening.

--
`__locker, __colors, ...` are Bot's webhook workers to serve TG.


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
