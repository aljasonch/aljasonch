import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaInstagram, FaEnvelope, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { personalInfo } from '../../data/content';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Blog', to: '/blog' },
  { label: 'CV', to: '/cv' },
  { label: 'Contact', to: '/contact' },
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', when: 'beforeChildren', staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { label: 'GitHub', href: personalInfo.github, icon: FaGithub },
    { label: 'Instagram', href: personalInfo.instagram, icon: FaInstagram },
    { label: 'X', href: personalInfo.twitter, icon: FaXTwitter },
  ];

  return (
    <motion.footer
      className="relative pt-16 pb-12 bg-neutral-950 text-neutral-400 overflow-hidden border-t border-neutral-800/40"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-8 border-b border-neutral-900">
          
          <motion.div variants={itemVariants} className="flex flex-col items-start text-left">
            <Link to="/" className="inline-block">
              <img src="/aljasonch.png" alt="aljasonch" className="h-9 w-auto object-contain" />
            </Link>
            <p className="mt-3 text-sm text-neutral-500 max-w-sm poppins-regular">
              Software engineer crafting optimized code, responsive web designs, and user-centric operations.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8 w-full md:w-auto">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm poppins-medium text-neutral-400 hover:text-neutral-50 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8">
          <motion.p variants={itemVariants} className="text-xs text-neutral-500 poppins-regular order-2 sm:order-1">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </motion.p>

          <motion.div variants={itemVariants} className="flex items-center gap-4 order-1 sm:order-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <social.icon size={18} />
              </a>
            ))}
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
              className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaEnvelope size={18} />
            </a>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
