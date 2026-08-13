import { readFile } from "node:fs/promises";

/*
 * Add categories and images here.
 *
 * Supported examples:
 * image/jpeg
 * image/png
 * image/webp
 * image/gif
 * image/svg+xml; charset=utf-8
 */
const categories = {
  movie: [
    {
      file: new URL("../images/movie/Leon.png", import.meta.url),
      type: "image/png",
    },
    {
      file: new URL("../images/movie/Inception.png", import.meta.url),
      type: "image/png",
    },
    {
      file: new URL("../images/movie/Friends.png", import.meta.url),
      type: "image/png",
    },
        {
      file: new URL(
        "../images/movie/MadMax.png",
        import.meta.url
      ),
      type: "image/png",
    },

    {
      file: new URL(
        "../images/movie/Matrix.png",
        import.meta.url
      ),
      type: "image/png",
    },

    {
      file: new URL(
        "../images/movie/Interstellar.png",
        import.meta.url
      ),
      type: "image/png",
    },
  ],


  anime: [
    {
      file: new URL(
        "../images/Anime/AOT.png",
        import.meta.url
      ),
      type: "image/png",
    },

    {
      file: new URL(
        "../images/Anime/DeathNote.png",
        import.meta.url
      ),
      type: "image/png",
    },

    {
      file: new URL(
        "../images/Anime/DemonSlayer.png",
        import.meta.url
      ),
      type: "image/png",
    },
        {
      file: new URL(
        "../images/Anime/Full.png",
        import.meta.url
      ),
      type: "image/png",
    },

    {
      file: new URL(
        "../images/Anime/Hunter.png",
        import.meta.url
      ),
      type: "image/png",
    },

    {
      file: new URL(
        "../images/Anime/Jujutsu.png",
        import.meta.url
      ),
      type: "image/png",
    },

    {
      file: new URL(
        "../images/Anime/Bleach.png",
        import.meta.url
      ),
      type: "image/png",
    },
  ],

};

// Best-effort prevention of immediate repetition.
const previousIndexByCategory = new Map();

function getRequestedCategory(request) {
  const value = request.query?.category;

  const category = Array.isArray(value)
    ? value[0]
    : value;

  return String(category || "all")
    .trim()
    .toLowerCase();
}

function getImages(category) {
  if (category === "all") {
    return Object.values(categories).flat();
  }

  return categories[category] || null;
}

function selectIndex(category, images) {
  if (images.length === 1) {
    return 0;
  }

  let index = Math.floor(Math.random() * images.length);
  const previousIndex = previousIndexByCategory.get(category);

  if (index === previousIndex) {
    index = (index + 1) % images.length;
  }

  previousIndexByCategory.set(category, index);
  return index;
}

export default async function handler(request, response) {
  try {
    const category = getRequestedCategory(request);
    const images = getImages(category);

    if (!images) {
      response.statusCode = 400;
      response.setHeader(
        "Content-Type",
        "application/json; charset=utf-8"
      );

      response.end(
        JSON.stringify({
          error: `Unknown category: ${category}`,
          availableCategories: [
            "all",
            ...Object.keys(categories),
          ],
        })
      );

      return;
    }

    if (images.length === 0) {
      response.statusCode = 500;
      response.setHeader(
        "Content-Type",
        "text/plain; charset=utf-8"
      );
      response.end("This category does not contain any images.");
      return;
    }

    const index = selectIndex(category, images);
    const selectedImage = images[index];
    const imageData = await readFile(selectedImage.file);

    response.statusCode = 200;
    response.setHeader("Content-Type", selectedImage.type);

    response.setHeader(
      "Cache-Control",
      "no-store, no-cache, max-age=0, must-revalidate"
    );
    response.setHeader("CDN-Cache-Control", "no-store");
    response.setHeader(
      "Vercel-CDN-Cache-Control",
      "no-store"
    );
    response.setHeader("Pragma", "no-cache");
    response.setHeader("Expires", "0");
    response.setHeader(
      "X-Content-Type-Options",
      "nosniff"
    );

    response.end(imageData);
  } catch (error) {
    console.error("Image API error:", error);

    response.statusCode = 500;
    response.setHeader(
      "Content-Type",
      "text/plain; charset=utf-8"
    );
    response.end("Could not load the selected image.");
  }
}
