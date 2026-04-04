import React from "react";
import cover1 from "../../assets/images/n4.jpg";
import cover2 from  "../../assets/images/main-4.jpg"
import cover3 from "../../assets/images/childs1.jpg"
import cover4 from "../../assets/images/maternity.JPG"
import cover5 from "../../assets/images/cr2.JPG";
import cover6 from "../../assets/images/maternity.JPG";
export default function CapturedMoments() {
  const couples = [
    { 
      id: 1, 
      name: "Wedding", 
      desc: "Capturing the emotions, rituals, and timeless love that make your big day unforgettable.",
      image: cover1 
    },
    {
      id:4,
      name:"Maternity",
      desc:"A beautiful celebration of motherhood — preserving the glow, emotions, and the miracle of new beginnings.",
      image:cover4
    },
    { 
      id: 2, 
      name: "Pre wedding", 
      desc: "Storytelling portraits that capture your love, chemistry, and the start of your forever journey.",
      image: cover2
    },
    { 
      id: 3, 
      name: "Kids photography", 
      desc: "Pure innocence, laughter, and little moments of joy — frozen beautifully in time.",
      image: cover3 
    },
    { 
      id: 5, 
      name: "Engagement", 
      desc: "Cherishing the promise of forever with elegant, heartfelt frames filled with love and excitement.",
      image: cover5 
    },
    // { 
    //   id: 6, 
    //   name: "Pre birthday shoots", 
    //   desc: "Adorable, fun, and joy-filled photos that celebrate milestones before the big birthday moment.",
    //   image: cover6 
    // },
  ];

  return (
    <section className="w-full bg-[#F6F3EC] py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-serif font-baskervville  mb-4" style={{fontFamily:"light"}}>
          Explore each celebration and witness seamless experiences unfold.
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-700 mb-12 font-baskervville ">
          Click on each event to see how we brought the vision to life.
        </p>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {couples.map((c) => (
            <div key={c.id} className="cursor-pointer">
              
              {/* Image */}
              <div className="overflow-hidden rounded-lg shadow-sm group">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Name */}
              <h3 className="mt-4 text-2xl font-serif ">
                {c.name}
              </h3>

              {/* Description */}
              <p className="text-gray-700 mt-2 text-sm md:text-base">
                {c.desc}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
