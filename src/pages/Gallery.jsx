import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Portfolio.css";

// IMAGES
import img1 from "../assets/images/reff1-min.JPG";
import img2 from "../assets/images/reff2-min.JPG";
import img3 from "../assets/images/reff3-min.JPG";
import img4 from "../assets/images/reff4-min.JPG";
import img5 from "../assets/images/reff5-min.JPG";
import img6 from "../assets/images/reff6-min.JPG";
import img7 from "../assets/images/reff7-min.JPG";
import img8 from "../assets/images/reff8-min.JPG";
import img9 from "../assets/images/reff9-min.JPG";
import img10 from "../assets/images/reff10-min.JPG";
import img11 from "../assets/images/reff11-min.JPG";
import img12 from "../assets/images/reff12-min.JPG";
import img13 from "../assets/images/reff13-min.JPG";
import img14 from "../assets/images/reff14-min.JPG";
import img15 from "../assets/images/reff15-min.JPG";
import img16 from "../assets/images/reff16-min.JPG";
import img17 from "../assets/images/reff17-min.JPG";
import img18 from "../assets/images/reff18-min.JPG";
import img19 from "../assets/images/reff19-min.JPG";
import img20 from "../assets/images/reff20-min.JPG";
import img21 from "../assets/images/reff21-min.JPG";
import img22 from "../assets/images/reff22-min.JPG";
import img23 from "../assets/images/reff23-min.JPG";
import img24 from "../assets/images/reff24-min.JPG";
import img25 from "../assets/images/reff25-min.JPG";
import img26 from "../assets/images/reff26-min.JPG";
import img27 from "../assets/images/reff27-min.JPG";
import img28 from "../assets/images/reff28-min.JPG";
import img29 from "../assets/images/reff29-min.JPG";
import img30 from "../assets/images/reff30-min.JPG";

const images = [
  img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,
  img11,img12,img13,img14,img15,img16,img17,img18,img19,img20,
  img21,img22,img23,img24,img25,img26,img27,img28,img29,img30
];

const breakpointColumnsObj = {
  default: 3,
  1024: 2,
  640: 1
};

export default function Portfolio() {
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
  const [covers, setCovers] = useState([]);
  const [zoomImg, setZoomImg] = useState(null);


  const openZoom = (img) => setZoomImg(img);
  const closeZoom = () => setZoomImg(null);

  return (
    <div className="w-full px-1 sm:px-4 mt-30 bg-[#F6F3EC]">

      {/* MASONRY GRID */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex "
        columnClassName=""
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            onClick={() => openZoom(img)}
            className="w-full object-cover  cursor-zoom-in hover:opacity-95 transition"
          />
        ))}
      </Masonry>

      {/* ZOOM */}
      {zoomImg && (
        <div className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center p-4" onClick={closeZoom}>
          <img
            src={zoomImg}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
