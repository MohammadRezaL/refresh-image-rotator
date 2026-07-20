# Refresh Image Rotator

A tiny, dependency-free GitHub Pages project that shows the **next image on every page refresh**.

Each visitor starts from the first image because progress is stored locally in that visitor's browser using `localStorage`.

## Demo behavior

- First visit → image 1
- First refresh → image 2
- Next refresh → image 3
- After the last image → starts again from image 1
- Different browsers/devices keep separate progress

> This behavior runs on the GitHub Pages website, not directly inside the rendered GitHub README.

## Use it

### 1. Get the project

Download this repository, use GitHub's **Use this template** button, or clone it:

```bash
git clone https://github.com/YOUR_USERNAME/refresh-image-rotator.git
cd refresh-image-rotator
```

### 2. Add your images

Put your files inside the `images/` directory.

Supported browser formats include PNG, JPG/JPEG, WebP, GIF, SVG, and AVIF.

### 3. Edit `images.js`

List your images in the order they should appear:

```js
window.ROTATOR_IMAGES = [
  "./images/photo-1.jpg",
  "./images/photo-2.png",
  "./images/photo-3.webp",
];
```

### 4. Enable GitHub Pages

In the repository:

1. Open **Settings**
2. Open **Pages**
3. Under **Build and deployment**, choose **Deploy from a branch**
4. Select the `main` branch and `/ (root)`
5. Click **Save**

Your site will be available at:

```text
https://YOUR_USERNAME.github.io/REPOSITORY_NAME/
```

## Reset the sequence

Open the page once with `?reset=1`:

```text
https://YOUR_USERNAME.github.io/REPOSITORY_NAME/?reset=1
```

That browser will return to the first image.

## How it works

The current image number is saved in the visitor's browser with `localStorage`.
After an image loads successfully, the next image number is saved. On the next refresh, that next image is displayed.

No server, database, framework, package installation, or build step is required.

## Important limitation

GitHub README files do not provide a normal JavaScript runtime for this type of per-visitor interaction. GitHub also proxies/anonymizes images. For that reason, the interactive image sequence is hosted with GitHub Pages, while this README explains and links to it.

## License

MIT
