
import React, { useState, useEffect } from 'react';
import { searchGuests } from '../../services/storageService';
import { Guest } from '../../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface SearchScreenProps {
  onGuestFound: (guest: Guest) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ onGuestFound }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Guest[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 3) {
        const found = searchGuests(query);
        setResults(found);
        setHasSearched(true);
      } else {
        setResults([]);
        setHasSearched(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
      
      {/* Header Section */}
      <div className="text-center mb-12 animate-fade-in-up space-y-4">
        <div className="flex justify-center mb-4">
            <Sparkles className="text-gold-500 animate-pulse" size={24} strokeWidth={1} />
        </div>
        <h1 className="font-display text-5xl md:text-7xl text-gold-600 tracking-tight leading-none text-center drop-shadow-sm">
          Alexandre <span className="font-script text-6xl md:text-8xl mx-2 text-stone-400">&</span> Adália
        </h1>
        <p className="font-serif text-stone-500 text-lg md:text-xl italic tracking-wide font-light mt-4">
          Bem-vindos à nossa celebração
        </p>
      </div>
      
      {/* Search Input Area - Minimalist Line */}
      <div className="w-full max-w-md relative group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <input 
            type="text"
            placeholder="Por favor, digite seu nome..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-b border-stone-300 py-4 text-center text-2xl md:text-3xl font-serif text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-gold-500 transition-all duration-500"
            autoFocus
        />
        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-500 transition-all duration-700 group-focus-within:w-full"></div>
      </div>

      {/* Results Area - Floating Cards */}
      <div className="w-full max-w-md mt-8 space-y-3 min-h-[120px]">
        {query.length > 0 && query.length < 3 && (
            <p className="text-stone-400 text-sm text-center font-sans tracking-widest animate-pulse">BUSCANDO...</p>
        )}
        
        {hasSearched && results.length === 0 && query.length >= 3 && (
             <div className="text-stone-400 text-center animate-fade-in">
                <p className="font-serif italic text-lg">Nome não encontrado na lista de convidados.</p>
             </div>
        )}

        {results.map((guest, index) => (
            <button
                key={guest.id}
                onClick={() => onGuestFound(guest)}
                className="w-full flex items-center justify-between p-5 bg-white/80 hover:bg-white border border-stone-200 hover:border-gold-300 rounded-sm shadow-sm hover:shadow-md transition-all duration-500 hover:scale-[1.02] group animate-fade-in-up text-left"
                style={{ animationDelay: `${0.3 + (index * 0.1)}s` }}
            >
                <div className="flex flex-col">
                    <span className="font-serif text-xl text-stone-800 group-hover:text-gold-700 transition-colors">
                        {guest.name}
                    </span>
                    <span className="text-[10px] text-stone-400 uppercase tracking-[0.2em] mt-1 group-hover:text-gold-500">
                        {guest.category === 'VIP' ? 'Convidado Especial' : guest.category === 'Family' ? 'Família' : guest.category === 'Work' ? 'Colega de Trabalho' : 'Amigo'}
                    </span>
                </div>
                <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:border-gold-500 group-hover:bg-gold-50 transition-all">
                    <ArrowRight className="text-stone-300 group-hover:text-gold-600 transition-transform duration-300 group-hover:translate-x-1" size={18}/>
                </div>
            </button>
        ))}
      </div>
    </div>
  );
};
