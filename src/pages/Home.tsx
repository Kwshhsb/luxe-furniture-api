import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  Star 
} from 'lucide-react';
import { ServicesSection } from './Services';

export const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-primary-100/50 clip-path-hero" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary-100 text-primary-500 text-sm font-bold mb-6">
            <ShieldCheck size={16} />
            Trusted by 5,000+ Families
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black text-primary-900 leading-[1.1] mb-6">
            Expert Care <br />
            <span className="text-accent-500 heading-serif">at the Comfort</span>
            <br />
            of Your Home.
          </h1>
          <p className="text-lg text-neutral-600 mb-10 max-w-lg leading-relaxed">
            Connecting you with verified home nurses, caregivers, and physiotherapists who care for your loved ones like family.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/caregivers" className="btn-primary flex items-center gap-2">
              Book a Visit <Search size={18} />
            </Link>
            <Link to="/services" className="btn-outline">Explore Services</Link>
          </div>

          <div className="mt-12 flex items-center gap-8">
            <div>
              <div className="text-3xl font-display font-black text-primary-900">4.9/5</div>
              <div className="text-sm text-neutral-500">Average Rating</div>
            </div>
            <div className="w-px h-10 bg-neutral-200" />
            <div>
              <div className="text-3xl font-display font-black text-primary-900">10k+</div>
              <div className="text-sm text-neutral-500">Successful Shifts</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6958?w=800&q=80" 
              alt="Caregiver with elderly person"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          <div className="absolute -left-12 bottom-12 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 animate-bounce-slow">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <div className="text-sm font-bold">Verified Professional</div>
              <div className="text-xs text-neutral-500">Background Checked</div>
            </div>
          </div>
          <div className="absolute -right-8 top-12 bg-white p-4 rounded-2xl shadow-xl z-20 animate-pulse-slow">
            <div className="flex gap-1 text-accent-500 mb-1">
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
            </div>
            <div className="text-xs font-bold italic">"Best personalized care!"</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const Home = () => (
  <>
    <Hero />
    <ServicesSection />
    <section className="bg-primary-900 py-20 text-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-display font-medium mb-6 italic">Ready to find the perfect care?</h2>
        <p className="text-neutral-300 mb-10 text-lg">Our team is available 24/7 to assist you in matching with the best medical professionals in your area.</p>
        <div className="flex justify-center gap-6">
          <Link to="/caregivers" className="btn-primary bg-accent-500 hover:bg-white hover:text-primary-900 px-10">Find Caregivers</Link>
          <Link to="/register" className="btn-outline border-white text-white hover:bg-white hover:text-primary-900">Sign Up Free</Link>
        </div>
      </div>
    </section>
  </>
);
