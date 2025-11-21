import React, { useState, useEffect } from 'react';
import { Guest } from '../../types';
import { getGuests } from '../../services/storageService';
import { generateGuestMessage, analyzeGuestList as geminiAnalyze } from '../../services/geminiService';
import { Dashboard } from './Dashboard';
import { GuestList } from './GuestList';
import { CheckInTerminal } from './CheckInTerminal';
import { LayoutDashboard, Users, LogOut, Sparkles, QrCode } from 'lucide-react';

interface AdminLayoutProps {
  onLogout: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
  const [view, setView] = useState<'dashboard' | 'guests' | 'checkin'>('dashboard');
  const [guests, setGuests] = useState<Guest[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    try {
        const data = await getGuests();
        setGuests(data);
    } catch (error) {
        console.error("Failed to refresh guests", error);
    } finally {
        setIsLoading(false);
    }
  };

  const handleAnalysis = async () => {
      setAiAnalysis("Analyzing...");
      const text = await geminiAnalyze(guests);
      setAiAnalysis(text);
  }

  return (
    <div className="min-h-screen flex bg-stone-100">
      {/* Sidebar */}
      <aside className="w-20 lg:w-72 bg-luxury-black text-stone-400 flex flex-col fixed h-full z-20 shadow-2xl border-r border-white/5">
        <div className="h-24 flex items-center justify-center lg:justify-start lg:px-8 border-b border-white/5">
            <div className="w-10 h-10 bg-gold-gradient rounded-sm flex items-center justify-center font-display font-bold text-stone-900 shadow-lg shadow-gold-500/20">L</div>
            <div className="hidden lg:block ml-4">
                <span className="font-display text-lg text-white tracking-widest block">Lumina</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold-600">Admin Suite</span>
            </div>
        </div>

        <nav className="flex-1 py-10 space-y-2 px-4">
            <button 
                onClick={() => setView('dashboard')}
                className={`w-full flex items-center gap-4 p-4 rounded-sm transition-all duration-300 group ${view === 'dashboard' ? 'bg-white/5 text-white border-l-2 border-gold-500' : 'hover:bg-white/5 hover:text-stone-200'}`}
            >
                <LayoutDashboard size={20} className={`transition-colors ${view === 'dashboard' ? 'text-gold-400' : 'text-stone-500 group-hover:text-stone-300'}`}/>
                <span className="hidden lg:block font-sans text-sm tracking-wide uppercase">Dashboard</span>
            </button>
            <button 
                onClick={() => setView('guests')}
                className={`w-full flex items-center gap-4 p-4 rounded-sm transition-all duration-300 group ${view === 'guests' ? 'bg-white/5 text-white border-l-2 border-gold-500' : 'hover:bg-white/5 hover:text-stone-200'}`}
            >
                <Users size={20} className={`transition-colors ${view === 'guests' ? 'text-gold-400' : 'text-stone-500 group-hover:text-stone-300'}`}/>
                <span className="hidden lg:block font-sans text-sm tracking-wide uppercase">Lista de Convidados</span>
            </button>
             <button 
                onClick={() => setView('checkin')}
                className={`w-full flex items-center gap-4 p-4 rounded-sm transition-all duration-300 group ${view === 'checkin' ? 'bg-white/5 text-white border-l-2 border-gold-500' : 'hover:bg-white/5 hover:text-stone-200'}`}
            >
                <QrCode size={20} className={`transition-colors ${view === 'checkin' ? 'text-gold-400' : 'text-stone-500 group-hover:text-stone-300'}`}/>
                <span className="hidden lg:block font-sans text-sm tracking-wide uppercase">Check-in Terminal</span>
            </button>
        </nav>

        <div className="p-6 border-t border-white/5 bg-black/20">
            <button 
                onClick={onLogout}
                className="w-full flex items-center gap-4 p-3 rounded text-red-400/70 hover:bg-red-900/20 hover:text-red-400 transition-colors"
            >
                <LogOut size={20} className="mx-auto lg:mx-0"/>
                <span className="hidden lg:block font-sans text-xs uppercase tracking-widest">Sign Out</span>
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-20 lg:ml-72 p-8 lg:p-12 overflow-y-auto bg-stone-50">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="font-display text-4xl text-stone-900 capitalize">
                    {view === 'guests' ? 'Lista de Convidados' : view === 'checkin' ? 'Portaria' : 'Dashboard'}
                </h1>
                <p className="font-serif text-stone-500 italic mt-1">Visão geral do evento Alexandre & Adália</p>
            </div>
            {view === 'guests' && (
                <button 
                    onClick={handleAnalysis} 
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-stone-900 to-stone-800 text-gold-400 text-xs font-bold uppercase tracking-wider hover:shadow-lg transition-all border border-stone-700"
                >
                    <Sparkles size={14} /> {aiAnalysis === 'Analyzing...' ? 'Consulting AI...' : 'AI Insights'}
                </button>
            )}
        </header>

        {aiAnalysis && view === 'guests' && (
            <div className="bg-gold-100/50 border border-gold-200 p-6 rounded-sm mb-8 shadow-sm animate-fade-in relative">
                <div className="flex justify-between mb-4 border-b border-gold-200 pb-2">
                    <strong className="font-display text-gold-800 uppercase tracking-widest flex items-center gap-2">
                        <Sparkles size={16} /> Strategy Report
                    </strong>
                    <button onClick={() => setAiAnalysis(null)} className="text-gold-600 hover:text-gold-900"><LogOut size={14} /></button>
                </div>
                <pre className="whitespace-pre-wrap font-serif text-stone-800 leading-relaxed">{aiAnalysis}</pre>
            </div>
        )}

        <div className="animate-fade-in-up">
            {isLoading && view !== 'checkin' ? (
                <div className="flex justify-center py-20 text-stone-400 animate-pulse tracking-widest uppercase text-sm">Carregando dados...</div>
            ) : (
                <>
                    {view === 'dashboard' && <Dashboard guests={guests} />}
                    {view === 'guests' && <GuestList guests={guests} refreshData={refreshData} />}
                    {view === 'checkin' && <CheckInTerminal />}
                </>
            )}
        </div>
      </main>
    </div>
  );
};