export const projects = [
  {
    id: 1,
    slug: "shop-mart",
    title: "Shop Mart",
    category: "Next.js",
    featured: true,
    description:
      "A high-performance e-commerce web application delivering a seamless shopping experience with a clean, responsive UI and intuitive navigation.",
    fullDescription:
      "Shop Mart is a full-featured e-commerce platform engineered with Next.js and TypeScript. It provides a flawless shopping experience utilizing advanced features such as dynamic product filtering, seamless cart management, secure user authentication, and a frictionless checkout process. The architecture is heavily optimized for both rendering performance and SEO, ensuring rapid load times and superior search engine visibility.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "NextAuth"],
    features: [
      "Secure user authentication powered by NextAuth",
      "Dynamic product catalog with advanced filtering capabilities",
      "Interactive shopping cart with real-time state updates",
      "Fully responsive, mobile-first user interface",
      "Optimized page rendering using Next.js hybrid approaches",
      "SEO-friendly architecture for maximum visibility",
    ],
    challenges:
      "Balancing server-side rendering (SSR) benefits with the need for highly interactive client-side components was a primary challenge. I resolved this by leveraging Next.js's hybrid rendering capabilities alongside efficient global state management.",
    demo: "https://e-commerce-94.vercel.app/",
    github: "https://github.com/Hamza2079/E-Commerce",
    image: new URL(
      "../assets/Screenshot 2026-01-20 165832.webp",
      import.meta.url,
    ).href,
    year: "2026",
  },
  {
    id: 2,
    slug: "linkedpost",
    title: "Linkedpost",
    category: "React",
    featured: true,
    description:
      "A dynamic social networking platform designed for seamless user interaction, featuring robust authentication and a highly responsive feed.",
    fullDescription:
      "Linkedpost is a modern social media application that empowers users to share content, interact with peers, and build professional connections. Developed with React and supercharged by React Query for optimal data fetching and caching, the platform guarantees a fluid, highly responsive user experience across all devices.",
    tech: ["React", "Vite", "TailwindCSS", "React Query"],
    features: [
      "Comprehensive user authentication and profile management",
      "Full CRUD operations for user posts",
      "Real-time feed synchronization using React Query",
      "Interactive engagement features (Likes & Comments)",
      "Adaptive, mobile-optimized interface",
      "Lightning-fast performance powered by Vite",
    ],
    challenges:
      "Handling real-time data synchronization and maintaining smooth performance with an infinitely growing content feed required a robust solution. I successfully implemented React Query for aggressive caching and background refetching to ensure a jitter-free experience.",
    demo: "https://social12.vercel.app/",
    github: "https://github.com/Hamza2079/social",
    image: new URL(
      "../assets/Screenshot 2026-01-23 021322.webp",
      import.meta.url,
    ).href,
    year: "2025",
  },
  {
    id: 3,
    slug: "weather-app",
    title: "Weather App",
    category: "Vanilla JS",
    description:
      "An elegant, real-time weather dashboard featuring a premium glassmorphism aesthetic, precise forecasts, and automatic geolocation.",
    fullDescription:
      "Weather App is a sophisticated weather tracking dashboard developed with HTML, CSS, and Vanilla JavaScript. It delivers highly accurate real-time weather data, comprehensive 2-day forecasts, and in-depth environmental statistics. The application prioritizes user experience with a stunning glassmorphism design, fluid animations, and automatic location detection via the WeatherAPI.",
    tech: ["HTML5", "CSS3", "JavaScript", "Weather API"],
    features: [
      "Live, highly accurate weather tracking",
      "Comprehensive 2-day weather forecasting",
      "Smart automatic geolocation detection",
      "Global city search functionality",
      "Premium glassmorphism UI with fluid animations",
      "Cross-device responsive layout",
      "In-depth metrics (Humidity, Wind Speed, UV Index, Pressure)",
    ],
    challenges:
      "Managing asynchronous data streams from external APIs while keeping the UI thread unblocked and animations smooth. I utilized modern ES6+ async/await patterns alongside highly optimized DOM manipulation to achieve seamless updates.",
    demo: "https://hamza2079.github.io/weather/",
    github: "https://github.com/Hamza2079/weather",
    image: new URL("../assets/weather-app.webp", import.meta.url).href,
    year: "2025",
  },
  {
    id: 4,
    slug: "bookmarker-galaxy",
    title: "Bookmarker – Galaxy Mode",
    category: "Vanilla JS",
    description:
      "A futuristic, galaxy-themed bookmark management tool designed to securely store and organize favorite web resources with a stunning UI.",
    fullDescription:
      "Bookmarker – Galaxy Mode is an innovative web application for managing bookmarks, built completely with Vanilla JavaScript. It empowers users to seamlessly add, edit, and delete their favorite URLs with robust form validation and persistent LocalStorage. The standout feature is its immersive, galaxy-inspired user interface, combining neon accents, glassmorphism, and interactive animations.",
    tech: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap 5",
      "LocalStorage",
      "SweetAlert2",
      "FontAwesome",
    ],
    features: [
      "Complete CRUD functionality for bookmark management",
      "Strict form validation for site names and URLs",
      "Reliable data persistence utilizing LocalStorage",
      "Immersive galaxy-themed UI with neon and glass effects",
      "Fully adaptive design for desktop and mobile",
      "Engaging user feedback via SweetAlert2 animations",
    ],
    challenges:
      "Ensuring bulletproof data persistence while providing instant, visual user feedback without a backend database. This was accomplished by architecting a reliable LocalStorage wrapper and integrating SweetAlert2 for elegant error handling.",
    demo: "https://hamza2079.github.io/bookmarker/",
    github: "https://github.com/Hamza2079/bookmarker",
    image: new URL("../assets/bookmark.webp", import.meta.url).href,
    year: "2025",
  },
  {
    id: 5,
    slug: "daniels-portfolio",
    title: "Daniels Portfolio",
    category: "Landing Pagess",
    description:
      "A sleek, highly responsive personal portfolio template tailored for creative professionals, featuring scroll-triggered animations.",
    fullDescription:
      "Daniels Portfolio is a premium, fully responsive template engineered specifically for UI/UX designers and web developers. It boasts a minimalist aesthetic, fluid scroll-spy navigation, and engaging section-based animations. Structured meticulously, it includes dedicated areas for Services, Portfolios, Testimonials, and Contact information, ensuring a polished professional presence.",
    tech: [
      "HTML5",
      "CSS3",
      "Bootstrap 5",
      "JavaScript",
      "FontAwesome",
      "Animate.css",
      "Google Fonts",
    ],
    features: [
      "Pixel-perfect responsive architecture",
      "Dynamic Scrollspy navigation for intuitive browsing",
      "Interactive, category-filtered portfolio gallery",
      "Engaging client testimonials carousel",
      "Dedicated team showcase with social integrations",
      "Streamlined, user-friendly contact form",
    ],
    challenges:
      "Orchestrating multiple scroll-dependent animations without compromising the browser's rendering performance. I optimized this by leveraging lightweight CSS animation libraries and efficient Bootstrap utility classes.",
    demo: "https://hamza2079.github.io/Daniels/",
    github: "https://github.com/Hamza2079/Daniels",
    image: new URL("../assets/Daniels.webp", import.meta.url).href,
    year: "2025",
  },
  {
    id: 6,
    slug: "Devfolio",
    title: "DevFolio",
    category: "Landing Pages",
    description:
      "A minimalist and modern portfolio template engineered to showcase technical skills, projects, and services with crystal clarity.",
    fullDescription:
      "DevFolio is a versatile, professional portfolio template designed for developers and tech creatives. It provides a structured, modern layout to highlight technical proficiencies, feature extensive project galleries, and publish blog content. Built with Bootstrap 5, the emphasis is heavily placed on readability, content hierarchy, and an impeccable mobile experience.",
    tech: [
      "HTML5",
      "CSS3",
      "Bootstrap 5",
      "JavaScript",
      "FontAwesome",
      "Google Fonts",
    ],
    features: [
      "Flawless adaptability across all screen dimensions",
      "Sticky navigation bar with active state tracking",
      "Expandable portfolio gallery for project showcasing",
      "Clean, modern layout for blog publication",
      "Clearly structured services and technical skills breakdown",
      "Integrated contact section for client inquiries",
    ],
    challenges:
      "Creating a cohesive, single-page experience that accommodates dense information (skills, blogs, projects) without feeling cluttered. The solution relied heavily on a strategic Bootstrap grid implementation and thoughtful whitespace.",
    demo: "https://hamza2079.github.io/divfolio/",
    github: "https://github.com/Hamza2079/divfolio",
    image: new URL("../assets/Devfolio.webp", import.meta.url).href,
    year: "2025",
  },
  {
    id: 7,
    slug: "mealify",
    title: "Mealify",
    category: "Landing Pages",
    description:
      "A premium landing page crafted for the culinary industry, featuring native dark mode, immersive galleries, and smooth navigation.",
    fullDescription:
      "Mealify is a high-end restaurant landing page designed to digitally replicate a premium dining experience. It features beautifully structured sections to highlight executive chefs, a mouth-watering interactive gallery, and essential booking information. The implementation includes a flawless dark/light mode toggle and buttery-smooth section transitions.",
    tech: ["HTML5", "CSS3", "Google Fonts", "Font Awesome"],
    features: [
      "Impeccably responsive layout for food lovers on the go",
      "Native, user-controlled Dark/Light mode support",
      "Silky smooth internal page navigation",
      "Dedicated section highlighting culinary experts",
      "Highly visual, interactive food gallery",
      "Integrated contact form paired with Google Maps",
    ],
    challenges:
      "Implementing a robust dark mode toggle that respects user preferences while ensuring strict visual consistency and contrast ratios across both themes. This was achieved through a well-architected CSS variable (custom properties) system.",
    demo: "https://hamza2079.github.io/mealify/",
    github: "https://github.com/Hamza2079/mealify",
    image: new URL("../assets/Mealify.webp", import.meta.url).href,
    year: "2025",
  },
  {
    id: 8,
    slug: "quote-generator",
    title: "Quote Generator",
    category: "Vanilla JS",
    description:
      "An elegant quote generator featuring dynamic glassmorphism UI, gradient backgrounds, and sophisticated transition animations.",
    fullDescription:
      "Quote Generator is a minimalist yet striking web application that serves inspirational quotes wrapped in a premium glassmorphism interface. The application dynamically adjusts animated gradient backgrounds with every new quote, focusing heavily on micro-interactions, simplicity, and a soothing user experience across all devices.",
    tech: ["HTML5", "CSS3", "JavaScript", "Google Fonts"],
    features: [
      "Curated library of randomized inspirational quotes",
      "Sophisticated frosted-glass UI aesthetics",
      "Polished fade and transition animations",
      "Completely responsive and mobile-optimized",
      "Algorithmic prevention of consecutive duplicate quotes",
    ],
    challenges:
      "Delivering complex visual effects (gradients and glassmorphism) alongside DOM updates without causing layout shifts or lag. Addressed by utilizing hardware-accelerated CSS transitions and efficient JavaScript state tracking.",
    demo: "https://hamza2079.github.io/Quotes-Generator/",
    github: "https://github.com/Hamza2079/Quotes-Generator",
    image: new URL("../assets/quotes-Generator.webp", import.meta.url).href,
    year: "2025",
  },
  {
    id: 9,
    slug: "smart-login-system",
    title: "Smart Login System",
    category: "Vanilla JS",
    description:
      "A robust, client-side authentication system demonstrating secure session handling, protected routes, and input validation.",
    fullDescription:
      "Smart Login System is a comprehensive client-side authentication application engineered with Vanilla JavaScript. It simulates a complete auth-flow including account creation, secure login, session termination, and route protection. Leveraging LocalStorage for session persistence, the entire experience is wrapped in a visually appealing, modern glassmorphism design.",
    tech: [
      "HTML5",
      "CSS3",
      "Bootstrap 5",
      "JavaScript",
      "LocalStorage",
      "FontAwesome",
      "Google Fonts",
    ],
    features: [
      "Comprehensive signup and login workflows with strict validation",
      "Implementation of protected routes based on auth state",
      "Secure session persistence utilizing LocalStorage APIs",
      "Modern, attractive glassmorphism interface",
      "Seamless responsiveness across desktop and mobile",
      "Refined hover states and transition effects",
    ],
    challenges:
      "Simulating a secure backend authentication environment entirely on the client side. I successfully engineered a robust routing and validation logic using LocalStorage to protect specific views based on the user's login status.",
    demo: "https://hamza2079.github.io/smart-login/",
    github: "https://github.com/Hamza2079/smart-login",
    image: new URL("../assets/smart-login-system.webp", import.meta.url).href,
    year: "2025",
  },
  {
    id: 10,
    slug: "admin-dashboard",
    title: "Admin Dashboard",
    category: "React",
    featured: true,
    description:
      "A comprehensive administrative dashboard featuring role-based access control, real-time order management, and a mobile-first architecture.",
    fullDescription:
      "Admin Dashboard is an enterprise-grade management interface built with React, TypeScript, and Tailwind CSS. It delivers a full-scale administrative solution featuring highly secure role-based access (Super Admin, Admin, User), comprehensive user and order management, and insightful revenue tracking. The UI is meticulously optimized for mobile devices, ensuring administrators can manage operations efficiently on the go.",
    tech: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "React Query",
      "Axios",
      "JSON Server",
      "Lucide React",
      "Sonner",
    ],
    features: [
      "Advanced role-based authorization (Super Admin, Admin, User)",
      "Secure, encrypted email and password authentication",
      "Granular user management (activation/suspension)",
      "End-to-end order creation and lifecycle tracking",
      "Dynamic order status workflows (Pending, Paid, Shipped, Cancelled)",
      "Exclusive privilege management for Super Admins",
      "Visualized revenue and performance statistics",
      "Strict mobile-first design philosophy with card-based layouts",
      "Expansive data table views for desktop environments",
      "Intuitive bottom navigation and hamburger menus for mobile",
      "Ironclad protected routing and permission gating",
      "Flawless mobile layout with zero horizontal scrolling",
    ],
    challenges:
      "Architecting a complex, scalable role-based permission system while dynamically altering the UI layout between mobile (cards) and desktop (tables). This was conquered by centralizing state management via Context API and React Query, ensuring smooth and secure data flow.",
    demo: "https://admin-dashboard-12.vercel.app/",
    github: "https://github.com/Hamza2079/Admin-dashboard",
    image: new URL("../assets/admin-dashboard.webp", import.meta.url).href,
    year: "2025",
  },
  {
    id: 11,
    slug: "mazoun-riyadh-landing",
    title: "مأذون شرعي في الرياض",
    category: "Landing Pages",
    description:
      "A highly optimized, RTL-focused Arabic landing page for official wedding services, boasting premium aesthetics and exceptional technical SEO.",
    fullDescription:
      "مأذون شرعي في الرياض is a bespoke, premium Arabic RTL landing page engineered with a locally compiled Tailwind CSS setup and Vanilla JavaScript. The platform heavily emphasizes performance, strict accessibility standards (WCAG 2.1 AA), and robust SEO architecture. Visually, it features stunning Islamic-inspired motifs, particle animations, and parallax effects, all while maintaining perfect mobile-first responsiveness.",
    tech: [
      "HTML5",
      "Tailwind CSS (Local Build)",
      "JavaScript (Vanilla)",
      "Font Awesome",
      "Google Fonts (Tajawal, Amiri)",
      "Intersection Observer API",
    ],
    features: [
      "Bespoke, culturally aligned Arabic RTL UI design",
      "Strictly mobile-first, responsive architecture",
      "WCAG 2.1 AA standard accessibility compliance",
      "Advanced SEO strategy including Open Graph & Schema.org data",
      "Optimized asset delivery via Lazy Loading",
      "Engaging scroll-reveal and particle background animations",
      "Interactive ripple effects on primary calls-to-action",
      "Smooth parallax scrolling capabilities",
      "Dynamic data counter animations",
      "Perfectly constrained mobile view (no horizontal overflow)",
      "Highly performant local Tailwind compilation (zero CDN reliance)",
    ],
    challenges:
      "Striking the perfect balance between heavy, visually impressive animations (like particles and parallax) and achieving top-tier Lighthouse performance/accessibility scores. Optimized through efficient use of the Intersection Observer API and hardware-accelerated CSS.",
    demo: "https://peachpuff-llama-153743.hostingersite.com/",
    github: "https://github.com/Hamza2079/Mazoun-Riyadh",
    image: new URL("../assets/alm2zonya.webp", import.meta.url).href,
    year: "2026",
  },
  {
    id: 12,
    slug: "dar-alraha-bedroom-landing",
    title: "دار الراحة - Saudi Dream Home",
    category: "Landing Page",
    description:
      "A luxurious, conversion-driven RTL landing page designed to showcase premium furniture, featuring immersive media and direct WhatsApp integration.",
    fullDescription:
      "Dar Alraha is an exclusive RTL landing page tailored to market luxury bedroom furnishings in Riyadh. Built to maximize conversions, it integrates an interactive image lightbox, high-quality background video hero sections, and instantaneous WhatsApp communication. Engineered with Tailwind CSS and Vanilla JS, it guarantees a high-performance, accessible, and visually striking user journey.",
    tech: [
      "HTML5",
      "Tailwind CSS",
      "JavaScript (Vanilla)",
      "Google Fonts (Cairo)",
      "Intersection Observer",
    ],
    features: [
      "Opulent, modern user interface crafted for high-end retail",
      "Flawlessly responsive across all device breakpoints",
      "Interactive lightbox gallery for detailed product inspection",
      "Captivating hero section featuring background video playback",
      "Persistent floating WhatsApp integration for immediate sales inquiries",
      "Streamlined contact form linked directly to WhatsApp",
      "Silky scroll-triggered entrance animations",
      "Comprehensive SEO metadata implementation",
      "Rich snippet integration via Schema.org Structured Data",
      "Aggressive lazy loading for heavy media assets",
    ],
    challenges:
      "Integrating heavy multimedia elements like background videos and high-res galleries without severely impacting initial load times. Solved by implementing aggressive lazy-loading strategies and optimizing video bitrates for web delivery.",
    demo: "https://rest-home-sa.com/",
    github: "https://github.com/Hamza2079/Dar-Alraha",
    image: new URL("../assets/dar-alraha.webp", import.meta.url).href,
    year: "2026",
  },
  {
    id: 13,
    slug: "istisharat-waeia-consultation",
    title: "استشارات واعية",
    category: "Landing Pages",
    description:
      "A professional, trust-oriented Arabic landing page for consulting services, emphasizing clear communication, speed, and seamless connectivity.",
    fullDescription:
      "Istisharat Waeia is a refined Arabic consultation platform developed with locally scoped Tailwind CSS and Vanilla JavaScript. The design philosophy centers on building client trust and reducing cognitive load through clean typography, intuitive RTL layouts, and fast performance. It features semantic markup for excellent SEO, integrated video introductions, and frictionless WhatsApp connectivity for immediate consultations.",
    tech: [
      "HTML5",
      "Tailwind CSS (Local)",
      "JavaScript (Vanilla)",
      "Google Fonts (Cairo, Tajawal)",
    ],
    features: [
      "Clean, modern, and highly legible Arabic RTL typography",
      "Fluid adaptability ensuring a perfect view on any screen",
      "Semantic HTML architecture for superior search engine indexing",
      "Frictionless direct-to-WhatsApp consultation routing",
      "Always-accessible floating communication widget",
      "Subtle, professional animations triggered upon scrolling",
      "Embedded introductory video section for personal branding",
      "Strict adherence to accessible markup practices",
      "Lightning-fast load times via optimized local CSS builds",
    ],
    challenges:
      "Designing a user interface that instantly communicates empathy, trust, and professionalism, while ensuring the technical backbone is fast enough to retain impatient visitors. Achieved through a minimalist design system and strict performance budgeting.",
    demo: "https://faisal1-sa.com/",
    github: "https://github.com/Hamza2079/Istisharat-Waeia",
    image: new URL("../assets/istisharat-waeia.webp", import.meta.url).href,
    year: "2026",
  },
  {
  id: 2,
  slug: "e7gzly-clinic-management",
  title: "E7gzly",
  category: "Next.js",
  featured: true,
  description:
    "A real-time healthcare ecosystem that digitizes clinic workflows and eliminates physical wait times through an innovative virtual queuing system.",
  fullDescription:
    "E7gzly is a high-performance, mobile-first healthcare platform engineered to bridge the gap between medical providers and patients. Built with a 'Server-First' architecture using Next.js 15 and Supabase, it modernizes clinical workflows by digitizing the waiting room experience. The platform features live queue tracking, automated provider command centers, and strict data isolation via PostgreSQL Row-Level Security, delivering a seamless and secure medical journey.",
  tech: ["Next.js 15", "TypeScript", "Supabase", "Tailwind CSS 4", "Shadcn UI"],
  features: [
    "Real-time virtual queuing and live patient position updates",
    "Provider Command Center for automated patient flow management",
    "Complex Role-Based Access Control (RBAC) via Next.js Middleware",
    "Secure, isolated database architecture using PostgreSQL RLS policies",
    "Optimized data mutations and zero-bundle-size fetching via Server Actions",
    "Native Arabic (RTL) localization optimized for the MENA healthcare market",
  ],
  challenges:
    "Implementing real-time state synchronization across multiple concurrent clinic sessions without degrading performance was a major hurdle. I resolved this by integrating Supabase Realtime subscriptions with React's useOptimistic hook, ensuring instant UI feedback for patients while maintaining robust backend consistency.",
  demo: "https://e7gzly.vercel.app/",
  github: "https://github.com/Hamza2079/e7gzly",
  image: new URL(
    "../assets/e7gzly.webp",
    import.meta.url,
  ).href,
  year: "2026",
}
];

