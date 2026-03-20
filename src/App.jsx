import { Routes, Route } from "react-router-dom";
import ProLayout from "./Site/Prolayout";
import Dashboard from "./Components/Dashboard";
import About from "./Components/About";
import Contact from "./Components/Contact";
import NotFound from "./Site/NotFound";
import Blog from "./Components/Blog";
import Home from "./Components/Home";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        <Route path="home" element={<Home />} />
        <Route path="blog" element={<Blog />} />
      </Route>
    </Routes>
  );
}

export default App;
