
import { useNavigate } from "react-router-dom";

// Optimized responsive WebP images
const images = Array.from({ length: 14 }, (_, index) => {
  const number = index + 1;

  return {
    mobile: `/images/intro/reff${number}-480.webp`,
    desktop: `/images/intro/reff${number}-960.webp`,
  };
});

export default function IntroPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen">
      <div
        className="
          grid
          grid-cols-3
          grid-rows-5
          md:grid-cols-5
          md:grid-rows-3
          w-full
          h-full
        "
      >
        {Array.from({ length: 15 }, (_, i) => {

          // Center cell containing Vowframe branding
          if (i === 7) {
            return (
              <div
                key={i}
                className="flex items-center justify-center bg-[#DCCDC2]"
              >
                <div className="text-center">
                  <h1
                    className="text-3xl md:text-5xl font-baskervville mb-4"
                    style={{ fontFamily: "Seasons" }}
                  >
                    Vowframe
                  </h1>

                  <button
                    onClick={() => navigate("/home")}
                    className="px-6 py-2.5 bg-[#5A3F33] text-white rounded-full"
                  >
                    STEP IN
                  </button>
                </div>
              </div>
            );
          }

          // Calculate image index while skipping the center cell
          const imageIndex = i < 7 ? i : i - 1;
          const image = images[imageIndex];

          // Lighthouse identified the 14th image as the LCP element
          const isLcpImage = imageIndex === 13;

          return (
            <div key={i} className="overflow-hidden">
              <img
                src={image.desktop}
                srcSet={`
                  ${image.mobile} 480w,
                  ${image.desktop} 960w
                `}
                sizes="(min-width: 768px) 20vw, 33.333vw"
                alt=""
                loading="eager"
                fetchPriority={isLcpImage ? "high" : "auto"}
                decoding="async"
                className="block w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
