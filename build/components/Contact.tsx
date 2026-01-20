import React, { useState } from 'react';
import Button from './ui/Button';
import { Phone, Mail, MapPin, ShieldCheck, Loader2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
      setFormState({ name: '', email: '', phone: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-12 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-300 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Start Your Transformation</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ready to discuss your project? Get a free consultation and detailed estimate today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
          {/* Contact Info */}
          <div className="space-y-6 md:space-y-8 flex flex-col h-full order-2 lg:order-1">
            <div className="bg-primary-50 dark:bg-gray-800 rounded-2xl p-6 md:p-8 border border-primary-100 dark:border-gray-700 transition-colors duration-300 hover:shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <a href="tel:+15551234567" className="flex items-start group hover:translate-x-1 transition-transform">
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm text-primary-600 dark:text-primary-400 mr-4 transition-colors group-hover:text-primary-500">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wide">Broker Exchange</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Mon-Sat: 8am - 8pm</p>
                  </div>
                </a>

                <a href="mailto:hello@eliterenovations.com" className="flex items-start group hover:translate-x-1 transition-transform">
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm text-primary-600 dark:text-primary-400 mr-4 transition-colors group-hover:text-primary-500">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Email Us</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">hello@eliterenovations.com</p>
                  </div>
                </a>

                <div className="flex items-start">
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm text-primary-600 dark:text-primary-400 mr-4 transition-colors">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Our Office</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">123 Design District Blvd,</p>
                    <p className="text-gray-700 dark:text-gray-300">Suite 400, Metropolis, NY 10012</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Embedded Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 flex-grow min-h-[250px] relative z-0">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1689264850937!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '100%', filter: 'grayscale(0.2)' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 md:p-10 transition-colors duration-300 order-1 lg:order-2">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Thank you for contacting us. One of our project managers will get back to you within 24 hours.</p>
                <Button onClick={() => setSubmitted(false)} variant="outline">Send Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Get a Free Estimate</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Fill out the form below and we will contact you to schedule your free consultation.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600 text-base"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600 text-base"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600 text-base"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Details</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none placeholder-gray-400 dark:placeholder-gray-600 text-base"
                    placeholder="Tell us about your apartment size, current condition, and what you want to achieve..."
                  />
                </div>

                <Button type="submit" fullWidth size="lg" disabled={isSubmitting} className="relative">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Sending...
                    </>
                  ) : 'Request Estimate'}
                </Button>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                  By submitting this form, you agree to our privacy policy. Your data is safe with us.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;