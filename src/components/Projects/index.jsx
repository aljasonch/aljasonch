import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFolderOpen } from 'react-icons/fa';
import { initialProjects } from '../../data/content';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  // Extract categories dynamically
  const categories = ['All', ...new Set(initialProjects.map(p => p.category))];

  const filteredProjects = activeFilter === 'All' 
    ? initialProjects 
    : initialProjects.filter(p => p.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.3 } }
  };

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-32 pb-20 bg-neutral-950 relative overflow-hidden"
    >
      {/* Decorative Blur elements - REMOVED for clean monochrome */}

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold poppins-bold text-neutral-50 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Portfolio
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-neutral-400 max-w-xl mx-auto poppins-regular"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A compilation of professional modules, academic activities, and side projects built using modern frameworks.
          </motion.p>
          <div className="w-16 h-[2px] bg-theme mx-auto mt-5 rounded-full" />
        </div>

        {/* Filter Navigation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold poppins-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-theme text-white shadow-lg'
                  : 'text-neutral-400 hover:text-theme border border-transparent hover:border-theme'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                className="glass-card rounded-[24px] overflow-hidden flex flex-col h-full hover:shadow-2xl group border border-neutral-800 backdrop-blur-sm"
                variants={cardVariants}
                layout
                whileHover={{ y: -8 }}
              >
                {/* Visual Image */}
                <div className="relative aspect-video overflow-hidden border-b border-neutral-900">
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 img-scrim bg-neutral-950/40 group-hover:bg-neutral-950/20 transition-all duration-300" />
                  
                  {/* Category Badge overlay */}
                  <span className="absolute top-4 left-4 backdrop-blur-md text-neutral-300 text-xs px-3 py-1.5 rounded-full font-bold poppins-semibold">
                    {project.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-neutral-50 mb-3 group-hover:text-neutral-100 transition-colors duration-300 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6 flex-1 poppins-regular">
                    {project.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((tag) => (
                      <span 
                        key={tag}
                        className="text-neutral-400 text-[10px] sm:text-xs px-2.5 py-1 rounded-md font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-neutral-850">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-neutral-50 transition-colors duration-200"
                    >
                      <FaExternalLinkAlt size={12} />
                      Live Demo
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-400 hover:text-neutral-200 transition-colors duration-200"
                      >
                        <FaGithub size={14} />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state if filter doesn't match */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className="flex flex-col items-center justify-center py-20 text-center text-neutral-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FaFolderOpen size={48} className="mb-4 text-neutral-700" />
            <p className="text-lg">No projects found in this category.</p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default Projects;
