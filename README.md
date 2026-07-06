# Bhavitha Rohini — Portfolio

A React + Vite project. Currently contains the hero section only —
scattered photo collage around a typewriter-style name treatment on
warm cream paper.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Add your own photos

1. Drop your image files into `public/images/` (create the folder).
2. Open `src/components/Hero.jsx` and fill in the `src` (and `alt`)
   fields in the `slots` array, e.g.:

   ```js
   { id: 1, positionClass: 'slot-1', tab: '01 — process', tape: true,
     src: '/images/your-photo.jpg', alt: 'short description' },
   ```

   Leave `src: ''` on any slot to keep showing the dashed placeholder.

Positioning, rotation, and tape accents are controlled separately in
`src/components/Hero.css` (`.slot-1` through `.slot-6`), so swapping
images never touches layout.

## Structure

```
src/
  index.css            → design tokens (colors), global reset
  App.jsx              → page shell — future sections go here
  components/
    Nav.jsx / .css
    Hero.jsx / .css
    PhotoSlot.jsx       → reusable scattered-photo component
```

## Next up

This is just the hero. Ready to build out About, Work, and Contact
sections in the same visual system whenever you are.
