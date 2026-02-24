// import { useEffect, useState } from "react";

// const API = "http://localhost:5000";

// export default function Admin() {
//   const [albums, setAlbums] = useState([]);
//   const [photos, setPhotos] = useState([]);
//   const [title, setTitle] = useState("");
//   const [selectedAlbum, setSelectedAlbum] = useState("");
//   const [cover, setCover] = useState(null);
//   const [photo, setPhoto] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchAlbums();
//   }, []);

//   const fetchAlbums = async () => {
//     const res = await fetch(`${API}/albums`);
//     const data = await res.json();
//     setAlbums(data);
//   };

//   const fetchPhotos = async (id) => {
//     const res = await fetch(`${API}/upload/public/${id}`);
//     const data = await res.json();
//     setPhotos(data);
//   };

//   const createAlbum = async () => {
//     if (!title) return alert("Enter album name");

//     await fetch(`${API}/albums`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ title }),
//     });

//     setTitle("");
//     fetchAlbums();
//   };

//   const uploadCover = async () => {
//     if (!selectedAlbum || !cover) return alert("Select album & cover");

//     const fd = new FormData();
//     fd.append("image", cover);

//     await fetch(`${API}/albums/${selectedAlbum}/cover`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${token}` },
//       body: fd,
//     });

//     alert("Cover uploaded");
//   };

//   const uploadPhoto = async () => {
//     if (!selectedAlbum || !photo) return;

//     const fd = new FormData();
//     fd.append("image", photo);

//     setLoading(true);
//     await fetch(`${API}/upload/${selectedAlbum}`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${token}` },
//       body: fd,
//     });
//     setLoading(false);

//     fetchPhotos(selectedAlbum);
//   };

//   const deleteAlbum = async () => {
//     if (!selectedAlbum) return;

//     if (!window.confirm("Delete this album permanently?")) return;

//     await fetch(`${API}/albums/${selectedAlbum}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     setSelectedAlbum("");
//     setPhotos([]);
//     fetchAlbums();
//   };

//   return (
//     <div className="min-h-screen relative bg-gray-100 overflow-hidden">

//       {/* Animated Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 animate-gradient -z-10" />
//       <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 blur-3xl rounded-full animate-pulse" />
//       <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 blur-3xl rounded-full animate-pulse" />

//       <div className="max-w-6xl mx-auto p-6">
//         <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//         <p className="text-gray-600 mb-8">
//           Manage albums, covers and photos
//         </p>

//         {/* Album Section */}
//         <div className="bg-white p-6 rounded-xl shadow mb-8">
//           <h2 className="font-semibold text-lg mb-4">Album Management</h2>

//           <div className="grid md:grid-cols-3 gap-4">
//             <input
//               className="border p-2 rounded"
//               placeholder="New Album Name"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />

//             <button
//               onClick={createAlbum}
//               className="bg-black text-white rounded px-4"
//             >
//               Create Album
//             </button>

//             <select
//               className="border p-2 rounded"
//               onChange={(e) => {
//                 setSelectedAlbum(e.target.value);
//                 fetchPhotos(e.target.value);
//               }}
//             >
//               <option value="">Select Album</option>
//               {albums.map((a) => (
//                 <option key={a._id} value={a._id}>
//                   {a.title}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Upload Section */}
//         <div className="grid md:grid-cols-2 gap-6 mb-8">

//           {/* Cover Upload */}
//           <div className="bg-white p-6 rounded-xl shadow">
//             <h3 className="font-semibold mb-3">Upload Cover</h3>

//             <label className="flex flex-col sm:flex-row items-center gap-4">
//               <input
//                 type="file"
//                 className="hidden"
//                 onChange={(e) => setCover(e.target.files[0])}
//               />

//               <span className="bg-blue-600 text-white px-5 py-2 rounded cursor-pointer">
//                 Select Cover
//               </span>

//               <span className="text-sm text-gray-500">
//                 {cover ? cover.name : "No file selected"}
//               </span>
//             </label>

//             <button
//               onClick={uploadCover}
//               className="mt-4 bg-blue-600 text-white px-6 py-2 rounded w-full sm:w-auto"
//             >
//               Upload Cover
//             </button>
//           </div>

//           {/* Photo Upload */}
//           <div className="bg-white p-6 rounded-xl shadow">
//             <h3 className="font-semibold mb-3">Upload Photo</h3>

//             <label className="flex flex-col sm:flex-row items-center gap-4">
//               <input
//                 type="file"
//                 className="hidden"
//                 onChange={(e) => setPhoto(e.target.files[0])}
//               />

