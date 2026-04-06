import { Routes, Route } from "react-router-dom";
import ProLayout from "./Site/Prolayout";
import Dashboard from "./Components/Dashboard";
import About from "./Components/About";
import Contact from "./Components/Contact";
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
      {/* <Route path="/" element={<Home1 />} /> */}
      <Route path="/" element={<ProLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        <Route path="blog" element={<Blog />} />
        <Route path="old-home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
