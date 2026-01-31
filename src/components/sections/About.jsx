import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Profile3D } from "../ui/Profile3D";
import { AnimatedCounter } from "../ui/AnimatedCounter";
import { services } from "../../data/portfolioData";
import profileImage from "../../assets/profile.webp";

// Animation variants
const titleVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const profileVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

const serviceCardVariants = {
  hidden: { opacity: 0, x: 40, y: 20 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.3 + index * 0.15,
    },
  }),
};

export function About() {
  const sectionRef = useRef(null);

  // Scroll progress for the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for background orbs
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen flex items-center px-4 sm:px-6 py-24 relative overflow-hidden"
    >
      {/* Parallax Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: orbY1 }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: orbY2 }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Profile Card */}
          <motion.div
            variants={profileVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex justify-center lg:sticky lg:top-24"
          >
            <Profile3D className="w-full max-w-sm">
              <div className="relative p-8 flex flex-col items-center text-center">
                {/* Profile Image */}
                <motion.div
                  className="w-36 h-36 rounded-full border-4 border-slate-800/50 shadow-2xl mb-6 relative overflow-hidden"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-sky-500/20 to-emerald-500/20" />
                  <img
                    src={profileImage}
                    alt="Hamza Haikal"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover relative z-10"
                  />
                </motion.div>

                {/* Name & Role */}
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-100 to-slate-300 mb-1">
                  Hamza Haikal
                </h3>
                <p className="text-sm font-medium text-sky-400 mb-4 tracking-wide">
                  Frontend Developer
                </p>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Crafting modern web interfaces with React, TypeScript, and
                  cutting-edge frontend technologies.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 w-full pt-6 border-t border-slate-800/50">
                  <AnimatedCounter value={1} label="Years" suffix="+" />
                  <AnimatedCounter value={10} label="Projects"/>
                </div>
              </div>
            </Profile3D>
          </motion.div>

          {/* Right Column - Services */}
          <div className="space-y-8">
            {/* Title & Subtitle with Fade-up */}
            <motion.div
              variants={titleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">
                What I Do
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-4 bg-clip-text text-transparent bg-linear-to-r from-slate-100 to-slate-400">
                Transforming Ideas Into Reality
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                I specialize in building end-to-end solutions that drive
                business growth through exceptional user experiences.
              </p>
            </motion.div>

            {/* Services Grid with Stagger Animation */}
            <div className="grid gap-4">
              {services.map((service, idx) => (
                <motion.div
                  key={service.number}
                  custom={idx}
                  variants={serviceCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className="group relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm transition-all duration-300"
                >
                  {/* Content */}
                  <div className="flex gap-5 items-start relative z-10">
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-br from-sky-400 to-emerald-400 group-hover:scale-110 transition-transform duration-300">
                      {service.number}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-sky-300 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover Glow Border */}
                  <div className="absolute inset-0 rounded-2xl border border-sky-500/0 group-hover:border-sky-500/50 transition-all duration-300 pointer-events-none" />

                  {/* Hover Background Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-sky-500/0 via-emerald-500/0 to-sky-500/0 group-hover:from-sky-500/10 group-hover:via-emerald-500/10 group-hover:to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Hover Shadow */}
                  <div className="absolute inset-0 rounded-2xl shadow-none group-hover:shadow-2xl group-hover:shadow-sky-500/20 transition-shadow duration-300 pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
