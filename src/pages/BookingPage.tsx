import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { User } from '../types';
import { formatCurrency } from '../lib/utils';

export const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [success, setSuccess] = useState(false);
  const [caregiver, setCaregiver] = useState<User | null>(null);

  useEffect(() => {
    api.get("/caregivers").then(list => {
      const found = list.find((c: User) => c.id === id);
      setCaregiver(found);
    });
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    await api.post("/bookings", {
      caregiverId: id,
      serviceId: "s1",
      bookingDate: new Date().toISOString(),
      duration: "12 Hours",
      totalPrice: 2500
    });
    setSuccess(true);
    setTimeout(() => navigate('/dashboard'), 3000);
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
      {success ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-20 rounded-[3rem] text-center shadow-2xl border-t-8 border-green-500"
        >
          <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-4xl font-display font-black mb-4 italic text-primary-900">Booking Request Sent!</h2>
          <p className="text-neutral-500 mb-8 italic">Your request has been sent to {caregiver?.name}. They will confirm shortly.</p>
          <p className="text-sm text-neutral-400">Redirecting to your dashboard...</p>
        </motion.div>
      ) : (
        <div className="bg-white rounded-[3rem] p-12 shadow-2xl overflow-hidden relative border border-neutral-100 font-sans">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-[100px] -z-10" />
          <h1 className="text-4xl font-display font-black text-primary-900 mb-2 italic">Confirm Care Visit</h1>
          <p className="text-neutral-500 mb-10">Review your appointment with our professional specialist.</p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6 p-6 rounded-3xl bg-neutral-50 border border-neutral-100">
              <img src={caregiver?.avatar} className="w-16 h-16 rounded-2xl object-cover" />
              <div>
                <div className="font-bold text-xl">{caregiver?.name}</div>
                <div className="text-primary-500 text-sm font-bold uppercase tracking-widest">{caregiver?.specialization}</div>
              </div>
            </div>

            <div className="flex gap-6 p-6 rounded-3xl bg-neutral-50 border border-neutral-100">
              <div className="w-14 h-14 bg-primary-500 rounded-2xl flex items-center justify-center text-white">
                <Calendar size={28} />
              </div>
              <div>
                <div className="text-sm text-neutral-500 uppercase font-black tracking-widest mb-1">Shift Selection</div>
                <div className="text-lg font-bold">12-Hour Daily Care Shift</div>
              </div>
            </div>

            <div className="space-y-4 bg-primary-900 text-white p-8 rounded-[2rem] shadow-xl shadow-primary-900/20">
              <div className="flex justify-between text-lg font-medium opacity-80">
                <span>Base Daily Rate</span>
                <span>{formatCurrency(2500)}</span>
              </div>
              <div className="flex justify-between text-lg font-medium opacity-80">
                <span>Verification Fee</span>
                <span>{formatCurrency(99)}</span>
              </div>
              <div className="h-px bg-white/10 my-4" />
              <div className="flex justify-between text-3xl font-display font-black text-accent-500">
                <span>Total Budget</span>
                <span>{formatCurrency(2599)}</span>
              </div>
            </div>

            <button onClick={handleBooking} className="btn-primary w-full !py-6 text-xl !rounded-2xl shadow-xl shadow-primary-500/30">
              Finalize Booking
            </button>
            <p className="text-center text-sm text-neutral-400 italic">By clicking proceed, you agree to our patient care terms.</p>
          </div>
        </div>
      )}
    </div>
  );
};
