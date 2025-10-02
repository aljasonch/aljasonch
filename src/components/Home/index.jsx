import React, { useRef } from 'react';
import { motion }from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';

import Profile from '../../assets/aljasonch.png';
import tailwindcss from '../../assets/tailwindcss.png';
import html from '../../assets/html.png';
import css from '../../assets/css.png';
import reactLogo from '../../assets/react.png';
import kotlin from '../../assets/kotlin.png';

const skills = [
  { src: html, alt: 'HTML5' },
  { src: css, alt: 'CSS3' },
  { src: reactLogo, alt: 'React' },
  { src: tailwindcss, alt: 'Tailwind CSS' },
  { src: kotlin, alt: 'Kotlin' },
];

const experiences = [
  {
    title: 'Website Coordinator',
    date: 'Jan 2024 - Dec 2024',
    organization: 'Character Building Mentoring UMN 2024',
    description:
      "Leading the development of UMN Mentoring's official website with a developer team using React JS, Tailwind CSS, and Firebase. Focused on creating a responsive and user-friendly platform to support mentoring activities.",
  },
  {
    title: 'Participant Garuda Hacks 5.0',
    date: 'Jul 2024 - Jul 2024',
    organization: 'Garuda Hacks 5.0',
    description:
      'Being a participant for Garuda Hacks 5.0 by creating a project named "WeShare" that could help unprivilege people that difficult getting access to health care',
  },
  {
    title: 'Mentor',
    date: 'Mar 2023 - Dec 2023',
    organization: 'Character Building Mentoring UMN 2023',
    description:
      "Guided Mentees (first-year students) to understand and apply UMN's 5C values (Caring, Credible, Competent, Competitive, Customer Delight) in their university life. Committed to supporting their personal and professional development through mentoring.",
  },
  {
    title: 'Logistics and Security',
    date: 'Feb 2023 - Aug 2023',
    organization: 'ISFEST UMN 2023',
    description:
      "Committee for Equipment and Security at ISFEST 2023. Ensuring seamless organization, logistics, and safety for the event. Skilled in problem-solving, communication, and critical decision-making. Committed to delivering exceptional results.",
  },
];

