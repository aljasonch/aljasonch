export const profile = {
  name: "Alfonsus Jason Christian",
  shortName: "Jason",
  role: "Software Engineer",
  location: "Tangerang, Indonesia",
  timezone: "Asia/Jakarta",
  email: "aljasonch@gmail.com",
  github: "https://github.com/aljasonch",
  linkedin: "https://www.linkedin.com/in/aljasonch/",
  instagram: "https://www.instagram.com/aljasonch/",
  website: "https://aljasonch.vercel.app",
  cv: "/alfonsus-jason-christian-cv.pdf",
  bio: "Informatics graduate from Universitas Multimedia Nusantara, building practical, business-focused software. My work spans full-stack applications, Odoo ERP, and the details that make a product useful. I’m also exploring AI agents and workflow automation.",
};

export type Capability = {
  index: string;
  title: string;
  summary: string;
  stack: string[];
};

export const capabilities: Capability[] = [
  {
    index: "01",
    title: "Full-Stack Products",
    summary:
      "End-to-end web applications built for real audiences—from digital newsrooms and multilingual consultancy sites to community platforms serving thousands of users.",
    stack: ["Next.js", "React", "TypeScript", "Firebase"],
  },
  {
    index: "02",
    title: "Business & ERP Systems",
    summary:
      "Reliable internal systems that keep operations moving: online test proctoring with real-time monitoring, Odoo ERP customization, and PostgreSQL query optimization.",
    stack: ["Python", "Odoo", "PostgreSQL", "Azure DevOps"],
  },
  {
    index: "03",
    title: "AI & Workflow Automation",
    summary:
      "Practical automation and applied machine learning—grounded portfolio assistants, automated content synchronization, and GRU time-series forecasting.",
    stack: ["AI Agents", "REST APIs", "GRU / ML", "Automation"],
  },
];

export type Project = {
  title: string;
  slug: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
  image?: string;
  url?: string;
  tone: string;
  detail: string;
  role: string;
  highlights: string[];
};

