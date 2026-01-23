import { motion } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import emailjs from "@emailjs/browser";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Hamza2079",
    icon: FaGithub,
    color: "hover:text-slate-100",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/hamza-haikal",
    icon: FaLinkedin,
    color: "hover:text-blue-400",
  },
  {
    name: "Email",
    href: "mailto:hamzahaikal28@gmail.com",
    icon: FaEnvelope,
    color: "hover:text-sky-400",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS configuration
      // Replace these with your actual EmailJS credentials from dashboard
      const serviceId = "service_y1ah4a4"; // Get from EmailJS dashboard
      const templateId = "template_6wbd25y"; // Get from EmailJS dashboard
      const publicKey = "xWNJOeKRTA-4NTOu7"; // Get from EmailJS dashboard

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "hamzahaikal28@gmail.com",
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error("Failed to send email:", error);
      setIsSubmitting(false);
      setSubmitStatus("error");

      // Reset error status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 py-24 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-linear-to-t from-sky-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6 bg-clip-text text-transparent bg-linear-to-r from-slate-100 via-sky-200 to-emerald-200">
            Let's Work Together
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Drop me a message
            and let's create something amazing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  submitStatus === "error"
                    ? "bg-linear-to-r from-red-500 to-orange-500 shadow-red-500/25"
                    : "bg-linear-to-r from-sky-500 to-emerald-500 text-white shadow-sky-500/25 hover:shadow-sky-500/40"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Sending...</span>
                  </>
                ) : submitStatus === "success" ? (
                  <>
                    <span>✓</span>
                    <span>Message Sent!</span>
                  </>
                ) : submitStatus === "error" ? (
                  <>
                    <span>✕</span>
                    <span>Failed to Send. Try Again.</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-emerald-400 text-center"
                >
                  Thanks! I'll get back to you soon.
                </motion.p>
              )}
              {submitStatus === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-400 text-center"
                >
                  Oops! Please check your EmailJS configuration or try again
                  later.
                </motion.p>
              )}
            </motion.form>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-slate-100 mb-6">
                Connect With Me
              </h3>
              <div className="space-y-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target={
                        social.href.startsWith("mailto") ? undefined : "_blank"
                      }
                      rel="noopener noreferrer"
                      whileHover={{ x: 8 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-800/50 hover:border-sky-500/30 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-slate-800/50 flex items-center justify-center text-slate-400 group-hover:bg-slate-800 transition-colors">
                        <Icon
                          className={`text-2xl ${social.color} transition-colors`}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-slate-200 group-hover:text-sky-400 transition-colors">
                          {social.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {social.href.startsWith("mailto")
                            ? social.href.replace("mailto:", "")
                            : social.href.replace("https://", "")}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Additional Info Card */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-2xl bg-linear-to-br from-sky-500/10 to-emerald-500/10 border border-sky-500/20"
            >
              <h4 className="text-lg font-semibold text-slate-100 mb-3">
                Quick Response
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                I typically respond within 24 hours. For urgent inquiries, feel
                free to reach out via email directly.
              </p>
            </motion.div>

            {/* Availability Badge */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/30 border border-slate-800/50"
            >
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
              <span className="text-sm text-slate-300">
                Available for freelance projects
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 pt-16 mt-16 border-t border-slate-800/50 text-center"
      >
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-sky-400 to-emerald-400 mb-2">
          HAMZA HAIKAL
        </h3>
        <p className="text-sm text-slate-500">
          Frontend Developer • Building Modern Web Experiences
        </p>
        <p className="text-xs text-slate-600 mt-4">
          © 2025 All rights reserved
        </p>
      </motion.footer>
    </section>
  );
}

export default Contact;
