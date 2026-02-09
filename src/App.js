import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Projects from './components/Projects';

import LoginPage from './components/Admin/LoginPage';
import ProtectedRoute from './components/Admin/ProtectedRoute';

import Contact from './components/Contact';
import Navbar from './components/navbar';
import ScrollToTopButton from './components/ScrollToTopButton';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './components/NotFound';
import Footer from './components/footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />

          <Route path="/admin/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>

          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

export default App;
