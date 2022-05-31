import axios from "axios";
import Blog from "./Blog";
import { useSelector, useDispatch } from "react-redux";
import { setBlogs } from "../app/blogsSlice";
import { setName } from "../app/nameSlice";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import url from "../Url";

const Myblogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.value);
  const name = useSelector((state) => state.name.value);
  const token = useSelector((state) => state.token.value);
  const getBlogs = async () => {
    const { data } = await axios.get(`${url}/blogs/mine`, {
      headers: { authorization: token },
    });
    dispatch(setBlogs(data.blogs));
  };

  const getName = async () => {
    const { data } = await axios.get(`${url}/blogs`, {
      headers: { authorization: token },
    });
    dispatch(setName(data.name));
  };

  useEffect(() => {
    getBlogs();
  }, [blogs]);

  useEffect(() => {
    getName();
  }, [name]);

  return (
    <section className="text-gray-600 body-font">
      <ToastContainer />
      <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-700">
        My Blogs
      </h2>
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        {blogs && (
          <div className="flex flex-wrap -m-4">
            {blogs.map((blog, i) => (
              <Blog
                id={blog._id}
                title={blog.title}
                body={blog.body}
                author={blog.author}
                key={i + 1}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Myblogs;
