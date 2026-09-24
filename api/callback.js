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
  var successMsg = "authorization:github:success:" + JSON.stringify({
    token: ${JSON.stringify(token)},
    provider: "github"
  });

  var targetOrigin = "https://www.ayanmanna.in";
  var handshakeCompleted = false;

  function handleMessage(e) {
    console.log("Popup received message:", e.data, e.origin);
    // When main window echoes back "authorizing:github"
    if (e.data === "authorizing:github") {
      handshakeCompleted = true;
      if (handshakeTimer) clearInterval(handshakeTimer);
      window.removeEventListener("message", handleMessage, false);

      // Post the authorization success token to Decap CMS
      if (window.opener) {
        window.opener.postMessage(successMsg, e.origin);
        window.opener.postMessage(successMsg, targetOrigin);
        window.opener.postMessage(successMsg, "*");
      }

      // Decap CMS will close this window, but add a fallback timeout
      setTimeout(function() {
        try { window.close(); } catch (err) {}
      }, 1000);
    }
  }

  window.addEventListener("message", handleMessage, false);

  function pingOpener() {
    if (handshakeCompleted) return;
    if (window.opener) {
      try {
        window.opener.postMessage("authorizing:github", targetOrigin);
        window.opener.postMessage("authorizing:github", "*");
        // Also send success directly as fallback
        window.opener.postMessage(successMsg, targetOrigin);
        window.opener.postMessage(successMsg, "*");
      } catch (err) {
        console.error("postMessage error:", err);
      }
    }
  }

  // Ping immediately
  pingOpener();

  // Retry pinging every 250ms until handshake confirms
  var handshakeTimer = setInterval(pingOpener, 250);

  // Safety fallback: stop pinging after 10 seconds
  setTimeout(function() {
    if (handshakeTimer) clearInterval(handshakeTimer);
  }, 10000);
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
