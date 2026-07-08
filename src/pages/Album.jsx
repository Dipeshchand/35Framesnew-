

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Album() {
  const { slug } = useParams();

  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Fetch albums
        // http://localhost:5173
        // https://vivid-photography.onrender.com
        const albums = await fetch("https://three5framesnew-backend.onrender.com/albums/public")
          .then((r) => r.json());

        console.log("Slug:", slug);
        console.log("Albums:", albums);

        const found = albums.find((a) => a.slug === slug);
        setAlbum(found);

        // If album not found, stop here
        if (!found) return;

        // Fetch photos
        const images = await fetch(
          `https://three5framesnew-backend.onrender.com/upload/album/${found._id}`
        ).then((r) => r.json());

        setPhotos(images);
      } catch (err) {
        console.error("Error loading album:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [slug]);

  // ✅ FULL SCREEN LOADING
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h2 className="text-xl">Loading Album...</h2>
      </div>
    );
  }

  // ❌ ALBUM NOT FOUND
  if (!album) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h2 className="text-xl">Album not found</h2>
      </div>
    );
  }

  return (
    <div className="mt-28 px-6">
      <h2 className="text-3xl text-center mb-10">{album.title}</h2>

      {photos.length === 0 ? (
        <p className="text-center">No photos found</p>
      ) : (
        <div className="columns-2 md:columns-3 lg:columns-4 [column-gap:1px]">
          {photos.map((photo) => (
            <img
              key={photo._id}
              src={photo.url}
              className="w-full block mb-[1px]"
              loading="lazy"
              alt=""
            />
          ))}
        </div>
      )}
    </div>
  );
}