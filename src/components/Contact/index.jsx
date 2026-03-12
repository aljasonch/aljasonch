import { motion } from "framer-motion";
import { FaInstagram, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-white flex items-center min-h-[70vh]">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <motion.p
          className="text-green-600 font-medium tracking-widest uppercase mb-4 text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.p>
        
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 poppins-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Let's Connect.
        </motion.h2>

        <motion.p 
          className="text-lg text-neutral-500 mb-12 poppins-regular leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
        Currently available for freelance projects and collaborations. Have an idea or something you'd like to work on together? Let's talk.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.3 }}
           className="flex flex-col items-center gap-8"
        >
          <a
            href="mailto:alfonsusjasonchristian@gmail.com"
            className="flex items-center gap-3 px-8 py-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 font-medium text-lg poppins-medium hover:shadow-lg hover:-translate-y-1"
          >
            <FaEnvelope />
            Say Hello
          </a>

          <div className="flex gap-6 items-center">
            <a
              href="https://www.instagram.com/aljasonch/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-neutral-500 hover:text-green-600 transition-colors p-2"
            >
              <FaInstagram size={28} />
            </a>
            <a
              href="https://x.com/aljasonch"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-neutral-500 hover:text-green-600 transition-colors p-2"
            >
              <FaXTwitter size={28} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
