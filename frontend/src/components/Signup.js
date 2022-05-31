import axios from "axios";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { show, hide } from "../app/showSlice";
import { setUser } from "../app/userSlice";
import { setmessage } from "../app/messageSlice";
import url from "../Url";

const Signup = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const message = useSelector((state) => state.message.value);
  const showStatus = useSelector((state) => state.showStatus.value);
  const dispatch = useDispatch();

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/users/signup`, user);
      dispatch(setmessage(data));
      dispatch(show());
      data === "User signed up successfully" &&
        navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
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
                        <ExclamationIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Account Signup
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
                      onClick={() => dispatch(hide())}
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
      <div className="mb-40 min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://cdn2.iconfinder.com/data/icons/aami-web-internet/64/aami4-02-512.png"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-700">
              Sign your account up
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              Or
              <Link
                to="/signin"
                className="font-medium text-slate-700 hover:text-slate-500 ml-1"
              >
                Signin
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={signupHandler}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="name" className="sr-only">
                  Username
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autocomplete="name"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-slate-700 focus:border-slate-700 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  onChange={(e) =>
                    dispatch(setUser({ ...user, name: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label for="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autocomplete="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-slate-700 focus:border-slate-700 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={(e) =>
                    dispatch(setUser({ ...user, email: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label for="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-slate-700 focus:border-slate-700 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) =>
                    dispatch(setUser({ ...user, password: e.target.value }))
                  }
                  required
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-slate-500 group-hover:text-slate-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
