
import express from "express";
import multer from "multer";
import slugify from "slugify";
import Blog from "../models/Blog.js";
import cloudinary from "../cloudinary.js";
import auth from "../middleware/auth.js";


const router = express.Router();
const upload = multer({ dest: "uploads/" });

// CREATE BLOG
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, excerpt, content } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path);

    const blog = new Blog({
      title,
      slug: slugify(title, { lower: true }),
      excerpt,
      content,
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL BLOGS
router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

// GET SINGLE BLOG
// GET SINGLE BLOG BY SLUG
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json(error);
  }
});


//Delete Blogs 

router.delete("/:id",auth, async (req,res)=>{
  try{
    const blog = await Blog.findById(req.params.id);
    if(!blog){
      return res.status(404).json({message:"Blog not Found"})
    }
    //Delete Image from Cloudenly 
    await cloudinary.uploader.destroy(blog.image.public_id);

    //Delete from MongoDB
    await Blog.findByIdAndDelete(req.params.id);

    res.json({message:"Blog deleted successfully"})
  }catch(error){
    res.status(500).json({message:"Delete Failed"})
  }
})

export default router;
