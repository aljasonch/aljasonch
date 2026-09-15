import Profile from '../assets/aljasonch.png';
import reactLogo from '../assets/react.png';
import nextLogo from '../assets/next.png';
import tailwindcss from '../assets/tailwindcss.png';
import python from '../assets/python.webp';
import kotlin from '../assets/kotlin.png';
import odoo from '../assets/odoo.png';

import Mentoring from '../assets/mentoring2024.webp';
import Chainew from '../assets/chainew.webp';
import Bilbil from '../assets/bilbil.webp';
import KKI from '../assets/kki.webp';
import Tjahyadi from '../assets/tjahyadi.webp';

export const personalInfo = {
  name: "Alfonsus Jason Christian",
  role: "Junior Software Engineer & Informatics Graduate",
  email: "aljasonch@gmail.com",
  instagram: "https://www.instagram.com/aljasonch/",
  twitter: "https://x.com/aljasonch",
  linkedin: "https://www.linkedin.com/in/aljasonch/",
  github: "https://github.com/aljasonch",
  location: "Tangerang, Indonesia",
  bio: "Informatics graduate from Universitas Multimedia Nusantara with a 3.74 GPA and full-stack development experience across React.js, Next.js, Python, and PostgreSQL. I build practical, business-focused solutions across the software development lifecycle and actively explore AI agents and workflow automation.",
  profileImage: Profile,
};

export const skills = [
  { src: python, name: 'Python', category: 'Programming Languages', group: 'languages' },
  { name: 'JavaScript', category: 'Programming Languages', group: 'languages' },
  { name: 'TypeScript', category: 'Programming Languages', group: 'languages' },
  { name: 'SQL', category: 'Programming Languages', group: 'languages' },
  { src: kotlin, name: 'Kotlin', category: 'Programming Languages', group: 'languages' },
  { src: reactLogo, name: 'React', category: 'Libraries & Frameworks', group: 'frameworks' },
  { src: nextLogo, name: 'Next.js', category: 'Libraries & Frameworks', group: 'frameworks' },
  { src: tailwindcss, name: 'Tailwind CSS', category: 'Libraries & Frameworks', group: 'frameworks' },
  { src: odoo, name: 'Odoo', category: 'Libraries & Frameworks', group: 'frameworks' },
  { name: 'PostgreSQL', category: 'Tools & Technologies', group: 'tools' },
  { name: 'Firebase', category: 'Tools & Technologies', group: 'tools' },
  { name: 'Git', category: 'Tools & Technologies', group: 'tools' },
  { name: 'GitHub', category: 'Tools & Technologies', group: 'tools' },
  { name: 'Visual Studio Code', category: 'Tools & Technologies', group: 'tools' },
  { name: 'Azure', category: 'Tools & Technologies', group: 'tools' },
  { name: 'RESTful API', category: 'Tools & Technologies', group: 'tools' },
  { name: 'Claude Code', category: 'Tools & Technologies', group: 'tools' },
  { name: 'GitHub Copilot', category: 'Tools & Technologies', group: 'tools' },
];

export const workExperience = [
  {
    title: 'Junior Software Engineer Intern',
    date: 'Jan 2025 - Jan 2026',
    organization: 'Kompas Gramedia',
    summary:
      "Developed and customized Odoo modules used by multiple companies within the Kompas Gramedia Group.",
    description:
      "Developed and customized Odoo Accounting, Inventory, Purchase, and related modules using Python Odoo ORM and XML/QWeb. Contributed across configuration, integration, debugging, maintenance, documentation, and production delivery.",
    details: [
      "Wrote and optimized SQL queries on PostgreSQL for enterprise workflows.",
      "Collaborated on system configuration, integration, debugging, maintenance, and technical documentation.",
      "Worked through Agile sprint planning, development, testing, and production deployment using Gitflow, CI/CD pipelines, and Azure."
    ]
  },
];

export const organizationExperience = [
  {
    title: 'Website Coordinator',
    date: 'Jan 2024 - Dec 2024',
    organization: 'Character Building Mentoring UMN 2024',
    summary:
      "Led the developer team that built and launched the official Mentoring UMN 2024 website for nearly 2,000 student users.",
    description:
      "Led the development and launch of the official Mentoring UMN 2024 website using React.js and Firebase, supporting nearly 2,000 student users with stable performance and no significant lag.",
    details: [
      "Coordinated a developer team throughout planning, development, testing, and launch.",
      "Built and maintained a responsive website with React.js and Firebase.",
      "Supported stable performance for nearly 2,000 student users."
    ]
  },
  {
    title: 'Mentor',
    date: 'Mar 2023 - Dec 2023',
    organization: 'Character Building Mentoring UMN 2023',
    summary:
      "Guided first-year students in applying UMN's 5C values.",
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
    summary:
      'Supported logistics and security for ISFEST UMN 2023.',
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
    description: "Led the development and launch of the official Mentoring UMN 2024 website, which supported nearly 2,000 student users with stable performance.",
    category: "Leadership"
  },
  {
    title: "ERP Workflow Optimization at Kompas Gramedia",
    description: "Developed and customized Odoo Accounting, Inventory, and Purchase modules, with PostgreSQL query optimization and Agile delivery practices.",
    category: "Professional"
  },
  {
    title: "Academic Focus in Software Engineering",
    description: "Graduated in Informatics from Universitas Multimedia Nusantara with a 3.74 GPA and a thesis applying a GRU model with technical indicators to IDX30 stock index price prediction.",
    category: "Academic"
  }
];

