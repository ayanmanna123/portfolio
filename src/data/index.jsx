import { Briefcase, Calendar, Target, User, Github, Linkedin, Twitter, Mail, Shield, TrendingUp, Award, Zap, Instagram, Youtube, Phone, MapPin, Code2, GitFork, Gamepad2, Camera, Plane, Music, Puzzle, Utensils } from 'lucide-react';
import React from 'react';

// Skill Icons
import htmlIcon from "@/assets/icons/html.png";
import cssIcon from "@/assets/icons/css.png";
import sassIcon from "@/assets/icons/saas.png";
import jsIcon from "@/assets/icons/javascript.png";
import tsIcon from "@/assets/icons/typescript.png";
import reactIcon from "@/assets/icons/react.png";
import nextjsIcon from "@/assets/icons/nextjs.png";
import nodejsIcon from "@/assets/icons/nodejs.png";
import expressIcon from "@/assets/icons/express.png";
import mongodbIcon from "@/assets/icons/mongodb.png";
import postgresqlIcon from "@/assets/icons/postgresql.png";
import graphqlIcon from "@/assets/icons/graphql.png";
import javaIcon from "@/assets/icons/java.png";
import pythonIcon from "@/assets/icons/python.png";
import gitIcon from "@/assets/icons/git.png";
import githubIcon from "@/assets/icons/github.png";
import dockerIcon from "@/assets/icons/docker.png";
import firebaseIcon from "@/assets/icons/firebase.png";
import vscodeIcon from "@/assets/icons/vscode.png";
import clearkIcon from "@/assets/icons/cleark.png";
import SQLIcon from "@/assets/icons/sql.png";
import MySQLIcon from "@/assets/icons/mysql.png";

// Branding
import logo from "@/assets/logo.svg";
export { logo };

// Content JSON Imports
import heroContent from './content/hero.json';
import projectsContent from './content/projects.json';
import skillsContent from './content/skills.json';
import testimonialsContent from './content/testimonials.json';
import educationContent from './content/education.json';
import journeyContent from './content/journey.json';
import certificatesContent from './content/certificates.json';
import contactContent from './content/contact.json';

// Hero Data
export const heroData = heroContent;

// Projects Data
export const projects = projectsContent.projects || projectsContent;

export const categoryColors = {
  "Healthcare SaaS": "bg-gradient-to-r from-emerald-500/20 to-teal-600/20 text-emerald-600 border-emerald-500/30",
  "E-commerce": "bg-gradient-to-r from-purple-500/20 to-indigo-600/20 text-purple-600 border-purple-500/30",
  "Real-time Communication": "bg-gradient-to-r from-blue-500/20 to-cyan-600/20 text-blue-600 border-blue-500/30",
  "Artificial Intelligence": "bg-gradient-to-r from-amber-500/20 to-orange-600/20 text-amber-600 border-amber-500/30",
  "FinTech": "bg-gradient-to-r from-rose-500/20 to-pink-600/20 text-rose-600 border-rose-500/30",
  "Food Tech": "bg-gradient-to-r from-violet-500/20 to-purple-600/20 text-violet-600 border-violet-500/30",
  "HR Tech": "bg-gradient-to-r from-orange-500/20 to-red-600/20 text-orange-600 border-orange-500/30",
  "Web Application": "bg-gradient-to-r from-indigo-500/20 to-purple-600/20 text-indigo-700 dark:text-indigo-400 border-indigo-500/30",
  "Full Stack Web Application / Smart Transport": "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-800 dark:text-cyan-400 border-cyan-500/30",
  "EdTech SaaS / Mentorship Platform": "bg-gradient-to-r from-violet-500/20 to-fuchsia-600/20 text-violet-800 dark:text-violet-400 border-violet-500/30",
  "Professional Networking / Job Portal SaaS": "bg-gradient-to-r from-sky-500/20 to-blue-600/20 text-sky-800 dark:text-sky-400 border-sky-500/30",
  "Collaborative Workspace / Real-time Application": "bg-gradient-to-r from-slate-300/80 to-slate-200/80 text-slate-900 font-bold border-slate-400/50 dark:from-slate-800/80 dark:to-slate-900/80 dark:text-white"
};

