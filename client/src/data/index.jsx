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

// Hero Data
export const heroData = {
  title: "I'm Ayan Manna",
  subtitle: "Full-Stack Engineer",
  description: "I build high-performance web applications that drive business growth. Specializing in React, Node.js, and scalable architecture for startups and enterprises.",
  status: "Available Immediately",
  codeSnippets: [
    "import { FullStackDeveloper } from 'ayanmanna.dev';",
    "",
    "const developer = new FullStackDeveloper({",
    "  name: 'Ayan Manna',",
    "  stack: ['React', 'Next.js', 'Node.js', 'TypeScript'],",
    "  focus: 'Building scalable web applications',",
    "  status: 'Open to new opportunities'",
    "});",
    "",
    "await developer.launchPortfolio();",
    "// Featured: E-commerce, SaaS, Enterprise, Startup MVPs",
    "",
    "developer.connect();",
    "console.log('🚀 Let's build something exceptional together!');"
  ]
};

// Projects Data
export const projects = [
  {
    "id": 8,
    "title": "BPPIMT Quiz",
    "category": "Web Application",
    "description": "An interactive quiz platform developed for B.P. Poddar Institute of Management and Technology, facilitating engaging quizzes for students.",
    "image": "/projects/project8.png",
    "video": "/projects/videos/bppimt-quiz-demo.mp4",
    "tags": ["React", "Node.js", "Express", "MongoDB", "Vercel", "Educational"],
    "demoUrl": "https://bppimt-quiz.vercel.app",
    "githubUrl": "https://github.com/ayanmanna123/bppimt_quiz",
    "featured": true,
    "accentColor": "from-indigo-500 to-purple-600",
    "status": "Live",
    "highlights": ["User Authentication", "Dynamic Quiz Generation", "Real-time Scoring", "Responsive Design"],
    "details": {
      "problem": "Traditional quiz methods lacked interactivity and real-time feedback, making assessments less engaging for students.",
      "solution": "BPPIMT Quiz offers a dynamic platform where quizzes can be created, managed, and taken interactively, providing immediate feedback and enhancing the learning experience.",
      "features": [
        {
          "title": "User Authentication",
          "description": "Secure login system ensuring authorized access for quiz participants and administrators."
        },
        {
          "title": "Dynamic Quiz Management",
          "description": "Admins can create and manage quizzes with various question types and difficulty levels."
        },
        {
          "title": "Real-time Scoring",
          "description": "Immediate feedback and scoring upon quiz completion to aid learning."
        }
      ],
      "techStack": {
        "Frontend": ["React", "TailwindCSS"],
        "Backend": ["Node.js", "Express", "MongoDB"],
        "Infrastructure": ["Vercel"]
      },
      "challenges": [
        "Implementing a flexible quiz structure to accommodate various question types.",
        "Ensuring real-time performance and scalability for multiple concurrent users.",
        "Maintaining data integrity and security across the platform."
      ],
      "screenshots": {
        "mobile": ["/projects/project1.png"],
        "desktop": ["/projects/project1.png"]
      }
    }
  },

  {
    "id": 9,
    "title": "Where Is My Bus",
    "category": "Full Stack Web Application / Smart Transport",
    "description": "Real-time bus tracking and smart public transport platform with live location tracking, route planning, and secure booking system.",
    "image": "/projects/project9.png",
    "video": "/projects/videos/where-is-my-bus-demo.mp4",
    "tags": [
      "MERN Stack",
      "Real-Time Tracking",
      "Google Maps API",
      "Socket.io",
      "Razorpay Payments",
      "JWT Auth"
    ],
    "demoUrl": "https://gps-tracker-umber.vercel.app/",
    "githubUrl": "https://github.com/ayanmanna123/GPS_Tracker",
    "featured": true,
    "accentColor": "from-blue-500 to-cyan-600",
    "status": "Live",
    "highlights": [
      "Live Bus Location Tracking",
      "Smart Route Planning",
      "Secure Ticket Booking",
      "Real-Time Bus Updates",
      "Interactive Map UI"
    ],

    "details": {
      "problem": "Public transport users often face uncertainty about bus arrival times, routes, and seat availability. Traditional systems lack real-time tracking and centralized booking capabilities.",

      "solution": "Where Is My Bus provides real-time GPS-based bus tracking, intelligent route visualization, and secure ticket booking through a unified platform. It enhances commuter confidence and transport system efficiency.",

      "features": [
        {
          "title": "Real-Time Bus Tracking",
          "description": "Track buses live on map using GPS and real-time socket communication."
        },
        {
          "title": "Interactive Map Navigation",
          "description": "Google Maps integration for route visualization and location-based tracking."
        },
        {
          "title": "Secure Booking System",
          "description": "Integrated payment gateway for seamless ticket booking."
        },
        {
          "title": "Authentication & Security",
          "description": "JWT-based authentication for secure user sessions."
        },
        {
          "title": "Real-Time Notifications",
          "description": "Socket-based updates for live bus status and movement."
        }
      ],

      "techStack": {
        "Frontend": [
          "React 18",
          "Vite 4",
          "JavaScript ES6+",
          "Tailwind CSS 3",
          "Google Maps API v3"
        ],
        "Backend": [
          "Node.js 18",
          "Express.js 4",
          "MongoDB 6",
          "Redis 7",
          "JWT Authentication"
        ],
        "Additional_Tools": [
          "Auth0 (Identity Management)",
          "Razorpay (Payment Gateway)",
          "OpenAI API (AI Features if used)",
          "Socket.io (Real-Time Communication)"
        ],
        "Infrastructure": [
          "Vercel (Frontend Hosting)",
          "Cloud Backend Deployment"
        ]
      },

      "challenges": [
        "Handling real-time GPS data streaming efficiently.",
        "Maintaining low latency socket communication.",
        "Ensuring secure payment and booking flow.",
        "Optimizing map rendering performance for multiple buses.",
        "Scaling backend for concurrent users."
      ],

      "screenshots": {
        "mobile": ["/projects/project9-mobile.png"],
        "desktop": ["/projects/project9-desktop.png"]
      }
    }
  },
  {
    "id": 10,
    "title": "CollabLearn",
    "category": "EdTech SaaS / Mentorship Platform",
    "description": "A full-stack mentorship and collaborative learning platform enabling students to connect with mentors through real-time chat, video sessions, task management, and progress tracking.",
    "image": "/projects/project10.jpeg",
    "video": "/projects/videos/collablearn-demo.mp4",
    "tags": [
      "MERN Stack",
      "Real-Time Chat",
      "Video Conferencing",
      "EdTech SaaS",
      "JWT Auth",
      "Razorpay Payments",
      "Socket.io"
    ],
    "demoUrl": "https://collab-learn-ruby.vercel.app/",
    "githubUrl": "https://github.com/ayanmanna123/CollabLearn",
    "featured": true,
    "accentColor": "from-purple-500 to-indigo-600",
    "status": "Live",

    "highlights": [
      "Smart Mentor Discovery",
      "Real-Time Chat & Video Sessions",
      "Task & Progress Tracking",
      "Karma Reward System",
      "Community Forum",
      "Secure Payment Integration"
    ],

    "details": {
      "problem": "Students often struggle to find the right mentors, schedule sessions, track learning progress, and maintain structured learning communication in one unified platform.",

      "solution": "CollabLearn provides an all-in-one mentorship ecosystem where students can discover mentors based on skills and ratings, book sessions, communicate in real time, and track learning progress while mentors manage students, sessions, and earnings efficiently.",

      "features": [
        {
          "title": "Smart Mentor Discovery",
          "description": "AI-assisted mentor discovery based on skills, ratings, and expertise."
        },
        {
          "title": "Real-Time Communication",
          "description": "Instant chat using Stream Chat and WebSocket communication."
        },
        {
          "title": "Video Mentoring Sessions",
          "description": "High-quality live video sessions powered by ZegoCloud."
        },
        {
          "title": "Task & Progress Management",
          "description": "Mentors assign tasks and students track learning progress."
        },
        {
          "title": "Karma & Engagement System",
          "description": "Gamified engagement system rewarding active participation."
        },
        {
          "title": "Secure Payment & Booking",
          "description": "Razorpay integration for secure mentoring session payments."
        }
      ],

      "techStack": {
        "Frontend": [
          "React 19.1.1",
          "Vite 7.1.7",
          "TailwindCSS 3.4.18",
          "React Router 7.9.6",
          "Axios 1.13.2",
          "Socket.io Client 4.8.1",
          "Stream Chat 9.26.1",
          "ZegoCloud 2.17.1",
          "Framer Motion 12.23.26",
          "Lucide React 0.553.0",
          "React Toastify 11.0.5",
          "JWT Decode 4.0.0",
          "Date-fns 4.1.0"
        ],

        "Backend": [
          "Node.js >=18",
          "Express 5.1.0",
          "MongoDB 8.19.3",
          "Mongoose 8.19.3",
          "Socket.io 4.7.5",
          "JWT 9.0.2",
          "Bcrypt 6.0.0",
          "Cloudinary 2.8.0",
          "Razorpay 2.9.6",
          "Nodemailer 6.9.16",
          "Zod 4.1.12"
        ]
      },

      "challenges": [
        "Maintaining low-latency real-time messaging and notifications.",
        "Handling video session stability and signaling.",
        "Designing scalable mentor-student matching algorithms.",
        "Managing secure payment workflows and session booking.",
        "Synchronizing real-time chat, video, and task updates."
      ],

      "screenshots": {
        "mobile": ["/projects/project10-mobile.png"],
        "desktop": ["/projects/project10-desktop.png"]
      }
    }
  },
  {
    "id": 11,
    "title": "JobFlux",
    "category": "Professional Networking / Job Portal SaaS",
    "description": "A full-stack professional networking and job portal platform similar to LinkedIn, enabling users to build professional profiles, connect with others, apply for jobs, and communicate in real time.",
    "image": "/projects/project11.png",
    "video": "/projects/videos/jobflux-demo.mp4",
    "tags": [
      "MERN Stack",
      "Professional Networking",
      "Job Portal",
      "Real-Time Chat",
      "JWT Auth",
      "Cloud Media Storage"
    ],
    "demoUrl": "https://jobflux-full-stack-8sja.vercel.app/",
    "githubUrl": "https://github.com/ayanmanna123/Jobflux_FullStack",
    "featured": true,
    "accentColor": "from-sky-500 to-blue-600",
    "status": "Live",

    "highlights": [
      "Professional Profile System",
      "Job Posting & Applications",
      "Real-Time Messaging",
      "Connection System",
      "Activity Feed",
      "Secure Authentication"
    ],

    "details": {
      "problem": "Job seekers and professionals often rely on multiple platforms for networking, job applications, and communication, resulting in fragmented professional management.",

      "solution": "JobFlux provides a unified professional ecosystem where users can build career profiles, connect with professionals, apply for jobs, and communicate in real time — all in a single platform.",

      "features": [
        {
          "title": "Professional Profile Builder",
          "description": "Create detailed profiles including skills, experience, education, and achievements."
        },
        {
          "title": "Job Portal System",
          "description": "Companies can post jobs and users can apply directly through the platform."
        },
        {
          "title": "Connection & Networking",
          "description": "Send connection requests and build a professional network."
        },
        {
          "title": "Real-Time Messaging",
          "description": "Instant chat system powered by WebSocket communication."
        },
        {
          "title": "Activity Feed",
          "description": "Share posts, updates, and professional achievements."
        },
        {
          "title": "Media Upload & Storage",
          "description": "Upload profile pictures, resumes, and documents securely."
        }
      ],

      "techStack": {
        "Frontend": [
          "React 19.1.1",
          "Vite 7.1.7",
          "TailwindCSS 3.4.18",
          "React Router 7.9.6",
          "Axios 1.13.2",
          "Socket.io Client 4.8.1",
          "Stream Chat 9.26.1",
          "ZegoCloud 2.17.1",
          "Framer Motion 12.23.26",
          "Lucide React 0.553.0",
          "React Toastify 11.0.5",
          "JWT Decode 4.0.0",
          "Date-fns 4.1.0"
        ],

        "Backend": [
          "Node.js >=18",
          "Express 5.1.0",
          "MongoDB 8.19.3",
          "Mongoose 8.19.3",
          "Socket.io 4.7.5",
          "JWT 9.0.2",
          "Bcrypt 6.0.0",
          "Cloudinary 2.8.0",
          "Razorpay 2.9.6",
          "Nodemailer 6.9.16",
          "Zod 4.1.12"
        ]
      },

      "challenges": [
        "Designing scalable social graph connection system.",
        "Managing real-time chat and notification delivery.",
        "Optimizing feed rendering and post retrieval performance.",
        "Ensuring secure authentication and session management.",
        "Handling large media uploads efficiently."
      ],

      "screenshots": {
        "mobile": ["/projects/project11-mobile.png"],
        "desktop": ["/projects/project11-desktop.png"]
      }
    }
  }



];

