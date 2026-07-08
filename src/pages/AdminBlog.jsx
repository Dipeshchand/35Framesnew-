import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBlog() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔐 Protect page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);
// http://localhost:5000
// https://vivid-photography-1.onrender.com
  // 📥 Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("https://three5framesnew-backend.onrender.com/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ➕ Create blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !excerpt || !content || !image) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("image", image);

    try {
      setLoading(true);
      await axios.post("https://three5framesnew-backend.onrender.com/api/blogs", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Blog published successfully");
      setTitle("");
      setExcerpt("");
      setContent("");
      setImage(null);
      fetchBlogs();
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // 🗑 Delete blog
  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
      // https://vivid-photography-1.onrender.com
    try {
      await axios.delete(`https://three5framesnew-backend.onrender.com/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchBlogs();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Blog Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your blogs professionally
        </p>
      </div>

      {/* Add Blog */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-semibold mb-6">➕ Add New Blog</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Excerpt</label>
            <textarea
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Short summary of the blog"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              rows="6"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Write full blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Cover Image
            </label>
            <input
              type="file"
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:bg-black file:text-white
                         hover:file:bg-gray-800"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold
                       hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>

      {/* Blog List */}
      <div className="max-w-6xl mx-auto mt-14">
        <h2 className="text-2xl font-bold mb-6">📚 All Blogs</h2>

        {blogs.length === 0 ? (
          <p className="text-gray-500">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
              >
                <img
                  src={blog.image.url}
                  alt={blog.title}
                  className="h-112 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {blog.title}
                  </h3>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => deleteBlog(blog._id)}
                      className="text-sm bg-red-600 text-white px-4 py-2 rounded-lg
                                 hover:bg-red-700 transition"
                    >
                      Delete
                    </button>

                    <span className="text-xs text-gray-400">
                      #{blog._id.slice(-5)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


