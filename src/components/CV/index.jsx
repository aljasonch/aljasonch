import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaFileDownload, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaGithub, 
  FaInstagram,
  FaLinkedin,
  FaServer,
  FaRobot,
} from 'react-icons/fa';
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiKotlin,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiOdoo,
  SiPostgresql,
  SiFirebase,
  SiGit,
  SiGithub,
  SiVisualstudiocode,
  SiMicrosoftazure,
} from 'react-icons/si';
import {
  personalInfo,
  skills,
  workExperience,
  organizationExperience,
  education,
  certifications,
  languages,
  softSkills,
} from '../../data/content';

const skillIcons = {
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Kotlin: SiKotlin,
  React: SiReact,
  'Next.js': SiNextdotjs,
  'Tailwind CSS': SiTailwindcss,
  Odoo: SiOdoo,
  PostgreSQL: SiPostgresql,
  Firebase: SiFirebase,
  Git: SiGit,
  GitHub: SiGithub,
  'Visual Studio Code': SiVisualstudiocode,
  Azure: SiMicrosoftazure,
  'RESTful API': FaServer,
  'Claude Code': FaRobot,
  'GitHub Copilot': FaGithub,
};

const skillIconColors = {
  Python: '#3776ab',
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Kotlin: '#7f52ff',
  React: '#61dafb',
  'Next.js': '#f5f5f5',
  'Tailwind CSS': '#38bdf8',
  Odoo: '#714b67',
  PostgreSQL: '#4169e1',
  Firebase: '#ffca28',
  Git: '#f05032',
  GitHub: '#f5f5f5',
  'Visual Studio Code': '#23a8f2',
  Azure: '#0078d4',
  'RESTful API': '#a1a1aa',
  'Claude Code': '#d97757',
  'GitHub Copilot': '#f5f5f5',
};

