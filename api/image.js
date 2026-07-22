let previousIndex = -1;

export default function handler(request, response) {
  const images = [
    "/images/01.svg",
    "/images/02.svg",
    "/images/03.svg",
  ];

  let index = Math.floor(Math.random() * images.length);

  if (images.length > 1 && index === previousIndex) {
    index = (index + 1) % images.length;
  }

  previousIndex = index;

  response.setHeader(
    "Cache-Control",
    "no-store, no-cache, max-age=0, must-revalidate"
  );

  response.setHeader("CDN-Cache-Control", "no-store");
  response.setHeader("Vercel-CDN-Cache-Control", "no-store");

  response.statusCode = 307;
  response.setHeader(
    "Location",
    `${images[index]}?v=${Date.now()}`
  );
  response.end();
}
