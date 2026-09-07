-manage 3: +0 "Apps\SPECs.md" *ki 26/08/31 05:08:41
	move colorpicker app to @colors_minibot  

-ux, colorpicker 4: +0 "Apps\SPECs.md" *ki 26/08/31 05:08:46
	return basic colors to bot from colorpicker  

-ux, colorpicker, manage 5: +0 "Apps\SPECs.md" *ki 26/08/31 05:08:52
	make return harmonic palette as an experemental feature (extended candidate /testers should have pro reward/)  

=profile 6: +0 "Apps\SPECs.md" *ki 26/08/31 05:08:54
	bind pro state to extended features  

 promote 7: +0 "Apps\SPECs.md" *ki 26/08/31 05:08:55
	spam minipots  

-worker, template, web_app 8: +0 "Apps\ColorPicker\worker\tgbot-getcolors.js" *ki 26/08/16 06:26:35
	make standalone app capable of sending message to bot (requestWriteAccess)

 authenticate 9: +0 "Apps\__authGate\worker\authenticate.js" *ki 26/08/29 02:55:34
	use JWT instead of shortliving hash

=locker 10: +0 "Apps\--locker\worker\--locker_worker.js" *ki 26/08/31 06:07:39
	provide owner profile

=finalize 11: +0 "Apps\--authGate\worker\--authGate_worker.js" Ki 26/09/07 04:19:06
	Make AuthGate to procceed request and return result

=locker 12: +0 "Apps\--locker\worker\--locker_worker.js" *ki 26/08/30 06:49:51
	migrate from account_minibot

 authenticate, microfeature 13: +0 "Apps\--authGate\worker\--authGate_worker.js" Ki 26/09/07 04:17:50
	provide sequental JWT access

 integration, toreview 14: +0 "Apps\--list\webapp\app_list.js" *ki 26/08/31 04:38:49
	Make initial navigation respect to ?startapp=

 microfeature, admin, finalize 16: +0 "Apps\colors_picker\webapp\app_frame.js" Ki 26/09/07 03:59:28
	Logging place, visible by some action

 finalize 17: +0 "Apps\colors_picker\webapp\app_frame.js" Ki 26/09/07 04:15:41
	make Auth pass a request to Auth-Gate and receive answer

=finalize 18: +0 "Apps\--list\webapp\app_list.js" Ki 26/09/07 05:44:52
	implement list as main/menu app