//               <span className="bg-green-600 text-white px-5 py-2 rounded cursor-pointer">
//                 Select Photo
//               </span>

//               <span className="text-sm text-gray-500">
//                 {photo ? photo.name : "No file selected"}
//               </span>
//             </label>

//             <button
//               onClick={uploadPhoto}
//               className="mt-4 bg-green-600 text-white px-6 py-2 rounded w-full sm:w-auto"
//             >
//               {loading ? "Uploading..." : "Upload Photo"}
//             </button>
//           </div>
//         </div>

//         {/* Delete Album */}
//         {selectedAlbum && (
//           <div className="bg-red-50 border border-red-200 p-6 rounded-xl mb-8">
//             <h3 className="text-red-600 font-semibold mb-2">
//               Danger Zone
//             </h3>
//             <button
//               onClick={deleteAlbum}
//               className="bg-red-600 text-white px-6 py-2 rounded"
//             >
//               Delete Album
//             </button>
//           </div>
//         )}

//         {/* Photos */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {photos.map((p) => (
//             <img
//               key={p._id}
//               src={p.url}
//               className="rounded-xl shadow hover:scale-105 transition"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";

const API = "http://localhost:5000";

export default function Admin() {
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [cover, setCover] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Please login first.");
      return;
    }
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const res = await fetch(`${API}/albums`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.log("Unauthorized or error:", res.status);
        setAlbums([]);
        return;
      }

      const data = await res.json();
      setAlbums(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Fetch albums error:", err);
      setAlbums([]);
    }
  };

  const fetchPhotos = async (id) => {
    try {
      const res = await fetch(`${API}/upload/public/${id}`);
      const data = await res.json();
      setPhotos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Fetch photos error:", err);
      setPhotos([]);
    }
  };

  const createAlbum = async () => {
    if (!title) return alert("Enter album name");

    try {
      await fetch(`${API}/albums`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });

      setTitle("");
      fetchAlbums();
    } catch (err) {
      console.log("Create album error:", err);
    }
  };

  const uploadCover = async () => {
    if (!selectedAlbum || !cover) return alert("Select album & cover");

    const fd = new FormData();
    fd.append("image", cover);

    try {
      await fetch(`${API}/albums/${selectedAlbum}/cover`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      alert("Cover uploaded");
      fetchAlbums();
    } catch (err) {
      console.log("Upload cover error:", err);
    }
  };

  const uploadPhoto = async () => {
    if (!selectedAlbum || !photo) return;

    const fd = new FormData();
    fd.append("image", photo);

    setLoading(true);

    try {
      await fetch(`${API}/upload/${selectedAlbum}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      fetchPhotos(selectedAlbum);
    } catch (err) {
      console.log("Upload photo error:", err);
    }

    setLoading(false);
  };

  const deleteAlbum = async () => {
    if (!selectedAlbum) return;
    if (!window.confirm("Delete this album permanently?")) return;

    try {
      await fetch(`${API}/albums/${selectedAlbum}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSelectedAlbum("");
      setPhotos([]);
      fetchAlbums();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Album Section */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="font-semibold text-lg mb-4">Album Management</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="New Album Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            onClick={createAlbum}
            className="bg-black text-white rounded px-4"
          >
            Create Album
          </button>

          <select
            className="border p-2 rounded"
            value={selectedAlbum}
            onChange={(e) => {
              setSelectedAlbum(e.target.value);
              fetchPhotos(e.target.value);
            }}
          >
            <option value="">Select Album</option>
            {Array.isArray(albums) &&
              albums.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.title}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Upload Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-3">Upload Cover</h3>

          <input
            type="file"
            onChange={(e) => setCover(e.target.files[0])}
          />

          <button
            onClick={uploadCover}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
          >
            Upload Cover
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-3">Upload Photo</h3>

          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
          />

          <button
            onClick={uploadPhoto}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
          >
            {loading ? "Uploading..." : "Upload Photo"}
          </button>
        </div>
      </div>

      {/* Delete */}
      {selectedAlbum && (
        <div className="bg-red-100 p-6 rounded-xl mb-8">
          <button
            onClick={deleteAlbum}
            className="bg-red-600 text-white px-6 py-2 rounded"
          >
            Delete Album
          </button>
        </div>
      )}

      {/* Photos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.isArray(photos) &&
          photos.map((p) => (
            <img
              key={p._id}
              src={p.url}
              alt=""
              className="rounded-xl shadow"
            />
          ))}
      </div>
    </div>
  );
}
