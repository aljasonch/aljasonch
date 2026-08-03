import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaFileDownload, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaGithub, 
  FaInstagram 
} from 'react-icons/fa';
import { personalInfo, skills, workExperience, organizationExperience } from '../../data/content';

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
                  <FaEnvelope className="text-theme w-4 h-4 flex-shrink-0" />
                  <a href={`mailto:${personalInfo.email}`} className="hover:text-neutral-100 break-all">
                    {personalInfo.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-theme w-4 h-4 flex-shrink-0" />
                  <span>{personalInfo.location}</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaGithub className="text-theme w-4 h-4 flex-shrink-0" />
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-100 break-all">
                    github.com/aljasonch
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FaInstagram className="text-theme w-4 h-4 flex-shrink-0" />
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
              <div>
                <h4 className="font-bold text-neutral-250 text-sm sm:text-base">Informatics (Bachelor)</h4>
                <p className="text-xs text-neutral-500 font-medium">Universitas Multimedia Nusantara</p>
                <p className="text-xs text-neutral-600 font-medium mt-1">2022 - Present</p>
                <p className="text-xs text-neutral-400 leading-relaxed mt-2.5 poppins-regular">
                  Focusing on software development methodologies, algorithms, web applications design, database structures, and enterprise modules configuration.
                </p>
              </div>
            </motion.div>

            {/* Tech Skills */}
            <motion.div className="glass-card rounded-[24px] p-6 border border-neutral-900" variants={itemVariants}>
              <h3 className="text-lg font-bold text-neutral-100 mb-4 border-b border-neutral-900 pb-2 poppins-bold flex items-center gap-2">
                Technical Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill.name}
                    className="inline-flex items-center gap-2 text-neutral-300 text-xs px-3.5 py-1.5 rounded-xl font-medium"
                  >
                    <img src={skill.src} alt={skill.name} className="w-4 h-4 object-contain" />
                    {skill.name}
                  </span>
                ))}
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
                Resourceful and dedicated Informatics student at Universitas Multimedia Nusantara with hands-on experience in junior software engineer roles. Proven ability in tailoring enterprise layouts, designing modules, streamlining logistics workflows, and developing scalable web applications. Strong analytical background in Python, Odoo ERP, and JavaScript/React ecosystems.
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
