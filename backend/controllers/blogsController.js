// importing models
import Blog from "../models/blog.js";

export const getBlogs = async (req, res) => {
  const { name } = req.user;
  const blogs = await Blog.find();
  res.send({ blogs, name });
};

export const getMyBlogs = async (req, res) => {
  const { name } = req.user;
  const myBlogs = await Blog.find({ author: name });
  res.send({ blogs: myBlogs, name });
};

export const postBlogs = async (req, res) => {
  const { title, body } = req.body;
  const { name } = req.user;
  if (body.length >= 10) {
    const blog = await Blog.create({ title, body, author: name });
    res.send("Blog posted successfully");
  } else res.send("Body has to be more than 10 characters long");
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const { name } = req.user;
  const blogToDelete = await Blog.findById(id);
  if (blogToDelete?.author === name) {
    await Blog.findByIdAndDelete(id);
    res.send("Blog deleted successfully");
  }
};

export const getSpecificBlog = async (req, res) => {
  const { id } = req.params;
  const blogToSend = await Blog.findById(id);
  blogToSend ? res.send(blogToSend) : res.send("Blog not found");
};

export const editBlog = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const { name } = req.user;
  const blogToEdit = await Blog.findById(id);
  if (blogToEdit?.author === name) {
    await Blog.findByIdAndUpdate(id, { title, body, author: name });
    res.send("Blog edited successfully");
  }
};
