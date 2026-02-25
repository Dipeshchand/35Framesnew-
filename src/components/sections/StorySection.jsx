import img1 from "../../assets/images/cr1.JPG";
import img2 from "../../assets/images/cr2.JPG";
import { FaWhatsapp, FaInstagram, FaPhoneAlt } from "react-icons/fa";

export default function StorySection() {
  return (
    <section className="w-full bg-[#F6F3EC] px-6 py-16 md:px-16 lg:px-24">
      <div>
         <div className="fixed right-4  top-1/4  z-50 flex flex-col gap-4 mt-130">

        <a
          href="https://wa.me/919902783821"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
        >
          <FaWhatsapp size={22} />
        </a>

        <a
          href="https://www.instagram.com/storiesby35frames?utm_source=qr&igsh=MW01bzNmcTZybGM5Ng%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-pink-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
        >
          <FaInstagram size={22} />
        </a>
        <a
          href="tel:+919902783821"
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
        >
          <FaPhoneAlt size={20} />
        </a>
      </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE TEXT */}
        <div>
          <h2 className="text-3xl md:text-5xl font-serif italic mb-6">
            Moments, Perfectly Planned
          </h2>

          <p className="text-base md:text-lg leading-relaxed mb-4">
            An event is more than a gathering — it’s an experience, a vision brought to
            life. From thoughtfully curated themes and seamless coordination to
            breathtaking décor, music, and joyful celebrations, every element must work
            in harmony. But without careful planning, even the most beautiful ideas can
            remain unfinished.
          </p>

          <p className="text-base md:text-lg leading-relaxed text-[#4B463E]">
            At 35FRAMESPHOTOGRAPHY, we turn moments into unforgettable memories.
            We capture with precision, creativity, and heart — transforming your vision
            into timeless frames. From the first shot to the final edit, we handle every
            detail so you can be fully present, while we preserve every emotion beautifully
            and effortlessly.
          </p>
        </div>

        {/* RIGHT SIDE IMAGES */}
        <div className="relative flex justify-center md:justify-end">

          {/* BACK IMAGE */}
          <img
            src={img1}
             className="overflow-hidden w-[200px]  md:w-[400px] lg:w-[450px]  translate-x-26  rounded-lg shadow-lg opacity-90"
          />

          {/* FRONT IMAGE */}
          <img
            src={img2}
            className="w-[170px] md:w-[260px] lg:w-[250px] rounded-lg shadow-xl absolute top-5 left-10 md:top-10 md:left-10"
          />
        </div>

      </div>
    </section>
  );
}
