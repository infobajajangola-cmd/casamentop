import React, { useEffect, useState } from 'react';
import { Guest } from '../../types';
import { QrCode, Download, Share2, Sparkles, MapPin, Navigation } from 'lucide-react';
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

  const openMap = () => {
      window.open('https://maps.app.goo.gl/P3VZeRVYJgsRbPyB9', '_blank');
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto animate-bloom group print:max-w-none print:w-full print:absolute print:top-0 print:left-0 print:m-0">
        {/* The Ticket */}
        <div 
            className="bg-[#FDFBF7] relative shadow-2xl overflow-hidden border-4 border-stone-100 print:shadow-none print:border-0 transition-all duration-1000 hover:shadow-gold-500/20 print:w-full print:h-auto print:block break-inside-avoid"
            style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
        >
            
            {/* BACKGROUND TEXTURE LAYER - Using IMG tag for reliable printing */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Texture Image - Ensures "bg-paper" feel prints correctly */}
                <img 
                    src="https://www.transparenttextures.com/patterns/cream-paper.png" 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply print:opacity-30"
                />
            </div>

            {/* FLORAL LAYERS - Living Animation */}
            {/* Top Left Flower */}
            <img 
                src="https://img.freepik.com/free-vector/watercolor-flowers-background_52683-69198.jpg?w=1380" 
                className="absolute top-0 left-0 w-48 md:w-64 opacity-90 mix-blend-multiply pointer-events-none transition-all ease-in-out z-10 print:opacity-100 print:mix-blend-normal"
                style={{ 
                    transitionDuration: '5000ms',
                    filter: currentMood.filter,
                    transform: currentMood.transformTop
                }}
                alt="Floral decoration top"
            />
             
             {/* Bottom Right Flower */}
             <img 
                src="https://img.freepik.com/free-vector/watercolor-flowers-background_52683-69198.jpg?w=1380" 
                className="absolute bottom-0 right-0 w-48 md:w-64 opacity-90 mix-blend-multiply pointer-events-none transition-all ease-in-out z-10 print:opacity-100 print:mix-blend-normal"
                style={{ 
                    transitionDuration: '5000ms',
                    filter: currentMood.filter,
                    transform: currentMood.transformBottom
                }}
                alt="Floral decoration bottom"
            />

            {/* Partículas de Luxo (Sparkles sutis) - Hidden on Print to clean up artifacting */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-30 mix-blend-screen overflow-hidden print:hidden">
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gold-400 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-gold-400 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
                <div className="absolute bottom-10 left-10 w-2 h-2 bg-gold-300 rounded-full blur-[1px] animate-float"></div>
            </div>

            {/* Gold Frame Overlay */}
            <div className="absolute inset-4 border border-gold-400/60 opacity-70 pointer-events-none z-20 print:border-gold-500 print:opacity-100"></div>
            <div className="absolute inset-6 border border-gold-200/60 opacity-50 pointer-events-none z-20 print:border-gold-300"></div>

            {/* Content - High Z-Index to sit above flowers */}
            <div className="relative z-30 pt-12 pb-8 px-8 flex flex-col items-center text-center space-y-6 print:pt-16 print:pb-12">
                <div className="mb-2 animate-fade-in-up print:animate-none">
                    <div className="flex justify-center items-center gap-2 text-gold-500 mb-3 opacity-80 print:text-gold-600">
                        <Sparkles size={14} className="print:hidden" />
                        <span className="text-[8px] uppercase tracking-[0.4em] font-bold">Royal Invitation</span>
                        <Sparkles size={14} className="print:hidden" />
                    </div>
                    <h2 className="font-script text-6xl text-gold-foil mb-2 drop-shadow-sm print:text-gold-600 print:drop-shadow-none">Alexandre & Adália</h2>
                    <p className="font-serif text-stone-500 text-xs uppercase tracking-[0.3em]">Celebração de Casamento</p>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-50 print:bg-gold-400 print:opacity-100"></div>

                <div className="space-y-3 py-2">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-bold">Convidado de Honra</p>
                    <h1 className="font-display text-3xl md:text-5xl text-stone-900 capitalize tracking-wide leading-tight">
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

                <div className="grid grid-cols-1 gap-4 text-center w-full">
                    <div className="bg-white/40 backdrop-blur-[2px] border-t border-b border-gold-100 py-4 print:bg-transparent print:border-gold-300">
                        <p className="text-[9px] uppercase font-bold text-stone-400 mb-2 tracking-widest">Data Solene</p>
                        <p className="font-display text-stone-800 text-2xl">29 de Novembro, 2025</p>
                        <p className="font-script text-gold-600 text-2xl mt-1">às 20:00 horas</p>
                    </div>
                    
                    {/* Interactive Map Section - Hidden on Print */}
                    <div className="w-full relative group/map overflow-hidden rounded-sm border border-gold-200 shadow-inner bg-stone-100 no-print">
                        <p className="text-[9px] uppercase font-bold text-stone-500 tracking-widest bg-white py-2 border-b border-gold-100 flex items-center justify-center gap-2">
                            <MapPin size={10} className="text-gold-500"/> Ulengo Center
                        </p>
                        <div className="relative h-48 w-full">
                             <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.626136846526!2d13.2890545!3d-8.9474707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a521d8a9c8395df%3A0x975d28693241ed25!2sUlengo%20Center!5e0!3m2!1sen!2sao!4v1709223600000!5m2!1sen!2sao"
                                width="100%" 
                                height="100%" 
                                style={{ border: 0, filter: 'grayscale(0.3) sepia(0.2)' }} 
                                allowFullScreen 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className="opacity-80 group-hover/map:opacity-100 transition-opacity duration-500"
                             ></iframe>
                             
                             {/* Overlay Button */}
                             <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                                 <Button 
                                    variant="primary" 
                                    size="sm" 
                                    onClick={openMap}
                                    className="shadow-lg scale-90 hover:scale-100 transition-transform text-[10px]"
                                 >
                                     <Navigation size={12} className="mr-2" /> Traçar Rota
                                 </Button>
                             </div>
                        </div>
                    </div>
                    
                    {/* Print Only Location Block */}
                    <div className="hidden print-only py-4 border-t border-b border-gold-100 print:block">
                         <p className="text-[9px] uppercase font-bold text-stone-400 mb-2 tracking-widest">Local</p>
                         <p className="font-display text-stone-800 text-lg">Ulengo Center</p>
                         <p className="font-serif text-stone-500 text-xs italic">Ao lado do 11 de Novembro, Luanda</p>
                    </div>
                </div>

                <div className="pt-2 flex flex-col items-center gap-4 break-inside-avoid">
                    <div className="p-3 bg-white border border-gold-200 shadow-lg rotate-45 transition-transform duration-700 hover:rotate-0 print:shadow-none print:rotate-0 print:border-gold-400">
                         <div className="-rotate-45 hover:rotate-0 transition-transform duration-700 print:rotate-0">
                            <QrCode size={80} className="text-stone-900" />
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
            <Button onClick={handleDownload} variant="outline" className="bg-white/5 text-stone-500 border-stone-200 hover:bg-white/10 backdrop-blur-sm hover:border-gold-400 hover:text-gold-600">
                <Download size={16} className="mr-2" /> Salvar PDF
            </Button>
             <Button variant="primary" className="shadow-gold-500/20">
                <Share2 size={16} className="mr-2" /> Compartilhar
            </Button>
        </div>
    </div>
  );
};