export const categoryColors = {
  "Healthcare SaaS": "from-emerald-500/20 to-teal-600/20 text-emerald-600 border-emerald-500/30",
  "E-commerce": "from-purple-500/20 to-indigo-600/20 text-purple-600 border-purple-500/30",
  "Real-time Communication": "from-blue-500/20 to-cyan-600/20 text-blue-600 border-blue-500/30",
  "Artificial Intelligence": "from-amber-500/20 to-orange-600/20 text-amber-600 border-amber-500/30",
  "FinTech": "from-rose-500/20 to-pink-600/20 text-rose-600 border-rose-500/30",
  "Food Tech": "from-violet-500/20 to-purple-600/20 text-violet-600 border-violet-500/30",
  "HR Tech": "from-orange-500/20 to-red-600/20 text-orange-600 border-orange-500/30"
};

// Achievements moved to end of file to support dynamic calculation

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

export const features = ["Full-stack expertise", "Clean, maintainable code", "Performance optimization", "Agile methodology", "24/7 support", "Timely delivery"];

export const hobbies = [
  { name: "Cubing", icon: <Puzzle size={16} />, desc: "High-speed solving" },
  { name: "Music", icon: <Music size={16} />, desc: "Vibe & Rhythm" },
  { name: "Foodie", icon: <Utensils size={16} />, desc: "Tasting world" },
  { name: "Traveling", icon: <Plane size={16} />, desc: "Exploring places" }
];

