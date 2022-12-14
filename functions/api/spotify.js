/* eslint-disable camelcase */
const refresh = async (refreshToken, CLIENT_ID, CLIENT_SECRET, env) => {
	const bodyData = new URLSearchParams({
		grant_type: "refresh_token",
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		refresh_token: refreshToken
	});

	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		body: bodyData
	});

	if (response.status !== 200)
		return null;

	const body = await response.json();

	const newSession = {
		accessToken: body.access_token,
		refreshToken: body.refresh_token ? body.refresh_token : refreshToken
	};

	await env.TOKENS.put("tokens", JSON.stringify(newSession));

	return body.access_token;
};

const request = async (url, accessToken, refreshToken, CLIENT_ID, CLIENT_SECRET, env) => {
	let response = await fetch(url, {
		headers: {
			authorization: "Bearer " + accessToken
		}
	});

	if (response.status === 401) {
		const newAccessToken = await refresh(refreshToken, CLIENT_ID, CLIENT_SECRET, env);

		if (!newAccessToken)
			return null;

		response = await fetch(url, {
			headers: {
				authorization: "Bearer " + newAccessToken
			}
		});
	}

	if (response.status === 200)
		return await response.json();

	return null;
};

export const onRequestGet = async ({ env }) => {
	try {
		const tokens = await env.TOKENS.get("tokens", { type: "json" });
		const response = await request("https://api.spotify.com/v1/me/player/currently-playing", tokens.accessToken, tokens.refreshToken, env.CLIENT_ID, env.CLIENT_SECRET, env);

		if (!response) {
			return new Response(JSON.stringify({ is_playing: false }), {
				status: 200,
				headers: {
					"content-type": "application/json",
					"access-control-allow-origin": "*",
					"access-control-allow-headers": "*",
					"access-control-allow-methods": "GET, POST, OPTIONS"
				}
			});
		}

		return new Response(JSON.stringify(response), {
			headers: {
				"content-type": "application/json",
				"access-control-allow-origin": "*",
				"access-control-allow-headers": "*",
				"access-control-allow-methods": "GET, POST, OPTIONS"
			}
		});
	} catch (err) {
		return new Response(err, { status: 500 });
	}
};
