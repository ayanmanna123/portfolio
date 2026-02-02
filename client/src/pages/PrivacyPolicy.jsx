import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { StarBackground } from "@/components/StarBackground";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Helmet>
                <title>Privacy Policy | Ayan Manna | Portfolio</title>
                <meta name="description" content="Privacy Policy for Ayan Manna's portfolio. Learn how your data is handled." />
            </Helmet>

            <StarBackground />
            <Navbar />

            <main className="pt-32 pb-16 px-6 max-w-4xl mx-auto min-h-[80vh]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold mb-8 text-primary">Privacy Policy</h1>

                    <div className="space-y-6 text-gray-300">
                        <p className="text-lg">
                            Effective Date: {new Date().toLocaleDateString()}
                        </p>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
                            <p>
                                Welcome to my portfolio. This Privacy Policy explains how I handle any information you might share with me, primarily through the contact form.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-white">2. Information Collection</h2>
                            <p>
                                When you use the contact form on this website, I collect the information you voluntarily provide, which typically includes:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Your Name</li>
                                <li>Your Email Address</li>
                                <li>The content of your message</li>
                            </ul>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-white">3. How I Use Your Information</h2>
                            <p>
                                I use the information you provide solely for the purpose of communicating with you. This includes:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Responding to your inquiries or messages.</li>
                                <li>Discussing potential projects or collaborations.</li>
                            </ul>
                            <p>
                                I do <strong>not</strong> sell, rent, or share your personal information with third parties for marketing purposes.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-white">4. Cookies</h2>
                            <p>
                                This website may use cookies or similar technologies for essential functionality and to analyze site traffic (e.g., via Vercel Analytics). These tools help me understand how visitors interact with my portfolio to improve the user experience. You can control cookie preferences through your browser settings.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-semibold text-white">5. Contact Me</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please feel free to contact me using the form on the home page or via the social links provided in the footer.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};
