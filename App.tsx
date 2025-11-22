import React, { useState, useEffect } from 'react';
import { GuestLayout } from './components/guest/GuestLayout';
import { AdminLayout } from './components/admin/AdminLayout';
import { NavigationDemo } from './components/NavigationDemo';
import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';
import { supabase } from './services/supabaseClient';

const App: React.FC = () => {
  // Simplificando rotas: 'navigation' | 'guest' | 'admin-login' | 'admin-panel'
  const [route, setRoute] = useState<'navigation' | 'guest' | 'admin-login' | 'admin-panel'>('navigation');
  const [adminEmail, setAdminEmail] = useState('');
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
      } else if (hash === '#guest') {
        setRoute('guest');
      } else {
        setRoute('navigation');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Usar autenticação real do Supabase
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPass,
      });

      if (signInError) {
        setError('Email ou senha inválidos');
        return;
      }

      if (data.user) {
        window.location.hash = 'panel';
        setAdminEmail('');
        setAdminPass('');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
      console.error('Login error:', err);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.hash = '';
    setRoute('navigation');
  };

  // Admin Login Screen
  if (route === 'admin-login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100 p-4">
        <div className="bg-white p-8 shadow-xl rounded-sm max-w-sm w-full text-center border-t-4 border-gold-500">
          <h2 className="font-display text-2xl mb-6 text-stone-900">Acesso Administrativo</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              label="Email"
              placeholder="admin@casamento.com"
              value={adminEmail}
              onChange={e => setAdminEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              label="Senha"
              placeholder="Digite sua senha"
              value={adminPass}
              onChange={e => setAdminPass(e.target.value)}
              error={error}
              required
            />
            <Button type="submit" className="w-full">Entrar no Painel</Button>
          </form>
          <a href="#" className="block mt-4 text-xs text-stone-400 hover:text-stone-600">Voltar para Convidados</a>
        </div>
      </div>
    );
  }

  // Admin Panel
  if (route === 'admin-panel') {
    return <AdminLayout onLogout={handleLogout} />;
  }

  // Guest View - Agora com design premium!
  if (route === 'guest') {
    return <GuestLayout />;
  }

  // Navigation Demo (Default) - Redireciona direto para guest
  return <NavigationDemo onNavigate={(page) => {
    switch (page) {
      case 'admin':
        window.location.hash = 'admin';
        break;
      case 'guest':
        window.location.hash = 'guest';
        break;
    }
  }} />;
};

export default App;