import React, { useState, useEffect } from 'react';
import { Guest, RSVPStatus } from '../../types';
import { getGuestRSVP } from '../../services/storageService';
import { SearchScreen } from './SearchScreen';
import { PremiumInvitation } from './PremiumInvitation';
import { RSVPConfirmation } from './RSVPConfirmation';
import { DeclinedScreen } from './DeclinedScreen';
import { Settings } from 'lucide-react';

export const GuestLayout: React.FC = () => {
  const [activeGuest, setActiveGuest] = useState<Guest | null>(null);
  const [showAdminButton, setShowAdminButton] = useState(true);
  const [showRSVP, setShowRSVP] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [showDeclined, setShowDeclined] = useState(false);

  useEffect(() => {
    // Verificar se está em modo admin para esconder botão
    const checkAdminMode = () => {
      const hash = window.location.hash;
      setShowAdminButton(hash !== '#panel');
    };

    checkAdminMode();
    window.addEventListener('hashchange', checkAdminMode);
    return () => window.removeEventListener('hashchange', checkAdminMode);
  }, []);

  const handleAdminClick = () => {
    window.location.hash = 'admin';
  };

  const handleGuestFound = async (guest: Guest) => {
    setActiveGuest(guest);

    // Verificar se o convidado já tem RSVP confirmado
    try {
      const existingRSVP = await getGuestRSVP(guest.id);

      if (existingRSVP && existingRSVP.status === RSVPStatus.CONFIRMED) {
        // Já confirmou - vai direto para o convite
        setShowRSVP(false);
        setShowInvitation(true);
      } else {
        // Ainda não confirmou - mostra tela de confirmação
        setShowRSVP(true);
      }
    } catch (error) {
      console.error('Erro ao verificar RSVP:', error);
      // Em caso de erro, mostra tela de confirmação
      setShowRSVP(true);
    }
  };

  const handleRSVPConfirmed = (guest: Guest) => {
    setActiveGuest(guest);
    setShowRSVP(false);
    setShowInvitation(true);
  };

  const handleRSVPDenied = () => {
    // Mostrar tela de agradecimento após recusar
    setShowRSVP(false);
    setShowInvitation(false);
    setShowDeclined(true);
  };

  const handleBackToSearch = () => {
    setActiveGuest(null);
    setShowRSVP(false);
    setShowInvitation(false);
    setShowDeclined(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Floral Decorations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Top Left - Pink Corner */}
        <img
          src="/images/decor/flower-corner-pink.png"
          alt=""
          className="absolute top-0 left-0 w-24 md:w-48 lg:w-64 opacity-80 md:opacity-90"
        />

        {/* Top Right - Pink Corner (Flipped) */}
        <img
          src="/images/decor/flower-corner-pink.png"
          alt=""
          className="absolute top-0 right-0 w-24 md:w-48 lg:w-64 opacity-80 md:opacity-90 transform scale-x-[-1]"
        />

        {/* Bottom Left - White Corner */}
        <img
          src="/images/decor/flower-corner-white.png"
          alt=""
          className="absolute bottom-0 left-0 w-28 md:w-56 lg:w-72 opacity-70 md:opacity-80"
        />

        {/* Bottom Right - White Corner (Flipped) */}
        <img
          src="/images/decor/flower-corner-white.png"
          alt=""
          className="absolute bottom-0 right-0 w-28 md:w-56 lg:w-72 opacity-70 md:opacity-80 transform scale-x-[-1]"
        />
      </div>

      {/* Botão Admin discreto no topo */}
      {showAdminButton && (
        <div className="fixed top-2 right-2 z-50">
          <button
            onClick={handleAdminClick}
            className="bg-white/90 hover:bg-white backdrop-blur-sm text-gray-600 hover:text-gray-800 p-2 rounded-full shadow-md transition-all duration-200 hover:shadow-lg group border border-gray-200/50"
            title="Painel Administrativo - Gerencie convidados, visualize estatísticas e controle o check-in do evento."
          >
            <Settings size={16} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      )}

      {/* Main Content - z-10 to sit above flowers */}
      <div className="relative z-10">
        {/* Fluxo de RSVP - Confirmação de presença */}
        {showRSVP && activeGuest && (
          <RSVPConfirmation
            guest={activeGuest}
            onConfirmed={handleRSVPConfirmed}
            onDenied={handleRSVPDenied}
          />
        )}

        {/* Convite Online Premium */}
        {showInvitation && activeGuest && (
          <PremiumInvitation
            guest={activeGuest}
            onBack={handleBackToSearch}
          />
        )}

        {/* Tela de Agradecimento - Convite Recusado */}
        {showDeclined && (
          <DeclinedScreen onBackToSearch={handleBackToSearch} />
        )}

        {/* Tela de Busca Inicial */}
        {!showRSVP && !showInvitation && !showDeclined && (
          <SearchScreen onGuestFound={handleGuestFound} />
        )}
      </div>
    </div>
  );
};