import React, { useEffect, useState, useRef } from "react";

export default function Portfolio() {
  const [videos, setVideos] = useState([]);
const API_KEY = "AIzaSyArqi5kGwPw1NSr3N0gk9bqjonII_Po2FI"; 
const CHANNEL_ID = "UCol7IKN_DWrViXizIZESHZQ";
  const observerRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`
        );
        const data = await res.json();
        setVideos(data.items);
      } catch (err) {
        console.log("Error fetching videos", err);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
          observerRef.current.unobserve(entry.target);
        }
      });
    });
  }, []);

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
}, []);

  return (
    <div style={{ padding: "40px" }} className="mt-54 bg-[#F7F4ED]">
      {!videos.length && <p>Loading videos...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        {videos.map((video, i) =>
          video.id.videoId ? (
            <iframe
              key={i}
              width="100%"
              height="250"
              style={{ borderRadius: "10px", border: "none" }}
              data-src={`https://www.youtube.com/embed/${video.id.videoId}`}
              ref={el => el && observerRef.current.observe(el)}
              allowFullScreen
            ></iframe>
          ) : null
        )}
      </div>
    </div>
  );
}
