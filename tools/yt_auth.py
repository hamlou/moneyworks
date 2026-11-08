"""One-time: get a YouTube OAuth refresh token for tools/lessons.py (stdlib only, runs on the owner's PC).
  py tools/yt_auth.py                 → asks for the Desktop-app client id + secret, opens the Google consent page
  py tools/yt_auth.py <id> <secret>
Prints the refresh token and the 3 `gh secret set` commands. NEVER paste the token into a repo file (repo is public)."""
import base64, hashlib, http.server, json, os, secrets, sys, threading, urllib.parse, urllib.request, webbrowser

SCOPES = "https://www.googleapis.com/auth/yt-analytics.readonly https://www.googleapis.com/auth/youtube.readonly"
GH = os.path.expandvars(r"%LOCALAPPDATA%\ghcli\bin\gh.exe") if os.name == "nt" else "gh"


def main():
    a = sys.argv[1:]
    cid = a[0] if a else (os.environ.get("YT_CLIENT_ID") or input("OAuth client ID: ").strip())
    sec = a[1] if len(a) > 1 else (os.environ.get("YT_CLIENT_SECRET") or input("OAuth client secret: ").strip())
    got = {}

    class H(http.server.BaseHTTPRequestHandler):
        def do_GET(self):
            q = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            if "code" not in q and "error" not in q:
                self.send_response(404); self.end_headers(); return
            got.update({k: v[0] for k, v in q.items()})
            self.send_response(200); self.send_header("Content-Type", "text/html"); self.end_headers()
            self.wfile.write(b"<h2>Done. You can close this tab and go back to the terminal.</h2>")

        def log_message(self, *_):
            pass

    srv = http.server.HTTPServer(("127.0.0.1", 0), H)
    redir = f"http://localhost:{srv.server_port}"
    ver = secrets.token_urlsafe(64)
    chal = base64.urlsafe_b64encode(hashlib.sha256(ver.encode()).digest()).rstrip(b"=").decode()
    state = secrets.token_urlsafe(16)
    url = "https://accounts.google.com/o/oauth2/v2/auth?" + urllib.parse.urlencode({
        "client_id": cid, "redirect_uri": redir, "response_type": "code", "scope": SCOPES, "access_type": "offline",
        "prompt": "consent", "state": state, "code_challenge": chal, "code_challenge_method": "S256"})
    print("\nOpen this URL, sign in with the account that OWNS the channel, allow access:\n\n" + url + "\n", flush=True)
    webbrowser.open(url)
    t = threading.Thread(target=lambda: [srv.handle_request() for _ in range(20) if not got], daemon=True)
    t.start()
    t.join(600)
    srv.server_close()
    if "code" not in got or got.get("state") != state:
        sys.exit(f"no authorization code received ({got.get('error', 'timeout/state mismatch')})")
    body = urllib.parse.urlencode({"code": got["code"], "client_id": cid, "client_secret": sec, "redirect_uri": redir,
                                   "grant_type": "authorization_code", "code_verifier": ver}).encode()
    r = json.loads(urllib.request.urlopen("https://oauth2.googleapis.com/token", body, timeout=60).read())
    rt = r.get("refresh_token")
    if not rt:
        sys.exit(f"Google returned no refresh_token: {r}")
    print("\nRefresh token:\n" + rt + "\n\nNow run these 3 commands (in Git Bash / PowerShell, from the moneyworks folder):\n")
    for k, v in (("YT_CLIENT_ID", cid), ("YT_CLIENT_SECRET", sec), ("YT_REFRESH_TOKEN", rt)):
        print(f'"{GH}" secret set {k} -R hamlou/moneyworks -b "{v}"')
    print("\nThen test: gh workflow run lessons.yml -R hamlou/moneyworks")


if __name__ == "__main__":
    main()