export const heroAchievements = [
  { number: "0+", label: "Github Contributions", icon: <Github className="h-3 w-3" /> },
  { number: "0+", label: "Total Repositories", icon: <GitFork className="h-3 w-3" /> },
  { number: "0+", label: "Total Projects", icon: <Briefcase className="h-3 w-3" /> },
  { number: "0+", label: "LeetCode Problems", icon: <Code2 className="h-3 w-3" /> }
];

// Tech Stack
export const techStack = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind"] },
  { category: "Backend", items: ["Node.js", "Express", "Python", "MongoDB", "MySQL"] },
  { category: "Tools & Cloud", items: ["AWS", "Docker", "Vercel", "Git", "GitHub", "VS Code"] },
  { category: "AI / ML", items: ["NumPy", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch"] },
  { category: "App Dev", items: ["React Native", "Android Studio", "Capacitor"] },
  { category: "Deep Learning / LLM", items: ["Transformers", "Hugging Face", "LangChain", "OpenAI API", "LlamaIndex"] }
];

export const features = contactContent.features || ["Full-stack expertise", "Clean, maintainable code", "Performance optimization", "Agile methodology", "24/7 support", "Timely delivery"];

export const hobbies = [
  { name: "Cubing", icon: <Puzzle size={16} />, desc: "High-speed solving" },
  { name: "Music", icon: <Music size={16} />, desc: "Vibe & Rhythm" },
  { name: "Foodie", icon: <Utensils size={16} />, desc: "Tasting world" },
  { name: "Traveling", icon: <Plane size={16} />, desc: "Exploring places" }
];

// Contact Info
export const contactInfo = [
  { icon: <Mail size={16} />, text: contactContent.email, href: `mailto:${contactContent.email}`, label: "Email" },
  { icon: <Phone size={16} />, text: contactContent.phone, href: `tel:${contactContent.phone}`, label: "Phone" },
  { icon: <MapPin size={16} />, text: contactContent.location, href: null, label: "Location" }
];

const socialIconMap = {
  LinkedIn: <Linkedin size={18} />,
  Instagram: <Instagram size={18} />,
  YouTube: <Youtube size={18} />,
  GitHub: <Github size={18} />,
  Twitter: <Twitter size={18} />
};

export const socialLinks = (contactContent.socialLinks || []).map(link => ({
  icon: socialIconMap[link.platform] || <Github size={18} />,
  href: link.href,
  label: link.platform
}));

export const leetcodeUsername = contactContent.leetcodeUsername || "ayanmanna123";

export const quickLinks = contactContent.quickLinks || [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Work", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const tabContent = contactContent.tabContent;

// Skills Data
export const skillCategories = skillsContent.skillCategories;

export const iconImages = {
  html: htmlIcon,
  css: cssIcon,
  sass: sassIcon,
  javascript: jsIcon,
  typescript: tsIcon,
  react: reactIcon,
  nextjs: nextjsIcon,
  nodejs: nodejsIcon,
  express: expressIcon,
  mongodb: mongodbIcon,
  postgresql: postgresqlIcon,
  graphql: graphqlIcon,
  java: javaIcon,
  python: pythonIcon,
  git: gitIcon,
  github: githubIcon,
  docker: dockerIcon,
  firebase: firebaseIcon,
  vscode: vscodeIcon,
  cleark: clearkIcon,
  sql: SQLIcon,
  mysql: MySQLIcon,
};

export const skillsData = skillsContent.skillsData;

// Testimonials
export const testimonials = testimonialsContent.testimonials || testimonialsContent;

// Education
export const educationData = educationContent.education || educationContent;

// Journey
export const journeyData = journeyContent.journey || journeyContent;

// Achievements
export const achievements = [
  { number: `${7}`, label: "Hackathons", icon: <Code2 className="h-5 w-5" />, heroIcon: <Award className="h-3 w-3" />, suffix: "+" },
  { number: `${14}`, label: "Projects", icon: <Briefcase className="h-5 w-5" />, heroIcon: <TrendingUp className="h-3 w-3" />, suffix: "+" },
  { number: `${1}`, label: "Freelancing", icon: <Zap className="h-5 w-5" />, heroIcon: <Target className="h-3 w-3" />, suffix: "+" },
  { number: `${0}`, label: "Internships", icon: <Calendar className="h-5 w-5" />, heroIcon: <Shield className="h-3 w-3" />, suffix: "" }
];

// Certificates Data
export const certificates = certificatesContent.certificates || certificatesContent;
