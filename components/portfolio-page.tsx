"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  Building2,
  Calculator,
  CheckCircle2,
  ClipboardCheck,
  Globe2,
  Handshake,
  Landmark,
  Mail,
  MapPin,
  Menu,
  ShieldCheck,
  Star,
  TrendingUp,
  X
} from "lucide-react";

type ContactErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" }
];

const services = [
  {
    title: "Financial Advisory",
    icon: TrendingUp,
    description: "Strategic financial planning and advisory to drive sustainable business performance."
  },
  {
    title: "Audit & Assurance",
    icon: ClipboardCheck,
    description: "Independent assurance services with robust process reviews and transparent reporting."
  },
  {
    title: "Tax Consulting",
    icon: Calculator,
    description: "Tax planning, compliance, and structuring solutions aligned with evolving regulations."
  },
  {
    title: "Risk Management",
    icon: ShieldCheck,
    description: "Risk identification and control frameworks to protect operations and financial integrity."
  },
  {
    title: "Business Financial Strategy",
    icon: Building2,
    description: "Insight-driven strategy for growth, capital optimization, and long-term value creation."
  },
  {
    title: "Compliance & Regulatory Consulting",
    icon: CheckCircle2,
    description: "End-to-end compliance support for businesses navigating complex statutory requirements."
  }
];

const skills = [
  { name: "Accounting", level: 95 },
  { name: "Financial Analysis", level: 92 },
  { name: "Taxation", level: 96 },
  { name: "Risk Management", level: 90 },
  { name: "Problem Solving", level: 94 },
  { name: "Presentation Skills", level: 88 }
];

const certifications = [
  "Chartered Accountant - ICAI",
  "DISA - Diploma in Information System Audit (ICAI)",
  "Certificate Course on Concurrent Audit of Banks",
  "Artificial Intelligence Level 1 - ICAI",
  "Artificial Intelligence Level 2 - ICAI"
];

const experiences = [
  {
    role: "Partner",
    org: "Naveen Mittal & Associates",
    period: "2025-Present"
  },
  {
    role: "Senior Management Consultant",
    org: "Titan Eye Plus Hassan",
    period: "2024-Present"
  },
  {
    role: "Chartered Accountant / Consultant",
    org: "Umesha R & Associates",
    period: "2022-Present"
  },
  {
    role: "Proprietor",
    org: "Patnam and Co",
    period: "2012-Present"
  },
  {
    role: "Member",
    org: "Karnataka State Chartered Accountants Association (Mofussil Committee)",
    period: "Professional Body"
  }
];

const testimonials = [
  {
    name: "Arjun Menon",
    image: "/testimonials/arjun-menon.jpg",
    review:
      "CA Kavya brought exceptional clarity to our financial controls and tax planning. Her guidance improved both compliance and confidence.",
    stars: 5
  },
  {
    name: "Nisha Rao",
    image: "/testimonials/nisha-rao.jpg",
    review:
      "Her advisory approach is practical, precise, and business-oriented. We value the strategic depth she brings to every review cycle.",
    stars: 5
  },
  {
    name: "Rahul Shetty",
    image: "/testimonials/rahul-shetty.jpg",
    review:
      "A trusted professional for audit and risk consulting. Her insights helped us strengthen governance and make faster decisions.",
    stars: 5
  }
];

