import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LogIn from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/auth/login"} element={<LogIn />} />
      <Route path={"/auth/register"} element={<Register />} />
      <Route path={"/user/profile"} element={<Profile />} />
      <Route path={"*"} element={<NotFound />} />
    </Routes>
  );
};

export default App;
