import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  Github,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { contactInfo, socialLinks } from "@/data";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Name is required",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast({
        title: "Email is required",
        variant: "destructive"
      });
      return false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast({
        title: "Invalid email format",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      toast({
        title: "Message must be at least 10 characters",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mzdvrklp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message sent! 🎉",
          description: "I'll get back to you within 24 hours.",
          variant: "success",
          className: "bg-green-600 text-white dark:bg-green-500 border border-green-700 shadow-lg"
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or email me directly at mannaayan777@gmail.com",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 relative bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10 sm:mb-16">
          <span className="inline-block px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full bg-primary/10 text-primary mb-3 sm:mb-4 border border-primary/20">
            Let's Connect
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6 leading-normal sm:leading-tight">
            <span className="block text-foreground">Let's</span>
            <span className="block font-rakyat text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-1 sm:mt-2 pb-1 sm:pb-3 font-normal" style={{ fontFamily: "'Rakyat', cursive" }}>
              Get In Touch
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Have a project in mind, a question, or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 md:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8 p-5 sm:p-8 rounded-2xl bg-gradient-to-br from-secondary/20 to-background border border-border">
            <h3 className="text-lg sm:text-2xl font-bold">
              Contact Details
            </h3>

            <div className="space-y-3 sm:space-y-5">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-accent/30 rounded-xl transition-all duration-300">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm sm:text-base font-medium hover:text-primary transition-colors truncate block"
                      >
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-sm sm:text-base font-medium truncate block">
                        {info.text}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 sm:pt-6 border-t border-border/50">
              <h4 className="font-semibold mb-3 text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">Find me on</h4>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-accent hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 flex items-center justify-center min-w-[44px] min-h-[44px]"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-5 sm:p-8 rounded-2xl bg-card border border-border shadow-sm">
            <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">
              Send Me a Message
            </h3>

            <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-xs sm:text-sm font-medium text-muted-foreground"
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
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all text-base"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs sm:text-sm font-medium text-muted-foreground"
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
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all text-base"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-xs sm:text-sm font-medium text-muted-foreground"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none text-base"
                  placeholder="Hey, I'd love to collaborate on..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-6 rounded-xl bg-[#EC844D] hover:bg-[#DE743C] text-white font-bold transition-all duration-300 shadow-lg shadow-[#EC844D]/25 text-sm sm:text-base cursor-pointer min-h-[48px]",
                  isSubmitting && "opacity-80 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} className="sm:size-[18px]" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};