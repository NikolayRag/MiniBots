/*
Args:
	_initData: tg.initData from Webapp
	_botToken: corresponding token, should be secret
*/

export async function authenticate(_initData, _botToken) {
	if (!_initData)
		return ('Missing initData');

	const params = new URLSearchParams(_initData);

	const paramsHash = params.get('hash');
	if (!paramsHash)
		return ('Missing hash');

	const authDate = Number(params.get('auth_date'));
	if (!Number.isFinite(authDate))
		return ('Invalid auth_date');

//	const userRaw = params.get('user');
//	if (!userRaw)
//		return ('Missing user');

	params.delete('hash');

	const dataCheckString = [...params.entries()]
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([key, value]) => `${key}=${value}`)
		.join('\n');

	const secretKey = await crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode('WebAppData'),
		{
			name: 'HMAC',
			hash: 'SHA-256'
		},
		false,
		['sign']
	);

	const secret = await crypto.subtle.sign(
		'HMAC',
		secretKey,
		new TextEncoder().encode(_botToken)
	);

	const dataKey = await crypto.subtle.importKey(
		'raw',
		secret,
		{
			name: 'HMAC',
			hash: 'SHA-256'
		},
		false,
		['sign']
	);

	const calculatedHash = await crypto.subtle.sign(
		'HMAC',
		dataKey,
		new TextEncoder().encode(dataCheckString)
	);

	const calculatedHex = [...new Uint8Array(calculatedHash)]
		.map(b => b.toString(16).padStart(2, '0'))
		.join('');

	if (!timingSafeEqual(calculatedHex, paramsHash))
		return ('Invalid hash');

	const timeLimit = 120;
	if (Math.floor(Date.now() / 1000) - authDate > timeLimit)
		return ('Expired initData');
}


function timingSafeEqual(a, b) {
	if (a.length !== b.length) {
		return false;
	}

	let result = 0;

	for (let i = 0; i < a.length; i++) {
		result |= a.charCodeAt(i) ^ b.charCodeAt(i);
	}

	return result === 0;
}
