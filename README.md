# 🔥 Resume Roaster

A complete MERN stack app that roasts your resume with AI — witty, specific feedback,
a heat score, and concrete fixes. Built with MongoDB, Express, React (Vite), Node.js,
and Google Gemini.

Theme: dark, fiery orange/red ("roast" vibe), with a signature circular **Ember Gauge**
that visualizes your resume's heat score instead of a generic progress bar.

## Features

- Email/password auth (JWT) with persistent login
- Drag-and-drop PDF resume upload
- AI roast via Google Gemini: score (0–100), heat level (Mild → Charred), verdict,
  issues, strengths, and actionable suggestions
- Roast history per user, with delete
- Fully responsive, dark fiery theme

## Project structure

```
resume-roaster/
├── server/      Express + MongoDB + Gemini API
└── client/      React + Vite + Tailwind CSS
```

## 1. Prerequisites

- Node.js 18+
- MongoDB running locally, or a free MongoDB Atlas cluster
- A free Gemini API key from https://aistudio.google.com/apikey

## 2. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env`:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/resume-roaster
JWT_SECRET=replace_with_a_long_random_string
GEMINI_API_KEY=your_gemini_api_key_here
CLIENT_URL=http://localhost:5173
```

Run it:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

## 3. Frontend setup

In a new terminal:

```bash
cd client
npm install
cp .env.example .env
```

`client/.env` already points at the backend by default:

```
VITE_API_URL=http://localhost:5000/api
```

Run it:

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

## 4. Using it

1. Open `http://localhost:5173`, create an account.
2. Upload a text-based PDF resume (not a scanned image).
3. Get roasted — see your heat score, verdict, issues, strengths, and fixes.
4. Check `/history` to revisit past roasts.

## Customizing the theme

All colors and fonts live in `client/tailwind.config.js` and `client/index.html`
(Google Fonts links). Swap the `ember`, `emberDeep`, `gold`, `surface`, and `bg`
hex values to restyle the whole app from one place.

## Notes

- PDF parsing uses `pdf-parse`, which only reads text-based PDFs (not scanned images).
- The Gemini free tier has rate limits — if uploads start failing, wait a minute
  or check your quota at https://aistudio.google.com.
- JWT tokens are stored in `localStorage` on the client, standard for a learning/demo
  project. For production, consider httpOnly cookies instead.
