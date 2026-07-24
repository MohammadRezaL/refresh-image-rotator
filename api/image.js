import { readFile } from "node:fs/promises";

const images = [
  {
    file: new URL("../images/Matrix.png", import.meta.url),
    type: "image/png",
  },
  {
    file: new URL("../images/MadMAX.png", import.meta.url),
    type: "image/png",
  },
    {
    file: new URL("../images/Interstellar.png", import.meta.url),
    type: "image/png",
  },
      {
    file: new URL("../images/Friends.png", import.meta.url),
    type: "image/png",
  },
    {
    file: new URL("../images/Leon.png", import.meta.url),
    type: "image/png",
  },
];

let previousIndex = -1;

export default async function handler(request, response) {
  try {
    let index = Math.floor(Math.random() * images.length);

    // Avoid repeating the previous image when the same function instance is used.
    if (images.length > 1 && index === previousIndex) {
      index = (index + 1) % images.length;
    }

    previousIndex = index;

    const selectedImage = images[index];
    const imageData = await readFile(selectedImage.file);

    response.setHeader("Content-Type", selectedImage.type);
    response.setHeader(
      "Cache-Control",
      "no-store, no-cache, max-age=0, must-revalidate"
    );
    response.setHeader("CDN-Cache-Control", "no-store");
    response.setHeader("Vercel-CDN-Cache-Control", "no-store");
    response.setHeader("Pragma", "no-cache");
    response.setHeader("Expires", "0");
    response.setHeader("X-Content-Type-Options", "nosniff");

    response.statusCode = 200;
    response.end(imageData);
  } catch (error) {
    console.error(error);

    response.statusCode = 500;
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    response.end("Could not load image.");
  }
}
