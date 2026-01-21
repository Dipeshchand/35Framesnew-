import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Portfolio() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/albums")
      .then((res) => res.json())
      .then(setAlbums);
  }, []);

  return (
    <div className="px-6 py-20 bg-[#F7F4ED]">
      <h2
        className="text-4xl text-center mb-14 mt-13 "
        style={{ fontFamily: "Seasons2" }}
      >
        Our Weddings
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {albums.map((album) => (
          <Link
            key={album._id}
            to={`/album/${album.slug}`}
            className="group relative rounded-xl overflow-hidden shadow-lg"
          >
            {/* Image Wrapper (IMPORTANT PART) */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={album.coverUrl}
                alt={album.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition"></div>

            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
              <h3 className="text-white text-lg font-semibold tracking-wide">
                {album.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const CACHE_KEY = "portfolio_albums";
// const CACHE_TIME = 24 * 60 * 60 * 1000; // 24 hours

// export default function Portfolio() {
//   const [albums, setAlbums] = useState([]);

//   useEffect(() => {
//     const cached = localStorage.getItem(CACHE_KEY);
//     const cachedTime = localStorage.getItem(`${CACHE_KEY}_time`);

//     const isCacheValid =
//       cached && cachedTime && Date.now() - cachedTime < CACHE_TIME;

//     if (isCacheValid) {
//       // Load from cache
//       setAlbums(JSON.parse(cached));
//     } else {
//       // Fetch fresh data
//       fetch("http://localhost:5000/albums")
//         .then((res) => res.json())
//         .then((data) => {
//           setAlbums(data);
//           localStorage.setItem(CACHE_KEY, JSON.stringify(data));
//           localStorage.setItem(`${CACHE_KEY}_time`, Date.now());
//         });
//     }
//   }, []);

//   return (
//     <div className="px-6 py-20 bg-[#F7F4ED]">
//       <h2
//         className="text-4xl text-center mb-14 mt-10 "
//         style={{ fontFamily: "Seasons2" }}
//       >
//         Our Weddings
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
//         {albums.map((album) => (
//           <Link
//             key={album._id}
//             to={`/album/${album.slug}`}
//             className="group relative rounded-xl overflow-hidden shadow-lg"
//           >
//             {/* Image */}
//             <div className="relative aspect-[4/3] overflow-hidden">
//               <img
//                 src={album.coverUrl}
//                 alt={album.title}
//                 loading="lazy"
//                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//               />
//             </div>

//             {/* Overlay */}
//             <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />

//             {/* Title */}
//             <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
//               <h3 className="text-white text-lg font-semibold tracking-wide">
//                 {album.title}
//               </h3>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
