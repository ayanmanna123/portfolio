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

    const tokenPayload = JSON.stringify({ token, provider: 'github' });

    const content = `<!DOCTYPE html>
<html>
<head><title>Authorizing Decap CMS...</title></head>
<body>
<p>Authorizing Decap CMS, please wait...</p>
<script>
  (function() {
    function receiveMessage(e) {
      console.log("receiveMessage event:", e);
      if (e.data === "authorizing:github") {
        window.opener.postMessage(
          'authorization:github:success:${tokenPayload}',
          e.origin
        );
        window.removeEventListener("message", receiveMessage, false);
        setTimeout(function() { window.close(); }, 500);
      }
    }
    window.addEventListener("message", receiveMessage, false);
    
    // Send handshake to main window
    if (window.opener) {
      window.opener.postMessage("authorizing:github", "*");
    }
  })();
</script>
</body>
</html>`;

    res.setHeader("Content-Type", "text/html");
    res.send(content);
  } catch (error) {
    console.error("OAuth Error:", error);
    res.status(500).send("OAuth Server Error");
  }
}