const languages = ["English", "Hindi", "Telugu", "Kannada"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export function PortfolioPage() {
  const formspreeEndpoint =
    process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim() || "https://formspree.io/f/maqpbpan";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const stars = useMemo(
    () => Array.from({ length: testimonials[activeTestimonial].stars }, (_, index) => index),
    [activeTestimonial]
  );

  const validateForm = () => {
    const newErrors: ContactErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Message should be at least 20 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      if (!response.ok) {
        throw new Error("Formspree submission failed.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      window.setTimeout(() => setSubmitted(false), 3500);
    } catch {
      setSubmitError("Unable to send message right now. Please try again shortly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 py-2 shadow-lg backdrop-blur" : "bg-white/85 py-4"
        }`}
      >
        <div className="section-shell flex items-center justify-between">
          <a href="#home" className="text-lg font-semibold tracking-tight text-navy-800">
            CA Kavya Patnam
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-700 transition hover:text-navy-700"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/CA-Kavya-Patnam-Resume.pdf"
              download
              className="rounded-full bg-navy-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-800"
            >
              Download Resume
            </a>
          </nav>

          <button
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-lg border border-slate-200 p-2 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-slate-200 bg-white md:hidden"
            >
              <div className="section-shell flex flex-col gap-3 py-4">
                {navLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium text-slate-700"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="/CA-Kavya-Patnam-Resume.pdf"
                  download
                  className="mt-2 inline-flex w-fit rounded-full bg-navy-700 px-4 py-2 text-sm font-semibold text-white"
                >
                  Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section id="home" className="section-shell pt-32">
        <div className="grid items-center gap-10 pb-24 pt-8 md:grid-cols-2">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="inline-flex items-center rounded-full bg-navy-50 px-4 py-2 text-sm font-medium text-navy-700">
              <Landmark className="mr-2 h-4 w-4" /> Chartered Accountant | Financial Consultant
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-navy-900 sm:text-5xl lg:text-6xl">
              CA Kavya Patnam
            </h1>
            <p className="mt-5 text-lg text-slate-600">Partnering in Financial Success</p>
            <p className="mt-3 inline-flex items-center text-slate-500">
              <MapPin className="mr-2 h-4 w-4 text-navy-600" /> Mysuru, Karnataka
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-full bg-navy-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-800"
              >
                Contact Me
              </a>
              <a
                href="/CA-Kavya-Patnam-Resume.pdf"
                download
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-navy-200 hover:text-navy-700"
              >
                Download Resume
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="relative mx-auto max-w-md"
          >
            <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-navy-200 to-slate-100 blur-2xl" />
            <div className="card overflow-hidden">
              <Image
                src="/kavya-patnam.jpg"
                alt="CA Kavya Patnam"
                width={520}
                height={620}
                priority
                className="h-auto w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="bg-slate-50 py-20">
        <div className="section-shell grid gap-10 md:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">About</h2>
            <p className="section-subtitle">
              CA Kavya Patnam is a dedicated finance professional with deep expertise across auditing,
              taxation, financial advisory, and strategic financial consulting. She works closely with
              businesses and leadership teams to simplify complex financial matters into confident,
              growth-focused decisions.
            </p>
            <p className="mt-4 text-slate-600">
              Her approach blends technical rigor with practical business insight, enabling clients to
              strengthen compliance, optimize financial performance, and build resilient operations in a
              rapidly evolving regulatory landscape.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {[
              "Audit Excellence",
              "Tax Precision",
              "Strategic Advisory",
              "Regulatory Confidence"
            ].map((item) => (
              <div key={item} className="card p-6">
                <Handshake className="h-6 w-6 text-navy-600" />
                <h3 className="mt-3 font-semibold text-navy-800">{item}</h3>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="section-shell">
          <h2 className="section-title">Services</h2>
          <p className="section-subtitle">
            End-to-end financial and regulatory services tailored for modern businesses.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="card p-6 transition"
                >
                  <Icon className="h-8 w-8 text-navy-600" />
                  <h3 className="mt-4 text-lg font-semibold text-navy-800">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="skills" className="bg-slate-50 py-20">
        <div className="section-shell">
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">Core strengths that support high-impact financial consulting.</p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="card p-6"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-medium text-slate-800">{skill.name}</span>
                  <span className="text-sm font-semibold text-navy-700">{skill.level}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-navy-500 to-navy-700"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="py-20">
        <div className="section-shell">
          <h2 className="section-title">Certifications</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="card flex items-start gap-4 p-5"
              >
                <BadgeCheck className="mt-0.5 h-6 w-6 text-navy-600" />
                <p className="text-slate-700">{cert}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="bg-slate-50 py-20">
        <div className="section-shell">
          <h2 className="section-title">Professional Experience</h2>
          <div className="relative mt-10 border-l border-navy-200 pl-8">
            {experiences.map((item, index) => (
              <motion.article
                key={`${item.role}-${item.org}`}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="relative mb-8 card p-5"
              >
                <span className="absolute -left-[2.35rem] top-6 h-4 w-4 rounded-full border-4 border-white bg-navy-600" />
                <p className="text-sm font-semibold text-navy-600">{item.period}</p>
                <h3 className="mt-2 text-lg font-semibold text-navy-800">{item.role}</h3>
                <p className="mt-1 text-slate-600">{item.org}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20">
        <div className="section-shell">
          <h2 className="section-title">Client Testimonials</h2>
          <p className="section-subtitle">Trusted by clients for precise advice and strategic outcomes.</p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[activeTestimonial].name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="grid gap-5 md:grid-cols-[140px_1fr]"
              >
                <div className="flex flex-col items-center justify-center rounded-xl bg-slate-100 p-4 text-center">
                  <Image
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] rounded-full border border-slate-200 object-cover"
                  />
                  <p className="mt-3 font-semibold text-navy-800">{testimonials[activeTestimonial].name}</p>
                </div>
                <div>
                  <div className="mb-3 flex gap-1 text-amber-500">
                    {stars.map((star) => (
                      <Star key={star} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700">{testimonials[activeTestimonial].review}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  aria-label={`Go to testimonial ${index + 1}`}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeTestimonial === index ? "w-8 bg-navy-700" : "w-2.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="languages" className="bg-slate-50 py-20">
        <div className="section-shell">
          <h2 className="section-title">Languages</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {languages.map((language) => (
              <span
                key={language}
                className="inline-flex items-center rounded-full border border-navy-200 bg-white px-5 py-2 text-sm font-medium text-navy-700"
              >
                <Globe2 className="mr-2 h-4 w-4" /> {language}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="section-shell grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="section-title">Contact</h2>
            <p className="section-subtitle">
              Let us discuss your financial goals, compliance priorities, and growth roadmap.
            </p>

            <div className="mt-8 space-y-4">
              <a href="mailto:cakavyapatnam@gmail.com" className="flex items-center text-slate-700">
                <Mail className="mr-3 h-5 w-5 text-navy-600" /> cakavyapatnam@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/ca-kavya-patnam-1aa0a3247/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center text-slate-700"
              >
                <Building2 className="mr-3 h-5 w-5 text-navy-600" /> LinkedIn Profile
              </a>
            </div>
          </div>

          <form onSubmit={onSubmit} noValidate className="card p-6">
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  id="name"
                  value={formData.name}
                  onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                  className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-navy-200 ${
                    errors.name ? "border-red-400" : "border-slate-300"
                  }`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-navy-200 ${
                    errors.email ? "border-red-400" : "border-slate-300"
                  }`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                  className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-navy-200 ${
                    errors.message ? "border-red-400" : "border-slate-300"
                  }`}
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-navy-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-800"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitted && (
                <p className="text-sm font-medium text-emerald-600">
                  Thank you. Your message has been sent successfully.
                </p>
              )}

              {submitError && <p className="text-sm font-medium text-red-500">{submitError}</p>}
            </div>
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="section-shell grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-navy-700">Quick Links</h3>
            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
              {navLinks.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-navy-700">Connect</h3>
            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
              <a
                href="https://www.linkedin.com/in/ca-kavya-patnam-1aa0a3247/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a href="mailto:cakavyapatnam@gmail.com">Email</a>
            </div>
          </div>
          <div className="flex items-end">
            <p className="text-sm text-slate-500">Copyright © 2026 CA Kavya Patnam</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
