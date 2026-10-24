import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ParticlesBackground from "./components/ParticlesBackground";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./components/Hero";
import Features from "./pages/Features";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ParticlesBackground />
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}