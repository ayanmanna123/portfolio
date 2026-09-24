export default async function handler(req, res) {
  const client_id = process.env.OAUTH_GITHUB_CLIENT_ID;
  const redirect_uri = 'https://www.ayanmanna.in/api/callback';

  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(
    redirect_uri
  )}&scope=repo,user`;

  res.redirect(url);
}
