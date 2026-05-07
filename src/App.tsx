import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Heart, MessageSquare } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AIChatbot } from './components/AIChatbot';
import { Home } from './pages/Home';
import { ServicesPage } from './pages/Services';
import { CaregiverListing } from './pages/CaregiverListing';
import { Dashboard } from './pages/Dashboard';
import { AuthPage } from './pages/AuthPage';
import { BookingPage } from './pages/BookingPage';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen relative overflow-x-hidden font-sans">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/caregivers" element={<CaregiverListing />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<AuthPage mode="login" />} />
              <Route path="/register" element={<AuthPage mode="register" />} />
              <Route path="/booking/:id" element={<BookingPage />} />
            </Routes>
          </main>
          <Footer />
          <AIChatbot />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
