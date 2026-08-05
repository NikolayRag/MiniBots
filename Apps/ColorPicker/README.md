# Colorpicker TG bot with WebApp interface

Colors are picked within webapp interface, then sent to TG.
Then bot shows them in same reusable message as text and gradient image.
And finally updates Webapp call button to store new state for next call.

```
Modules over TG
	Bot Worker
	WebApp

State Data
	Color 1, 2
	Reusable Main message ID
```

```
Bot Worker
	/start
		Init Main Message with "Welcome"
		Init *State Data*
		Provide *Webapp Keyboard*
	WebApp reply
?		Generate stamps/gradient
		Update Main Message
		Provide *Webapp Keyboard*


Webapp Keyboard @Worker
	Serialize *State Data*
	Set keyboard with new URL
```

```
WebApp
	Deserialize *State Data*
	Init interface
	Close event: send new *State Data*
```
