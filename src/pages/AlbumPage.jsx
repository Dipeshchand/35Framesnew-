// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function AlbumPage() {
//   const { name } = useParams();
//   const [album, setAlbum] = useState(null);
//   const [photos, setPhotos] = useState([]);

//   useEffect(() => {
//     async function loadData() {
//       const albums = await fetch("http://localhost:5000/albums").then(r => r.json());
//       const found = albums.find(a => a.slug === name);
//       setAlbum(found);

//       if (found) {
//         const images = await fetch(
//           `http://localhost:5000/upload/public/${found._id}`
//         ).then(r => r.json());

//         setPhotos(images);
//       }
//     }

//     loadData();
//   }, [name]);

//   if (!album) return <div>Loading...</div>;

//   return (
//     <div className="mt-24 px-6">
//       <h2 className="text-3xl text-center mb-10" style={{fontFamily:"light1"}}>{album.title}</h2>

//       <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
//         {photos.map(photo => (
//           <img
//             key={photo._id}
//             src={photo.url}
//             className="w-full mb-2 rounded-lg"
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AlbumPage() {
  const { name } = useParams();
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const albums = await fetch(" https://three5framesnew-backend.onrender.com/albums").then((r) =>
        r.json()
      );

      const found = albums.find((a) => a.slug === name);
      setAlbum(found);

      if (found) {
        const images = await fetch(
          ` https://three5framesnew-backend.onrender.com/upload/public/${found._id}`
        ).then((r) => r.json());

        setPhotos(images);
      }

      setLoading(false);
    }

    loadData();
  }, [name]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <p className="text-gray-500 text-lg">Loading album...</p>
      </div>
    );

  return (
    <div className="px-5 md:px-12 py-24 bg-[#F7F4ED] min-h-screen">
      {/* Title */}
      <h2
        className="text-4xl text-center mb-12 mt-10 tracking-wide"
        style={{ fontFamily: "light1" }}
      >
        {album.title}
      </h2>

      {/* Gallery */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-1">
        {photos.map((photo) => (
          <div
            key={photo._id}
            className="overflow-hidden  group"
          >
            <img
              src={photo.url}
              alt=""
              loading="lazy"
              className="w-full  transition duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
