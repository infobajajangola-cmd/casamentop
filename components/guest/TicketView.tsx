import React, { useEffect, useState } from 'react';
import { Guest } from '../../types';
import { QrCode, Download, Share2, Sparkles, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';

interface TicketViewProps {
  guest: Guest;
}

export const TicketView: React.FC<TicketViewProps> = ({ guest }) => {
  const [moodIndex, setMoodIndex] = useState(0);

  // Configurações para o efeito "Vivo"
  // Cada estado representa um "clima" diferente das flores (Cor, Posição, Escala)
  const floralMoods = [
    { // Estado 1: Clássico Dourado (Golden Hour)
      filter: 'hue-rotate(0deg) saturate(1.1) brightness(1.05)',
      transformTop: 'translate(-40px, -40px) scale(1) rotate(180deg)',
      transformBottom: 'translate(40px, 40px) scale(1) rotate(0deg)',
    },
    { // Estado 2: Rosé Romântico (Bloom)
      filter: 'hue-rotate(-15deg) saturate(1.2) brightness(1.1) contrast(1.1)',
      transformTop: 'translate(-35px, -45px) scale(1.08) rotate(185deg)',
      transformBottom: 'translate(35px, 45px) scale(1.08) rotate(-5deg)',
    },
    { // Estado 3: Creme Etéreo (Ethereal)
      filter: 'hue-rotate(10deg) saturate(0.9) brightness(1.15)',
      transformTop: 'translate(-45px, -35px) scale(1.05) rotate(175deg)',
      transformBottom: 'translate(45px, 35px) scale(1.05) rotate(5deg)',
    }
  ];

  useEffect(() => {
    // Ciclo de respiração das flores a cada 5 segundos
    const interval = setInterval(() => {
      setMoodIndex((prev) => (prev + 1) % floralMoods.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentMood = floralMoods[moodIndex];

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto animate-bloom group">
        {/* The Ticket */}
        <div className="bg-white relative shadow-2xl overflow-hidden border-4 border-stone-100 print:shadow-none print:border-0 transition-all duration-1000 hover:shadow-gold-500/20">
            
            {/* Efeito de Textura de Papel Premium */}
            <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply pointer-events-none z-0"></div>

            {/* Floral Decoration - Top Left (Living) */}
            <img 
                src="https://img.freepik.com/free-vector/watercolor-flowers-background_52683-69198.jpg?w=1380" 
                className="absolute top-0 left-0 w-48 md:w-64 opacity-90 mix-blend-multiply pointer-events-none transition-all ease-in-out z-0"
                style={{ 
                    transitionDuration: '5000ms',
                    filter: currentMood.filter,
                    transform: currentMood.transformTop
                }}
                alt="Floral decoration top"
            />
             
             {/* Floral Decoration - Bottom Right (Living) */}
             <img 
                src="https://img.freepik.com/free-vector/watercolor-flowers-background_52683-69198.jpg?w=1380" 
                className="absolute bottom-0 right-0 w-48 md:w-64 opacity-90 mix-blend-multiply pointer-events-none transition-all ease-in-out z-0"
                style={{ 
                    transitionDuration: '5000ms',
                    filter: currentMood.filter,
                    transform: currentMood.transformBottom
                }}
                alt="Floral decoration bottom"
            />

            {/* Partículas de Luxo (Sparkles sutis) */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gold-400 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-gold-400 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
                <div className="absolute bottom-10 left-10 w-2 h-2 bg-gold-300 rounded-full blur-[1px] animate-float"></div>
            </div>

            {/* Gold Frame Overlay */}
            <div className="absolute inset-4 border border-gold-400/60 opacity-70 pointer-events-none z-10"></div>
            <div className="absolute inset-6 border border-gold-200/60 opacity-50 pointer-events-none z-10"></div>

            {/* Content */}
            <div className="relative z-20 p-12 flex flex-col items-center text-center space-y-6">
                <div className="mb-2 animate-fade-in-up">
                    <div className="flex justify-center items-center gap-2 text-gold-500 mb-3 opacity-80">
                        <Sparkles size={14} />
                        <span className="text-[8px] uppercase tracking-[0.4em]">Royal Invitation</span>
                        <Sparkles size={14} />
                    </div>
                    <h2 className="font-script text-6xl text-gold-foil mb-2 drop-shadow-sm">Alexandre & Adália</h2>
                    <p className="font-serif text-stone-500 text-xs uppercase tracking-[0.3em]">Celebração de Casamento</p>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-50"></div>

                <div className="space-y-3 py-4">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-bold">Convidado de Honra</p>
                    <h1 className="font-display text-3xl md:text-5xl text-stone-800 capitalize tracking-wide leading-tight">
                        {guest.name}
                    </h1>
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-sm font-serif text-gold-700 italic font-medium">
                            {guest.confirmedCompanions > 0 
                                ? `Acompanhado por ${guest.confirmedCompanions} pessoa(s)` 
                                : 'Entrada Individual'}
                        </p>
                        {guest.companionDetails && (
                            <p className="text-xs font-serif text-stone-400 mt-1 max-w-xs mx-auto border-b border-stone-100 pb-1">
                                {guest.companionDetails}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 text-center border-t border-b border-gold-100 py-8 w-full bg-white/40 backdrop-blur-[2px]">
                    <div>
                        <p className="text-[9px] uppercase font-bold text-stone-400 mb-2 tracking-widest">Data Solene</p>
                        <p className="font-display text-stone-800 text-2xl">29 de Novembro, 2025</p>
                        <p className="font-script text-gold-600 text-2xl mt-1">às 20:00 horas</p>
                    </div>
                    <div className="px-4">
                         <p className="text-[9px] uppercase font-bold text-stone-400 mb-2 tracking-widest">Localização</p>
                         <a 
                            href="https://maps.app.goo.gl/P3VZeRVYJgsRbPyB9" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group/map block hover:opacity-80 transition-opacity"
                         >
                             <p className="font-display text-stone-900 text-lg tracking-wide flex items-center justify-center gap-2 group-hover/map:text-gold-600 transition-colors">
                                Ulengo Center
                                <MapPin size={14} className="text-gold-500 opacity-0 -ml-4 group-hover/map:opacity-100 group-hover/map:ml-0 transition-all duration-300" />
                             </p>
                             <p className="font-serif text-stone-500 text-sm italic">Ao lado do 11 de Novembro, Luanda</p>
                             <p className="text-[10px] text-gold-500 mt-1 opacity-0 transform translate-y-2 group-hover/map:opacity-100 group-hover/map:translate-y-0 transition-all duration-300 font-bold tracking-widest uppercase">
                                Ver no Mapa
                             </p>
                         </a>
                    </div>
                </div>

                <div className="pt-6 flex flex-col items-center gap-4">
                    <div className="p-3 bg-white border border-gold-200 shadow-lg rotate-45 transition-transform duration-700 hover:rotate-0">
                         <div className="-rotate-45 hover:rotate-0 transition-transform duration-700">
                            <QrCode size={100} className="text-stone-900" />
                         </div>
                    </div>
                    <div>
                        <p className="text-[9px] font-mono text-gold-400 tracking-widest mb-1">{guest.qrCodeHash.toUpperCase()}</p>
                        <p className="text-xs font-serif text-stone-500 italic">Apresente este código na recepção</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 no-print opacity-0 animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            <Button onClick={handleDownload} variant="outline" className="bg-white/5 text-white border-white/20 hover:bg-white/10 backdrop-blur-sm hover:border-gold-400 hover:text-gold-200">
                <Download size={16} className="mr-2" /> Salvar PDF
            </Button>
             <Button variant="primary" className="shadow-gold-500/20">
                <Share2 size={16} className="mr-2" /> Compartilhar
            </Button>
        </div>
    </div>
  );
};