const CV = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen pt-32 pb-24 bg-neutral-950 relative overflow-hidden"
    >
      {/* Subtle dotted backdrop (solid dots, no gradient) */}
      <div className="absolute inset-0 dot-grid opacity-[0.3] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* Top Header Card */}
        <motion.div 
          className="glass-panel rounded-3xl p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          variants={itemVariants}
        >
          <div>
            <span className="text-xs uppercase font-semibold text-theme tracking-wider">
              Curriculum Vitae
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold poppins-bold text-neutral-50 mt-1 mb-2">
              {personalInfo.name}
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base poppins-medium">
              {personalInfo.role}
            </p>
          </div>
          <a
            href="/CV_Alfonsus Jason Christian.pdf"
            download="CV_Alfonsus Jason Christian.pdf"
            className="btn-primary inline-flex items-center gap-2 font-semibold py-3 px-6 rounded-full text-sm shadow-md"
          >
            <FaFileDownload size={14} />
            Download PDF CV
          </a>
        </motion.div>

        {/* CV Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
          
          {/* Left Column (Personal info, Education, Skills) */}
          <div className="space-y-8">
            
            {/* Contact details */}
            <motion.div className="glass-card rounded-[24px] p-6 border border-neutral-900" variants={itemVariants}>
              <h3 className="text-lg font-bold text-neutral-100 mb-4 border-b border-neutral-900 pb-2 poppins-bold">
                Contact Info
              </h3>
              <ul className="space-y-4 text-xs sm:text-sm text-neutral-400 poppins-regular">
                <li className="flex items-center gap-3">
                  <FaEnvelope className="w-4 h-4 flex-shrink-0" style={{ color: '#ea4335' }} />
                  <a href={`mailto:${personalInfo.email}`} className="hover:text-neutral-100 break-all">
                    {personalInfo.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FaMapMarkerAlt className="w-4 h-4 flex-shrink-0" style={{ color: '#22c55e' }} />
                  <span>{personalInfo.location}</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaGithub className="w-4 h-4 flex-shrink-0" style={{ color: '#f5f5f5' }} />
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-100 break-all">
                    github.com/aljasonch
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FaLinkedin className="w-4 h-4 flex-shrink-0" style={{ color: '#0a66c2' }} />
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-100 break-all">
                    linkedin.com/in/aljasonch
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FaInstagram className="w-4 h-4 flex-shrink-0" style={{ color: '#e1306c' }} />
                  <a href={personalInfo.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-100 break-all">
                    @aljasonch
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Education details */}
            <motion.div className="glass-card rounded-[24px] p-6 border border-neutral-900" variants={itemVariants}>
              <h3 className="text-lg font-bold text-neutral-100 mb-4 border-b border-neutral-900 pb-2 poppins-bold flex items-center gap-2">
                Education
              </h3>
              <div className="space-y-6">
                {education.map((item) => (
                  <div key={`${item.institution}-${item.date}`}>
                    <h4 className="font-bold text-neutral-250 text-sm sm:text-base">{item.degree}</h4>
                    <p className="text-xs text-neutral-500 font-medium">{item.institution} | {item.location}</p>
                    <p className="text-xs text-neutral-600 font-medium mt-1">{item.date}</p>
                    {item.details.length > 0 && (
                      <ul className="list-disc pl-4 space-y-1 text-xs text-neutral-400 leading-relaxed mt-2.5 poppins-regular">
                        {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tech Skills */}
            <motion.div className="glass-card rounded-[24px] p-6 border border-neutral-900" variants={itemVariants}>
              <h3 className="text-lg font-bold text-neutral-100 mb-4 border-b border-neutral-900 pb-2 poppins-bold flex items-center gap-2">
                Technical Skills
              </h3>
              <div className="space-y-5">
                {[
                  ['languages', 'Programming Languages'],
                  ['frameworks', 'Libraries & Frameworks'],
                  ['tools', 'Tools & Technologies'],
                ].map(([group, label]) => (
                  <div key={group}>
                    <h4 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-2">{label}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.filter((skill) => skill.group === group).map((skill) => (
                        <span
                          key={skill.name}
                          className="inline-flex items-center gap-2 text-neutral-300 text-xs px-3.5 py-1.5 rounded-xl font-medium"
                        >
                          {(() => {
                            const Icon = skillIcons[skill.name];
                            return Icon ? (
                              <Icon
                                aria-hidden="true"
                                className="w-4 h-4"
                                style={{ color: skillIconColors[skill.name] }}
                              />
                            ) : null;
                          })()}
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div className="glass-card rounded-[24px] p-6 border border-neutral-900" variants={itemVariants}>
              <h3 className="text-lg font-bold text-neutral-100 mb-4 border-b border-neutral-900 pb-2 poppins-bold">
                Certifications &amp; Languages
              </h3>
              <div className="space-y-4">
                {certifications.map((certification) => (
                  <div key={certification.title}>
                    <h4 className="text-sm font-bold text-neutral-200">{certification.title}</h4>
                    <p className="text-xs text-neutral-500">{certification.issuer}</p>
                    <p className="text-xs text-neutral-400 mt-1">{certification.date}</p>
                  </div>
                ))}
                <div>
                  <h4 className="text-sm font-bold text-neutral-200 mb-1">Languages</h4>
                  <ul className="list-disc pl-4 text-xs text-neutral-400 space-y-1">
                    {languages.map((language) => <li key={language}>{language}</li>)}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div className="glass-card rounded-[24px] p-6 border border-neutral-900" variants={itemVariants}>
              <h3 className="text-lg font-bold text-neutral-100 mb-4 border-b border-neutral-900 pb-2 poppins-bold">
                Soft Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill) => <span key={skill} className="text-xs text-neutral-300 px-3.5 py-1.5 rounded-xl">{skill}</span>)}
              </div>
            </motion.div>

          </div>

          {/* Right Column (Bio summary, Work Experience, Org details) */}
          <div className="space-y-8">
            
            {/* Bio summary */}
            <motion.div className="glass-card rounded-[24px] p-6 border border-neutral-900" variants={itemVariants}>
              <h3 className="text-lg font-bold text-neutral-100 mb-3 border-b border-neutral-900 pb-2 poppins-bold">
                Professional Profile
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed poppins-regular">
                Informatics graduate from Universitas Multimedia Nusantara with a 3.74 GPA and hands-on experience as a Junior Software Engineer. Proven ability to develop enterprise modules, optimize PostgreSQL workflows, build scalable web applications, and contribute across an Agile software development lifecycle. Strong background in Python, Odoo ERP, JavaScript, React.js, Next.js, and TypeScript.
              </p>
            </motion.div>

            {/* Work History details */}
            <motion.div className="glass-card rounded-[24px] p-6 border border-neutral-900" variants={itemVariants}>
              <h3 className="text-lg font-bold text-neutral-100 mb-6 border-b border-neutral-900 pb-2 poppins-bold flex items-center gap-2">
                Work History
              </h3>
              <div className="space-y-8">
                {workExperience.map((exp, idx) => (
                  <div key={idx} className="relative last:pb-0 pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
                      <div>
                        <h4 className="font-bold text-neutral-100 text-base sm:text-lg">{exp.title}</h4>
                        <p className="text-xs sm:text-sm text-neutral-500 font-medium">{exp.organization}</p>
                      </div>
                      <span className="text-xs text-neutral-400 px-3 py-1 rounded-full whitespace-nowrap inline-self-start sm:inline-self-auto font-medium">
                        {exp.date}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-xs sm:text-sm mb-3.5 poppins-regular">{exp.description}</p>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-neutral-500 poppins-regular">
                      {exp.details.map((detail, dIdx) => (
                        <li key={dIdx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Organization details */}
            <motion.div className="glass-card rounded-[24px] p-6 border border-neutral-900" variants={itemVariants}>
              <h3 className="text-lg font-bold text-neutral-100 mb-6 border-b border-neutral-900 pb-2 poppins-bold flex items-center gap-2">
                Organization Experience
              </h3>
              <div className="space-y-8">
                {organizationExperience.map((exp, idx) => (
                  <div key={idx} className="relative last:pb-0 pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
                      <div>
                        <h4 className="font-bold text-neutral-100 text-base sm:text-lg">{exp.title}</h4>
                        <p className="text-xs sm:text-sm text-neutral-500 font-medium">{exp.organization}</p>
                      </div>
                      <span className="text-xs text-neutral-400 px-3 py-1 rounded-full whitespace-nowrap inline-self-start sm:inline-self-auto font-medium">
                        {exp.date}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-xs sm:text-sm mb-3.5 poppins-regular">{exp.description}</p>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-neutral-500 poppins-regular">
                      {exp.details.map((detail, dIdx) => (
                        <li key={dIdx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default CV;
