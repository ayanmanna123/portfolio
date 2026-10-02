import React from 'react';
import { motion } from 'framer-motion';
import { journeyData } from '../data';
import { Briefcase, Calendar } from 'lucide-react';

const TimelineSection = () => {
    return (
        <section id="journey" className="py-16 sm:py-24 md:py-28 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-60 sm:w-72 h-60 sm:h-72 bg-[#EC844D]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#FFD8B2]/15 dark:bg-[#EC844D]/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                        <span className="block text-foreground">Professional</span>
                        <span className="block font-rakyat text-3xl sm:text-5xl md:text-6xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-1 sm:mt-2 pb-1 sm:pb-3 font-normal" style={{ fontFamily: "'Rakyat', cursive" }}>
                            Journey & Experience
                        </span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-lg">
                        A timeline of my professional growth and milestones in the tech industry.
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#EC844D]/60 via-[#FFD8B2]/40 to-transparent" />

                    {journeyData.map((item, index) => (
                        <TimelineItem key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const TimelineItem = ({ item, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-30px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex items-center mb-8 sm:mb-12 last:mb-0 ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
        >
            {/* Date/Year Badge - Mobile: Left next to line, Desktop: Opposite side */}
            <div className={`hidden md:flex w-1/2 items-center ${
                isEven ? 'justify-end pr-10' : 'justify-start pl-10'
            }`}>
                <div className="flex items-center gap-2 text-[#EC844D] dark:text-[#FFAE80] font-bold text-lg sm:text-xl">
                    <Calendar className="w-5 h-5 text-[#EC844D] dark:text-[#FFAE80]" />
                    <span>{item.year}</span>
                </div>
            </div>

            {/* Center Dot */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-background dark:bg-slate-900 border-2 border-[#EC844D] z-20 shadow-[0_0_15px_rgba(236,132,77,0.35)]">
                <Briefcase className="w-4 h-4 text-[#EC844D] dark:text-[#FFAE80]" />
            </div>

            {/* Content Card */}
            <div className={`w-full md:w-1/2 pl-12 sm:pl-14 text-left ${
                isEven ? 'md:pl-10 md:pr-4' : 'md:pr-10 md:pl-4'
            }`}>
                <div className="bg-card/90 dark:bg-slate-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-border dark:border-white/10 hover:border-[#EC844D]/40 transition-all duration-300 shadow-md hover:shadow-[0_0_25px_rgba(236,132,77,0.15)] group">
                    <div className="md:hidden text-[#EC844D] dark:text-[#FFAE80] font-bold text-xs sm:text-sm mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#EC844D] dark:text-[#FFAE80]" /> {item.year}
                    </div>

                    <h3 className="text-base sm:text-xl font-bold text-foreground mb-0.5 sm:mb-1 group-hover:text-[#EC844D] dark:group-hover:text-[#FFAE80] transition-colors">
                        {item.role}
                    </h3>
                    <p className="text-[#EC844D] dark:text-[#FFAE80] font-medium text-xs sm:text-sm mb-2 sm:mb-3">{item.company}</p>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                        {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {item.skills.map((skill, idx) => (
                            <span
                                key={idx}
                                className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#EC844D]/10 text-[#EC844D] dark:text-[#FFAE80] border border-[#EC844D]/20"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TimelineSection;
