import { Router } from "express";

// importing controller
import {
  deleteBlog,
  editBlog,
  getBlogs,
  getMyBlogs,
  getSpecificBlog,
  postBlogs,
} from "../controllers/blogsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router()
  .get("/", authMiddleware, getBlogs)
  .get("/mine", authMiddleware, getMyBlogs)
  .post("/", authMiddleware, postBlogs)
  .get("/:id", getSpecificBlog)
  .put("/:id", authMiddleware, editBlog)
  .delete("/:id", authMiddleware, deleteBlog);

export default router;