export const initialProjects = [
  {
    title: "MENTORING UMN 2024",
    image: Mentoring,
    link: "https://mentoring2024.vercel.app",
    // github: "https://github.com/aljasonch",
    alt: "Mentoring UMN 2024",
    category: "Web App",
    tech: ["React", "Tailwind CSS", "Firebase"],
    description: "An information and engagement website for UMN's Character Building Mentoring program, featuring event details, FAQs, galleries, and a searchable mentee group directory."
  },
  {
    title: "Tjahyadi Consulting",
    image: Tjahyadi,
    link: "https://tjahyadi-consulting.vercel.app",
    // github: "https://github.com/aljasonch",
    alt: "Tjahyadi Consulting",
    category: "Web App",
    tech: ["Next.js", "Tailwind CSS", "Firebase"],
    description: "A multilingual company profile website for a tax, accounting, payroll, and legal consulting firm in Indonesia, featuring service pages, client testimonials, and an articles section covering compliance topics."
  },
  {
    title: "Chainew",
    image: Chainew,
    link: "https://chainew.vercel.app",
    // github: "https://github.com/aljasonch",
    alt: "Chainew",
    category: "Web App",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description: "A digital newsroom covering technology, finance, blockchain, and public affairs through categorized news, trending stories, articles, and RSS updates."
  },
  {
    title: "KKI Santo Agustinus",
    image: KKI,
    link: "https://kkisantoagustinus.vercel.app",
    // github: "https://github.com/aljasonch",
    alt: "KKI Santo Agustinus",
    category: "Web App",
    tech: ["Next.Js", "Tailwind CSS","Firebase", "Cloudinary"],
    description: "A community website for KKI Santo Agustinus featuring reflections, prayer guides, schedules, activities, galleries, and contact information."
  },
  {
    title: "Bilbil",
    image: Bilbil,
    link: "https://bilbilapp.vercel.app",
    // github: "https://github.com/aljasonch",
    alt: "Bilbil",
    category: "Web App",
    tech: ["Next.Js", "Tailwind CSS", "Local Storage"],
    description: "A bill-splitting app for recording receipts, adjusting discounts and charges, calculating each person's share, and saving payment history."
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
  { value: 3, suffix: ".74", label: "GPA in Informatics" },
  { value: 2000, suffix: "+", label: "Students supported" },
  { value: 1, suffix: "", label: "Year of Odoo experience" },
];

export const education = [
  {
    institution: 'Universitas Multimedia Nusantara',
    location: 'Serpong, Kab. Tangerang',
    degree: "Bachelor's Degree - Informatics",
    date: '2022 - 2026',
    details: [
      'GPA: 3.74',
      'Relevant coursework: Artificial Intelligence, Web Programming, Object-Oriented Programming, Database Systems, Software Engineering & Project Management, and Algorithms & Data Structure.',
      'Thesis: IDX30 Stock Index Price Prediction Using a Gated Recurrent Unit (GRU) Model with Technical Indicator Integration.',
    ],
  },
  {
    institution: 'Strada St. Thomas Aquino',
    location: 'Pabuaran, Tangerang',
    degree: 'Senior High School, Natural Science',
    date: '2019 - 2022',
    details: [],
  },
];

export const certifications = [
  {
    title: 'TOEIC Listening & Reading',
    issuer: 'PT. International Test Center (ITC) Indonesia',
    date: 'Score: 820/990 | August 2026 - August 2028',
  },
  {
    title: 'Information Technology Specialist - Artificial Intelligence',
    issuer: 'Certiport - A Pearson VUE Business',
    date: 'May 2026 - May 2031',
  },
];

export const languages = ['Indonesian (Native Speaker)', 'English (Advanced)'];

export const softSkills = ['Problem Solving', 'Communication', 'Team Collaboration', 'Critical Thinking'];

// Principles — how I work
export const principles = [
  "Clean code beats clever code.",
  "Read the codebase before writing a line.",
  "Accessibility is not optional.",
  "Measure, then optimize.",
  "Ship small, ship often.",
];
