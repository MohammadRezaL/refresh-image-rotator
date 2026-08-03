# Refresh Image Rotator

A lightweight image API for GitHub profile READMEs.

It returns an image from a selected category whenever GitHub or the browser makes a fresh request. Users can choose categories such as **movie**, **anime**, **animation**, **developing**, or any category added later.

## Live API

```text
https://refresh-image-rotator.vercel.app/api/image
```

## Features

- Works in GitHub profile READMEs
- Multiple selectable categories
- Random image selection
- No database
- No frontend framework
- No npm dependencies required
- Easy Vercel deployment
- Supports PNG, JPG, WebP, GIF, SVG, and AVIF
- Easy to extend with new categories

---

## Quick usage

### All categories

```html
<p align="center">
  <img
    src="https://refresh-image-rotator.vercel.app/api/image?category=all"
    alt="Random profile image"
    width="100%"
  />
</p>
```

The default endpoint also uses all categories:

```markdown
![Random profile image](https://refresh-image-rotator.vercel.app/api/image)
```

### Movie

```html
<p align="center">
  <img
    src="https://refresh-image-rotator.vercel.app/api/image?category=movie"
    alt="Random movie image"
    width="100%"
  />
</p>
```
<p align="center">
  <img
    src="https://refresh-image-rotator.vercel.app/api/image?category=movie"
    alt="Random movie image"
    width="100%"
  />
</p>

### Anime

```html
<p align="center">
  <img
    src="https://refresh-image-rotator.vercel.app/api/image?category=anime"
    alt="Random anime image"
    width="100%"
  />
</p>
```
<p align="center">
  <img
    src="https://refresh-image-rotator.vercel.app/api/image?category=anime"
    alt="Random anime image"
    width="100%"
  />
</p>

### Animation

```html
<p align="center">
  <img
    src="https://refresh-image-rotator.vercel.app/api/image?category=animation"
    alt="Random animation image"
    width="100%"
  />
</p>
```

### Developing

```html
<p align="center">
  <img
    src="https://refresh-image-rotator.vercel.app/api/image?category=developing"
    alt="Random developer image"
    width="100%"
  />
</p>
```

---

## Endpoint format

```text
https://refresh-image-rotator.vercel.app/api/image?category=CATEGORY_NAME
```

Examples:

```text
https://refresh-image-rotator.vercel.app/api/image?category=movie
https://refresh-image-rotator.vercel.app/api/image?category=anime
https://refresh-image-rotator.vercel.app/api/image?category=animation
https://refresh-image-rotator.vercel.app/api/image?category=developing
https://refresh-image-rotator.vercel.app/api/image?category=all
```

Use lowercase category names without spaces.

---

## Project structure

```text
refresh-image-rotator/
├── api/
│   └── image.js
├── images/
│   ├── movie/
│   │   ├── leon.png
│   │   └── movie-2.jpg
│   ├── anime/
│   │   ├── anime-1.png
│   │   └── anime-2.jpg
│   ├── animation/
│   │   ├── animation-1.png
│   │   └── animation-2.webp
│   └── developing/
│       ├── coding-1.png
│       └── coding-2.jpg
├── package.json
└── README.md
```

---

## Add an image to an existing category

Suppose you want to add `matrix.png` to the `movie` category.

### 1. Upload the image

Place it here:

```text
images/movie/matrix.png
```

### 2. Edit `api/image.js`

Find the `movie` category and add the image:

```javascript
movie: [
  {
    file: new URL("../images/movie/leon.png", import.meta.url),
    type: "image/png",
  },
  {
    file: new URL("../images/movie/matrix.png", import.meta.url),
    type: "image/png",
  },
],
```

### 3. Commit and push

```bash
git add .
git commit -m "Add Matrix image to movie category"
git pull --rebase origin main
git push
```

Vercel will automatically deploy the new commit.

---

# How to add a new category

Suppose you want to create a new category named `games`.

## Step 1: Create the folder

Create:

```text
images/games/
```

Add your images:

```text
images/games/game-1.png
images/games/game-2.jpg
images/games/game-3.webp
```

## Step 2: Add the category to `api/image.js`

Inside the `categories` object, add:

```javascript
games: [
  {
    file: new URL(
      "../images/games/game-1.png",
      import.meta.url
    ),
    type: "image/png",
  },
  {
    file: new URL(
      "../images/games/game-2.jpg",
      import.meta.url
    ),
    type: "image/jpeg",
  },
  {
    file: new URL(
      "../images/games/game-3.webp",
      import.meta.url
    ),
    type: "image/webp",
  },
],
```

