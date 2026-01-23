export const projects = [
  {
    title: "Shop Mart",
    category: "E-commerce",
    description:
      "Modern e-commerce web app with a clean shopping experience, responsive UI, and smooth navigation. Built to showcase products professionally with a fast and user-friendly interface.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "NextAuth"],
    link: "https://e-commerce-94.vercel.app/",
    image: new URL(
      "../assets/Screenshot 2026-01-20 165832.webp",
      import.meta.url,
    ).href,
  },
  {
    title: "Linkedpost",
    category: "Social App",
    description:
      "A social media web app where users can create posts, interact, and connect with others through a modern UI. Includes authentication, profiles, and a smooth feed experience built for performance and usability.",
    tech: ["React", "Vite", "TailwindCSS", "React Query"],
    link: "https://social12.vercel.app/",
    image: new URL(
      "../assets/Screenshot 2026-01-23 021322.webp",
      import.meta.url,
    ).href,
  },
];

export const services = [
  {
    number: "01",
    title: "React & Next.js Development",
    description:
      "Building modern, scalable web applications using React, Next.js, and TypeScript. Implementing component-based architectures, state management with Redux/Zustand, and server-side rendering for optimal performance.",
  },
  {
    number: "02",
    title: "Responsive UI Implementation",
    description:
      "Creating pixel-perfect, mobile-first interfaces with Tailwind CSS, CSS-in-JS, and modern CSS. Ensuring cross-browser compatibility and accessibility standards (WCAG) compliance.",
  },
  {
    number: "03",
    title: "Performance Optimization",
    description:
      "Optimizing web performance through code splitting, lazy loading, image optimization, and efficient rendering. Achieving high Lighthouse scores and fast load times for better user experience.",
  },
  {
    number: "04",
    title: "Modern Tooling & Animation",
    description:
      "Leveraging Vite, Webpack, and modern build tools for efficient development. Creating engaging animations with Framer Motion, GSAP, and Three.js for immersive user experiences.",
  },
];

export const experiences = [
  {
    company: "Freelancer — Khamsat",
    role: "Frontend Developer",
    type: "Freelance",
    period: "2025 — Present",
    description:
      "Providing landing page and website services, focusing on modern UI, full responsiveness, and SEO basics. Delivering clean and smooth user experiences with professional layouts and animations.",
  },
  {
    company: "Computer Science Student",
    role: "BSc Computer Science",
    type: "Education",
    period: "2024 — Present",
    description:
      "Currently a 2nd-year Computer Science student, building strong fundamentals in programming and software development while improving my front-end skills.",
  },
  {
    company: "Advaz — E-commerce Development",
    role: "Frontend Trainee",
    type: "Training",
    period: "2025",
    description:
      "Assisted in building and customizing online stores for clients on Salla and other platforms. Focused on clean UI, responsive design, and improving the customer experience.",
  },
  {
    company: "Route Academy",
    role: "Front-End Developer Track",
    type: "Training",
    period: "2024 — 2025",
    description:
      "Completed a front-end training track focusing on building responsive websites and modern UI components. Covered HTML, CSS, JavaScript, and real projects to strengthen practical skills.",
  },
];

export const techStack = [
  { name: "React", icon: "FaReact", color: "#61DAFB" },
  { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
  { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
  { name: "HTML5", icon: "FaHtml5", color: "#E34F26" },
  { name: "CSS3", icon: "FaCss3Alt", color: "#1572B6" },
  { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4" },
  { name: "Next.js", icon: "SiNextdotjs", color: "#000000" },
  { name: "Git", icon: "FaGitAlt", color: "#F05032" },
  { name: "Vite", icon: "SiVite", color: "#646CFF" },
  { name: "Framer Motion", icon: "SiFramer", color: "#0055FF" },
];

export const sectionFade = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