export const services = [
  {
    number: "01",
    title: "React & Next.js Development",
    description:
      "Architecting modern, scalable web applications utilizing React, Next.js, and TypeScript. I specialize in component-driven development, advanced state management (Redux/Zustand), and leveraging Server-Side Rendering (SSR) for peak performance.",
  },
  {
    number: "02",
    title: "Responsive UI Implementation",
    description:
      "Crafting pixel-perfect, mobile-first user interfaces using Tailwind CSS and modern CSS architectures. I ensure flawless cross-browser compatibility and strict adherence to Web Content Accessibility Guidelines (WCAG).",
  },
  {
    number: "03",
    title: "Performance Optimization",
    description:
      "Enhancing web performance through advanced techniques including code splitting, aggressive lazy loading, and asset optimization. Consistently delivering high Lighthouse scores and lightning-fast load times to maximize user retention.",
  },
  {
    number: "04",
    title: "Modern Tooling & Animation",
    description:
      "Utilizing cutting-edge build tools like Vite and Webpack to streamline development workflows. I bring interfaces to life by engineering smooth, immersive animations using Framer Motion and modern CSS capabilities.",
  },
];

export const experiences = [
  {
    company: "Hasoub — Mostaql",
    role: "Frontend Developer",
    type: "Freelance",
    period: "2025 — Present",
    contributions: [
      "Designed and delivered custom, high-converting landing pages for diverse freelance clients via Mostaql",
      "Engineered pixel-perfect, responsive web interfaces directly from complex Figma prototypes",
      "Audited and optimized client websites to drastically improve page load times and technical SEO",
      "Managed end-to-end client communication to gather requirements, iterate on feedback, and ensure project success",
    ],
    skills: ["React", "TailwindCSS", "Framer Motion", "Responsive Design", "Client Communication", "SEO"],
  },
  {
    company: "The Higher Technological Institute (HTI)",
    role: "BSc Computer Science",
    type: "Education",
    period: "2024 — Present",
    contributions: [
      "Gaining comprehensive knowledge in advanced data structures, complex algorithms, and discrete mathematics",
      "Establishing a robust foundation in Object-Oriented Programming (OOP) and modern software architecture",
      "Translating complex theoretical concepts into functional code through rigorous academic projects",
      "Sharpening analytical and problem-solving capabilities via competitive programming challenges",
    ],
    skills: ["Algorithms", "Data Structures", "OOP", "Problem Solving", "Mathematics", "Critical Thinking"],
  },
  {
    company: "Advaz — E-commerce Development",
    role: "Frontend Trainee",
    type: "Training",
    period: "2025-2026",
    contributions: [
      "Contributed to the development, deployment, and customization of highly active e-commerce storefronts (e.g., Salla)",
      "Programmed highly responsive product display pages and streamlined checkout flows to boost conversion rates",
      "Collaborated closely with senior engineers to identify bugs, refactor code, and optimize UI component libraries",
      "Played a key role in refining the end-to-end digital shopping experience for retail customers",
    ],
    skills: ["E-commerce", "UI Development", "Debugging", "Team Collaboration", "Responsive Design"],
  },
  {
    company: "Route Academy",
    role: "Front-End Development Track",
    type: "Education",
    period: "2025",
    contributions: [
      "Graduated from an extensive front-end engineering program, mastering modern ecosystems including React, Next.js, and TypeScript",
      "Architected and deployed numerous large-scale, complex applications utilizing modern styling tools like Tailwind CSS and shadcn/ui",
      "Integrated real-world RESTful APIs, handling complex asynchronous data flows, state management, and error handling",
      "Leveraged a wide array of advanced third-party libraries to build scalable, production-ready web applications",
    ],
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "API Integration", "State Management"],
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