A simplified `categories` object looks like this:

```javascript
const categories = {
  movie: [
    {
      file: new URL("../images/movie/leon.png", import.meta.url),
      type: "image/png",
    },
  ],

  anime: [
    {
      file: new URL("../images/anime/anime-1.png", import.meta.url),
      type: "image/png",
    },
  ],

  games: [
    {
      file: new URL("../images/games/game-1.png", import.meta.url),
      type: "image/png",
    },
    {
      file: new URL("../images/games/game-2.jpg", import.meta.url),
      type: "image/jpeg",
    },
  ],
};
```

Remember to add a comma after the previous category.

## Step 3: Commit the category

```bash
git add .
git commit -m "Add games image category"
git pull --rebase origin main
git push
```

## Step 4: Wait for Vercel

Open your Vercel project and wait until the latest deployment shows:

```text
Ready
```

## Step 5: Test the category

```text
https://refresh-image-rotator.vercel.app/api/image?category=games
```

Refresh the page several times.

## Step 6: Use it in a README

```html
<p align="center">
  <img
    src="https://refresh-image-rotator.vercel.app/api/image?category=games"
    alt="Random game image"
    width="100%"
  />
</p>
```

The category is now available to every user.

---

## Supported image types

Use the correct MIME type in `api/image.js`.

| Extension | MIME type |
|---|---|
| `.jpg` or `.jpeg` | `image/jpeg` |
| `.png` | `image/png` |
| `.webp` | `image/webp` |
| `.gif` | `image/gif` |
| `.svg` | `image/svg+xml; charset=utf-8` |
| `.avif` | `image/avif` |

Example:

```javascript
{
  file: new URL("../images/developing/banner.svg", import.meta.url),
  type: "image/svg+xml; charset=utf-8",
},
```

---

## Filename rules

GitHub and Vercel paths are case-sensitive.

These are different:

```text
Leon.png
leon.png
LEON.png
```

Recommended filenames:

```text
leon.png
attack-on-titan.webp
developer-banner.jpg
game-1.png
```

Avoid spaces and special characters.

---

## Deploy your own copy

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/refresh-image-rotator.git
cd refresh-image-rotator
```

### 2. Push to GitHub

```bash
git init -b main
git add .
git commit -m "Initial image rotator"
git remote add origin https://github.com/YOUR_USERNAME/refresh-image-rotator.git
git push -u origin main
```

### 3. Deploy on Vercel

1. Sign in to Vercel with GitHub.
2. Select **Add New → Project**.
3. Import the repository.
4. Set **Framework Preset** to **Other**.
5. Keep **Root Directory** as `./`.
6. Click **Deploy**.

Your endpoint will be:

```text
https://YOUR-PROJECT.vercel.app/api/image
```

A category endpoint will be:

```text
https://YOUR-PROJECT.vercel.app/api/image?category=movie
```

---

## Updating the project

Whenever you change images or categories:

```bash
git add .
git commit -m "Update image categories"
git pull --rebase origin main
git push
```

Vercel automatically redeploys commits pushed to the production branch.

---

## Troubleshooting

### `404: NOT_FOUND`

Confirm this file exists:

```text
api/image.js
```

Also confirm that the Vercel Root Directory is:

```text
./
```

### `Could not load the selected image`

Check that:

- The file exists.
- The filename matches exactly.
- The folder path is correct.
- The MIME type is correct.
- The image was committed to GitHub.

### One category does not work

The category key and URL must match.

```javascript
developing: [
  // images
],
```

must be requested as:

```text
?category=developing
```

### The same image appears twice

Selection is random, and Vercel may use multiple serverless instances. GitHub also proxies and caches external README images, so occasional repetition is expected.

### The browser keeps showing the same image

Try a hard refresh:

```text
Windows/Linux: Ctrl + Shift + R
macOS: Command + Shift + R
```

For direct testing, add a temporary parameter:

```text
https://refresh-image-rotator.vercel.app/api/image?category=movie&test=1
https://refresh-image-rotator.vercel.app/api/image?category=movie&test=2
```

---

## GitHub caching note

The API sends no-cache headers, but GitHub loads external README images through its own proxy.

Therefore:

- A different image on every profile refresh cannot be guaranteed.
- An image may occasionally repeat.
- GitHub may temporarily display an older response.
- Direct endpoint testing is usually more consistent.

---

## License

MIT
