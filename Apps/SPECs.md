## BOTS/APPS LIST

	Bots/Apps List
		-
			--authGate

		@locker_minibot (Profile and Payments)
			--locker
			* --list
			owner_app
			admin_app
		Visual, @colors_minibot
			--colors
			* --list
			picker_app
			sticker_app
		Action, @live_minibot
			--live
			* --list
			timer_app
			tasks_app
			urlmonitor_app
		Logic, @letters_minibot
			--letters
			* --list
			QR_app
		@numbers_minibot
			* --numbers
			* --list
			dice_app


--
--authGate is a standalone gate to verify WebApps request to deal with TG and data. It provide tier plan to Webapp.

--
--list displays all tools grouped by collection and allow navigation to any.
It is the same WebApp used at Main and Menu for every ~minibot. 


	List Structure
		Group 1
			Tool 1a, ...
		Group 2
			...
		...

Group name is used to initial navigation.

	
	 List application
		Name
			minibots_list
		Direct Link
			https://t.me/Locker_minibot/minibots_list
		Description
			~minibots service app
		WebApp URL,
		@Locker_minibot Mini App URL,
		@Locker_minibot Menu Button URL
			https://nikolayrag.github.io/MiniBots/Apps/--list/webapp/app_list.html?mode=compact
		@*_minibot Mini App URL,
		@*_minibot Menu Button URL
			https://nikolayrag.github.io/MiniBots/Apps/--list/webapp/app_list.html?mode=compact&group=*
		Mini App mode
			Compact
		Menu button title
			~list

--
--locker, --colors, ... - are Bot's webhook workers to serve TG.


## PLANS ##

Owner state is defined by level.
Level is normaly set by payment, that is handled by --locker. Level can be moderated in addition.

Other function of --locker is to provide User Profile with Tier State to --authGate request. 


	Authentication
		WebApp
		AuthGate
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

As needed:

--
BOT_TOKEN
* .....

--
TG_URL  
* https://api.telegram.org/bot

--
* https://nikolayrag.github.io/MiniBots/Apps/ColorPicker/webapp/app_colorpicker.html


--
Workers

Sysem
	https://minibot-authgate.nikolayr.workers.dev/
	https://minibot-locker.nikolayr.workers.dev/
	https://minibots-colorpickers.nikolayr.workers.dev/

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
