import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';
import { 
  FaTrophy, 
  FaBriefcase, 
  FaGraduationCap, 
  FaCode, 
  FaArrowRight, 
  FaCalendarAlt, 
  FaFileDownload 
} from 'react-icons/fa';

import { 
  personalInfo, 
  skills, 
  workExperience, 
  organizationExperience, 
  achievements 
} from '../../data/content';

const Home = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const skillIconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    hover: {
      scale: 1.05,
      borderColor: 'rgba(255, 255, 255, 0.4)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      boxShadow: '0 0 15px rgba(255, 255, 255, 0.05)',
      transition: { duration: 0.2 },
    },
  };

  const getAchievementIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'competition':
        return <FaTrophy className="text-neutral-100 w-6 h-6" />;
      case 'professional':
        return <FaBriefcase className="text-neutral-100 w-6 h-6" />;
      case 'academic':
        return <FaGraduationCap className="text-neutral-100 w-6 h-6" />;
      default:
        return <FaCode className="text-neutral-100 w-6 h-6" />;
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-screen bg-neutral-950 pt-24 overflow-hidden"
    >
      {/* Decorative Glows - REMOVED for clean monochrome */}

      {/* Hero Section */}
      <section className="container mx-auto max-w-6xl px-6 py-12 md:py-20 relative z-10">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] items-center">
          
          <motion.div className="flex flex-col items-start text-left gap-6" variants={itemVariants}>
            <span className="text-neutral-400 font-semibold tracking-[0.25em] text-sm sm:text-base uppercase">
              Welcome to my space
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight poppins-extrabold text-neutral-50">
              Hey, I'm {personalInfo.name}
            </h1>

            <div className="h-[3.5rem] sm:h-[4.5rem]">
              <TypeAnimation
                sequence={[
                  personalInfo.role,
                  2000,
                  "Informatics Student @ UMN",
                  2000,
                  "Custom ERP Developer",
                  2000,
                  "Full Stack Developer",
                  2000,
                ]}
                wrapper="h2"
                cursor={true}
                repeat={Infinity}
                className="text-2xl sm:text-3xl font-semibold text-neutral-250 poppins-semibold"
              />
            </div>

            <p className="text-neutral-400 poppins-regular text-base sm:text-lg leading-relaxed max-w-xl">
              {personalInfo.bio}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
              <button
                onClick={() => navigate('/portfolio')}
                className="btn-primary flex items-center justify-center gap-2 font-semibold py-3.5 px-8 rounded-full text-base w-full sm:w-auto"
              >
                Explore Portfolio
                <FaArrowRight size={14} />
              </button>
              <button
                onClick={() => navigate('/cv')}
                className="btn-secondary flex items-center justify-center gap-2 font-semibold py-3.5 px-8 rounded-full text-base w-full sm:w-auto border-neutral-800 text-neutral-200 hover:text-white"
              >
                View Resume
                <FaFileDownload size={14} />
              </button>
            </div>
          </motion.div>

          <motion.div className="relative flex justify-center order-first md:order-last" variants={itemVariants}>
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl p-2 bg-neutral-900/60 backdrop-blur-md">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover rounded-2xl filter brightness-95"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Showcase */}
      <section className="container mx-auto max-w-6xl px-6 py-12 border-t border-neutral-900">
        <motion.div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8" variants={itemVariants}>
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              className="flex items-center gap-3 py-3 px-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-sm cursor-default"
              variants={skillIconVariants}
              whileHover="hover"
            >
              <img
                src={skill.src}
                alt={skill.name}
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              />
              <span className="text-sm sm:text-base font-medium text-neutral-300">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Experience Section */}
      <section className="container mx-auto max-w-5xl px-6 py-16 md:py-24 border-t border-neutral-900 relative z-10">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl sm:text-4xl font-bold poppins-bold mb-3">
            Experience History
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base">
            Tracing my professional journey in software engineering and academic leadership roles.
          </p>
          <div className="w-16 h-[2px] bg-neutral-800 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l border-neutral-800 ml-4 md:ml-12 space-y-12">
          {/* Work Experience */}
          <div className="relative">
            <div className="absolute -left-[45px] top-1 bg-neutral-950 p-2 border border-neutral-800 rounded-full text-neutral-300">
              <FaBriefcase size={16} />
            </div>
            <div className="pl-6 md:pl-10">
              <h3 className="text-xs uppercase font-semibold text-neutral-400 tracking-wider mb-2">Professional Work</h3>
              <div className="space-y-6">
                {workExperience.map((exp, idx) => (
                  <motion.div 
                    key={idx}
                    className="glass-card rounded-2xl p-6 hover:shadow-2xl"
                    variants={itemVariants}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-neutral-100">{exp.title}</h4>
                        <p className="text-sm text-neutral-400 font-medium">{exp.organization}</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 font-medium">
                        <FaCalendarAlt size={11} />
                        {exp.date}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-4">{exp.description}</p>
                    <ul className="list-disc pl-4 space-y-1.5 text-xs text-neutral-500">
                      {exp.details.map((detail, dIdx) => (
                        <li key={dIdx}>{detail}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Organization Experience */}
          <div className="relative">
            <div className="absolute -left-[45px] top-1 bg-neutral-950 p-2 border border-neutral-800 rounded-full text-neutral-300">
              <FaGraduationCap size={16} />
            </div>
            <div className="pl-6 md:pl-10">
              <h3 className="text-xs uppercase font-semibold text-neutral-400 tracking-wider mb-2">Organization & Campus Activities</h3>
              <div className="space-y-6">
                {organizationExperience.map((exp, idx) => (
                  <motion.div 
                    key={idx}
                    className="glass-card rounded-2xl p-6 hover:shadow-2xl"
                    variants={itemVariants}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-neutral-100">{exp.title}</h4>
                        <p className="text-sm text-neutral-400 font-medium">{exp.organization}</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 font-medium">
                        <FaCalendarAlt size={11} />
                        {exp.date}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-4">{exp.description}</p>
                    <ul className="list-disc pl-4 space-y-1.5 text-xs text-neutral-500">
                      {exp.details.map((detail, dIdx) => (
                        <li key={dIdx}>{detail}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="container mx-auto max-w-6xl px-6 py-16 md:py-24 border-t border-neutral-900 relative z-10">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl sm:text-4xl font-bold poppins-bold mb-3">
            Key Achievements
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base">
            Recognitions, milestones, and high-impact accomplishments throughout my work and academics.
          </p>
          <div className="w-16 h-[2px] bg-neutral-800 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {achievements.map((achievement, idx) => (
            <motion.div
              key={idx}
              className="glass-panel rounded-2xl p-6 flex gap-5 items-start hover:border-neutral-700 transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ y: -3 }}
            >
              <div className="p-3.5 bg-neutral-900 border border-neutral-800 rounded-xl group-hover:scale-105 transition-transform duration-300">
                {getAchievementIcon(achievement.category)}
              </div>
              <div className="flex-1">
                <span className="text-xs uppercase font-semibold text-neutral-500 tracking-wider">
                  {achievement.category}
                </span>
                <h3 className="text-lg font-bold text-neutral-100 mt-1 mb-2 group-hover:text-white transition-colors duration-300">
                  {achievement.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to action section */}
      <section className="container mx-auto max-w-4xl px-6 py-16 md:py-24 border-t border-neutral-900 text-center relative z-10">
        <motion.div variants={itemVariants} className="glass-panel rounded-3xl p-8 sm:p-12 border border-neutral-800 bg-neutral-900/60">
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-100 mb-4">
            Let's collaborate on your next venture
          </h3>
          <p className="text-neutral-400 max-w-lg mx-auto text-sm sm:text-base leading-relaxed mb-8">
            I'm currently seeking internships, junior roles, or freelance project opportunities. Reach out if you have code that needs compiling or workflows that need optimizing.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="btn-primary font-semibold py-3 px-8 rounded-full text-base"
          >
            Start a Conversation
          </button>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;
