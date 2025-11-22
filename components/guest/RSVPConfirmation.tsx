
import React, { useState } from 'react';
import { Guest, RSVPStatus } from '../../types';
import { saveGuestRSVP } from '../../services/storageService';
import { Heart, X, Check, User, Users, Calendar, UserPlus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface RSVPConfirmationProps {
  guest: Guest;
  onConfirmed: (guest: Guest) => void;
  onDenied: () => void;
}

const FORBIDDEN_NAMES = ['alexandre', 'adália', 'adalia'];

const validateCompanionName = (name: string): boolean => {
  const normalizedName = name.trim().toLowerCase();
  if (FORBIDDEN_NAMES.includes(normalizedName)) {
    return false;
  }
  return name.trim().length > 0;
};

export const RSVPConfirmation: React.FC<RSVPConfirmationProps> = ({
  guest,
  onConfirmed,
  onDenied
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attending, setAttending] = useState<boolean | null>(null);
  const maxCompanions = Math.max(guest.maxAdults + guest.maxChildren - 1, 1); // Sempre permitir pelo menos 1 acompanhante
  const [companionNames, setCompanionNames] = useState<string[]>([]);
  const [existingRsvpId, setExistingRsvpId] = useState<string | undefined>(undefined);

  React.useEffect(() => {
    const loadRSVP = async () => {
      try {
        const { getGuestRSVP } = await import('../../services/storageService');
        const rsvp = await getGuestRSVP(guest.id);
        if (rsvp) {
          setExistingRsvpId(rsvp.id);
          if (rsvp.companionNames && rsvp.companionNames.length > 0) {
            setCompanionNames(rsvp.companionNames);
          }
        }
      } catch (err) {
        console.error("Error checking existing RSVP", err);
      }
    };
    loadRSVP();
  }, [guest.id]);

  const handleAddCompanion = () => {
    if (companionNames.length < maxCompanions) {
      setCompanionNames([...companionNames, '']);
    }
  };

  const handleRemoveCompanion = (index: number) => {
    setCompanionNames(companionNames.filter((_, i) => i !== index));
  };

  const handleCompanionNameChange = (index: number, value: string) => {
    const newNames = [...companionNames];
    newNames[index] = value;
    setCompanionNames(newNames);
  };

  const handleSubmit = async () => {
    if (attending === null) return;

    // Validar nomes de acompanhantes
    if (attending) {
      const filledNames = companionNames.filter(name => name.trim().length > 0);
      for (const name of filledNames) {
        if (!validateCompanionName(name)) {
          alert(`O nome "${name}" não é permitido. Os nomes dos noivos não podem ser adicionados como acompanhantes.`);
          return;
        }
      }
    }

    setIsSubmitting(true);
    try {
      const filledCompanionNames = companionNames.filter(name => name.trim().length > 0);
      const rsvpPayload = {
        id: existingRsvpId || crypto.randomUUID(),
        guestId: guest.id,
        status: attending ? RSVPStatus.CONFIRMED : RSVPStatus.DECLINED,
        adults: attending ? 1 + filledCompanionNames.length : 0,
        children: 0,
        companionNames: attending ? filledCompanionNames : [],
        updatedAt: new Date().toISOString(),
        eventId: undefined
      };

      await saveGuestRSVP(rsvpPayload);

      if (attending) {
        onConfirmed(guest);
      } else {
        onDenied();
      }
    } catch (error) {
      console.error('Erro ao atualizar RSVP:', error);
      alert('Erro ao processar sua resposta. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (attending === null) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-amber-100 text-center">

            {/* Header */}
            <div className="mb-6 md:mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-amber-400 to-yellow-500 p-3 md:p-4 rounded-full shadow-lg">
                  <Heart className="text-white" size={24} />
                </div>
              </div>
              <h1 className="font-script text-3xl md:text-5xl text-amber-800 mb-3 md:mb-4">
                Olá, {guest.name}!
              </h1>
              <p className="text-amber-700 font-serif text-base md:text-lg">
                Você foi convidado(a) para o nosso casamento
              </p>
            </div>

            {/* Guest Details */}
            <div className="bg-amber-50 rounded-xl p-4 md:p-6 mb-6 md:mb-8 border border-amber-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <User className="text-amber-600 mb-2" size={20} />
                  <p className="text-amber-800 font-semibold text-sm md:text-base">{guest.name}</p>
                  <p className="text-amber-600 text-xs md:text-sm">{guest.category || 'Convidado'}</p>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="text-amber-600 mb-2" size={20} />
                  <p className="text-amber-800 font-semibold text-sm md:text-base">{guest.maxAdults + guest.maxChildren}</p>
                  <p className="text-amber-600 text-xs md:text-sm">Pessoa(s) no convite</p>
                </div>
                <div className="flex flex-col items-center">
                  <Calendar className="text-amber-600 mb-2" size={20} />
                  <p className="text-amber-800 font-semibold text-sm md:text-base">29 Nov</p>
                  <p className="text-amber-600 text-xs md:text-sm">2025</p>
                </div>
              </div>
            </div>

            {/* RSVP Question */}
            <div className="mb-6 md:mb-8">
              <h2 className="font-display text-xl md:text-2xl text-amber-800 mb-4 md:mb-6">
                Você poderá comparecer?
              </h2>

              <div className="flex flex-col gap-4 justify-center sm:flex-row">
                <button
                  onClick={() => setAttending(true)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
                >
                  <Check size={18} className="md:w-6 md:h-6" />
                  Sim, vou comparecer!
                </button>

                <button
                  onClick={() => setAttending(false)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
                >
                  <X size={18} className="md:w-6 md:h-6" />
                  Não poderei ir
                </button>
              </div>
            </div>

            {/* Message for Declined */}
            {attending === false && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                <p className="text-red-700 font-serif text-center text-sm md:text-base">
                  Sentiremos sua falta! Agradecemos muito pelo carinho e desejamos toda felicidade do mundo. 💕
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Attending Details with Companion Names
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-amber-100">

          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-green-400 to-green-500 p-3 md:p-4 rounded-full shadow-lg">
                <Check className="text-white" size={24} />
              </div>
            </div>
            <h1 className="font-script text-3xl md:text-5xl text-amber-800 mb-3 md:mb-4">
              Que alegria!
            </h1>
            <p className="text-amber-700 font-serif text-base md:text-lg">
              Confirme quantas pessoas comparecerão
            </p>
          </div>

          {/* Attendance Info */}
          <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
            <div className="bg-green-50 rounded-xl p-4 md:p-6 border border-green-200">
              <h3 className="font-display text-lg md:text-xl text-green-800 mb-3 md:mb-4 flex items-center gap-2">
                <Users size={20} />
                Convite pessoal
              </h3>

              <div className="flex items-center justify-between mb-3">
                <div className="text-green-800 font-medium text-sm md:text-base">Quantidade permitida</div>
                <div className="text-green-900 font-bold text-sm md:text-base">{guest.maxAdults + guest.maxChildren} pessoa(s)</div>
              </div>

              <p className="text-green-600 text-xs md:text-sm mt-2">
                Total confirmado: {1 + companionNames.filter(n => n.trim()).length} de {guest.maxAdults + guest.maxChildren} pessoa(s)
              </p>
            </div>

            {/* Companion Names Section */}
            {maxCompanions > 0 && (
              <div className="bg-amber-50 rounded-xl p-4 md:p-6 border border-amber-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg md:text-xl text-amber-800 flex items-center gap-2">
                    <UserPlus size={20} />
                    Acompanhantes
                  </h3>
                  {companionNames.length < maxCompanions && (
                    <Button
                      onClick={handleAddCompanion}
                      variant="outline"
                      size="sm"
                      className="text-xs md:text-sm"
                    >
                      <UserPlus size={14} className="mr-1" />
                      Adicionar
                    </Button>
                  )}
                </div>

                {companionNames.length === 0 ? (
                  <p className="text-amber-600 text-xs md:text-sm italic">
                    Você pode adicionar até {maxCompanions} acompanhante(s)
                  </p>
                ) : (
                  <div className="space-y-3">
                    {companionNames.map((name, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Input
                          label={`Acompanhante ${index + 1}`}
                          value={name}
                          onChange={(e) => handleCompanionNameChange(index, e.target.value)}
                          placeholder="Nome completo"
                          className="flex-1"
                        />
                        <button
                          onClick={() => handleRemoveCompanion(index)}
                          className="mt-6 text-red-500 hover:text-red-700 p-2"
                          title="Remover"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-amber-600 text-xs mt-3">
                  ⚠️ Os nomes dos noivos não podem ser adicionados como acompanhantes
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Confirmando...
              </div>
            ) : (
              'Confirmar Presença'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
