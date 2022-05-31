import axios from "axios";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon, CheckIcon } from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";
import { show, hide } from "../app/showSlice";
import { setmessage } from "../app/messageSlice";
import { setBlog } from "../app/blogSlice";
import { useNavigate } from "react-router-dom";
import url from "../Url";

const Addblog = () => {
  const token = useSelector((state) => state.token.value);
  const blog = useSelector((state) => state.blog.value);
  const showStatus = useSelector((state) => state.showStatus.value);
  const message = useSelector((state) => state.message.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/blogs`, blog, {
        headers: { authorization: token },
      });
      dispatch(setmessage(data));
      dispatch(show());
    } catch (err) {
      console.log(err);
    }
  };

  const okHandler = () => {
    if (message === "Blog posted successfully") {
      navigate("/");
      dispatch(hide());
    } else if (message === "Body has to be more than 10 characters long")
      dispatch(hide());
  };

  return (
    <>
      <Transition.Root show={showStatus} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => dispatch(hide())}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        {message === "Blog posted successfully" ? (
                          <CheckIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        ) : (
                          <ExclamationIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Create a blog
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">{message}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={okHandler}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="mb-14 min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://cdn2.iconfinder.com/data/icons/aami-web-internet/64/aami4-02-512.png"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-700">
              Write a blog
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={submitHandler}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="blog-title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="blog-title"
                        id="blog-title"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 p-1"
                        placeholder="Enter your blog title"
                        onChange={(e) =>
                          dispatch(setBlog({ ...blog, title: e.target.value }))
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    About
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-1"
                      placeholder="Enter your blog content"
                      onChange={(e) =>
                        dispatch(setBlog({ ...blog, body: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brief description of your blog.
                  </p>
                </div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Post blog
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addblog;
