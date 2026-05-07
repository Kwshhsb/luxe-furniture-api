import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const AuthPage = ({ mode }: { mode: 'login' | 'register' }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'customer' as const });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = mode === 'login' ? "/auth/login" : "/auth/register";
      const data = await api.post(endpoint, formData);
      login(data);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 p-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-md w-full border-b-8 border-primary-500"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Heart size={32} className="text-primary-500" fill="currentColor" />
            <span className="font-display font-black text-2xl">ElderCare</span>
          </Link>
          <h2 className="text-3xl font-display font-black text-primary-900">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
        </div>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-bold mb-1 ml-2">Full Name</label>
              <input 
                type="text" 
                required 
                className="w-full px-6 py-3 bg-neutral-100 rounded-full focus:ring-2 focus:ring-primary-500 outline-none"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-bold mb-1 ml-2">Email Address</label>
            <input 
              type="email" 
              required 
              className="w-full px-6 py-3 bg-neutral-100 rounded-full focus:ring-2 focus:ring-primary-500 outline-none"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1 ml-2">Password</label>
            <input 
              type="password" 
              required 
              className="w-full px-6 py-3 bg-neutral-100 rounded-full focus:ring-2 focus:ring-primary-500 outline-none"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-bold mb-1 ml-2">I am a...</label>
              <select 
                 className="w-full px-6 py-3 bg-neutral-100 rounded-full focus:ring-2 focus:ring-primary-500 outline-none"
                 value={formData.role}
                 onChange={e => setFormData({...formData, role: e.target.value as any})}
              >
                <option value="customer">Patient / Family</option>
                <option value="caregiver">Professional Caregiver</option>
              </select>
            </div>
          )}
          <button type="submit" className="btn-primary w-full !rounded-full mt-4 py-4 text-lg">
            {mode === 'login' ? 'Sign In' : 'Join Now'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-neutral-500">
          {mode === 'login' ? "Don't have an account?" : "Already have an account?"} 
          <Link to={mode === 'login' ? '/register' : '/login'} className="text-primary-500 font-bold ml-1">
            {mode === 'login' ? 'Register here' : 'Login here'}
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
