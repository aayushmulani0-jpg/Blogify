

import { Routes, Route, Navigate } from "react-router-dom";
import ProLayout from "./Site/Prolayout";
import Dashboard from "./Components/Dashboard";
import About from "./Components/About";
import Contact from "./Components/Contact";
import NotFound from "./Site/NotFound";
import Blog from "./Components/Blog";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => !!state.user.token);
  console.log("App component - isAuthenticated: ", isAuthenticated);

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/*"
        element={
          isAuthenticated ? <ProLayout /> : <Navigate to="/home" replace />
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<Blog />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

