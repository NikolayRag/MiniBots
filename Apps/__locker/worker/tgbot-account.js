/*

Flow branches
	/start
		sendInvoice
	update.pre_checkout_query
		answerPreCheckoutQuery
	message?.successful_payment
		Procceed with user tier
*/


export default {
	async fetch(request, env) {
		if (request.method !== "POST")
			return new Response("OK");

		const update = await request.json();

		// 1. /start
		const message = update.message;

		if (message?.text === "/start") {
			await telegram(env.BOT_TOKEN, "sendInvoice", {
				chat_id: message.chat.id,

				title: "MiniTools Pro",
				description: "Pro access for 30 days",
				payload: "pro:${message.from.id}:${Date.now()}",

				currency: "XTR",

				// 500 Telegram Stars
				prices: [
					{
						label: "MiniTools Pro — 30 days",
						amount: 10
					}
				]
			});

			return new Response("OK");
		}

		// 2. Pre-checkout
		const checkout = update.pre_checkout_query;

		if (checkout) {
			await telegram(env.BOT_TOKEN, "answerPreCheckoutQuery", {
				pre_checkout_query_id: checkout.id,
				ok: true
			});

			return new Response("OK");
		}

		// 3. Successful payment
		const payment = message?.successful_payment;

		if (payment) {
			console.log("PAYMENT", {
				user_id: message.from.id,
				amount: payment.total_amount,
				currency: payment.currency,
				payload: payment.invoice_payload,
				charge_id: payment.telegram_payment_charge_id
			});

			await telegram(env.BOT_TOKEN, "sendMessage", {
				chat_id: message.chat.id,
				text: "✅ Pro activated!"
			});

			return new Response("OK");
		}

		return new Response("OK");
	}
};


async function telegram(token, method, body) {
	const response = await fetch(
		"https://api.telegram.org/bot${token}/${method}",
		{
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(body)
		}
	);

	if (!response.ok) {
		console.error(await response.text());
	}

	return response;
}
