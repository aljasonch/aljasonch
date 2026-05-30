import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaSun, FaMoon } from 'react-icons/fa';
import { personalInfo } from '../../data/content';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isDark, toggleMode } = useTheme();

  const toggleNavbar = () => setIsOpen((prev) => !prev);
  const closeNavbar = () => setIsOpen(false);
  const openCommandPalette = () => {
    closeNavbar();
    window.dispatchEvent(new Event('open-command-palette'));
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Blog', path: '/blog' },
    { label: 'CV', path: '/cv' },
    { label: 'Contact', path: '/contact' },
  ];

  const desktopNavItemVariants = {
    hover: { scale: 1.02, y: -1, transition: { duration: 0.2 } },
    tap: { scale: 0.98 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const panelVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'spring', stiffness: 350, damping: 30 } },
    exit: { x: '100%', transition: { type: 'spring', stiffness: 350, damping: 30 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.06, duration: 0.3 },
    }),
  };

  return (
    <>
      {/* ─── Fixed Header Bar ─── */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ backgroundColor: 'var(--header-bg)' }}
        className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-neutral-800/50 shadow-lg"
      >
        <div className="container mx-auto px-6 py-4 max-w-6xl">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="cursor-pointer" onClick={closeNavbar}>
              <motion.img
                src="/aljasonch.png"
                alt="aljasonch"
                className="h-9 w-auto object-contain"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path} className="cursor-pointer">
                    <motion.div
                      className={`relative px-4 py-2 rounded-full text-sm poppins-semibold transition-colors duration-300 ${
                        isActive
                          ? 'text-theme bg-theme-soft'
                          : 'text-neutral-300 hover:text-theme hover:bg-neutral-800/30'
                      }`}
                      variants={desktopNavItemVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-theme rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}

              {/* Command palette trigger */}
              <button
                onClick={openCommandPalette}
                className="ml-2 flex items-center gap-2 px-3 py-2 rounded-full text-sm text-neutral-400 border border-neutral-800 bg-neutral-900/50 hover:text-theme hover:border-theme transition-colors duration-300"
                aria-label="Open command palette"
              >
                <FaSearch size={12} />
                <span className="kbd">Ctrl K</span>
              </button>

              {/* Light / dark toggle */}
              <button
                onClick={toggleMode}
                className="p-2.5 rounded-full text-neutral-400 border border-neutral-800 bg-neutral-900/50 hover:text-theme hover:border-theme transition-colors duration-300 overflow-hidden"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isDark ? 'moon' : 'sun'}
                    initial={{ y: -16, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 16, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    {isDark ? <FaMoon size={14} /> : <FaSun size={14} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </nav>

            {/* Mobile actions */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleMode}
                className="text-neutral-300 hover:text-theme focus:outline-none transition-colors duration-300 p-2 rounded-lg bg-neutral-900 border border-neutral-800"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <FaMoon className="h-5 w-5" /> : <FaSun className="h-5 w-5" />}
              </button>
              <button
                onClick={openCommandPalette}
                className="text-neutral-300 hover:text-theme focus:outline-none transition-colors duration-300 p-2 rounded-lg bg-neutral-900 border border-neutral-800"
                aria-label="Open command palette"
              >
                <FaSearch className="h-5 w-5" />
              </button>
              <button
                onClick={toggleNavbar}
                className="text-neutral-300 hover:text-theme focus:outline-none transition-colors duration-300 p-2 rounded-lg bg-neutral-900 border border-neutral-800"
                aria-label="Open menu"
              >
                <FaBars className="h-5 w-5" />
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* ─── Mobile Menu Portal (rendered outside header to avoid stacking context) ─── */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Semi-transparent overlay */}
              <motion.div
                key="mobile-overlay"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={closeNavbar}
                className="fixed inset-0 z-[100]"
                style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
              />

              {/* Sidebar panel — fully opaque, above overlay */}
              <motion.div
                key="mobile-panel"
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed top-0 right-0 h-full w-4/5 max-w-xs z-[101] border-l border-neutral-800 flex flex-col justify-between shadow-2xl"
                style={{ backgroundColor: 'var(--panel-solid-bg)' }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top: header + nav links */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-10">
                    <span className="text-xl font-bold text-neutral-50 poppins-extrabold">
                      Menu
                    </span>
                    <button
                      onClick={closeNavbar}
                      className="text-neutral-400 hover:text-theme p-2 rounded-full bg-neutral-900 border border-neutral-800 transition-colors"
                      aria-label="Close menu"
                    >
                      <FaTimes className="h-5 w-5" />
                    </button>
                  </div>

                  <nav className="flex flex-col space-y-2">
                    {navItems.map((item, i) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <motion.div
                          key={item.path}
                          custom={i}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <Link
                            to={item.path}
                            onClick={closeNavbar}
                            className={`block poppins-medium text-lg py-3 px-4 rounded-xl transition-all duration-200 ${
                              isActive
                                ? 'text-theme bg-theme-soft'
                                : 'text-neutral-300 hover:text-theme hover:bg-neutral-900'
                            }`}
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>
                </div>

                {/* Bottom: contact info */}
                <div className="px-6 pb-8 border-t border-neutral-900 pt-6">
                  <p className="text-xs text-neutral-500 font-medium tracking-wide">
                    {personalInfo.email}
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Navbar;
