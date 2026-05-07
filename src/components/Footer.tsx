import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare } from 'lucide-react';

export const Footer = () => (
  <footer className="bg-white py-20 border-t border-neutral-100">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
      <div className="col-span-2">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <Heart size={28} className="text-primary-500" fill="currentColor" />
          <span className="font-display font-black text-2xl text-primary-900">ElderCare</span>
        </Link>
        <p className="text-neutral-500 max-w-sm mb-6 leading-relaxed italic">
          "Redefining elderly care with gold-standard medical professionalism and genuine compassion at your doorstep."
        </p>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-500 cursor-pointer hover:bg-primary-500 hover:text-white transition-all">
            <MessageSquare size={20} />
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="font-bold mb-6 text-primary-900">Platform</h4>
        <ul className="space-y-4 text-neutral-500 font-medium">
          <li><Link to="/services">All Services</Link></li>
          <li><Link to="/caregivers">Find Caregivers</Link></li>
          <li><Link to="/register">Become a Caregiver</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold mb-6 text-primary-900">Support</h4>
        <ul className="space-y-4 text-neutral-500 font-medium">
          <li>Help Center</li>
          <li>Contact Us</li>
          <li>Terms of Service</li>
        </ul>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-neutral-50 text-center text-neutral-400 text-sm">
      © 2026 ElderCare Assist Platform. All Professionals are Background Verified.
    </div>
  </footer>
);
