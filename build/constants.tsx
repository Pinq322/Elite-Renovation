import { 
  Hammer, 
  PaintBucket, 
  Ruler, 
  Clock, 
  ShieldCheck, 
  Banknote, 
  HardHat, 
  Lightbulb,
  Home,
  Wrench
} from 'lucide-react';
import { Service, Feature, Project, Testimonial, ProcessStep } from './types';

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Projects', href: '#portfolio' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export const SERVICES: Service[] = [
  {
    id: 'full-renovation',
    title: 'Full Apartment Renovation',
    description: 'Complete turnkey solutions from demolition to final cleaning. We handle everything so you can move into a ready home.',
    icon: Home
  },
  {
    id: 'euro-renovation',
    title: 'Euro-Standard Finishing',
    description: 'High-precision finishing adhering to strict European quality standards. Perfect walls, premium flooring, and exacting details.',
    icon: PaintBucket
  },
  {
    id: 'bathroom-kitchen',
    title: 'Kitchen & Bath',
    description: 'Specialized wet-zone renovation including waterproofing, tiling, plumbing installation, and custom cabinetry fitting.',
    icon: Wrench
  },
  {
    id: 'design-build',
    title: 'Design & Planning',
    description: 'Technical drawings, 3D visualization, and material selection assistance to ensure the final result matches your vision.',
    icon: Ruler
  }
];

export const FEATURES: Feature[] = [
  {
    id: 'fixed-price',
    title: 'Fixed Price Guarantee',
    description: 'The price we agree on is the price you pay. No hidden fees or surprise "extras" halfway through the project.',
    icon: Banknote
  },
  {
    id: 'deadlines',
    title: 'Strict Deadlines',
    description: 'We respect your time. Our detailed project schedules ensure we finish on the agreed date, or we pay you.',
    icon: Clock
  },
  {
    id: 'warranty',
    title: '5-Year Warranty',
    description: 'We stand behind our craftsmanship. All structural and finishing work is covered by our comprehensive warranty.',
    icon: ShieldCheck
  },
  {
    id: 'pro-team',
    title: 'Certified Masters',
    description: 'No day laborers. Our team consists of vetted, certified professionals with years of specialized experience.',
    icon: HardHat
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Modern Loft in Downtown',
    category: 'Full Renovation',
    imageUrl: 'https://picsum.photos/seed/loft1/800/600',
    description: 'A complete overhaul of a 120sqm industrial space into a warm, modern family home.'
  },
  {
    id: 'p2',
    title: 'Scandi-Style 2-Bedroom',
    category: 'Euro Finishing',
    imageUrl: 'https://picsum.photos/seed/scandi2/800/600',
    description: 'Minimalist design with premium oak flooring and hidden lighting systems.'
  },
  {
    id: 'p3',
    title: 'Luxury Marble Bathroom',
    category: 'Wet Zone',
    imageUrl: 'https://picsum.photos/seed/bath3/800/600',
    description: 'Italian large-format tile installation with custom brass fixtures.'
  },
  {
    id: 'p4',
    title: 'Smart Home Penthouse',
    category: 'Full Renovation',
    imageUrl: 'https://picsum.photos/seed/pent4/800/600',
    description: 'Integrated automation for lighting, climate, and security disguised within a classic aesthetic.'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'step1',
    number: '01',
    title: 'Free Consultation',
    description: 'We meet at your property to measure, discuss your vision, and assess the technical requirements of the space.'
  },
  {
    id: 'step2',
    number: '02',
    title: 'Estimate & Contract',
    description: 'You get a transparent, itemized estimate. We sign a contract with fixed prices and strict deadlines.'
  },
  {
    id: 'step3',
    number: '03',
    title: 'The Renovation',
    description: 'Our certified team executes the work. You receive weekly photo reports and regular updates from your project manager.'
  },
  {
    id: 'step4',
    number: '04',
    title: 'Final Delivery',
    description: 'We conduct a thorough cleaning and final walkthrough. You receive the keys to your perfect, move-in ready home.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Homeowner, West Side',
    content: "The transparency was refreshing. I knew exactly what was happening every week. The finish quality is impeccable and they actually finished two days early.",
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 't2',
    name: 'Michael Chen',
    role: 'Real Estate Investor',
    content: "I've worked with many contractors, but EliteRenovations is the only one that actually hit the deadline without compromising on the euro-standard quality.",
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 't3',
    name: 'Elena Rodriguez',
    role: 'Architect',
    content: "As an architect, I'm picky about details. Their team reads drawings perfectly and executes complex nodes with precision. A pleasure to work with.",
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
  }
];