const fetch = require("node-fetch");
const qs = require("qs");

exports.getGoogleOAuthTokens = async ({ code }) => {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: process.env.Google_webClientId,
    client_secret: process.env.Google_secretId,
    redirect_uri: process.env.googleOauthRedirectUrl,
    grant_type: "authorization_code",
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: qs.stringify(values),
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      console.error(errorResponse.error);
      throw new Error("Failed to fetch Google OAuth Tokens");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
