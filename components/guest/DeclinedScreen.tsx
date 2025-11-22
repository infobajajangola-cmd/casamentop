import React from 'react';
import { Heart, Home } from 'lucide-react';
import { Button } from '../ui/Button';

interface DeclinedScreenProps {
  onBackToSearch: () => void;
}

export const DeclinedScreen: React.FC<DeclinedScreenProps> = ({ onBackToSearch }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-amber-100 text-center">

          {/* Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-red-400 to-pink-500 p-3 md:p-4 rounded-full shadow-lg">
                <Heart className="text-white md:w-8 md:h-8" size={24} />
              </div>
            </div>
            <h1 className="font-script text-3xl md:text-5xl text-amber-800 mb-3 md:mb-4">
              Sentiremos sua falta!
            </h1>
            <p className="text-amber-700 font-serif text-base md:text-lg">
              Agradecemos muito pelo carinho e desejamos toda felicidade do mundo
            </p>
          </div>

          {/* Message */}
          <div className="bg-red-50 rounded-xl p-4 md:p-6 mb-6 md:mb-8 border border-red-200">
            <p className="text-red-700 font-serif text-center text-base md:text-lg leading-relaxed">
              Entendemos perfeitamente que nem sempre é possível comparecer.
              Obrigado(a) pelo carinho e por nos avisar com antecedência. 💕
            </p>
            <p className="text-red-600 text-center mt-3 md:mt-4 text-xs md:text-sm">
              Se mudar de ideia, fique à vontade para nos contatar!
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center gap-3 md:gap-4 mb-6 md:mb-8 text-xl md:text-2xl">
            <span>💕</span>
            <span>🌸</span>
            <span>✨</span>
            <span>🌸</span>
            <span>💕</span>
          </div>

          {/* Back Button */}
          <Button
            onClick={onBackToSearch}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto w-full sm:w-auto justify-center"
          >
            <Home size={18} className="md:w-5 md:h-5" />
            Voltar ao Início
          </Button>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-amber-200">
            <p className="text-amber-600 font-serif text-lg italic mb-2">
              "O amor está no ar... e nos nossos corações!"
            </p>
            <p className="text-amber-500 text-sm">Alexandre & Adália</p>
          </div>
        </div>
      </div>
    </div>
  );
};