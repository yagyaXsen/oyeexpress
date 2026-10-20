# OyeExpress — website

React 18 · Vite · Tailwind CSS v4 · GSAP (ScrollTrigger) · Lenis smooth scroll.

```bash
npm install
npm run dev      # http://localhost:5174
npm run build    # production build in dist/
```

## Imagery

Every image and video slot is defined in **`src/content/assets.js`**, and nowhere else.
The current set is licensed stock (Unsplash photos, Pexels and Mixkit films); sources are listed in
**`CREDITS.md`**. To use OyeExpress's own media, swap an entry:

```js
import livingRoom from '../media/living-room.jpg'

collections: {
  living: own(livingRoom, 'A living room with a low sofa at dusk'),
}
```

Films live in `public/media` as `name.mp4` + `name-poster.jpg` (the hero also has a 960px mobile cut).
They were encoded with ffmpeg as forward-then-reverse loops: H.264, no audio, `+faststart`.

- Images and videos fill their frame with `object-fit: cover`. Use `position: '50% 70%'` to steer the crop.
- Videos (`hero`, `foshan.film`, `testimonial`, `final`) autoplay muted, only while on screen,
  and never when the visitor prefers reduced motion. Add a `poster` still for each.
- Set `SHOW_SLOT_LABELS = false` to hide the placeholder briefs before showing the site to anyone.
- Recommended exports: stills ~2400px on the long edge (AVIF/WebP); films 1920×1080 H.264, 10–15s loops, no audio.

## Replacing placeholder copy

`src/content/site.js` holds the copy and structured content. Anything in `[square brackets]` is a
placeholder: project names, the testimonial, the WhatsApp number, email and reply time.
No real clients or projects are named.

## Enquiry form

`src/lib/enquiry.js` → `submitEnquiry(payload)` is a stub that waits and resolves. Point it at a form
service, a serverless function or a CRM / WhatsApp Business webhook. `payload.files` holds the attachments.

## Structure

```
src/
  content/assets.js     every media slot (the only file to touch for imagery)
  content/site.js       copy, navigation, journey, collections, projects, enquiry options
  components/           Media (img / video / placeholder), Header + mobile menu, curtain, UI parts
  sections/             one file per section, in page order
  lib/                  GSAP setup, smooth scroll, intro timing, magnetic buttons, enquiry submit
```

Motion is declared in markup where possible: `data-reveal="up" | "lines" | "clip"` and
`<Media parallax={8}>`. It is all disabled under `prefers-reduced-motion`.
