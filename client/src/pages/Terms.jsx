import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { StarBackground } from "@/components/StarBackground";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export const Terms = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Helmet>
                <title>Terms of Service | Ayan Manna | Portfolio</title>
                <meta name="description" content="Terms of Service for Ayan Manna's portfolio." />
                <link rel="canonical" href="https://ayanmanna.in/terms" />
            </Helmet>

            <StarBackground />
            <Navbar />

            <main className="pt-32 pb-16 px-6 max-w-4xl mx-auto min-h-[80vh]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold mb-8 text-primary">Terms of Service</h1>

                    <div className="space-y-6 text-gray-300">
                        <p className="text-lg">
                            Effective Date: {new Date().toLocaleDateString()}
                        </p>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-white">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using this portfolio website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use this website.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-white">2. Intellectual Property</h2>
                            <p>
                                The content on this website, including but not limited to text, code, images, projects, and design (except where otherwise noted or attributed to third parties), is the intellectual property of Ayan Manna. You may not reproduce, distribute, or use this content for commercial purposes without explicit permission.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-white">3. Disclaimer of Warranties</h2>
                            <p>
                                This website and its content are provided on an "as is" and "as available" basis. I make no representations or warranties of any kind, express or implied, regarding the operation of the website or the information, content, or materials included on it.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-white">4. Limitation of Liability</h2>
                            <p>
                                To the fullest extent permitted by law, I shall not be liable for any damages of any kind arising from the use of this website, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-white">5. External Links</h2>
                            <p>
                                My portfolio contains links to external websites (e.g., GitHub, LinkedIn, project demos) that are not operated by me. I have no control over the content and practices of these third-party sites and assume no responsibility for them.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};
