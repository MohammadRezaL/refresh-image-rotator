(() => {
  "use strict";

  const images = Array.isArray(window.ROTATOR_IMAGES)
    ? window.ROTATOR_IMAGES.filter(Boolean)
    : [];

  const imageElement = document.querySelector("#rotating-image");
  const statusElement = document.querySelector("#status");

  // Each browser/profile gets its own progress.
  // The pathname keeps progress separate for different GitHub Pages projects.
  const storageKey = `refresh-image-rotator:${window.location.pathname}`;

  const resetRequested = new URLSearchParams(window.location.search).get("reset") === "1";

  if (resetRequested) {
    localStorage.removeItem(storageKey);

    // Remove ?reset=1 so another normal refresh advances to the next image.
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete("reset");
    window.history.replaceState({}, "", cleanUrl);
  }

  if (images.length === 0) {
    statusElement.textContent =
      "No images configured. Add image paths to images.js.";
    return;
  }

  const savedIndex = Number.parseInt(localStorage.getItem(storageKey) ?? "0", 10);
  const currentIndex =
    Number.isInteger(savedIndex) && savedIndex >= 0
      ? savedIndex % images.length
      : 0;

  const nextIndex = (currentIndex + 1) % images.length;
  const currentImage = images[currentIndex];

  imageElement.addEventListener("load", () => {
    imageElement.style.display = "block";
    statusElement.hidden = true;

    // Save only after the image successfully loads.
    localStorage.setItem(storageKey, String(nextIndex));
  });

  imageElement.addEventListener("error", () => {
    imageElement.style.display = "none";
    statusElement.hidden = false;
    statusElement.textContent =
      `Could not load "${currentImage}". Check its path in images.js.`;
  });

  imageElement.src = currentImage;
  imageElement.alt = `Rotating image ${currentIndex + 1} of ${images.length}`;
})();
