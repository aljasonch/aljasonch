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
  email: "aljasonch@gmail.com",
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

// What I do — service offerings shown on the Home page
export const services = [
  {
    icon: "code",
    accent: "primary",
    title: "Full-Stack Web Development",
    description:
      "I build responsive, accessible web apps end-to-end with React, Tailwind CSS, and Firebase — from pixel-clean UI to data layers that just work.",
  },
  {
    icon: "server",
    accent: "secondary",
    title: "ERP & Odoo Engineering",
    description:
      "I customize Odoo modules in Python: automating sales reporting, purchase flows, and squashing legacy bugs that slow real businesses down.",
  },
  {
    icon: "palette",
    accent: "accent",
    title: "Interface & Motion Design",
    description:
      "I sweat the details — micro-interactions, smooth transitions, and layouts that feel premium without ever getting in the user's way.",
  },
];

// Why work with me — value propositions
export const whyMe = [
  {
    icon: "bridge",
    title: "I speak business and code",
    description:
      "At Kompas Gramedia I sat between analysts and systems, translating messy requirements into modules people actually use.",
  },
  {
    icon: "bolt",
    title: "I ship, then I sharpen",
    description:
      "Built a hackathon prototype in under 48 hours, then spent months optimizing ERP scripts. I move fast and I refine relentlessly.",
  },
  {
    icon: "users",
    title: "I lead and I listen",
    description:
      "Directed a 5-developer team for UMN's mentoring platform and mentored 15+ freshmen. Good software is a team sport.",
  },
  {
    icon: "heart",
    title: "I care about the last 10%",
    description:
      "The empty states, the loading shimmer, the keyboard shortcut nobody asked for. Polish is where trust is earned.",
  },
];

// Quick stats — animated counters on the Home page
export const stats = [
  { value: 3, suffix: "+", label: "Years writing code" },
  { value: 1000, suffix: "+", label: "Students served by my apps" },
  { value: 50, suffix: "+", label: "Legacy bugs resolved" },
  { value: 10, suffix: "+", label: "Projects shipped" },
];

// Principles — how I work
export const principles = [
  "Clean code beats clever code.",
  "Read the codebase before writing a line.",
  "Accessibility is not optional.",
  "Measure, then optimize.",
  "Ship small, ship often.",
];
