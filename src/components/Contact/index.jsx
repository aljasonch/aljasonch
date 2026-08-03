import { motion } from "framer-motion";
import { FaInstagram, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { personalInfo } from "../../data/content";

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-neutral-950 flex items-center min-h-[85vh] relative overflow-hidden">
      {/* Subtle dotted backdrop (solid dots, no gradient) */}
      <div className="absolute inset-0 dot-grid opacity-[0.3] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-2xl text-center relative z-10">
        <motion.p
          className="text-theme font-semibold tracking-widest uppercase mb-4 text-sm"
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
            className="btn-primary flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 font-semibold text-lg poppins-medium hover:shadow-lg"
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
              className="w-11 h-11 rounded-full flex items-center justify-center text-neutral-400 hover:text-theme transition-all duration-300"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href={personalInfo.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="w-11 h-11 rounded-full flex items-center justify-center text-neutral-400 hover:text-theme transition-all duration-300"
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
