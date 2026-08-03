import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';
import {
  FaTrophy,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaArrowRight,
  FaCalendarAlt,
  FaFileDownload,
  FaServer,
  FaPalette,
  FaProjectDiagram,
  FaBolt,
  FaUsers,
  FaHeart,
  FaRegKeyboard,
  FaMapMarkerAlt,
} from 'react-icons/fa';

import {
  personalInfo,
  skills,
  workExperience,
  organizationExperience,
  achievements,
  services,
  whyMe,
  stats,
  principles,
} from '../../data/content';
import AnimatedCounter from '../AnimatedCounter';

const serviceIcons = {
  code: FaCode,
  server: FaServer,
  palette: FaPalette,
};

const whyIcons = {
  bridge: FaProjectDiagram,
  bolt: FaBolt,
  users: FaUsers,
  heart: FaHeart,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Profile card that tilts toward the cursor
const TiltProfile = () => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 15 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div className="relative flex justify-center order-first md:order-last" variants={itemVariants}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
        className="relative w-64 h-64 sm:w-80 sm:h-80"
      >
        {/* Solid accent frame ring — no gradient */}
        <div className="absolute -inset-3 rounded-[2rem] border border-neutral-800" />
        <motion.div
          className="absolute -inset-1 rounded-[1.8rem] border-2 border-theme opacity-60"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="relative w-full h-full rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl p-2 backdrop-blur-md"
          style={{ transform: 'translateZ(40px)' }}
        >
          <img
            src={personalInfo.profileImage}
            alt={personalInfo.name}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Home = () => {
  const navigate = useNavigate();

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
      {/* Subtle dotted backdrop */}
      <div className="absolute inset-0 dot-grid opacity-[0.35] pointer-events-none" />

      {/* Hero Section */}
      <section className="container mx-auto max-w-6xl px-6 py-12 md:py-20 relative z-10">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] items-center">
          <motion.div className="flex flex-col items-start text-left gap-6" variants={itemVariants}>
            <span className="inline-flex items-center gap-2 text-neutral-400 font-semibold tracking-[0.2em] text-xs sm:text-sm uppercase px-3 py-1.5 rounded-full">
              Welcome to my space
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight poppins-extrabold text-neutral-50">
              Hey, I'm <span className="text-theme">Jason</span>
            </h1>

            <div className="h-[3.5rem] sm:h-[4.5rem]">
              <TypeAnimation
                sequence={[
                  personalInfo.role,
                  2000,
                  'Informatics Student @ UMN',
                  2000,
                  'ERP Developer',
                  2000,
                  'Full Stack Developer',
                  2000,
                ]}
                wrapper="h2"
                cursor={true}
                repeat={Infinity}
                className="text-2xl sm:text-3xl font-semibold text-neutral-300 poppins-semibold"
              />
            </div>

            <p className="text-neutral-400 poppins-regular text-base sm:text-lg leading-relaxed max-w-xl">
              {personalInfo.bio}
            </p>

            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <FaMapMarkerAlt className="text-theme" size={13} />
              {personalInfo.location}
            </div>

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
                className="btn-secondary flex items-center justify-center gap-2 font-semibold py-3.5 px-8 rounded-full text-base w-full sm:w-auto"
              >
                View Resume
                <FaFileDownload size={14} />
              </button>
            </div>

            {/* Command palette hint — points to the surprise feature */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
              <FaRegKeyboard size={13} />
              Press
              <span className="kbd">Ctrl</span>
              <span className="text-neutral-600">+</span>
              <span className="kbd">K</span>
              anywhere to jump around or recolor the site
            </div>
          </motion.div>

          <TiltProfile />
        </div>
      </section>

      {/* Stats strip with animated counters */}
      <section className="container mx-auto max-w-6xl px-6 py-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="glass-card rounded-2xl p-5 text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold poppins-extrabold text-theme">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 leading-snug">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Skills */}
      <section className="py-12 relative z-10 border-y border-neutral-900">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-neutral-600 font-semibold mb-8">
          Tools I build with
        </p>
        <motion.div
          className="container mx-auto max-w-4xl px-6 flex flex-wrap justify-center gap-3 sm:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.04 }}
              className="flex items-center gap-3 py-3 px-5 rounded-2xl backdrop-blur-sm cursor-default"
            >
              <img src={skill.src} alt={skill.name} className="w-7 h-7 object-contain" />
              <span className="text-sm font-medium text-neutral-300 whitespace-nowrap">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* What I do — Services */}
      <section className="container mx-auto max-w-6xl px-6 py-16 md:py-24 relative z-10">
        <motion.div
          className="text-center mb-14"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold poppins-bold mb-3">What I do</h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base">
            I turn fuzzy ideas and tangled business logic into software that feels effortless to use.
          </p>
          <div className="w-16 h-[2px] bg-theme mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service) => {
            const Icon = serviceIcons[service.icon] || FaCode;
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl p-7 group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="text-theme" size={20} />
                </div>
                <h3 className="text-lg font-bold text-neutral-100 mb-2">{service.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Why work with me */}
      <section className="container mx-auto max-w-6xl px-6 py-16 md:py-24 border-t border-neutral-900 relative z-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="lg:sticky lg:top-28"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-theme font-semibold">
              Why me
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold poppins-bold mt-3 mb-4">
              Why you'd want me on the team
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-6">
              I'm not just someone who closes tickets. I care about the people using what I build and
              the teammates I build it with. Here's what that looks like in practice.
            </p>
            <ul className="space-y-2.5">
              {principles.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-theme flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {whyMe.map((reason) => {
              const Icon = whyIcons[reason.icon] || FaBolt;
              return (
                <motion.div
                  key={reason.title}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-theme" size={16} />
                  </div>
                  <h3 className="text-base font-bold text-neutral-100 mb-2">{reason.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{reason.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="container mx-auto max-w-5xl px-6 py-16 md:py-24 border-t border-neutral-900 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold poppins-bold mb-3">Experience History</h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base">
            Tracing my professional journey in software engineering and academic leadership roles.
          </p>
          <div className="w-16 h-[2px] bg-theme mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="relative border-l border-neutral-800 ml-4 md:ml-12 space-y-12">
          {/* Work Experience */}
          <div className="relative">
            <div className="absolute -left-[45px] top-1 p-2 rounded-full text-theme">
              <FaBriefcase size={16} />
            </div>
            <div className="pl-6 md:pl-10">
              <h3 className="text-xs uppercase font-semibold text-neutral-400 tracking-wider mb-2">
                Professional Work
              </h3>
              <div className="space-y-6">
                {workExperience.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    className="glass-card rounded-2xl p-6"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-neutral-100">{exp.title}</h4>
                        <p className="text-sm text-neutral-400 font-medium">{exp.organization}</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs text-neutral-300 font-medium">
                        <FaCalendarAlt size={11} />
                        {exp.date}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed">{exp.summary}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Organization Experience */}
          <div className="relative">
            <div className="absolute -left-[45px] top-1 p-2 rounded-full text-theme">
              <FaGraduationCap size={16} />
            </div>
            <div className="pl-6 md:pl-10">
              <h3 className="text-xs uppercase font-semibold text-neutral-400 tracking-wider mb-2">
                Organization &amp; Campus Activities
              </h3>
              <div className="space-y-6">
                {organizationExperience.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    className="glass-card rounded-2xl p-6"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-neutral-100">{exp.title}</h4>
                        <p className="text-sm text-neutral-400 font-medium">{exp.organization}</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs text-neutral-300 font-medium">
                        <FaCalendarAlt size={11} />
                        {exp.date}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed">{exp.summary}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="container mx-auto max-w-6xl px-6 py-16 md:py-24 border-t border-neutral-900 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold poppins-bold mb-3">Key Achievements</h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base">
            Recognitions, milestones, and high-impact accomplishments throughout my work and academics.
          </p>
          <div className="w-16 h-[2px] bg-theme mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div
          className="grid gap-6 grid-cols-1 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {achievements.map((achievement, idx) => (
            <motion.div
              key={idx}
              className="glass-card rounded-2xl p-6 flex gap-5 items-start hover:border-neutral-700 transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ y: -3 }}
            >
              <div className="p-3.5 rounded-xl group-hover:scale-105 transition-transform duration-300">
                {getAchievementIcon(achievement.category)}
              </div>
              <div className="flex-1">
                <span className="text-xs uppercase font-semibold text-theme tracking-wider">
                  {achievement.category}
                </span>
                <h3 className="text-lg font-bold text-neutral-100 mt-1 mb-2 group-hover:text-neutral-50 transition-colors duration-300">
                  {achievement.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Call to action section */}
      <section className="container mx-auto max-w-4xl px-6 py-16 md:py-24 border-t border-neutral-900 text-center relative z-10">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-neutral-800"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-100 mb-4">
            Let's collaborate on your next venture
          </h3>
          <p className="text-neutral-400 max-w-lg mx-auto text-sm sm:text-base leading-relaxed mb-8">
            I'm currently seeking internships, junior roles, or freelance project opportunities. Reach
            out if you have code that needs compiling or workflows that need optimizing.
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
