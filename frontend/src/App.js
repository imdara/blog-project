import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import NavigationDrawer from "./components/NavigationDrawer";
import Signin from "./components/Signin";
import Addblog from "./components/Addblog";
import Myblogs from "./components/Myblogs";
import Bloglist from "./components/Bloglist";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Editblog from "./components/Editblog";
import Footer from "./components/Footer";

const App = () => {
  const token = useSelector((state) => state.token.value);
  return (
    <div className="App">
      <NavigationDrawer />
      <Routes>
        <Route index element={token ? <Bloglist /> : <Signin />} />
        <Route path="/create-blog" element={token ? <Addblog /> : <Signin />} />
        <Route path="/my-blogs" element={token ? <Myblogs /> : <Signin />} />
        <Route
          path="/edit-blog/:id"
          element={token ? <Editblog /> : <Signin />}
        />
        <Route path="/signup" element={token ? <Bloglist /> : <Signup />} />
        <Route path="/profile" element={token ? <Profile /> : <Signin />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
