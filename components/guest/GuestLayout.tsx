
import React, { useState } from 'react';
import { Guest } from '../../types';
import { SearchScreen } from './SearchScreen';
import { RSVPScreen } from './RSVPScreen';

export const GuestLayout: React.FC = () => {
  const [activeGuest, setActiveGuest] = useState<Guest | null>(null);

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#FDFBF7]">
       
       {/* Textura de Papel de Fundo (Sutil) */}
       <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
       
       {/* Decoração Floral Lateral ESQUERDA */}
       <div className="absolute top-0 left-0 h-full w-1/3 md:w-1/4 z-0 pointer-events-none hidden md:block">
            <img 
                src="https://img.freepik.com/free-photo/border-wildflowers_53876-99658.jpg?w=740&t=st=1709223000~exp=1709223600~hmac=e0a0a0a0" 
                alt="Floral Left"
                className="h-full w-full object-cover opacity-80 mix-blend-multiply mask-image-gradient-r"
                style={{ maskImage: 'linear-gradient(to right, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 50%, transparent 100%)' }}
            />
       </div>

       {/* Decoração Floral Lateral DIREITA (Espelhada) */}
       <div className="absolute top-0 right-0 h-full w-1/3 md:w-1/4 z-0 pointer-events-none hidden md:block">
            <img 
                src="https://img.freepik.com/free-photo/border-wildflowers_53876-99658.jpg?w=740&t=st=1709223000~exp=1709223600~hmac=e0a0a0a0" 
                alt="Floral Right"
                className="h-full w-full object-cover opacity-80 mix-blend-multiply transform scale-x-[-1]"
                style={{ maskImage: 'linear-gradient(to right, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 50%, transparent 100%)' }}
            />
       </div>

       {/* Decoração Mobile (Topo e Base) */}
       <div className="md:hidden absolute top-0 left-0 w-full h-48 bg-[url('https://img.freepik.com/free-vector/watercolor-flowers-background_52683-69198.jpg')] bg-cover opacity-60 mix-blend-multiply pointer-events-none"></div>
       <div className="md:hidden absolute bottom-0 right-0 w-full h-48 bg-[url('https://img.freepik.com/free-vector/watercolor-flowers-background_52683-69198.jpg')] bg-cover opacity-60 mix-blend-multiply pointer-events-none transform rotate-180"></div>

       {/* Noise Texture Global */}
       <div className="absolute inset-0 z-0 bg-noise opacity-10 pointer-events-none"></div>

       <main className="relative z-20 w-full h-full flex flex-col items-center justify-center p-4 md:p-8">
          {!activeGuest ? (
            <SearchScreen onGuestFound={setActiveGuest} />
          ) : (
            <RSVPScreen guest={activeGuest} onBack={() => setActiveGuest(null)} />
          )}
       </main>

       <footer className="absolute bottom-6 text-stone-400 text-[10px] uppercase tracking-[0.3em] z-20 font-sans text-center w-full mix-blend-multiply font-bold">
          Alexandre & Adália &bull; 29.11.2025 &bull; Luanda
       </footer>
    </div>
  );
};
