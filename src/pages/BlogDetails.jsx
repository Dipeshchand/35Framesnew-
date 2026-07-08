import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
     const res = await axios.get(
  `https://three5framesnew-backend.onrender.com/api/blogs/${slug}`
);
      setBlog(res.data);
    };

    fetchBlog();
  }, [slug]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#faf7f2] min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* BLOG IMAGE */}
        <div className="w-full h-[950px] overflow-hidden">
          <img
            src={blog.image.url}
            alt={blog.title}
            className="w-full h-full object-cover" 
          />
        </div>

        {/* CONTENT */}
        <div className="p-8 md:p-12">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl  font-semibold mb-3 leading-tight"
          style={{fontFamily:"light"}}
          >
            {blog.title}
          </h1>

          {/* Date */}
          <p className="text-sm text-gray-500 mb-6">
            {new Date(blog.createdAt).toLocaleDateString("en-GB")}
          </p>

          {/* Divider */}
          <div className="w-20 h-[2px] bg-black mb-8"></div>

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {blog.content.split("\n").map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
