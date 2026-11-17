
import { useEffect, useState } from "react";

const API_ENDPOINT = "/api/testimonials/videos";

export default function Testimonials() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    document.title =
      "Client Testimonials | Best Wedding Photographer in Bangalore";

    const metaDescription = document.querySelector(
      "meta[name='description']"
    );

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Read genuine client testimonials and reviews for 35 Frames Photography, a trusted wedding photographer in Bangalore known for candid and traditional wedding shoots."
      );
    }

    const controller = new AbortController();

    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_ENDPOINT, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load testimonials.");
        }

        const data = await response.json();

        if (!Array.isArray(data.videos)) {
          throw new Error("Invalid video response.");
        }

        setVideos(data.videos);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Testimonials error:", err);
          setError("Unable to load videos. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchVideos();

    return () => controller.abort();
  }, []);

  return (
    <main
      className="mt-54 bg-[#F7F4ED]"
      style={{ padding: "40px" }}
    >
      <section
        aria-label="Client video testimonials"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5"
      >

        {/* LOADING PLACEHOLDERS */}
        {loading &&
          Array.from({ length: 10 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="w-full h-[250px] rounded-[10px] bg-gray-200 animate-pulse"
              aria-hidden="true"
            />
          ))}

        {/* ERROR MESSAGE */}
        {!loading && error && (
          <p className="col-span-full text-center text-red-600 py-10">
            {error}
          </p>
        )}

        {/* NO VIDEOS */}
        {!loading && !error && videos.length === 0 && (
          <p className="col-span-full text-center py-10">
            No testimonials available right now.
          </p>
        )}

        {/* VIDEO CARDS */}
        {!loading &&
          !error &&
          videos.map((video, index) => (
            <div
              key={video.videoId}
              className="w-full h-[250px] overflow-hidden rounded-[10px] bg-black"
            >
              {activeVideo === video.videoId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(
                    video.videoId
                  )}?autoplay=1`}
                  title={video.title || `Client testimonial ${index + 1}`}
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveVideo(video.videoId)}
                  className="relative w-full h-full block group"
                  aria-label={`Play ${video.title || "client testimonial"}`}
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={`${video.title || "Client testimonial"} thumbnail`}
                    width="480"
                    height="360"
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Play button */}
                  <span className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition">
                    <span className="flex items-center justify-center bg-red-600 text-white rounded-xl w-16 h-12 text-2xl shadow-lg">
                      ▶
                    </span>
                  </span>
                </button>
              )}
            </div>
          ))}
      </section>
    </main>
  );
}
