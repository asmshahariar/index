# Happy Birthday My Love — clone

Functional clone of https://bday-gift-pi.vercel.app/. React + Vite (JS, no TypeScript).

## State sequence

counter (1→2→3) → typing ("HAPPY"/"BIRTHDAY"/"TO MY"/"LOVE") → memory slider (Swiper coverflow, 12s) → gif screen. Matrix-rain canvas, particle canvas, floating hearts, and background music toggle run continuously underneath.

## Customize

Edit [src/config/birthdayConfig.js](src/config/birthdayConfig.js):

```js
const birthdayConfig = {
  name: 'My Love',
  title: 'Happy Birthday My Love ❤️',
  counterWords: ['1', '2', '3'],
  typingWords: ['HAPPY', 'BIRTHDAY', 'TO MY', 'LOVE'],
  memories: [ /* 10 image imports */ ],
  birthdayGif: '<gif url>',
  song: '<audio import>',
};
```

Replace files under `src/assets/memories/` (memory-01..10) and `src/assets/audio/song.mp3` to swap media; imports in the config update automatically.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview   # serve the production build locally
```

## Deploy to Vercel

```bash
npm install -g vercel   # if not already installed
vercel                  # follow prompts, framework preset: Vite
```

Or connect the repo in the Vercel dashboard — it auto-detects the Vite build (`npm run build`, output `dist/`).