// Contact Info
export const contactInfo = [
  { icon: <Mail size={16} />, text: "mannaayan777@gmail.com", href: "mailto:mannaayan777@gmail.com", label: "Email" },
  { icon: <Phone size={16} />, text: "9907072795", href: "tel:9907072795", label: "Phone" },
  { icon: <MapPin size={16} />, text: "kolkata , westbengal india", href: null, label: "Location" }
];

export const socialLinks = [
  { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/ayan-manna-4a67ab34a/", label: "LinkedIn" },
  { icon: <Instagram size={18} />, href: "https://instagram.com/dubbinut", label: "Instagram" },
  { icon: <Youtube size={18} />, href: "https://www.youtube.com/@ayanmanna1007", label: "YouTube" },
  { icon: <Github size={18} />, href: "https://github.com/ayanmanna123", label: "GitHub" },
  { icon: <Twitter size={18} />, href: "https://x.com/@AyanMan13756317", label: "Twitter" }
];

export const leetcodeUsername = "ayanmanna123";

export const quickLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Work", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const tabContent = {
  personal: "Passionate about creating digital solutions that make a difference. When I'm not coding, I'm exploring new technologies, contributing to open-source, and mentoring aspiring developers.",
  professional: "With 1+ years in full-stack development, I've delivered 15+ successful projects using modern technologies. I specialize in scalable architecture and performance optimization.",
  approach: "I believe in clean code, thorough testing, and user-centered design. My process emphasizes collaboration, agile methodologies, and continuous improvement."
};

