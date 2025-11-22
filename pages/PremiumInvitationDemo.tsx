import React, { useState } from 'react';
import { PremiumInvitation } from '../components/guest/PremiumInvitation';
import { Guest, GuestCategory } from '../types';

// Mock guest data for demonstration
const mockGuest: Guest = {
  id: 'demo-guest-123',
  name: 'João Silva Santos',
  category: GuestCategory.FRIEND,
  maxAdults: 2,
  maxChildren: 1,
  createdAt: new Date().toISOString()
};

export const PremiumInvitationDemo: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {!showDemo ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <div className="text-center mb-12">
            <h1 className="font-script text-6xl text-amber-800 mb-4">Convite Premium</h1>
            <p className="text-amber-700 font-serif text-xl mb-8">
              Demonstração do convite de casamento completo
            </p>
            <p className="text-amber-600 max-w-2xl">
              Esta página demonstra como os convidados verão o convite completo com todas as informações, 
              incluindo confirmação de presença, localização, QR code e detalhes do evento.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
            <h2 className="font-display text-2xl text-amber-800 mb-4">Demonstração</h2>
            <p className="text-amber-700 mb-6">
              Clique no botão abaixo para ver como um convidado verá o convite premium:
            </p>
            <button
              onClick={() => setShowDemo(true)}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 px-6 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Ver Convite Premium
            </button>
          </div>
        </div>
      ) : (
        <PremiumInvitation 
          guest={mockGuest} 
          onBack={() => setShowDemo(false)}
        />
      )}
    </div>
  );
};