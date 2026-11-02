export const profile = {
  name: "Alfonsus Jason Christian",
  shortName: "Jason",
  role: "Software Engineer",
  location: "Tangerang, Indonesia",
  email: "aljasonch@gmail.com",
  github: "https://github.com/aljasonch",
  linkedin: "https://www.linkedin.com/in/aljasonch/",
  instagram: "https://www.instagram.com/aljasonch/",
  website: "https://aljasonch.vercel.app",
  cv: "/alfonsus-jason-christian-cv.pdf",
  bio: "Informatics graduate from Universitas Multimedia Nusantara, building practical, business-focused software. My work spans full-stack applications, Odoo ERP, and the details that make a product useful. I’m also exploring AI agents and workflow automation.",
};

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
  },
];

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
