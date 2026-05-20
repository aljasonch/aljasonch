import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Projects from './components/Projects';
import Blog from './components/Blog';
import BlogDetail from './components/Blog/Detail';
import Admin from './components/Admin';
import CV from './components/CV';
import Contact from './components/Contact';
import Navbar from './components/navbar';
import ScrollToTopButton from './components/ScrollToTopButton';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './components/NotFound';
import Footer from './components/footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-950 flex flex-col justify-between">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Redirect old projects path to the new portfolio URL */}
            <Route path="/projects" element={<Navigate to="/portfolio" replace />} />
            <Route path="/portfolio" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

export default App;
