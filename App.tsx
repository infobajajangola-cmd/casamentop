import React, { useState, useEffect } from 'react';
import { GuestLayout } from './components/guest/GuestLayout';
import { AdminLayout } from './components/admin/AdminLayout';
import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';

const App: React.FC = () => {
  // Simple routing state: 'guest' | 'admin-login' | 'admin-panel'
  const [route, setRoute] = useState<'guest' | 'admin-login' | 'admin-panel'>('guest');
  const [adminPass, setAdminPass] = useState('');
  const [error, setError] = useState('');

  // Handle hash changes for simple navigation without reload
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin') {
        setRoute('admin-login');
      } else if (hash === '#panel') {
         // In a real app, check auth token here
         setRoute('admin-panel');
      } else {
        setRoute('guest');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPass === 'admin123') {
      window.location.hash = 'panel';
      setAdminPass('');
      setError('');
    } else {
      setError('Invalid passcode');
    }
  };

  const handleLogout = () => {
    window.location.hash = '';
    setRoute('guest');
  };

  // Admin Login Screen
  if (route === 'admin-login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100 p-4">
        <div className="bg-white p-8 shadow-xl rounded-sm max-w-sm w-full text-center border-t-4 border-gold-500">
            <h2 className="font-display text-2xl mb-6 text-stone-900">Admin Access</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <Input 
                    type="password" 
                    placeholder="Enter passcode" 
                    value={adminPass} 
                    onChange={e => setAdminPass(e.target.value)}
                    error={error}
                />
                <Button type="submit" className="w-full">Enter Dashboard</Button>
            </form>
            <a href="#" className="block mt-4 text-xs text-stone-400 hover:text-stone-600">Back to Guest View</a>
        </div>
      </div>
    );
  }

  // Admin Panel
  if (route === 'admin-panel') {
    return <AdminLayout onLogout={handleLogout} />;
  }

  // Guest View (Default)
  return <GuestLayout />;
};

export default App;