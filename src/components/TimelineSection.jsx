import React from 'react';
import { motion } from 'framer-motion';
import { journeyData } from '../data';
import { Briefcase, Calendar } from 'lucide-react';

const TimelineSection = () => {
    return (
        <section id="journey" className="py-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#29bc88]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-[#29bc88]">
                        My Journey
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A timeline of my professional growth and milestones in the tech industry.
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#29bc88]/60 via-emerald-400/40 to-transparent" />

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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex items-center mb-12 last:mb-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
        >
            {/* Date/Year Badge - Mobile: Left next to line, Desktop: Opposite side */}
            <div className={`hidden md:flex w-1/2 justify-${isEven ? 'end' : 'start'} px-10`}>
                <div className="flex items-center gap-2 text-[#29bc88] font-bold text-xl">
                    <Calendar className="w-5 h-5 text-[#29bc88]" />
                    {item.year}
                </div>
            </div>

            {/* Center Dot */}
            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-background dark:bg-slate-900 border-2 border-[#29bc88] z-10 shadow-[0_0_15px_rgba(41,188,136,0.35)]">
                <Briefcase className="w-4 h-4 text-[#29bc88]" />
            </div>

            {/* Content Card */}
            <div className="w-full md:w-1/2 pl-20 md:pl-0 md:px-10">
                <div className="bg-card/90 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-border dark:border-white/10 hover:border-[#29bc88]/40 transition-all duration-300 shadow-md hover:shadow-[0_0_25px_rgba(41,188,136,0.12)] group">
                    <div className="md:hidden text-[#29bc88] font-bold mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#29bc88]" /> {item.year}
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-[#29bc88] transition-colors">
                        {item.role}
                    </h3>
                    <p className="text-[#29bc88] font-medium mb-3">{item.company}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, idx) => (
                            <span
                                key={idx}
                                className="text-xs px-3 py-1 rounded-full bg-[#29bc88]/10 text-[#29bc88] border border-[#29bc88]/20"
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
