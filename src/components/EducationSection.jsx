import TiltedCard from './TiltedCard';
import { motion } from 'framer-motion';
import { educationData } from '../data';
import { GraduationCap, Calendar, Award } from 'lucide-react';

const EducationSection = () => {
    return (
        <section id="education" className="py-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Education
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        My academic background and qualifications.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {educationData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="w-full"
                        >
                            <TiltedCard
                                altText={item.institution}
                                captionText={item.year}
                                containerHeight="400px"
                                containerWidth="100%"
                                imageHeight="400px"
                                imageWidth="100%"
                                rotateAmplitude={12}
                                scaleOnHover={1.05}
                                showMobileWarning={false}
                                showTooltip={false}
                                displayOverlayContent={true}
                                overlayContent={
                                    <div className="p-8 h-full flex flex-col relative z-10 w-full">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                                                <GraduationCap className="w-8 h-8" />
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-400 bg-black/40 px-3 py-1 rounded-full border border-white/5 backdrop-blur-md">
                                                <Calendar className="w-4 h-4" />
                                                {item.year}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {item.institution}
                                        </h3>

                                        <p className="text-blue-400 font-medium mb-4 text-sm">
                                            {item.degree}
                                        </p>

                                        <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                                            {item.description}
                                        </p>

                                        {item.score && (
                                            <div className="flex items-center gap-2 text-sm font-medium text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-lg w-fit backdrop-blur-sm">
                                                <Award className="w-4 h-4" />
                                                {item.score}
                                            </div>
                                        )}
                                    </div>
                                }
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EducationSection;