const work = [
  {
    title: 'Junior Software Engineer Intern',
    date: 'Jan 2025 - Present',
    organization: 'Kompas Gramedia',
    description:
      "",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const aboutSectionRef = useRef(null);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };


  const skillIconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    hover: {
      scale: 1.25,
      rotate: 5,
      filter: 'drop-shadow(0px 5px 10px rgba(0,0,0,0.2))',
      transition: { duration: 0.2, type: 'spring', stiffness: 300 },
    },
  };

  return (
    <motion.section
      id="home"
      ref={aboutSectionRef}
      className="relative flex flex-col overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: {} }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 w-[420px] h-[420px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary-300/30 via-secondary-300/20 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 right-[-120px] w-[360px] h-[360px] rounded-full bg-secondary-400/20 blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 left-[-160px] w-[300px] h-[300px] rounded-full bg-accent-400/20 blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <motion.div
        className="container mx-auto max-w-6xl px-5 sm:px-6 lg:px-10 relative z-10 pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
          <motion.div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6" variants={itemVariants}>
            <motion.p className="text-green-500 poppins-medium text-base sm:text-lg tracking-[0.35em]" variants={itemVariants}>
              Hey, I'm Jason
            </motion.p>
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl poppins-bold leading-tight text-neutral-900 min-h-[4.5rem] sm:min-h-[5rem]"
              variants={itemVariants}
            >
              <TypeAnimation
                sequence={["I'm an Experienced Website Developer", 2000, "I'm an Experienced App Developer", 2000]}
                wrapper="span"
                cursor
                repeat={Infinity}
                style={{ display: 'inline-block', lineHeight: '1.1' }}
                className="text-green-600"
              />
            </motion.h2>
            <motion.div className="flex w-full justify-center lg:hidden" variants={itemVariants}>
              <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                <div className="absolute inset-0 rounded-[28px] bg-gradient-to-tr from-primary-500/20 via-secondary-500/10 to-accent-500/20 blur-2xl"></div>
                <div className="relative w-full h-full rounded-[28px] overflow-hidden shadow-large border border-white/20 backdrop-blur-lg">
                  <img
                    src={Profile}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 rounded-[28px] border-4 border-white/20"></div>
                </div>
              </div>
            </motion.div>
            <motion.p
              className="text-neutral-600 poppins-regular text-base sm:text-lg leading-relaxed text-modern max-w-2xl"
              variants={itemVariants}
            >
              I'm a passionate website and app developer with a strong background in creating engaging and functional
              digital experiences. I love exploring new technologies and translating ideas into polished, user-friendly products.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto sm:items-center" variants={itemVariants}>
              <motion.button
                onClick={() => navigate('/contact')}
                className="btn-modern bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 poppins-medium w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
              <motion.button
                className="glass-card border border-green-200 hover:border-green-300 text-green-600 hover:text-green-700 font-semibold py-4 px-8 rounded-full transition-all duration-300 poppins-medium interactive-hover w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="/CV_Alfonsus Jason Christian.pdf"
                  download="CV_Alfonsus Jason Christian.pdf"
                  className="flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </a>
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div className="relative hidden justify-center lg:flex" variants={itemVariants}>
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-primary-500/20 via-secondary-500/10 to-accent-500/20 blur-2xl"></div>
              <div className="relative w-full h-full rounded-[32px] overflow-hidden shadow-large border border-white/20 backdrop-blur-lg">
                <img
                  src={Profile}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 rounded-[32px] border-4 border-white/20"></div>
              </div>
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-primary-500 rounded-full animate-bounce-gentle opacity-80"></div>
              <div className="absolute -bottom-6 left-6 w-8 h-8 bg-accent-500 rounded-full animate-bounce-gentle opacity-80" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/2 -left-6 w-6 h-6 bg-secondary-500 rounded-full animate-bounce-gentle opacity-80" style={{ animationDelay: '1s' }}></div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="container mx-auto max-w-6xl px-5 sm:px-6 lg:px-10 relative z-10 mt-12 sm:mt-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.h2 className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold text-green-600 mb-12 sm:mb-16" variants={itemVariants}>
          EXPERIENCE WITH
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-12 pb-12 sm:pb-20"
          variants={sectionVariants}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.alt}
              className="p-4 rounded-2xl hover:shadow-xl transition-all duration-300 bg-white/40 backdrop-blur-sm"
              variants={skillIconVariants}
              whileHover="hover"
            >
              <img
                src={skill.src}
                alt={skill.alt}
                className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain filter drop-shadow-lg"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-12 rounded-full"
          variants={itemVariants}
        ></motion.div>

        <motion.h2 className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold text-green-600 mb-12" variants={itemVariants}>
          WORK EXPERIENCE
        </motion.h2>

        <motion.div
          className="relative max-w-5xl mx-auto sm:px-6 lg:px-0"
          variants={sectionVariants}
        >
          <div className="relative before:hidden sm:before:block before:absolute before:left-6 sm:before:left-7 lg:before:left-8 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b from-green-500/40 to-transparent">
            <div className="ml-0 sm:ml-6 lg:ml-12 space-y-7 sm:space-y-12">
              {work.map((exp, index) => (
                <motion.article
                  key={exp.title}
                  className="relative pl-1 sm:pl-12 lg:pl-16"
                  variants={itemVariants}
                  whileHover={{ x: 6 }}
                >
                  <div className="absolute left-0 top-6 sm:top-7 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-glow hidden sm:flex items-center justify-center">
                    <span className="text-sm sm:text-base font-semibold">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="rounded-3xl border border-gray hover:border-gray-300/50 p-4 sm:p-6 lg:p-8 shadow-lg bg-white/80 backdrop-blur">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <p className="text-xs tracking-[0.35em] uppercase text-green-500 poppins-medium mb-2">
                          Role
                        </p>
                        <h3 className="text-2xl lg:text-3xl poppins-bold text-neutral-800">
                          {exp.title}
                        </h3>
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white text-sm poppins-semibold shadow-soft">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {exp.date}
                      </div>
                    </div>
                    <div className="mt-5 space-y-2">
                      <p className="text-sm uppercase tracking-[0.2em] text-neutral-400 poppins-medium">
                        {exp.organization}
                      </p>
                      <p className="text-neutral-600 leading-relaxed text-justify">
                        {exp.description && exp.description.length > 0
                          ? exp.description
                          : 'Actively contributing to high-impact initiatives, elevating user experiences, and building resilient product foundations.'}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.h2 className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold text-green-600 mt-24 mb-12" variants={itemVariants}>
          ORGANIZATION EXPERIENCE
        </motion.h2>

        <motion.div
          className="relative max-w-5xl mx-auto sm:px-6 lg:px-0 pb-24"
          variants={sectionVariants}
        >
          <div className="relative before:hidden sm:before:block before:absolute before:left-6 sm:before:left-7 lg:before:left-8 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b from-green-500/40 to-transparent">
            <div className="ml-0 sm:ml-6 lg:ml-12 space-y-7 sm:space-y-12">
              {experiences.map((exp, index) => (
                <motion.article
                  key={exp.title}
                  className="relative pl-1 sm:pl-12 lg:pl-16"
                  variants={itemVariants}
                  whileHover={{ x: 6 }}
                >
                  <div className="absolute left-0 top-6 sm:top-7 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-glow hidden sm:flex items-center justify-center">
                    <span className="text-sm sm:text-base font-semibold">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="rounded-3xl border border-gray hover:border-gray-300/50 p-4 sm:p-6 lg:p-8 shadow-lg bg-white/80 backdrop-blur">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <p className="text-xs tracking-[0.35em] uppercase text-green-500 poppins-medium mb-2">
                          Role
                        </p>
                        <h3 className="text-2xl lg:text-3xl poppins-bold text-neutral-800">
                          {exp.title}
                        </h3>
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white text-sm poppins-semibold shadow-soft">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {exp.date}
                      </div>
                    </div>
                    <div className="mt-5 space-y-2">
                      <p className="text-sm uppercase tracking-[0.2em] text-neutral-400 poppins-medium">
                        {exp.organization}
                      </p>
                      <p className="text-neutral-600 leading-relaxed text-justify">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto text-center pb-24"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className="text-3xl sm:text-4xl poppins-bold text-neutral-900 mb-6">Let’s build something remarkable together.</h3>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed mb-8">
            Whether it’s refining an existing product or launching a new idea, I’m ready to collaborate and deliver polished, performance-driven experiences.
          </p>
          <motion.button
            onClick={() => navigate('/contact')}
            className="btn-modern bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 poppins-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start a conversation
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Home;
