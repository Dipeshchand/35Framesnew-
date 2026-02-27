import { useEffect } from "react";
import boss from "../assets/images/mainboss.jpg";
import videopeople from "../assets/images/pratapvideographer.jpg";
import editor from "../assets/images/Vasuphotoedtiter.jpg";
import both from "../assets/images/VEnkeyvideographer+edtiter.jpg";

export default function About() {

  useEffect(() => {
    document.title =
      "About 35 Frames Photography | Wedding Photographer in Bangalore";

    const metaDescription = document.querySelector(
      "meta[name='description']"
    );

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Learn about 35 Frames Photography, a professional wedding photography and videography studio based in Bangalore since 2004."
      );
    }
  }, []);

  return (
    <section className="w-full bg-[#F7F4ED] py-16 md:py-20 px-4 sm:px-6 mt-40">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h2 className="text-center text-3xl md:text-4xl font-serif font-bold text-gray-800">
          About 35 Frames Photography
        </h2>
        <p className="text-center text-gray-600 mt-2 text-base md:text-lg">
          Capturing emotions. Creating timeless memories.
        </p>

        {/* Founder Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-14">

          {/* IMAGE + NAME */}
          <div className="text-center">
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src={boss}
                alt="Founder"
                className="w-full h-[520px] sm:h-[380px] md:h-[650px] object-cover"
              />
            </div>

            <h3 className="mt-5 text-2xl font-serif font-bold text-gray-800">
              Founder — Somu Sekhar
            </h3>
            <p className="text-gray-600 italic">
              Founder of 35 Frames Photography
            </p>
          </div>

          {/* CONTENT */}
          <div>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Hello there, we are <span className="font-semibold">35 Frames Photography</span>, 
              a luxury photography brand dedicated to preserving life’s most meaningful 
              moments with elegance, artistry, and emotion.
            </p>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed mt-6">
              Founded in 2004 by <span className="font-semibold">Mr. Somu Sekhar</span>, we
              are a complete photography & videography studio equipped with expert 
              photographers, editors, videographers, and world-class technology.
            </p>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed mt-6">
              From weddings to birthdays, traditional photography to cinematic videography,
              we don’t just click pictures — we create memories that last forever.
            </p>
          </div>
        </div>

        {/* TEAM GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">

          <div className="rounded-3xl shadow-xl overflow-hidden bg-white">
            <img src={videopeople} className="w-full h-[320px] object-cover" />
            <div className="p-5 text-center">
              <h4 className="text-xl font-semibold">Pratap</h4>
              <p className="text-gray-600">Videographer</p>
            </div>
          </div>

          <div className="rounded-3xl shadow-xl overflow-hidden bg-white">
            <img src={editor} className="w-full h-[320px] object-cover" />
            <div className="p-5 text-center">
              <h4 className="text-xl font-semibold">Vashu</h4>
              <p className="text-gray-600">Photo Editor</p>
            </div>
          </div>

          <div className="rounded-3xl shadow-xl overflow-hidden bg-white">
            <img src={both} className="w-full h-[320px] object-cover" />
            <div className="p-5 text-center">
              <h4 className="text-xl font-semibold">Venkey</h4>
              <p className="text-gray-600">Videographer & Editor</p>
            </div>
          </div>
        </div>

        {/* Closing Line */}
        <p className="text-center text-lg md:text-xl mt-14 font-serif italic text-gray-800">
          We are truly honored to be a part of your beautiful celebrations.
        </p>
      </div>
    </section>
  );
}