// Skills Data
export const skillCategories = [
  { id: "all", label: "All Skills", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { id: "frontend", label: "Frontend", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  { id: "backend", label: "Backend", color: "bg-gradient-to-r from-green-500 to-emerald-500" },
  { id: "tools", label: "Tools", color: "bg-gradient-to-r from-orange-500 to-yellow-500" },
  { id: "aiml", label: "AI / ML", color: "bg-gradient-to-r from-indigo-500 to-violet-500" },
  { id: "appdev", label: "App Dev", color: "bg-gradient-to-r from-pink-500 to-rose-500" },
  { id: "deeplearning", label: "Deep Learning / LLM", color: "bg-gradient-to-r from-violet-600 to-indigo-600" },
];

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

export const skillsData = [
  // Frontend
  { name: "HTML", level: 95, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", level: 90, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", level: 90, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "SCSS", level: 85, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" },
  { name: "React", level: 90, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Figma", level: 80, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Bootstrap", level: 85, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "Tailwind CSS", level: 90, category: "frontend", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
  { name: "Redux", level: 80, category: "frontend", icon: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/redux-icon.png" },

  // Backend
  { name: "Python", level: 80, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "C", level: 70, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "C++", level: 75, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "MySQL", level: 85, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", level: 90, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Express", level: 85, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "MongoDB Atlas", level: 85, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },

  // Tools
  { name: "VS Code", level: 95, category: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg" },
  { name: "Vite", level: 85, category: "tools", icon: "https://icon.icepanel.io/Technology/svg/Vite.js.svg" },
  { name: "Google Cloud", level: 70, category: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
  { name: "Vercel", level: 85, category: "tools", icon: "https://registry.npmmirror.com/@lobehub/icons-static-png/1.46.0/files/dark/vercel.png" },
  { name: "Netlify", level: 80, category: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" },
  { name: "AWS", level: 70, category: "tools", icon: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/aws-color.png" },
  { name: "Git", level: 90, category: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", level: 90, category: "tools", icon: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" },
  { name: "GitLab", level: 75, category: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" },
  { name: "n8n", level: 65, category: "tools", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTVC1k-iS7Bx1ySL43nPK8EEjn-Ct3kHqj3Q&s" },

  // AI / ML
  { name: "NumPy", level: 75, category: "aiml", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQH_UD8CmG1k13eSzI-sYQyQHsDmXq-HOeG5UhE1Fg6gGLmryLP-2f-IA_JKdclff0MToxu3UnjUr463m9rGi5uoojh45tQ6JTR5XfWSM&s" },
  { name: "Pandas", level: 75, category: "aiml", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-NEICv1aGTvDRncdvM_fXoah5SNWx4pXAvg&s" },
  { name: "OpenCV", level: 70, category: "aiml", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJp_RsPVdUBHHqz0fEsLTsUmCfK3-G2JIcvA&s" },
  { name: "Seaborn", level: 70, category: "aiml", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO7DsVeQubPVKVj8GWyHVhMr6oQg8eqsZaEw&s" },
  { name: "Matplotlib", level: 70, category: "aiml", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaWRWUBqTxaKJi-aAovlpbDffHnuim6RWww&s" },
  { name: "Scikit-learn", level: 70, category: "aiml", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ioErrXCaT2yZgsMaefs8irg9dRTWVk882Q&s" },
  { name: "TensorFlow", level: 65, category: "aiml", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/TensorFlow_logo.svg/1200px-TensorFlow_logo.svg.png" },
  { name: "Transformers", level: 60, category: "aiml", icon: "https://repository-images.githubusercontent.com/155220641/a16c4880-a501-11ea-9e8f-646cf611702e" },
  { name: "PyTorch", level: 60, category: "aiml", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtAniCw22R1oYThcRHwkGHIsQdbkdByEN6Tw&s" },
  { name: "Keras", level: 60, category: "aiml", icon: "https://editor.analyticsvidhya.com/uploads/70574124120f1b1b40-08f0-467d-9a35-0f0fe71e0a43.jpg" },

  // App Development
  { name: "React Native", level: 85, category: "appdev", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Android Studio", level: 75, category: "appdev", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" },
  { name: "Capacitor", level: 80, category: "appdev", icon: "https://cdn.icon-icons.com/icons2/2699/PNG/512/capacitorjs_logo_icon_169340.png" },

  // Deep Learning / LLM
  { name: "Transformers", level: 85, category: "deeplearning", icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
  { name: "Hugging Face", level: 85, category: "deeplearning", icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
  { name: "LangChain", level: 80, category: "deeplearning", icon: "https://raw.githubusercontent.com/langchain-ai/langchain/master/docs/static/img/langchain_logo.png" },
  { name: "OpenAI API", level: 90, category: "deeplearning", icon: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
  { name: "LlamaIndex", level: 75, category: "deeplearning", icon: "https://i.imgur.com/8QqQ8qM.png" },
];

// Testimonials
export const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Product Director at TechCorp",
    content: "Working with Ayan Manna was seamless from day one. Not only did they deliver a full-stack solution ahead of schedule, but they also communicated clearly throughout the project. It's rare to find a developer who understands both the tech and the business side so well",
    rating: 5,
    image: "/testimonials/alex-johnson.png"
  },
  {
    id: 2,
    name: "Maria Chen",
    role: "Senior UX Designer at DesignHub",
    content: "I've reviewed hundreds of portfolios, and his work is truly exceptional. Tway the animations guide attention while maintaining performance is masterful. The gradient elements add depth without overwhelming.",
    rating: 5,
    image: "/testimonials/maria-chen.png"
  },
  {
    id: 3,
    name: "David Wilson",
    role: "CTO at Startup Ventures",
    content: "From wireframes to deployment, Ayan Manna owned the entire stack with confidence and creativity. The final product is fast, reliable, and looks incredible. I wouldn't hesitate to work with them again.",
    rating: 5,
    image: "/testimonials/David Wilson.png"
  },
];

export const educationData = [
  {
    id: 1,
    institution: "B.P. Poddar Institute of Management and Technology",
    degree: "Bachelor of Technology - BTech, Electrical Engineering",
    year: "2023 - 2027",
    description: "Focused on core computer science concepts including Data Structures, Algorithms, and Database Management Systems. Active member of the coding club and tech fest organizer.",
    score: "DGPA: 8.72",
  },
  {
    id: 2,
    institution: "Gujarpur Surendranath Vidyapith",
    degree: "Higher Secondary Education (Class XII)",
    year: "2021 - 2023",
    description: "Completed higher secondary education with a focus on Science (Physics, Chemistry, Mathematics).",
    score: "Percentage: 92%",
  },
  {
    id: 3,
    institution: "Gujarpur Surendranath Vidyapith",
    degree: "Secondary Education (Class X)",
    year: "2019 - 2021",
    description: "Completed secondary education with distinction.",
    score: "Percentage: 94%",
  }
];

export const journeyData = [
  {
    year: "2025",
    role: "Hackathon Participant & Competitive Coder",
    company: "TechStorm | PLUTUS | Code@Frost",
    description: "Active participant in national-level hackathons and coding competitions. Secured positions in various tech fests like TechStorm and PLUTUS.",
    skills: ["Problem Solving", "Rapid Prototyping", "Team Collaboration"]
  },
  {
    year: "2024",
    role: "Full Stack Developer",
    company: "Personal Projects",
    description: "Designed and developed scalability-focused web applications including 'Where Is My Bus', 'CollabLearn', and 'JobFlux'.",
    skills: ["MERN Stack", "System Design", "Real-time Architecture"]
  },
  {
    year: "2023",
    role: "Engineering Student",
    company: "B.P. Poddar Institute of Management and Technology",
    description: "Started B.Tech in Electrical Engineering. Focusing on core CS fundamentals and web technologies.",
    skills: ["Data Structures", "Algorithms", "C/C++", "Java"]
  },
  {
    year: "2021",
    role: "Higher Secondary Student",
    company: "Gujarpur Surendranath Vidyapith",
    description: "Completed Class XII with Science stream (Physics, Chemistry, Maths). Achieved 92%.",
    skills: ["Physics", "Chemistry", "Mathematics"]
  },
  {
    year: "2019",
    role: "Secondary School Student",
    company: "Gujarpur Surendranath Vidyapith",
    description: "Completed Class X with distinction. Achieved 94%.",
    skills: ["Science", "Mathematics", "Foundational Studies"]
  }
];

// Calculated Stats
const projectCount = projects.length;
const internshipCount = journeyData.filter(j => j.role.toLowerCase().includes('intern')).length;
const hackathonCount = projects.filter(p =>
  (p.category && p.category.toLowerCase().includes('hackathon')) ||
  (p.tags && p.tags.some(t => t.toLowerCase().includes('hackathon')))
).length;
const freelanceCount = projects.filter(p =>
  (p.category && p.category.toLowerCase().includes('freelanc')) ||
  (p.tags && p.tags.some(t => t.toLowerCase().includes('freelanc')))
).length;

// Achievements
export const achievements = [
  { number: `${7}`, label: "Hackathons", icon: <Code2 className="h-5 w-5" />, heroIcon: <Award className="h-3 w-3" />, suffix: "+" },
  { number: `${14}`, label: "Projects", icon: <Briefcase className="h-5 w-5" />, heroIcon: <TrendingUp className="h-3 w-3" />, suffix: "+" },
  { number: `${1}`, label: "Freelancing", icon: <Zap className="h-5 w-5" />, heroIcon: <Target className="h-3 w-3" />, suffix: "+" },
  { number: `${0}`, label: "Internships", icon: <Calendar className="h-5 w-5" />, heroIcon: <Shield className="h-3 w-3" />, suffix: "" }
];

// Certificates Data
export const certificates = [
  {
    id: 1,
    title: "Complete Web Development Course",
    issuer: "Udemy",
    date: "Oct 29, 2025",
    image: "/certificates/certificates1.jpg",
    verificationLink: "https://ude.my/",
    featured: true,
    category: "Web Development",
    description: "Completed 97-hour full-stack web development course covering modern web technologies."
  },
  {
    id: 2,
    title: "Python Coder Badge",
    issuer: "Kaggle",
    date: "Nov 10, 2025",
    image: "/certificates/certificates2.png",
    verificationLink: "https://kaggle.com/",
    featured: true,
    category: "Programming",
    description: "Earned Kaggle Python Coder badge demonstrating Python programming and data handling skills."
  },
  {
    id: 3,
    title: "Mini Project Completion – Diet & Body Composition Study",
    issuer: "B.P. Poddar Institute of Management & Technology",
    date: "2024",
    image: "/certificates/certificates3.jpg",
    verificationLink: "",
    featured: false,
    category: "Academic",
    description: "Completed academic mini project on the effect of diet type on body composition parameters."
  },
  {
    id: 4,
    title: "TechStorm 2.25 – RO Navigator Participation",
    issuer: "B.P. Poddar Institute of Management & Technology",
    date: "March 2025",
    image: "/certificates/certificates4.jpg",
    verificationLink: "",
    featured: true,
    category: "Hackathon",
    description: "Participated in TechStorm 2.25 annual technical fest in RO Navigator event."
  },
  {
    id: 5,
    title: "Code@Frost Participation",
    issuer: "Asansol Engineering College",
    date: "2025",
    image: "/certificates/certificates5.jpg",
    verificationLink: "",
    featured: false,
    category: "Coding Competition",
    description: "Participated in Code@Frost coding competition organized by AEC, West Bengal."
  },
  {
    id: 6,
    title: "Smart Coder 2.25 Prelims (Online)",
    issuer: "B.P. Poddar Institute of Management & Technology",
    date: "2025",
    image: "/certificates/certificates6.jpg",
    verificationLink: "",
    featured: false,
    category: "Coding Competition",
    description: "Qualified/participated in Smart Coder 2.25 preliminary round."
  },
  {
    id: 7,
    title: "PLUTUS 2025 – Price & Premium",
    issuer: "Fintech Club, IIT (ISM) Dhanbad",
    date: "2025",
    image: "/certificates/certificates7.jpg",
    verificationLink: "",
    featured: true,
    category: "FinTech",
    description: "Participated in fintech event PLUTUS 2025 organized by IIT ISM Dhanbad."
  },
  {
    id: 8,
    title: "Code@Frost Submission via Unstop",
    issuer: "Unstop / Asansol Engineering College",
    date: "2025",
    image: "/certificates/certificates8.jpg",
    verificationLink: "https://unstop.com/",
    featured: false,
    category: "Coding Competition",
    description: "Submitted project through Unstop platform for Code@Frost competition."
  },
  {
    id: 9,
    title: "Educ-A-Thon 2.0 Prelims Participation",
    issuer: "Techno Main Salt Lake",
    date: "Oct–Nov 2025",
    image: "/certificates/certificates9.jpg",
    verificationLink: "",
    featured: false,
    category: "Hackathon",
    description: "Participated in Educ-A-Thon 2.0 prelims conducted by Samarth, Techno Main Salt Lake."
  }
]

