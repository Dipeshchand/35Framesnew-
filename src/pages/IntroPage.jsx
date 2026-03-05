import { useNavigate } from "react-router-dom";

import img1 from "../assets/images/reff1-min.JPG";
import img2 from "../assets/images/reff2-min.JPG";
import img3 from "../assets/images/reff3-min.JPG";
import img4 from "../assets/images/reff4-min.JPG";
import img5 from "../assets/images/reff5-min.JPG";
import img6 from "../assets/images/reff6-min.JPG";
import img7 from "../assets/images/reff7-min.JPG";
//
import img8 from "../assets/images/reff8-min.JPG";
import img9 from "../assets/images/reff9-min.JPG";
import img10 from "../assets/images/reff10-min.JPG";
import img11 from "../assets/images/reff11-min.JPG";
import img12 from "../assets/images/reff12-min.JPG";
import img13 from "../assets/images/reff13-min.JPG";
import img14 from "../assets/images/reff14-min.JPG";

export default function IntroPage() {
  const navigate = useNavigate();

  const images = [
    img1, img2, img3, img4, img5,
    img6, img7, img8, img9,
    img10, img11, img12, img13, img14
  ];

  let imageIndex = 0;

  return (
    <div className="w-full h-screen ">
        {/* overflow-hidden */}
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
        {Array.from({ length: 15 }).map((_, i) => {
          // CENTER CELL (index 7)
          if (i === 7) {
            return (
              <div
                key={i}
                className="flex items-center justify-center bg-[#DCCDC2]"
              >
                <div className="text-center">
                  <h1 className="text-3xl md:text-5xl font-baskervville mb-4" style={{fontFamily:"Seasons"}}>
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

          const img = images[imageIndex++];

          return (
            <div key={i} className="overflow-hidden">
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
