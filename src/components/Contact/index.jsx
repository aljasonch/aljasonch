import { motion } from "framer-motion";
import { FaInstagram, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { personalInfo } from "../../data/content";

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-neutral-950 flex items-center min-h-[85vh] relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary-500/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-secondary-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-2xl text-center relative z-10">
        <motion.p
          className="text-primary-500 font-semibold tracking-widest uppercase mb-4 text-sm"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.p>
        
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-neutral-100 mb-6 poppins-bold"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Let's Connect.
        </motion.h2>

        <motion.p 
          className="text-base sm:text-lg text-neutral-400 mb-12 poppins-regular leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Currently available for freelance developer projects, Odoo customizations, or full-stack collaborations. Have an idea or a workflow to optimize? Let's discuss.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 15 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.3 }}
           className="flex flex-col items-center gap-8"
        >
          <a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full hover:from-primary-650 hover:to-primary-700 transition-all duration-300 font-semibold text-lg poppins-medium hover:shadow-lg hover:-translate-y-0.5"
          >
            <FaEnvelope size={18} />
            Say Hello
          </a>

          <div className="flex gap-4 items-center">
            <a
              href={personalInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-11 h-11 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center text-neutral-400 hover:text-primary-500 hover:border-primary-500/50 hover:bg-primary-500/5 transition-all duration-300"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href={personalInfo.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="w-11 h-11 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center text-neutral-400 hover:text-primary-500 hover:border-primary-500/50 hover:bg-primary-500/5 transition-all duration-300"
            >
              <FaXTwitter size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
