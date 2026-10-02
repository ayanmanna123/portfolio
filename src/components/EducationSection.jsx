import TiltedCard from './TiltedCard';
import { motion } from 'framer-motion';
import { educationData } from '../data';
import { GraduationCap, Calendar, Award } from 'lucide-react';

const EducationSection = () => {
    return (
        <section id="education" className="py-16 sm:py-24 md:py-28 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-0 w-60 sm:w-72 h-60 sm:h-72 bg-[#EC844D]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#FFD8B2]/15 dark:bg-[#EC844D]/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                        <span className="block text-foreground">Academic</span>
                        <span className="block font-rakyat text-3xl sm:text-5xl md:text-6xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-1 sm:mt-2 pb-1 sm:pb-3 font-normal" style={{ fontFamily: "'Rakyat', cursive" }}>
                            Education & Degrees
                        </span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-lg">
                        My academic background and qualifications.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
                    {educationData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="w-full"
                        >
                            <div className="bg-card/90 dark:bg-slate-900/60 border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-lg hover:shadow-xl hover:border-[#EC844D]/40 transition-all duration-300 h-full flex flex-col justify-between text-left group">
                                <div>
                                    <div className="flex items-start justify-between mb-5">
                                        <div className="p-2.5 sm:p-3 rounded-xl bg-[#EC844D]/10 text-[#EC844D] dark:text-[#FFAE80] group-hover:bg-[#EC844D] group-hover:text-white transition-colors duration-300">
                                            <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground bg-muted/80 dark:bg-black/40 px-2.5 sm:px-3 py-1 rounded-full border border-border dark:border-white/5 backdrop-blur-md">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {item.year}
                                        </div>
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1.5 group-hover:text-[#EC844D] dark:group-hover:text-[#FFAE80] transition-colors">
                                        {item.institution}
                                    </h3>

                                    <p className="text-[#EC844D] dark:text-[#FFAE80] font-medium mb-3 text-xs sm:text-sm">
                                        {item.degree}
                                    </p>

                                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-5">
                                        {item.description}
                                    </p>
                                </div>

                                {item.score && (
                                    <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#EC844D] dark:text-[#FFAE80] bg-[#EC844D]/10 border border-[#EC844D]/20 px-3 py-1.5 rounded-lg w-fit backdrop-blur-sm mt-auto">
                                        <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EC844D] dark:text-[#FFAE80]" />
                                        {item.score}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EducationSection;
