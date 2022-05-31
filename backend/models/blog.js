import mongoose from "mongoose";

const Blog = mongoose.model("Blog", {
  title: String,
  body: String,
  author: String,
});

export default Blog;