export const projects: Project[] = [
  {
    title: "Chainew",
    slug: "chainew",
    category: "Personal",
    year: "2026",
    description: "A newsroom for a world that never stops moving.",
    detail:
      "A full-stack digital newsroom covering technology, finance, world, and public affairs. Built with categorized stories, RSS updates, authenticated content management, and automated content sync in collaboration with Neuraspheres.",
    tech: ["Next.js", "TypeScript", "Firebase"],
    image: "/images/chainew.webp",
    url: "https://chainew.vercel.app",
    tone: "blue",
    role: "Full-Stack Developer · Collaboration with Neuraspheres",
    highlights: [
      "Structured editorial taxonomy across Technology, Finance, World, and Public Affairs with live RSS feed support.",
      "Authenticated content management layer backed by Firebase for publishing and moderating stories.",
      "Automated content synchronization pipeline built in collaboration with Neuraspheres.",
    ],
  },
  {
    title: "Tjahyadi Consulting",
    slug: "tjahyadi",
    category: "Freelance",
    year: "2026",
    description: "Business expertise, without the language barrier.",
    detail:
      "A trilingual website in Indonesian, English, and Mandarin for a tax, accounting, and legal consultancy. Includes five service areas, PPh 21 and withholding tax calculators, testimonials, and WhatsApp consultation booking.",
    tech: ["Next.js", "Multilingual"],
    image: "/images/tjahyadi.webp",
    url: "https://tjahyadi-consulting.vercel.app",
    tone: "olive",
    role: "Freelance Web Engineer",
    highlights: [
      "Full trilingual experience supporting Indonesian, English, and Mandarin for domestic and international clients.",
      "Interactive Indonesian tax utilities including PPh 21 and withholding tax calculators.",
      "Five structured advisory service areas paired with client testimonials and direct WhatsApp consultation booking.",
    ],
  },
  {
    title: "KKI Santo Agustinus",
    slug: "kki",
    category: "Community",
    year: "2026",
    description: "A digital gathering place for a local community.",
    detail:
      "A community website I designed, developed, and maintain. Devotional reflections, prayer guides, event schedules, content administration, and a photo gallery support parish activities in Tangerang.",
    tech: ["Next.js", "Firebase", "Cloudinary"],
    image: "/images/kki.webp",
    url: "https://kkisantoagustinus.vercel.app",
    tone: "sand",
    role: "Designer, Developer & Maintainer",
    highlights: [
      "Dedicated reading experience for daily devotional reflections, prayer guides, and parish schedules.",
      "Firebase-powered content administration so community coordinators can update schedules and posts independently.",
      "Media gallery managed via Cloudinary to keep parish event photography fast on mobile connections.",
    ],
  },
  {
    title: "Bilbil",
    slug: "bilbil",
    category: "Personal",
    year: "2026",
    description: "Split the bill. Keep the good company.",
    detail:
      "A bill-splitting app for recording receipts, adjusting discounts and charges, calculating each person’s share, and saving payment history in the browser.",
    tech: ["Next.js", "Tailwind CSS", "Local storage"],
    image: "/images/bilbil.webp",
    url: "https://bilbilapp.vercel.app",
    tone: "blue",
    role: "Creator & Frontend Engineer",
    highlights: [
      "Three-step receipt workflow: record people and items, distribute discounts and service charges, then generate final shares.",
      "Reusable participant roster so frequent dining groups do not need to re-enter names each time.",
      "Zero-account privacy-first persistence using browser local storage to review past bills anytime.",
    ],
  },
  {
    title: "Mentoring UMN 2024",
    slug: "mentoring",
    category: "Community",
    year: "2024",
    description: "Helping nearly 2,000 students find their footing.",
    detail:
      "Led the developer team from planning to launch of the official Character Building Mentoring website. Built with React and Firebase, supporting nearly 2,000 student users with stable performance.",
    tech: ["React", "Firebase", "Tailwind CSS"],
    image: "/images/mentoring2024.webp",
    url: "https://mentoring2024.vercel.app",
    tone: "blue",
    role: "Web Development Coordinator",
    highlights: [
      "Coordinated engineering planning, architecture, and delivery from initial scope through campus-wide launch.",
      "Served nearly 2,000 first-year students reliably during peak orientation traffic using React and Firebase.",
      "Delivered group lookup, program guidelines, division directories, and event galleries for the annual program.",
    ],
  },
  {
    title: "KeGia Art",
    slug: "kegia",
    category: "Freelance",
    year: "2026",
    description: "Handmade in Kalimantan. Shared with the world.",
    detail:
      "A bilingual Indonesian and English website for a handmade jewelry brand. Features a category-based product catalog, cultural storytelling, and a downloadable wholesale catalog for export inquiries.",
    tech: ["Next.js", "Cloudinary"],
    tone: "sand",
    role: "Freelance Web Engineer",
    highlights: [
      "Bilingual Indonesian and English presentation built to serve both local buyers and international export partners.",
      "Category-based artisan product catalog paired with Kalimantan cultural storytelling.",
      "Optimized visual assets via Cloudinary and a downloadable wholesale catalog for B2B export inquiries.",
    ],
  },
  {
    title: "WeShare",
    slug: "weshare",
    category: "Hackathon",
    year: "2024",
    description: "Connecting communities with access to healthcare.",
    detail:
      "Built a full-stack healthcare access and donation prototype at Garuda Hacks 5.0. Collaborated with a four-member team to deliver within 48 hours, integrating Midtrans for donations.",
    tech: ["Next.js", "Midtrans"],
    tone: "olive",
    role: "Full-Stack Developer · Garuda Hacks 5.0",
    highlights: [
      "Shipped a working full-stack healthcare access and community donation prototype within a 48-hour hackathon sprint.",
      "Collaborated across a four-member team from problem framing to live demo.",
      "Integrated Midtrans payment flows to support transparent community donation transactions.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export const experience = [
  {
    role: "Software Engineer",
    company: "PT Solusi Kode Indonesia",
    dates: "Sep 2026 — Present",
    current: true,
    description:
      "Developing an online psychological test proctoring system for FIFGROUP, helping ensure candidate test integrity through real-time monitoring and cross-functional collaboration.",
  },
  {
    role: "Junior Software Engineer Intern",
    company: "Kompas Gramedia",
    dates: "Jan 2025 — Jan 2026",
    current: false,
    description:
      "Developed and customized Odoo Accounting, Inventory, and Purchase modules with Python and XML/QWeb. Optimized PostgreSQL queries and contributed across the Agile lifecycle, from sprint planning to production deployment with Gitflow, CI/CD, and Azure.",
  },
];

export const community = [
  {
    role: "Web Development Coordinator",
    company: "Mentoring UMN 2024",
    dates: "Jan — Dec 2024",
    description:
      "Led the team behind the official mentoring website, supporting nearly 2,000 students.",
  },
  {
    role: "Mentor",
    company: "Mentoring UMN 2023",
    dates: "Mar — Dec 2023",
    description:
      "Guided first-year students in understanding and applying UMN’s 5C values.",
  },
];

export const education = [
  {
    school: "Universitas Multimedia Nusantara",
    qualification: "Bachelor’s degree in Informatics",
    dates: "2022 — 2026",
    detail:
      "GPA 3.74. Thesis: IDX30 stock index price prediction using a Gated Recurrent Unit (GRU) model with technical indicator integration.",
  },
  {
    school: "Strada St. Thomas Aquino",
    qualification: "Senior High School · Natural Science",
    dates: "2019 — 2022",
    detail: "Tangerang, Indonesia.",
  },
];

export const certifications = [
  {
    title: "TOEIC Listening & Reading",
    issuer: "PT. International Test Center Indonesia",
    detail: "820 / 990",
    dates: "Aug 2026 — Aug 2028",
  },
  {
    title: "Information Technology Specialist — Artificial Intelligence",
    issuer: "Certiport · Pearson VUE",
    detail: "Certified",
    dates: "May 2026 — May 2031",
  },
];

export const skills = {
  languages: ["Python", "JavaScript", "TypeScript", "SQL"],
  frameworks: ["Next.js", "React", "Odoo", "Tailwind CSS"],
  tools: [
    "PostgreSQL",
    "Firebase",
    "RESTful APIs",
    "Git",
    "GitHub",
    "Visual Studio Code",
    "Azure DevOps",
    "Claude Code",
    "GitHub Copilot",
  ],
  spoken: ["Indonesian · Native", "English · Advanced"],
  interpersonal: [
    "Problem solving",
    "Communication",
    "Team collaboration",
    "Critical thinking",
  ],
};
