
import { useEffect, useState } from "react";

// Optimized WebP slideshow images
const images = ["n1", "couple11", "n3", "n4", "n5"].map(
  (name) => ({
    mobile: `/images/intro/${name}-480.webp`,
    desktop: `/images/intro/${name}-960.webp`,
  })
);

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
  let interval;

  // Let the first hero image load before starting the slideshow
  const initialDelay = setTimeout(() => {
    interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);
  }, 8000);

  return () => {
    clearTimeout(initialDelay);

    if (interval) {
      clearInterval(interval);
    }
  };
}, []);

  const currentImage = images[currentIndex];

  return (
    <section
      className="
        relative
        max-w-[100vw]
        w-full
        mt-24
        min-h-screen
        md:h-[90vh]
        lg:h-[80vh]
        overflow-hidden
      "
    >
      <img
        src={currentImage.desktop}
        srcSet={`
          ${currentImage.mobile} 480w,
          ${currentImage.desktop} 960w
        `}
        sizes="100vw"
        alt=""
        loading="eager"
        fetchPriority={currentIndex === 0 ? "high" : "auto"}
        decoding="async"
        className="absolute inset-0 block w-full h-full object-cover object-center"
      />

      <div
        className="absolute inset-0 bg-black/30"
        aria-hidden="true"
      />
    </section>
  );
}
