# AllFire assistant — getting a Gemini API key

The chat assistant runs on Google's Gemini API. This is how to get a key, wire it
in, and confirm it works.

Time: about 5 minutes.

---

## 1. Create the key

1. Go to **https://aistudio.google.com/apikey**
2. Sign in with a Google account.
   Use a **company Google account**, not a personal one. The key belongs to
   whoever owns that account, and you do not want it tied to someone's private
   Gmail when they leave.
3. Accept the Google AI Studio terms if prompted.
4. Click **Create API key**.
5. When asked for a Google Cloud project, either pick an existing one or let it
   create a new one. Either is fine, and you do not need to configure anything
   inside the project.
6. Copy the key. It starts with `AIza…`

Keys are shown again later in the same screen, so it is not a one-shot copy,
but treat it like a password regardless.

---

## 2. Test the key before touching the app

Do this first. If it fails here, the problem is the key, not our code.

```bash
curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent" \
  -H "x-goog-api-key: YOUR_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Say OK"}]}]}'
```

- **Working key** returns JSON containing `"text": "OK"`.
- **Bad key** returns `API key not valid`.
- **Quota exceeded** returns a `429` with `RESOURCE_EXHAUSTED`.

---

## 3. Add it to the project

Create a file called `.env.local` in the project root, next to `package.json`:

```
GEMINI_API_KEY=AIza...your key here...
```

Then restart the dev server. Next.js only reads env files at startup, so a
running server will not pick it up:

```bash
npm run dev
```

> **`.env.local` is already gitignored.** Never commit it, never paste the key
> into Slack or email, and never rename the variable to `NEXT_PUBLIC_GEMINI_API_KEY`.
> Anything prefixed `NEXT_PUBLIC_` is bundled into the JavaScript sent to every
> visitor's browser, where the key can be copied and your quota spent by anyone.
> Our key is read only on the server, in `src/app/api/assistant/route.ts`.

---

## 4. Confirm it is live

Open the site, click the chat button, and ask something the assistant should
know, for example:

> How often do fire extinguishers need tagging?

- **Key working** — it answers from AllFire's own content, mentioning AS1851 and
  the six-monthly cycle.
- **Key missing or failing** — it replies with the fallback: *"I'm not connected
  to live answers right now… call 1300 765 594."*

That fallback is deliberate. If the key is missing, the quota runs out, or
Google has an outage, the visitor still gets a phone number instead of an error.

You can also check directly:

```bash
curl -s -X POST http://localhost:3000/api/assistant \
  -H "Content-Type: application/json" \
  -d '{"message":"What is an AFSS?","history":[]}'
```

The response includes `"configured": true` when a key is loaded.

---

## 5. Deploying

Do not upload `.env.local`. Set the variable in your host's dashboard instead.

**Vercel:** Project → Settings → Environment Variables → add `GEMINI_API_KEY`
for Production, Preview and Development, then redeploy. Existing deployments do
not pick up new variables until they are rebuilt.

Other hosts have an equivalent "environment variables" or "config vars" screen.

---

## Optional settings

| Variable | Default | Notes |
|---|---|---|
| `GEMINI_API_KEY` | *(none)* | Required for live answers. Without it the assistant falls back to the phone number. |
| `GEMINI_MODEL` | `gemini-2.5-flash` | `gemini-2.5-flash-lite` is cheaper and faster; `gemini-2.5-pro` is stronger but slower and uses quota faster. |

---

## Cost and limits

The free tier is genuinely free — no credit card, no trial expiry. It is rate
limited per minute and per day, and the limits differ by model and change over
time, so check the current figures at
**https://ai.google.dev/gemini-api/docs/rate-limits**.

Two things worth knowing before this goes live on a client site:

1. **Free-tier data handling.** Google's terms have historically allowed
   free-tier API content to be used to improve their products, while paid tier
   does not. Visitors may type building addresses or site details into this
   chat. Read the current terms at **https://ai.google.dev/gemini-api/terms**
   and decide with Peter whether the free tier is acceptable, or whether to
   enable billing (which is still very cheap at this volume) to get the paid
   tier's stricter data handling.

2. **Running out mid-day.** If the daily quota is exhausted, the assistant falls
   back to the phone number rather than breaking. The site keeps working, it
   just stops answering questions until the quota resets.

We also throttle to **12 messages per minute per visitor** in
`src/app/api/assistant/route.ts`, so one person cannot burn the daily allowance.

---

## If something goes wrong

| Symptom | Cause | Fix |
|---|---|---|
| Always the fallback message | No key loaded | Check `.env.local` is in the project root and the server was restarted |
| `API key not valid` in the server log | Key mistyped or deleted | Re-copy from AI Studio; check for stray spaces or quotes |
| Works locally, not deployed | Variable not set on the host | Add it in the host dashboard and redeploy |
| `429` / `RESOURCE_EXHAUSTED` | Quota hit | Wait for reset, or enable billing |
| Answers questions it should not | Guardrails need tightening | Edit the rules in `src/lib/assistant-knowledge.ts` |

Server-side errors are logged with the prefix `[api/assistant]`.
