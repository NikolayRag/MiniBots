// =todo 11 (authgate) +0: provide owner profile from locker worker
/*
Environment (env)
	.ALLOWED_ORIGIN
		WebApp's URL base
	[targetBot]
		TOKEN


Require
	initData: "X-Telegram-Init-Data" header
	targetBot: "bound-to-bot" header


Flow
	Pass/stop "Origin" header
	Answer for "OPTIONS" method
	Pass/stop initData presence
	Authenticate initData with bot TOKEN
	Pass/stop auth errors
	- Route request
	Return result
*/

function corsHeaders(origin) {
	return {
		"Access-Control-Allow-Origin": origin,
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, X-Telegram-Init-Data, bound-to-bot",
	};
}

import { authenticate } from "./authenticate.js";


export default {
	async fetch(request, env) {

		const origin = request.headers.get("Origin");

		if (origin !== env.ALLOWED_ORIGIN)
			return new Response(null, { status: 403 });

		if (request.method === "OPTIONS")
			return new Response(null, {
				status: 204,
				headers: corsHeaders(origin),
			});

		const initData = request?.headers?.get('X-Telegram-Init-Data');
		if (!initData)
			return new Response('Incomplete request', {
				status: 500,
				headers: corsHeaders(origin),
			});

		const targetBot = request?.headers?.get('bound-to-bot');

		const authError = await authenticate(
			new URLSearchParams(initData),
			env[targetBot],
			86400
		);

		if (authError)
			return new Response(JSON.stringify({error:authError}), {
				status: 500,
				headers: corsHeaders(origin),
			});

		let responseStr = JSON.parse((new URLSearchParams(initData)).get('user'));

		return new Response(JSON.stringify({error:null, response:responseStr}), {
				headers: corsHeaders(origin),
			});
	}
};
