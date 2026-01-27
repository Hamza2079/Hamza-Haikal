export const projects = [
  {
    id: 1,
    slug: "shop-mart",
    title: "Shop Mart",
    category: "Next.js",
    description:
      "Modern e-commerce web app with a clean shopping experience, responsive UI, and smooth navigation. Built to showcase products professionally with a fast and user-friendly interface.",
    fullDescription:
      "Shop Mart is a full-featured e-commerce platform built with Next.js and TypeScript. It offers a seamless shopping experience with advanced features like product filtering, cart management, user authentication, and a smooth checkout process. The application is optimized for performance and SEO, ensuring fast load times and excellent search engine visibility.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "NextAuth"],
    features: [
      "User authentication with NextAuth",
      "Product catalog with advanced filtering",
      "Shopping cart with real-time updates",
      "Responsive design for all devices",
      "Fast page loads with Next.js optimization",
      "SEO-friendly architecture",
    ],
    challenges:
      "Implementing server-side rendering while maintaining fast client-side interactions was a key challenge. I optimized the application by using Next.js's hybrid rendering approach and implementing efficient state management.",
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
    description:
      "A social media web app where users can create posts, interact, and connect with others through a modern UI. Includes authentication, profiles, and a smooth feed experience built for performance and usability.",
    fullDescription:
      "Linkedpost is a modern social media platform that enables users to share posts, interact with content, and build connections. Built with React and optimized with React Query for efficient data fetching and caching, the app provides a smooth, responsive experience across all devices.",
    tech: ["React", "Vite", "TailwindCSS", "React Query"],
    features: [
      "User authentication and profiles",
      "Create, edit, and delete posts",
      "Real-time feed updates with React Query",
      "Like and comment on posts",
      "Responsive and mobile-friendly design",
      "Optimized performance with Vite",
    ],
    challenges:
      "Managing real-time data updates and ensuring smooth performance with a growing feed was challenging. I leveraged React Query's caching and background refetching to provide a seamless user experience.",
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
      "Modern weather dashboard with real-time data, forecasts, and a beautiful glassmorphism UI. Fast, responsive, and easy to use.",
    fullDescription:
      "Weather App is a modern and elegant weather dashboard built using HTML, CSS, and Vanilla JavaScript. It provides real-time weather information along with a 2-day forecast, detailed statistics, and automatic location detection. The app focuses on delivering a smooth user experience with a premium glassmorphism design, responsive layout, and dynamic animations. Weather data is fetched from WeatherAPI and optimized for fast loading and usability.",
    tech: ["HTML5", "CSS3", "JavaScript", "Weather API"],
    features: [
      "Real-time weather data",
      "2-day weather forecast",
      "Automatic geolocation detection",
      "Search weather by city name",
      "Glassmorphism UI with smooth animations",
      "Responsive design for all devices",
      "Detailed stats like humidity, wind, UV index, and pressure",
    ],
    challenges:
      "Handling asynchronous API requests while maintaining smooth UI updates was a key challenge. This was solved using modern JavaScript features like async/await and efficient DOM manipulation.",
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
      "Futuristic galaxy-themed bookmark manager to save, edit, and manage favorite websites with a stylish glassmorphism UI.",
    fullDescription:
      "Bookmarker – Galaxy Mode is a modern bookmark management web app built with vanilla HTML, CSS, and JavaScript. It allows users to add, edit, and delete bookmarks with full form validation and persistent storage using LocalStorage. The project focuses on combining clean CRUD functionality with a futuristic galaxy-inspired UI, featuring glassmorphism effects, neon glows, smooth animations, and a fully responsive layout across all devices.",
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
      "Add, edit, and delete bookmarks",
      "Form validation for site name and URL",
      "Persistent data storage using LocalStorage",
      "Galaxy-inspired UI with glassmorphism and neon effects",
      "Responsive design for desktop, tablet, and mobile",
      "Smooth animations and interactive alerts",
    ],
    challenges:
      "Ensuring data persistence while keeping the UI responsive and user-friendly was a key challenge. This was handled by efficiently managing LocalStorage operations and implementing clear validation and feedback using SweetAlert2.",
    demo: "https://hamza2079.github.io/bookmarker/",
    github: "https://github.com/Hamza2079/bookmarker",
    image: new URL("../assets/bookmark.webp", import.meta.url).href,
    year: "2025",
  },
  {
    id: 5,
    slug: "daniels-portfolio",
    title: "Daniels Portfolio",
    category: "Landing Pages",
    description:
      "Sleek and professional personal portfolio template with smooth animations and a clean, modern layout.",
    fullDescription:
      "Daniels Portfolio is a fully responsive personal portfolio template designed for UI/UX designers and web developers. It features a clean aesthetic, smooth scroll-based navigation, animated sections, and well-structured content areas such as About, Services, Portfolio, Testimonials, Team, and Contact. The project focuses on clarity, professionalism, and user-friendly navigation.",
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
      "Fully responsive design",
      "Scrollspy navigation with smooth scrolling",
      "Filtered portfolio section",
      "Testimonials carousel",
      "Team section with social links",
      "Clean contact form layout",
    ],
    challenges:
      "Organizing multiple sections while maintaining smooth performance and consistent animations was the main challenge, solved using Bootstrap utilities and lightweight animation libraries.",
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
      "Clean and modern personal portfolio template built to showcase skills, projects, and services professionally.",
    fullDescription:
      "DevFolio is a responsive personal portfolio template designed for developers and creatives. It includes sections for skills, services, portfolio projects, blog posts, and contact information. The layout is clean and modern, focusing on readability and professional presentation using Bootstrap 5.",
    tech: [
      "HTML5",
      "CSS3",
      "Bootstrap 5",
      "JavaScript",
      "FontAwesome",
      "Google Fonts",
    ],
    features: [
      "Responsive layout for all devices",
      "Sticky navigation with scroll-spy",
      "Portfolio gallery section",
      "Blog cards layout",
      "Services and skills sections",
      "Contact form section",
    ],
    challenges:
      "Maintaining a clean structure while supporting multiple content sections was addressed using Bootstrap grid and reusable components.",
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
      "Modern restaurant landing page with dark mode, smooth navigation, and a responsive design.",
    fullDescription:
      "Mealify is a responsive restaurant landing page designed to present a premium dining experience. It includes multiple sections such as chefs, gallery, and contact information, with built-in dark mode support and smooth navigation between sections.",
    tech: ["HTML5", "CSS3", "Google Fonts", "Font Awesome"],
    features: [
      "Fully responsive design",
      "Dark mode toggle",
      "Smooth section navigation",
      "Chefs showcase section",
      "Interactive image gallery",
      "Contact form with Google Maps",
    ],
    challenges:
      "Implementing dark mode and maintaining visual consistency across themes was the main challenge, handled through well-structured CSS styles.",
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
      "Premium quote generator app with glassmorphism UI and smooth animated transitions.",
    fullDescription:
      "Quote Generator is a modern web application that displays inspirational quotes using a glassmorphism design and animated gradient backgrounds. The app focuses on simplicity, elegance, and smooth user interactions, ensuring a pleasant experience on all devices.",
    tech: ["HTML5", "CSS3", "JavaScript", "Google Fonts"],
    features: [
      "Random inspirational quotes",
      "Glassmorphism UI design",
      "Smooth fade animations",
      "Responsive layout",
      "No repeated quotes consecutively",
    ],
    challenges:
      "Creating smooth transitions while keeping the app lightweight was solved through simple DOM manipulation and CSS animations.",
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
      "Secure and modern authentication system with protected routes and persistent sessions.",
    fullDescription:
      "Smart Login System is a secure authentication web application built with vanilla JavaScript and Bootstrap. It supports user signup, login, logout, protected routes, and session persistence using LocalStorage, all wrapped in a modern glassmorphism UI.",
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
      "User signup and login with validation",
      "Protected routes handling",
      "Persistent sessions using LocalStorage",
      "Glassmorphism UI",
      "Responsive layout",
      "Smooth transitions and hover effects",
    ],
    challenges:
      "Managing authentication logic and route protection without a backend was achieved through structured LocalStorage checks and validation logic.",
    demo: "https://hamza2079.github.io/smart-login/",
    github: "https://github.com/Hamza2079/smart-login",
    image: new URL("../assets/smart-login-system.webp", import.meta.url).href,
    year: "2025",
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
    period: "2025",
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
