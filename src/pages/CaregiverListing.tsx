import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Stethoscope, Star, Clock, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { User } from '../types';

export const CaregiverListing = () => {
  const [caregivers, setCaregivers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    api.get("/caregivers").then(data => {
      setCaregivers(data);
      setLoading(false);
    });
  }, []);

  const filtered = caregivers.filter(c => 
    c.name.toLowerCase().includes(filter.toLowerCase()) || 
    c.specialization?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-black text-primary-900 mb-2">Our Specialists</h1>
          <p className="text-neutral-500">Verified medical professionals ready to serve you.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or specialty..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-12 pr-6 py-3 bg-white rounded-full border border-neutral-200 w-full md:w-80 focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 italic">Finding the best caregivers for you...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(c => (
            <motion.div
              layout
              key={c.id}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-neutral-100 transition-all"
            >
              <div className="flex gap-4 mb-6">
                <img src={c.avatar} alt={c.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-primary-100" />
                <div>
                  <h3 className="text-xl font-bold">{c.name}</h3>
                  <div className="text-primary-500 font-medium text-sm flex items-center gap-1">
                    <Stethoscope size={14} /> {c.specialization}
                  </div>
                  <div className="flex items-center gap-1 text-accent-500 mt-1">
                    <Star size={16} fill="currentColor" />
                    <span className="font-bold">{c.rating}</span>
                    <span className="text-neutral-400 text-xs">Rating</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6 text-sm py-3 border-y border-neutral-50 px-2">
                <div className="flex items-center gap-1 text-neutral-600">
                  <Clock size={16} /> <span>{c.experience} Years Exp.</span>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <ShieldCheck size={16} /> <span>Verified</span>
                </div>
              </div>

              <Link to={`/booking/${c.id}`} className="btn-primary w-full block text-center">Book Now</Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
