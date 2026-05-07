import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  LayoutDashboard, 
  User as UserIcon, 
  ShieldCheck, 
  Stethoscope, 
  FileText, 
  Plus, 
  Clock, 
  Users 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Booking } from '../types';
import { cn, formatCurrency } from '../lib/utils';

export const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'profile' | 'admin'>('bookings');
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({ ...user });
  const [showNoteModal, setShowNoteModal] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState({ notes: '', healthUpdate: '' });

  const fetchBookings = () => {
    api.get("/bookings/my").then(setBookings);
  };

  useEffect(() => {
    fetchBookings();
    if (user) setProfileData({ ...user });
  }, [user]);

  const handleUpdateStatus = async (id: string, status: string) => {
    await api.put(`/bookings/${id}/status`, { status });
    fetchBookings();
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showNoteModal) return;
    await api.post("/carenotes", { bookingId: showNoteModal, ...noteContent });
    setShowNoteModal(null);
    setNoteContent({ notes: '', healthUpdate: '' });
    alert("Care note added successfully");
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.put("/users/profile", profileData);
    setEditingProfile(false);
    alert("Profile updated successfully");
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-primary-900 text-white p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-500/20 rounded-full blur-2xl" />
            <img src={user?.avatar || "https://ui-avatars.com/api/?name="+user?.name} className="w-20 h-20 rounded-2xl mb-4 border-2 border-accent-500 relative z-10" />
            <h2 className="text-2xl font-display font-black relative z-10">{user?.name}</h2>
            <p className="text-neutral-400 text-sm capitalize relative z-10">{user?.role}</p>
          </div>
          
          <nav className="flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab('bookings')}
              className={cn("flex items-center gap-3 p-4 rounded-2xl font-bold transition-all", activeTab === 'bookings' ? "bg-primary-500 text-white shadow-lg" : "hover:bg-primary-100 text-neutral-600")}
            >
              <Calendar size={20} /> My Activity
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={cn("flex items-center gap-3 p-4 rounded-2xl font-bold transition-all", activeTab === 'profile' ? "bg-primary-500 text-white shadow-lg" : "hover:bg-primary-100 text-neutral-600")}
            >
              <UserIcon size={20} /> Profile Settings
            </button>
            {user?.role === 'admin' && (
              <button 
                onClick={() => setActiveTab('admin')}
                className={cn("flex items-center gap-3 p-4 rounded-2xl font-bold transition-all", activeTab === 'admin' ? "bg-primary-500 text-white shadow-lg" : "hover:bg-primary-100 text-neutral-600")}
              >
                <ShieldCheck size={20} /> Admin Panel
              </button>
            )}
          </nav>
        </aside>

        <main className="lg:col-span-3">
          {activeTab === 'bookings' && (
            <>
              <h2 className="text-3xl font-display font-black text-primary-900 mb-8 italic">Booking History</h2>
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <div className="bg-white p-20 rounded-3xl text-center border-2 border-dashed border-neutral-200">
                    <Calendar className="mx-auto mb-4 text-neutral-300" size={48} />
                    <p className="text-neutral-500">No appointments scheduled yet.</p>
                    <Link to="/caregivers" className="inline-block mt-6 btn-primary">Book Your First Session</Link>
                  </div>
                ) : (
                  bookings.map(b => (
                    <div key={b.id} className="bg-white p-6 rounded-3xl border border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-500">
                          <Stethoscope />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{b.service_name}</div>
                          <div className="text-sm text-neutral-500">With {user?.role === 'customer' ? b.caregiver_name : b.customer_name}</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-8">
                        <div className="hidden md:block">
                          <div className="text-sm text-neutral-400">Date</div>
                          <div className="font-medium">{new Date(b.booking_date).toLocaleDateString()}</div>
                        </div>
                        <div className="hidden md:block">
                          <div className="text-sm text-neutral-400">Total</div>
                          <div className="font-bold text-primary-500">{formatCurrency(b.total_price)}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider",
                          b.status === 'completed' ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                        )}>
                          {b.status}
                        </span>
                        
                        {user?.role === 'caregiver' && b.status === 'confirmed' && (
                          <button 
                            onClick={() => setShowNoteModal(b.id)}
                            className="p-2 hover:bg-primary-50 text-primary-500 rounded-lg transition-colors"
                            title="Add Daily Care Note"
                          >
                            <FileText size={20} />
                          </button>
                        )}
                        
                        {user?.role === 'caregiver' && b.status === 'pending' && (
                          <button 
                            onClick={() => handleUpdateStatus(b.id, 'confirmed')}
                            className="btn-primary !py-1 !px-4 !text-xs"
                          >
                            Accept
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-neutral-100">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-display font-black text-primary-900 italic">Personal Profile</h2>
                <button 
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="btn-outline !py-2"
                >
                  {editingProfile ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              <form onSubmit={handleProfileUpdate} className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-neutral-400 block mb-2 px-2">Display Name</label>
                    <input 
                      disabled={!editingProfile}
                      className="w-full bg-neutral-50 px-6 py-3 rounded-2xl disabled:opacity-70"
                      value={profileData.name || ''}
                      onChange={e => setProfileData({...profileData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-neutral-400 block mb-2 px-2">Phone Number</label>
                    <input 
                      type="tel"
                      disabled={!editingProfile}
                      className="w-full bg-neutral-50 px-6 py-3 rounded-2xl disabled:opacity-70"
                      value={profileData.phone || ''}
                      onChange={e => setProfileData({...profileData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-neutral-400 block mb-2 px-2">Home Address</label>
                    <textarea 
                      disabled={!editingProfile}
                      className="w-full bg-neutral-50 px-6 py-3 rounded-2xl h-32 disabled:opacity-70"
                      value={profileData.address || ''}
                      onChange={e => setProfileData({...profileData, address: e.target.value})}
                    />
                  </div>
                </div>
                {editingProfile && (
                  <div className="md:col-span-2 pt-6">
                    <button type="submit" className="btn-primary w-full shadow-primary-500/40">Save Changes</button>
                  </div>
                )}
              </form>
            </div>
          )}

          {activeTab === 'admin' && (
             <div className="grid md:grid-cols-3 gap-6">
                {[
                  { label: "Total Revenue", val: formatCurrency(45000), icon: <ShieldCheck className="text-green-500" /> },
                  { label: "Active Caregivers", val: "124", icon: <Users className="text-blue-500" /> },
                  { label: "Pending Verifications", val: "8", icon: <Clock className="text-orange-500" /> },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center mb-6">{stat.icon}</div>
                    <div className="text-sm text-neutral-400 font-bold mb-1 uppercase tracking-widest">{stat.label}</div>
                    <div className="text-3xl font-display font-black text-primary-900">{stat.val}</div>
                  </div>
                ))}
             </div>
          )}
        </main>
      </div>

      {/* Note Modal */}
      <AnimatePresence>
        {showNoteModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowNoteModal(null)}
              className="absolute inset-0 bg-primary-900/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 relative z-10 shadow-2xl"
            >
              <h3 className="text-2xl font-display font-black mb-6">Daily Care Report</h3>
              <form onSubmit={handleAddNote} className="space-y-6">
                <div>
                  <label className="block font-bold mb-2 ml-2">Patient Vitals / Health Update</label>
                  <input 
                    placeholder="BP, Temperature, Mood, etc."
                    className="w-full bg-neutral-100 px-6 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500"
                    value={noteContent.healthUpdate}
                    onChange={e => setNoteContent({...noteContent, healthUpdate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2 ml-2">Clinical Notes</label>
                  <textarea 
                    placeholder="Describe treatments given, medicine administered..."
                    className="w-full bg-neutral-100 px-6 py-3 rounded-2xl h-40 outline-none focus:ring-2 focus:ring-primary-500"
                    value={noteContent.notes}
                    onChange={e => setNoteContent({...noteContent, notes: e.target.value})}
                  />
                </div>
                <button type="submit" className="btn-primary w-full !rounded-2xl py-4 flex items-center justify-center gap-2">
                  <Plus size={20} /> Submit Daily Note
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
