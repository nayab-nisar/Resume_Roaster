# 🔥 Resume Roaster

AI roasts your resume and tells you why it's bad (and how to fix it). MERN stack + Gemini. Dark fiery theme with a circular "Ember Gauge" showing your heat score.

Upload a PDF, get a score, a verdict, what's wrong, what's good, and what to fix. Login with email/password, view past roasts in history.

## Run it

You need Node 18+, MongoDB (local or Atlas), and a free Gemini key from aistudio.google.com/apikey.

**Server:**
```bash
cd server
npm install
cp .env.example .env   # fill in MONGO_URI, JWT_SECRET, GEMINI_API_KEY
npm run dev
```
Runs on :5000.

**Client:**
```bash
cd client
npm install
cp .env.example .env   # already points to localhost:5000
npm run dev
```
Runs on :5173.

Open it, sign up, drop in a text-based PDF resume (not a scanned image), get roasted.

Theme colors are in `tailwind.config.js` if you want to change the look. Gemini free tier has rate limits, so if uploads start failing just wait a bit. Tokens are stored in localStorage — fine for a demo, swap for httpOnly cookies if this ever goes to prod.
