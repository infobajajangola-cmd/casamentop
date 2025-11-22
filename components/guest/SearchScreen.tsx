import React, { useState, useEffect } from 'react';
import { searchGuests } from '../../services/storageService';
import { Guest } from '../../types';
import { ArrowRight, Sparkles, Crown, Heart } from 'lucide-react';
import { Button } from '../ui/Button';

interface SearchScreenProps {
  onGuestFound: (guest: Guest) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ onGuestFound }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Guest[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 3) {
        setIsLoading(true);
        try {
          const found = await searchGuests(query);
          setResults(found);
        } catch (e) {
          console.error(e);
          setResults([]);
        } finally {
          setIsLoading(false);
          setHasSearched(true);
        }
      } else {
        setResults([]);
        setHasSearched(false);
      }
    }, 500); // Increased debounce slightly for network

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in-up space-y-4 md:space-y-6">
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="bg-gradient-to-br from-amber-400 to-yellow-500 p-3 md:p-4 rounded-full shadow-lg">
              <Crown className="text-white" size={24} />
            </div>
          </div>

          <div className="flex justify-center mb-2 md:mb-4">
            <Heart className="text-amber-500 animate-pulse" size={20} />
          </div>

          <h1 className="font-script text-4xl md:text-6xl lg:text-8xl text-amber-800 mb-2 md:mb-4 drop-shadow-lg px-2">
            Alexandre & Adália
          </h1>

          <p className="text-amber-700 font-serif text-base md:text-xl italic tracking-wide px-4">
            "Encontre seu convite especial para o nosso casamento"
          </p>

          <div className="flex justify-center">
            <Sparkles className="text-amber-500 animate-pulse" size={16} />
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-amber-100">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl text-amber-800 mb-2">Localizar Convite</h2>
            <p className="text-amber-600 font-serif">
              Digite seu nome para encontrar seu convite personalizado
            </p>
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Digite seu nome completo..."
              className="w-full px-6 py-4 text-lg border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all duration-300 bg-white/80 text-gray-900 placeholder-gray-500"
            />
            {isLoading && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"></div>
              </div>
            )}
          </div>

          {/* Results */}
          {hasSearched && (
            <div className="space-y-4">
              {results.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-amber-400 mb-4">
                    <Heart size={48} className="mx-auto opacity-50" />
                  </div>
                  <p className="text-amber-600 font-serif text-lg">
                    Nenhum convite encontrado com esse nome.
                  </p>
                  <p className="text-amber-500 text-sm mt-2">
                    Tente digitar seu nome completo ou entre em contato com os noivos.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {results.map((guest) => (
                    <div
                      key={guest.id}
                      onClick={() => onGuestFound(guest)}
                      className="p-4 border-2 border-amber-200 rounded-lg hover:border-amber-400 hover:bg-amber-50 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-display text-lg text-amber-800 group-hover:text-amber-900">
                            {guest.name}
                          </h3>
                          <p className="text-amber-600 text-sm font-serif">
                            {guest.category || 'Convidado'} • Máx. 1 pessoa
                          </p>
                        </div>
                        <div className="text-amber-500 group-hover:text-amber-700 transition-colors">
                          <ArrowRight size={20} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!hasSearched && (
            <div className="text-center py-8">
              <div className="text-amber-300 mb-4">
                <Heart size={64} className="mx-auto opacity-30" />
              </div>
              <p className="text-amber-500 font-serif">
                Digite pelo menos 3 caracteres para começar a busca
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-amber-600 font-serif text-lg italic mb-2">
            "Duas almas, um coração, uma jornada eterna de amor"
          </p>
          <p className="text-amber-500 text-sm">29 de Novembro, 2025 • Ulengo Center, Luanda</p>
        </div>
      </div>
    </div>
  );
};
