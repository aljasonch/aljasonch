import Profile from '../assets/aljasonch.jpg';
import html from '../assets/html.png';
import css from '../assets/css.png';
import reactLogo from '../assets/react.png';
import tailwindcss from '../assets/tailwindcss.png';
import kotlin from '../assets/kotlin.png';
import odoo from '../assets/odoo.png';

import Mentoring from '../assets/mentoring2024.webp';
import Chainew from '../assets/chainew.webp';
import Bayar_Bareng from '../assets/bayarbareng.webp';

export const personalInfo = {
  name: "Alfonsus Jason Christian",
  role: "Junior Software Engineer & Informatics Student",
  email: "alfonsusjasonchristian@gmail.com",
  instagram: "https://www.instagram.com/aljasonch/",
  twitter: "https://x.com/aljasonch",
  github: "https://github.com/aljasonch",
  location: "Tangerang, Indonesia",
  bio: "Software Engineer specializing in full-stack development and ERP systems, turning complex business needs into clean, reliable software. Passionate about web technologies, system optimizations, and UI aesthetics.",
  profileImage: Profile,
};

export const skills = [
  { src: html, name: 'HTML5', category: 'Frontend' },
  { src: css, name: 'CSS3', category: 'Frontend' },
  { src: reactLogo, name: 'React', category: 'Frontend' },
  { src: tailwindcss, name: 'Tailwind CSS', category: 'Frontend' },
  { src: kotlin, name: 'Kotlin', category: 'Mobile' },
  { src: odoo, name: 'Odoo', category: 'ERP / Backend' },
];

export const workExperience = [
  {
    title: 'Junior Software Engineer Intern',
    date: 'Jan 2025 - Jan 2026',
    organization: 'Kompas Gramedia',
    description:
      "Responsible for optimizing ERP modules based on Odoo, including bug fixing, feature enhancements, and performance improvements to align with the company's operational needs.",
    details: [
      "Optimized internal enterprise resource planning systems built on top of the Odoo framework.",
      "Identified and resolved critical workflow bottlenecks, reducing script execution times.",
      "Implemented custom automated sales reporting and purchase requisition modules in Python.",
      "Collaborated with cross-functional business analysis teams to gather requirements and deliver scalable modules."
    ]
  },
];

export const organizationExperience = [
  {
    title: 'Website Coordinator',
    date: 'Jan 2024 - Dec 2024',
    organization: 'Character Building Mentoring UMN 2024',
    description:
      "Leading the development of UMN Mentoring's official website with a developer team using React JS, Tailwind CSS, and Firebase. Focused on creating a responsive and user-friendly platform to support mentoring activities.",
    details: [
      "Directed a team of 5 student developers using React JS, Tailwind CSS, and Firebase database.",
      "Created authentication, resource materials hosting, and student enrollment dashboard features.",
      "Guaranteed mobile responsiveness and modern layout design, matching the UMN identity guidelines."
    ]
  },
  {
    title: 'Participant',
    date: 'Jul 2024',
    organization: 'Garuda Hacks 5.0',
    description:
      'Participated in Garuda Hacks 5.0 by creating a project named "WeShare" that helps underprivileged people gain access to healthcare.',
    details: [
      "Designed and coded front-end interfaces for the 'WeShare' social platform during a 48-hour hackathon.",
      "Integrated search and map APIs to facilitate finding local free medical checkup locations."
    ]
  },
  {
    title: 'Mentor',
    date: 'Mar 2023 - Dec 2023',
    organization: 'Character Building Mentoring UMN 2023',
    description:
      "Guided Mentees (first-year students) to understand and apply UMN's 5C values (Caring, Credible, Competent, Competitive, Customer Delight) in their university life.",
    details: [
      "Conducted weekly mentoring sessions for 15+ freshmen, helping them adapt to university environments.",
      "Assessed student reports and organized collective community service activities."
    ]
  },
  {
    title: 'Logistics and Security',
    date: 'Feb 2023 - Aug 2023',
    organization: 'ISFEST UMN 2023',
    description:
      "Committee for Equipment and Security at ISFEST 2023. Ensuring seamless organization, logistics, and safety for the event.",
    details: [
      "Coordinated with vendor partners for event stage, sound, lighting systems.",
      "Managed crowd control protocols and safety pathways for 500+ participants."
    ]
  },
];

export const achievements = [
  {
    title: "UMN Mentoring 2024 Web Lead",
    description: "Successfully orchestrated the development and deployment of the official mentoring web platform for Universitas Multimedia Nusantara, serving over 1,000 active student users.",
    category: "Leadership"
  },
  {
    title: "ERP Workflow Optimization at Kompas Gramedia",
    description: "Designed custom sales and inventory reporting automations in Odoo that eliminated manual tasks and resolved 50+ critical legacy system bugs.",
    category: "Professional"
  },
  {
    title: "Garuda Hacks 5.0 Competitor",
    description: "Built the prototype 'WeShare' web application in under 48 hours, earning praise for practical social impact and seamless API search configurations.",
    category: "Competition"
  },
  {
    title: "Academic Focus in Software Engineering",
    description: "Maintained a strong academic record as an Informatics student at UMN, specializing in modern React frameworks, database design, and systems analysis.",
    category: "Academic"
  }
];

