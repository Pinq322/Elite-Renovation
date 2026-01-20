import React, { useState, useEffect } from 'react';
import { Menu, X, Check, ArrowRight, ChevronDown, Quote, Phone } from 'lucide-react';
import { NAV_LINKS, SERVICES, FEATURES, PROJECTS, TESTIMONIALS, PROCESS_STEPS } from './constants';
import Button from './components/ui/Button';
import ChatWidget from './components/ChatWidget';
import Contact from './components/Contact';
import BeforeAfter from './components/ui/BeforeAfter';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    // If it's a section link (starts with #)
    if (href.startsWith('#')) {
      const id = href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center relative">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer group select-none" onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); setMobileMenuOpen(false); }}>
              <div className="w-10 h-10 bg-primary-900 dark:bg-primary-700 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl transition-all shadow-lg group-hover:bg-primary-800">
                E
              </div>
              <span className={`text-xl font-bold font-serif tracking-tight transition-colors ${
                isScrolled || mobileMenuOpen ? 'text-gray-900 dark:text-white' : 'text-white drop-shadow-md'
              }`}>
                EliteRenovations
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    isScrolled 
                      ? 'text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400' 
                      : 'text-white/90 hover:text-white drop-shadow-sm'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <ThemeToggle isDark={theme === 'dark'} toggleTheme={toggleTheme} isTransparent={!isScrolled} />
              <div className="hidden lg:flex flex-col items-end mr-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${isScrolled ? 'text-gray-500 dark:text-gray-400' : 'text-white/80'}`}>Broker Exchange</span>
                <a 
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, 'contact')}
                  className={`text-sm font-bold cursor-pointer ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}
                >
                  +1 (555) 123-4567
                </a>
              </div>
              <Button 
                variant={isScrolled ? 'primary' : 'secondary'} 
                size="sm"
                className={!isScrolled ? 'bg-white text-gray-900 border-none hover:bg-gray-100' : ''}
                onClick={(e) => handleScrollTo(e, 'contact')}
              >
                Get Estimate
              </Button>
            </nav>

            {/* Mobile Menu Toggle & Theme Toggle */}
            <div className="md:hidden flex items-center gap-3">
              <a 
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                className={`p-2 rounded-full cursor-pointer ${isScrolled || mobileMenuOpen ? 'bg-primary-50 text-primary-600 dark:bg-gray-800 dark:text-primary-400' : 'bg-white/10 text-white backdrop-blur-sm'}`}
                aria-label="Contact Us"
              >
                <Phone size={20} />
              </a>
              <ThemeToggle isDark={theme === 'dark'} toggleTheme={toggleTheme} isTransparent={!isScrolled && !mobileMenuOpen} />
              <button 
                type="button"
                className={`p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer ${
                  isScrolled || mobileMenuOpen ? 'text-gray-900 dark:text-white' : 'text-white drop-shadow-md'
                }`}
                onClick={() => setMobileMenuOpen(prev => !prev)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white dark:bg-gray-900 flex flex-col pt-24 h-[100dvh] overflow-y-auto">
          <div className="flex-1 px-4 flex flex-col gap-6 pb-8">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                className="text-2xl font-serif font-bold text-gray-900 dark:text-white py-3 border-b border-gray-100 dark:border-gray-800 block cursor-pointer"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4">
              <Button className="w-full text-lg py-4" onClick={(e) => handleScrollTo(e, 'contact')}>
                Get Free Estimate
              </Button>
            </div>
            
            <div className="mt-auto p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Broker Exchange</p>
              <a 
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="text-2xl font-bold text-primary-600 dark:text-primary-400 block mb-4 cursor-pointer"
              >
                +1 (555) 123-4567
              </a>
              <p className="text-gray-600 dark:text-gray-300">123 Design District Blvd</p>
              <p className="text-gray-600 dark:text-gray-300">Metropolis, NY 10012</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80" 
            alt="Modern Luxury Apartment Interior" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse"></span>
              <span className="text-xs font-semibold tracking-wide uppercase">Now booking for next month</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
              Premium Apartment <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Renovation</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-8 font-light leading-relaxed">
              Transform your space with euro-standard finishing. We deliver on time, within strict budget, and with a 5-year quality warranty.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={(e) => handleScrollTo(e, 'contact')}>
                Get a Free Estimate
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white" 
                onClick={(e) => handleScrollTo(e, 'portfolio')}
              >
                View Our Projects
              </Button>
            </div>
            
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-white/80 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Check className="text-secondary-500" size={18} /> Fixed Pricing
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-secondary-500" size={18} /> Official Contract
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-secondary-500" size={18} /> Post-Pay Stages
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50 cursor-pointer hover:text-white transition-colors" 
          onClick={(e) => handleScrollTo(e, 'services')}
        >
          <ChevronDown size={32} />
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80" className="rounded-2xl shadow-lg mt-12 hover:scale-[1.02] transition-transform duration-500" alt="Construction detail" />
                <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80" className="rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-500" alt="Architect" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-secondary-500 text-white p-6 rounded-xl shadow-xl hidden md:block">
                <p className="text-4xl font-bold font-serif">15+</p>
                <p className="text-sm font-medium opacity-90">Years of<br/>Experience</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-primary-600 dark:text-primary-400 font-semibold uppercase tracking-wider mb-2">About EliteRenovations</h4>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">We Build Trust, Not Just Walls.</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Founded on the principles of transparency and technical excellence, EliteRenovations has transformed over 300 apartments in the metro area. We understand that renovation is stressful. Our mission is to make it seamless.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                We specialize in "Euro Renovation" — a standard of quality that implies perfect surfaces, high-end materials, and rigorous adherence to engineering norms. When we give a deadline, we stick to it.
              </p>
              
              <div className="border-l-4 border-primary-500 pl-6 py-2 bg-gray-50 dark:bg-gray-800 rounded-r-lg mb-8 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <p className="text-gray-800 dark:text-gray-100 italic font-medium">"Our apartment looks like it belongs in a magazine. The team was clean, polite, and incredibly skilled."</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">— Alex & Jamie, Downtown</p>
              </div>
              
              <a 
                href="#features" 
                className="text-primary-600 dark:text-primary-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer" 
                onClick={(e) => handleScrollTo(e, 'features')}
              >
                See why clients choose us <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Our Expertise</h2>
            <p className="text-gray-600 dark:text-gray-300">Comprehensive renovation services designed for modern apartment living. From layout changes to the final coat of paint.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => (
              <div key={service.id} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 group cursor-default">
                <div className="w-14 h-14 bg-primary-50 dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">{service.description}</p>
                <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
                  Learn more <ArrowRight size={14} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Process Section */}
      <section id="process" className="py-12 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-300 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">How We Work</h2>
            <p className="text-gray-600 dark:text-gray-300">A structured, transparent process from the first meeting to the moment you get your keys.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 dark:bg-gray-700 -z-10 transform translate-y-4"></div>

            {PROCESS_STEPS.map((step) => (
              <div key={step.id} className="relative bg-white dark:bg-gray-900 pt-4 transition-colors duration-300 group hover:translate-y-[-4px] transition-transform">
                 <div className="relative inline-block mb-4">
                  <span className="text-5xl font-serif font-bold text-primary-100 dark:text-gray-800 group-hover:text-primary-200 dark:group-hover:text-gray-700 transition-colors duration-300 relative z-10">{step.number}</span>
                  <div className="absolute bottom-1 left-0 w-full h-3 bg-primary-50 dark:bg-gray-800 z-0 group-hover:bg-primary-100 dark:group-hover:bg-gray-700 transition-colors duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="features" className="py-12 md:py-20 bg-primary-900 dark:bg-black text-white relative overflow-hidden transition-colors duration-300 scroll-mt-20">
        {/* Decorative pattern */}
        <div className="absolute top-0 right-0 p-12 opacity-5">
           <svg width="200" height="200" viewBox="0 0 100 100" fill="currentColor">
             <path d="M0 0 L50 50 L0 100 Z" />
           </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
            <div className="lg:col-span-1">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">The Elite Standard</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                We believe renovation shouldn't be a gamble. We've developed a transparent process that eliminates risks for homeowners.
              </p>
              <Button variant="secondary" className="bg-white text-primary-900 hover:bg-gray-100 border-none dark:bg-gray-800 dark:text-white" onClick={(e) => handleScrollTo(e, 'contact')}>
                Schedule Consultation
              </Button>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {FEATURES.map((feature) => (
                <div key={feature.id} className="flex gap-4 group hover:bg-white/5 p-2 rounded-lg transition-colors">
                  <div className="flex-shrink-0">
                    <feature.icon className="text-secondary-500 group-hover:scale-110 transition-transform" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-12 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-300 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
              <p className="text-gray-600 dark:text-gray-300">Explore our recent renovations. We deliver quality you can see and feel.</p>
            </div>
          </div>
          
          {/* Featured Transformation: Before/After */}
          <div className="mb-16">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
              <span className="w-8 h-[2px] bg-secondary-500"></span> 
              Latest Transformation
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <BeforeAfter 
                beforeImage="https://images.unsplash.com/photo-1503174771817-2f00d053ee25?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                afterImage="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Living Room Renovation"
              />
              <div>
                <span className="text-secondary-500 font-bold uppercase tracking-wider text-xs">Total Overhaul</span>
                <h3 className="text-3xl font-serif font-bold mt-2 mb-4 text-gray-900 dark:text-white">The Victorian Townhouse</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  We took this 1920s property back to brick and rebuilt it for modern living. The challenge was maintaining the period features while installing underfloor heating and a smart lighting system.
                </p>
                <ul className="space-y-2 mb-8">
                   <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                     <Check size={16} className="text-primary-600 dark:text-primary-400" /> 12 Weeks Duration
                   </li>
                   <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                     <Check size={16} className="text-primary-600 dark:text-primary-400" /> Full Re-wire & Re-plumb
                   </li>
                   <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                     <Check size={16} className="text-primary-600 dark:text-primary-400" /> Bespoke Joinery
                   </li>
                </ul>
                <Button variant="outline">View Case Study</Button>
              </div>
            </div>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project) => (
              <div key={project.id} className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <span className="text-secondary-500 text-xs font-bold uppercase tracking-wider mb-2 block">{project.category}</span>
                  <h3 className="text-white text-2xl font-bold mb-2 group-hover:text-primary-200 transition-colors">{project.title}</h3>
                  <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">View All Projects</Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 md:py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 dark:text-gray-300">Don't just take our word for it. Here is what homeowners think about working with us.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col h-full hover:-translate-y-2 hover:shadow-lg transition-all duration-300 group">
                <div className="mb-6 text-primary-200 dark:text-primary-800 group-hover:text-primary-300 dark:group-hover:text-primary-700 transition-colors">
                  <Quote size={40} className="fill-current" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-8 flex-grow italic leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{t.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-400 py-12 border-t border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                 <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-gray-900 font-serif font-bold text-lg">
                  E
                </div>
                <span className="text-xl font-bold text-white font-serif">EliteRenovations</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Premium apartment renovation services. Quality, transparency, and respect for your home.
              </p>
              <div className="flex gap-4">
                {/* Social icons placeholders */}
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all cursor-pointer">IG</div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all cursor-pointer">FB</div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all cursor-pointer">LI</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Turnkey Renovation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Interior Design</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kitchen & Bath</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Commercial Finishing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li>123 Design District Blvd</li>
                <li>Metropolis, NY 10012</li>
                <li><a href="tel:+15551234567" className="hover:text-white transition-colors font-bold">+1 (555) 123-4567</a></li>
                <li>hello@eliterenovations.com</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs">&copy; {new Date().getFullYear()} EliteRenovations LLC. All rights reserved.</p>
            <p className="text-xs">Designed for Excellence.</p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Widget */}
      <ChatWidget />
    </div>
  );
}

export default App;