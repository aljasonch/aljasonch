import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/aljasonch/', icon: FaInstagram },
  { label: 'X', href: 'https://x.com/aljasonch', icon: FaXTwitter },
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', when: 'beforeChildren', staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="relative pt-12 pb-8 bg-gradient-to-br from-neutral-50 via-white to-secondary-50/60 text-neutral-700 overflow-hidden border-t border-neutral-200/60"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          <motion.div variants={itemVariants} className="flex flex-col items-start text-left">
            <Link to="/" className="text-2xl poppins-extrabold text-green-600 tracking-tight">
              aljasonch
            </Link>
            <p className="mt-2 text-sm text-neutral-500">
              © {currentYear} Alfonsus Jason. All rights reserved.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8">
            <ul className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm poppins-medium text-neutral-600 hover:text-green-600 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden sm:block w-px h-5 bg-neutral-300"></div>

            <div className="flex items-center gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-neutral-500 hover:text-green-600 transition-colors duration-200 transform hover:scale-110"
                >
                  <social.icon size={20} />
                </a>
              ))}
              <a
                href="mailto:alfonsusjasonchristian@gmail.com"
                aria-label="Email"
                className="text-neutral-500 hover:text-green-600 transition-colors duration-200 transform hover:scale-110"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
