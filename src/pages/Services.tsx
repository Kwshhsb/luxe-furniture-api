import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Stethoscope, Users, Brain } from 'lucide-react';

export const ServicesPage = () => {
  const services = [
    { icon: <Stethoscope size={32} />, title: "Home Nursing", desc: "ICU-level care, injections, and post-surgery nursing support at home.", category: "Nursing" },
    { icon: <Users size={32} />, title: "Elderly Caretaking", desc: "Assistance with daily activities, hygiene, and companionship.", category: "Caregiver" },
    { icon: <Brain size={32} />, title: "Physiotherapy", desc: "Expert recovery sessions for strokes, accidents, and chronic pain.", category: "Physiotherapy" },
  ];

  return (
    <div className="pt-32 pb-20">
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-primary-900 mb-4 italic">Our Specialized Services</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">Providing a comprehensive range of medical and home care solutions tailored to your specific health requirements.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100 hover:border-primary-500 transition-all group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary-500 shadow-sm group-hover:bg-primary-500 group-hover:text-white transition-all mb-6">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-neutral-600 mb-6 leading-relaxed">{s.desc}</p>
                <Link to="/caregivers" className="inline-flex items-center gap-2 text-primary-500 font-bold hover:gap-4 transition-all">
                  Book Now →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Also export the section separately for use in Home page
export const ServicesSection = () => {
  const services = [
    { icon: <Stethoscope size={32} />, title: "Home Nursing", desc: "ICU-level care, injections, and post-surgery nursing support at home.", category: "Nursing" },
    { icon: <Users size={32} />, title: "Elderly Caretaking", desc: "Assistance with daily activities, hygiene, and companionship.", category: "Caregiver" },
    { icon: <Brain size={32} />, title: "Physiotherapy", desc: "Expert recovery sessions for strokes, accidents, and chronic pain.", category: "Physiotherapy" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-primary-900 mb-4 italic">Our Specialized Services</h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">Providing a comprehensive range of medical and home care solutions tailored to your specific health requirements.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100 hover:border-primary-500 transition-all group"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary-500 shadow-sm group-hover:bg-primary-500 group-hover:text-white transition-all mb-6">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">{s.desc}</p>
              <Link to="/caregivers" className="inline-flex items-center gap-2 text-primary-500 font-bold hover:gap-4 transition-all">
                Book Now →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
