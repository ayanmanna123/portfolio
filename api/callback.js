export default async function handler(req, res) {
  const code = req.query.code;
  const client_id = process.env.OAUTH_GITHUB_CLIENT_ID;
  const client_secret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
      }),
    });

    const data = await response.json();
    const token = data.access_token;

    if (!token) {
      res.status(400).send("Authentication failed: No access token received from GitHub.");
      return;
    }

    const content = `
      <!DOCTYPE html>
      <html>
      <head><title>Authorizing...</title></head>
      <body>
      <script>
        (function() {
          function receiveMessage(e) {
            console.log("receiveMessage", e);
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify({ token, provider: 'github' })}',
              e.origin
            );
          }
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
        })();
      </script>
      </body>
      </html>
    `;

    res.setHeader("Content-Type", "text/html");
    res.send(content);
  } catch (error) {
    console.error("OAuth Error:", error);
    res.status(500).send("OAuth Server Error");
  }
}
