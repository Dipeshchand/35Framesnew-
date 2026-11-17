
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import "./Portfolio.css";

// Original high-resolution images are retained for zoom.
// Vite includes their URLs, but the files are only requested
// by the browser when a visitor opens an image.
const originalImages = import.meta.glob(
  "../assets/images/reff*-min.JPG",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

// Original image dimensions
const imageDimensions = [
  [9504, 6336], // reff1
  [8256, 5504], // reff2
  [9504, 6336], // reff3
  [9504, 6336], // reff4
  [9504, 6336], // reff5
  [6000, 3363], // reff6
  [9504, 6336], // reff7
  [9327, 6218], // reff8
  [4800, 3000], // reff9
  [7008, 4672], // reff10
  [9504, 6336], // reff11
  [9504, 6336], // reff12
  [6000, 4000], // reff13
  [6501, 4334], // reff14
  [9504, 6336], // reff15
  [3765, 5647], // reff16
  [6089, 9134], // reff17
  [5285, 8381], // reff18
  [6934, 4623], // reff19
  [9504, 6336], // reff20
  [8991, 5994], // reff21
  [7952, 5304], // reff22
  [4425, 2950], // reff23
  [7887, 5721], // reff24
  [4672, 7008], // reff25
  [9504, 6336], // reff26
  [9504, 6336], // reff27
  [4672, 7008], // reff28
  [9367, 6245], // reff29
  [6000, 4000], // reff30
];

// Create gallery image data
const images = imageDimensions.map(([width, height], index) => {
  const number = index + 1;

  const originalPath =
    `../assets/images/reff${number}-min.JPG`;

  return {
    id: number,
    width,
    height,

    mobile: `/images/intro/reff${number}-480.webp`,
    desktop: `/images/intro/reff${number}-960.webp`,

    // Original image is reserved for zoom functionality.
    original: originalImages[originalPath],
  };
});

const breakpointColumnsObj = {
  default: 3,
  1024: 2,
  640: 1,
};

export default function Gallery() {
  const [zoomImg, setZoomImg] = useState(null);

  useEffect(() => {
    document.title =
      "Wedding Photography Gallery in Bangalore | 35 Frames";

    const metaDescription = document.querySelector(
      "meta[name='description']"
    );

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Explore our Bangalore wedding photography gallery featuring candid and traditional wedding moments."
      );
    }
  }, []);

  const openZoom = (image) => setZoomImg(image);

  const closeZoom = () => setZoomImg(null);

  return (
    <main className="w-full px-1 sm:px-4 mt-30 bg-[#F6F3EC]">

      {/* MASONRY GRID */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex"
        columnClassName=""
      >
        {images.map((image, index) => (
          <img
            key={image.id}
            src={image.desktop}
            srcSet={`
              ${image.mobile} 480w,
              ${image.desktop} 960w
            `}
            sizes="
              (min-width: 1024px) 33vw,
              (min-width: 640px) 50vw,
              100vw
            "
            width={image.width}
            height={image.height}
            alt={`Wedding photography gallery image ${image.id}`}
            loading={index < 3 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
            onClick={() => openZoom(image)}
            className="
              w-full
              object-cover
              cursor-zoom-in
              hover:opacity-95
              transition
            "
          />
        ))}
      </Masonry>

      {/* ZOOM VIEW */}
      {zoomImg && (
        <div
          className="
            fixed inset-0
            bg-black/90
            z-[999]
            flex items-center justify-center
            p-4
          "
          role="dialog"
          aria-modal="true"
          aria-label="Expanded gallery photograph"
          onClick={closeZoom}
        >
          <img
            src={
              zoomImg.original || zoomImg.desktop
            }
            width={zoomImg.width}
            height={zoomImg.height}
            alt={`Wedding photography gallery image ${zoomImg.id}`}
            decoding="async"
            onClick={(e) => e.stopPropagation()}
            className="
              max-w-full
              max-h-full
              object-contain
              rounded-lg
            "
          />
        </div>
      )}
    </main>
  );
}
