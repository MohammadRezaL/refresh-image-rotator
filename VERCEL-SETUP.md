# GitHub Profile Refresh Image API

This version adds a Vercel Function at:

```text
/api/image
```

Each fresh request selects one image from the configured collection. It tries not
to repeat the previous image while the same Vercel Function instance is warm.

## 1. Configure your images

Put your files inside `images/`.

Then edit `api/image.js`. Each image needs a static entry so Vercel includes it
in the function bundle:

```js
const images = [
  {
    file: new URL("../images/photo-1.jpg", import.meta.url),
    contentType: "image/jpeg",
  },
  {
    file: new URL("../images/photo-2.png", import.meta.url),
    contentType: "image/png",
  },
  {
    file: new URL("../images/photo-3.webp", import.meta.url),
    contentType: "image/webp",
  },
];
```

Common content types:

| File | Content type |
|---|---|
| `.jpg` / `.jpeg` | `image/jpeg` |
| `.png` | `image/png` |
| `.webp` | `image/webp` |
| `.gif` | `image/gif` |
| `.svg` | `image/svg+xml; charset=utf-8` |
| `.avif` | `image/avif` |

You can also update `images.js` if you still want the GitHub Pages demo to use
the same photos.

## 2. Push the update to GitHub

Run inside the repository folder:

```bash
git add .
git commit -m "Add random profile image API"
git pull --rebase origin main
git push
```

## 3. Deploy the repository on Vercel

1. Sign in to Vercel with GitHub.
2. Choose **Add New → Project**.
3. Import the image-rotator repository.
4. Keep **Framework Preset** as **Other**.
5. Click **Deploy**.

After deployment, test:

```text
https://YOUR-VERCEL-PROJECT.vercel.app/api/image
```

Refresh that URL several times.

## 4. Put it in your profile README

```md
![Profile image](https://YOUR-VERCEL-PROJECT.vercel.app/api/image)
```

Or control its width:

```html
<img
  src="https://YOUR-VERCEL-PROJECT.vercel.app/api/image"
  alt="Profile image"
  width="100%"
/>
```

## Cache note

The function asks Vercel and browsers not to cache the response. GitHub,
however, proxies external README images through Camo. Therefore GitHub may
occasionally keep an older response instead of calling the endpoint on every
single profile refresh. This endpoint follows the same general server-generated
image approach as services such as Capsule Render, but a new photo on absolutely
every GitHub refresh cannot be guaranteed.
