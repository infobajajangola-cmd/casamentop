import React from 'react';
import { Crown, QrCode, Users, BarChart3 } from 'lucide-react';

interface NavigationDemoProps {
  onNavigate: (page: 'admin' | 'guest') => void;
}

export const NavigationDemo: React.FC<NavigationDemoProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-8">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Crown className="text-amber-600" size={48} />
          </div>
          <h1 className="font-script text-6xl text-amber-800 mb-4">Alexandre & Adália</h1>
          <p className="text-amber-700 font-serif text-xl italic">
            Sistema de Gerenciamento de Casamento
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Admin Dashboard */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex justify-center mb-6">
              <div className="bg-amber-100 p-4 rounded-full">
                <BarChart3 className="text-amber-600" size={32} />
              </div>
            </div>
            <h2 className="font-display text-2xl text-amber-800 mb-4 text-center">Painel Administrativo</h2>
            <p className="text-amber-700 text-center mb-6">
              Gerencie convidados, visualize estatísticas e controle o check-in do evento.
            </p>
            <button
              onClick={() => onNavigate('admin')}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
            >
              Acessar Admin
            </button>
          </div>

          {/* Guest Interface */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <QrCode className="text-green-600" size={32} />
              </div>
            </div>
            <h2 className="font-display text-2xl text-green-800 mb-4 text-center">Área do Convidado</h2>
            <p className="text-green-700 text-center mb-6">
              Confirme sua presença, visualize seu convite premium e acesse informações do evento.
            </p>
            <button
              onClick={() => onNavigate('guest')}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
            >
              Acessar Convidado
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-amber-600 font-serif text-lg italic">
            "Duas almas, um coração, uma jornada eterna de amor"
          </p>
          <p className="text-amber-500 text-sm mt-2">29 de Novembro, 2025 • Ulengo Center, Luanda</p>
        </div>
      </div>
    </div>
  );
};