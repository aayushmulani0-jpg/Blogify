import { Routes, Route } from "react-router-dom";
import ProLayout from "./Site/Prolayout";
import Dashboard from "./Components/Dashboard";
import AboutHome from "./Components/AboutHome";
import ContactHome from "./Components/ContactHome";
import NotFound from "./Site/NotFound";
import Blog1 from "./Components/Blog1";
import Home from "./Components/Home";
import Home1 from "./Components/Home1";
import Blog from "./Components/Blog";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="home" element={<Home1 />} />
      <Route path="blog1" element={<Blog1 />} />
      <Route path="contact" element={<ContactHome />} />
      <Route path="about" element={<AboutHome />} />
      {/* <Route path="/" element={<Home1 />} /> */}
      <Route path="/" element={<ProLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="blog" element={<Blog />} />
        <Route path="old-home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
