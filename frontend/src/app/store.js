import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import showReducer from "./showSlice";
import tokenReducer from "./tokenSlice";
import messageReducer from "./messageSlice";
import nameReducer from "./nameSlice";
import titleReducer from "./titleSlice";
import bodyReducer from "./bodySlice";
import blogReducer from "./blogSlice";
import blogsReducer from "./blogsSlice";

const store = configureStore({
  reducer: {
    showStatus: showReducer,
    message: messageReducer,
    name: nameReducer,
    user: userReducer,
    token: tokenReducer,
    title: titleReducer,
    body: bodyReducer,
    blog: blogReducer,
    blogs: blogsReducer,
  },
});

export default store;
