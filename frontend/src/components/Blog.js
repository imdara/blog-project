import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import url from "../Url";

const Blog = ({ id, title, body, author }) => {
  const name = useSelector((state) => state.name.value);
  const token = useSelector((state) => state.token.value);
  const notify = (message) => toast(message);
  const deleteHandler = async () => {
    const { data } = await axios.delete(`${url}/blogs/${id}`, {
      headers: { authorization: token },
    });
    notify(data);
  };
  return (
    <div class="max-w-lg mx-auto">
      <div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
        <img
          class="rounded-t-lg"
          src="https://flowbite.com/docs/images/blog/image-1.jpg"
          alt=""
        />
        <div class="p-5">
          <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2">
            {title}
          </h5>
          <p class="font-normal text-gray-700 mb-3">{body}</p>
          <p class="font-normal text-gray-500 mb-3">Posted by {author}</p>
          {name === author && (
            <>
              <Link
                to={`/edit-blog/${id}`}
                class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
              >
                Edit
              </Link>
              <button
                class="ml-2 text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
                onClick={deleteHandler}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
