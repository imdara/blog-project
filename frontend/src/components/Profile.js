import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setBlogs } from "../app/blogsSlice";
import { setName } from "../app/nameSlice";
import { useEffect } from "react";
import url from "../Url";

const Profile = () => {
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
    const { data } = await axios.get(`${url}/blogs/mine`, {
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
    <>
      <div className="mb-36 min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-md border border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      {name}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  No. of blogs posted
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-md border border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    {blogs.length}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Change
                  </label>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <Link
                to="/my-blogs"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit/delete blogs
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </>
  );
};

export default Profile;