export const initialProjects = [
  {
    title: "MENTORING UMN 2024",
    image: Mentoring,
    link: "https://mentoring2024.vercel.app",
    github: "https://github.com/aljasonch",
    alt: "Mentoring UMN 2024 Project",
    category: "Web App",
    tech: ["React", "Tailwind CSS", "Firebase", "Firestore"],
    description: "The official mentoring website for UMN students. Includes user dashboards, resource document distribution, and mentor-mentee group matching features."
  },
  {
    title: "Chainew",
    image: Chainew,
    link: "https://chainew.vercel.app",
    github: "https://github.com/aljasonch",
    alt: "Chainew Project",
    category: "Web App",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    description: "A digital agency presentation platform highlighting animations and modern responsive grid layouts for clients."
  },
  {
    title: "Bayar Bareng",
    image: Bayar_Bareng,
    link: "https://bayar-bareng.vercel.app",
    github: "https://github.com/aljasonch",
    alt: "Bayar Bareng Project",
    category: "Web App",
    tech: ["React", "Tailwind CSS", "Local Storage"],
    description: "An intuitive bill splitting and expense management utility. Allows user groups to split bills and calculate precise debts without signup."
  }
];

export const initialBlogPosts = [
  {
    id: 1,
    title: "Getting Started with Odoo ERP Development",
    date: "May 15, 2026",
    tags: ["ERP", "Odoo", "Python", "Backend"],
    excerpt: "Learn the fundamentals of customizing Odoo modules, setting up local databases, and writing your first custom ERP flows.",
    content: `Odoo is a powerful open-source ERP framework written in Python. During my junior software engineering internship at Kompas Gramedia, I learned that customizing Odoo requires a solid understanding of its ORM, XML view definitions, and architectural design patterns.

### Why Odoo?
Odoo provides a modular structure out-of-the-box. It has CRM, sales, billing, inventory, and human resources components. The real value is in customizing these modules to meet specific business workflows.

### Setting Up a Development Instance
To start developing, you need:
1. Python 3.10+
2. PostgreSQL database server
3. Odoo source code (Community or Enterprise edition)

Setting up a config file is direct:
\`\`\`ini
[options]
addons_path = /path/to/odoo/addons,/path/to/custom_addons
db_host = localhost
db_user = odoo
db_password = odoo_password
\`\`\`

### Writing Your First Model
A basic model definition inherits from \`models.Model\`:
\`\`\`python
from odoo import models, fields, api

class CustomSalesOrder(models.Model):
    _inherit = 'sale.order'
    
    custom_notes = fields.Text(string="Operations Notes")
    approval_status = fields.Selection([
        ('draft', 'Draft'),
        ('submitted', 'Submitted'),
        ('approved', 'Approved')
    ], default='draft', string="Approval status")
    
    def action_submit_for_approval(self):
        self.write({'approval_status': 'submitted'})
\`\`\`

### Constructing the View
The view extends the existing XML definitions:
\`\`\`xml
<record id="view_order_form_inherit" model="ir.ui.view">
    <field name="name">sale.order.form.inherit</field>
    <field name="model">sale.order</field>
    <field name="inherit_id" ref="sale.view_order_form"/>
    <field name="arch" type="xml">
        <xpath expr="//field[@name='payment_term_id']" position="after">
            <field name="approval_status" readonly="1"/>
            <field name="custom_notes"/>
        </xpath>
        <xpath expr="//header" position="inside">
            <button name="action_submit_for_approval" string="Submit Approval" type="object" class="btn-primary"/>
        </xpath>
    </field>
</record>
\`\`\`

By deploying custom addons like this, we've automated complex procurement checks and reduced data entries. Hopefully, this simple guide gives you a quick start in Odoo!`,
    slug: "getting-started-odoo-erp"
  },
  {
    id: 2,
    title: "Why Framer Motion is the Best Choice for React Animations",
    date: "May 18, 2026",
    tags: ["React", "Framer Motion", "CSS", "Frontend"],
    excerpt: "A detailed comparison of React animation libraries, showing why Framer Motion stands out in usability, performance, and API design.",
    content: `Animations can make or break a website's user experience. A subtle fade or slide can guide users, while sudden transitions can feel jarring. In the React ecosystem, we have several choices: React Transition Group, React Spring, and Framer Motion. 

During the redesign of this portfolio website, I evaluated these options and found Framer Motion to be the most productive and capable library.

### Declarative API
Framer Motion introduces the concept of \`motion\` elements. Instead of writing complex CSS keyframes or hook structures, you write:
\`\`\`jsx
import { motion } from 'framer-motion';

const Component = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, type: 'spring' }}
  >
    Hello World
  </motion.div>
);
\`\`\`

### Exit Animations with AnimatePresence
One of the most complex things to achieve in React is animating elements as they leave the DOM (unmount). Framer Motion solves this with \`AnimatePresence\`:
\`\`\`jsx
import { motion, AnimatePresence } from 'framer-motion';

const Drawer = ({ isOpen }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
      />
    )}
  </AnimatePresence>
);
\`\`\`

### Scroll-triggered animations
Applying entrance transitions as users scroll is built-in:
\`\`\`jsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, amount: 0.2 }}
>
  I animate when I enter the viewport!
</motion.div>
\`\`\`

Framer Motion is standard, performant, and has stellar documentation. Combining it with Tailwind utility classes allows for rapid prototyping of premium, glassmorphic interfaces.`,
    slug: "framer-motion-react-animations"
  }
];
