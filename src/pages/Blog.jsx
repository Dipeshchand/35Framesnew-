import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
    // https://vivid-photography-1.onrender.com
      .get("https://three5framesnew-backend.onrender.com/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="px-6 md:px-16 py-20 bg-[#FFF8EF] min-h-screen">
      <h1 className="text-4xl font-semibold text-center mb-14" style={{fontFamily:"light1"}}>
        Our Blogs
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white border rounded-xl shadow-sm p-4"
          >
            {/* IMAGE */}
            <div className="overflow-hidden rounded-xl aspect-[3/4]">
              <img
                src={blog.image.url}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="pt-5">
              <h2 className="text-2xl font-semibold  mb-2" style={{fontFamily:"Seasons1"}}>
                {blog.title}
              </h2>

              <p className="text-sm text-gray-500 mb-1">
                {new Date(blog.createdAt).toISOString().split("T")[0]}
              </p>

              <p className=" leading-relaxed mb-4" style={{fontFamily:"light"}}>
                {blog.excerpt}
              </p>

              <Link to={`/blogs/${blog.slug}`}>
                <button className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800 transition">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
