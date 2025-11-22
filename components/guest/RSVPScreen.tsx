import React, { useState, useEffect } from 'react';
import { Guest, RSVPStatus, GuestRSVP } from '../../types';
import { saveGuestRSVP, getGuestRSVP } from '../../services/storageService';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Check, X, Minus, Plus, ArrowLeft, Heart } from 'lucide-react';
import { TicketView } from './TicketView';

interface RSVPScreenProps {
  guest: Guest;
  onBack: () => void;
}

export const RSVPScreen: React.FC<RSVPScreenProps> = ({ guest, onBack }) => {
  const [currentGuest] = useState<Guest>(guest);
  const [guestRSVP, setGuestRSVP] = useState<GuestRSVP | null>(null);
  const [companions, setCompanions] = useState<number>(1); // Default: apenas o convidado
  const [children, setChildren] = useState<number>(0);
  const [companionNames, setCompanionNames] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  
  // UI States
  const [step, setStep] = useState<'rsvp' | 'details' | 'thank_you' | 'ticket'>('rsvp');
  const [rsvpStatus, setRsvpStatus] = useState<RSVPStatus>(RSVPStatus.PENDING);

  // Carregar RSVP existente e definir estado inicial
  useEffect(() => {
    const loadRSVP = async () => {
      const existingRSVP = await getGuestRSVP(guest.id);
      if (existingRSVP) {
        setGuestRSVP(existingRSVP);
        setRsvpStatus(existingRSVP.status);
        setCompanions(existingRSVP.adults);
        setChildren(existingRSVP.children);
        if (existingRSVP.status === RSVPStatus.CONFIRMED) {
          setStep('ticket');
        }
      }
    };
    loadRSVP();
  }, [guest.id]);


  const handleStatusChange = (status: RSVPStatus) => {
    setRsvpStatus(status);
  };

  const handleNext = () => {
      if (rsvpStatus === RSVPStatus.CONFIRMED) {
          setStep('details');
      } else {
          // Declined
          handleSave(RSVPStatus.DECLINED);
      }
  };

  const handleSave = async (finalStatus: RSVPStatus) => {
    setIsSaving(true);
    
    try {
        const rsvpData: GuestRSVP = {
            id: guestRSVP?.id || crypto.randomUUID(),
            guestId: guest.id,
            status: finalStatus,
            adults: finalStatus === RSVPStatus.CONFIRMED ? companions : 0,
            children: finalStatus === RSVPStatus.CONFIRMED ? children : 0,
            updatedAt: new Date().toISOString(),
            eventId: undefined // Pode ser preenchido se houver evento principal
        };
        
        await saveGuestRSVP(rsvpData);
        setGuestRSVP(rsvpData);
        
        if (finalStatus === RSVPStatus.CONFIRMED) {
            setStep('thank_you');
            // Auto transition to ticket after animation
            setTimeout(() => setStep('ticket'), 3000);
        } else {
            onBack(); 
        }
    } catch (error) {
        alert("Ocorreu um erro ao salvar. Tente novamente.");
    } finally {
        setIsSaving(false);
    }
  };

  // 4. Ticket View
  if (step === 'ticket') {
      return (
          <div className="flex flex-col items-center animate-scale-in w-full max-w-4xl">
             <TicketView guest={currentGuest} />
             <div className="mt-8 flex gap-6 no-print">
                 <button onClick={() => setStep('details')} className="text-xs uppercase tracking-widest text-stone-400 hover:text-gold-600 border-b border-transparent hover:border-gold-600 transition-all pb-1">
                     Alterar Detalhes
                 </button>
                 <button onClick={onBack} className="text-xs uppercase tracking-widest text-stone-400 hover:text-gold-600 border-b border-transparent hover:border-gold-600 transition-all pb-1">
                     Fechar
                 </button>
             </div>
          </div>
      )
  }

  // 3. Thank You Animation
  if (step === 'thank_you') {
      return (
          <div className="flex flex-col items-center justify-center h-[50vh] animate-fade-in-up text-center p-8">
              <div className="mb-6 relative">
                  <Heart className="text-gold-500 w-20 h-20 animate-bounce" fill="currentColor" />
                  <div className="absolute inset-0 bg-gold-400 blur-xl opacity-30 animate-pulse"></div>
              </div>
              <h2 className="font-display text-4xl text-gold-600 mb-2">Obrigado!</h2>
              <p className="font-serif text-xl text-stone-500 italic">
                  Sua presença é o nosso maior presente.<br/>
                  Gerando seu convite...
              </p>
          </div>
      )
  }

  // 2. Details (Companions) View
  if (step === 'details') {
      return (
        <div className="w-full max-w-lg mx-auto relative bg-white p-8 md:p-12 shadow-2xl rounded-sm animate-fade-in border-t-4 border-gold-500">
             <div className="text-center mb-8">
                <h3 className="font-display text-2xl text-stone-900">Confirmação de Acompanhantes</h3>
                <p className="text-stone-500 font-serif italic text-sm mt-2">
                    Você pode levar até {currentGuest.maxCompanions} acompanhante(s).
                </p>
             </div>

             {guest.maxAdults + guest.maxChildren > 1 ? (
                 <div className="space-y-6">
                    <div className="flex items-center justify-center gap-8 py-4 border-b border-stone-200">
                        <button 
                            onClick={() => setCompanions(Math.max(1, companions - 1))}
                            className="w-12 h-12 rounded-full border border-stone-300 flex items-center justify-center text-stone-400 hover:border-stone-900 hover:text-stone-900 transition-colors"
                        >
                            <Minus size={20} />
                        </button>
                        <div className="text-center w-16">
                            <span className="font-display text-4xl text-stone-800 block">{companions}</span>
                            <span className="text-[10px] uppercase text-stone-400 tracking-wider">Adultos</span>
                        </div>
                        <button 
                            onClick={() => setCompanions(Math.min(guest.maxAdults, companions + 1))}
                            className="w-12 h-12 rounded-full border border-stone-300 flex items-center justify-center text-stone-400 hover:border-stone-900 hover:text-stone-900 transition-colors"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                    
                    {guest.maxChildren > 0 && (
                        <div className="flex items-center justify-center gap-8 py-4 border-b border-stone-200">
                            <button 
                                onClick={() => setChildren(Math.max(0, children - 1))}
                                className="w-12 h-12 rounded-full border border-stone-300 flex items-center justify-center text-stone-400 hover:border-stone-900 hover:text-stone-900 transition-colors"
                            >
                                <Minus size={20} />
                            </button>
                            <div className="text-center w-16">
                                <span className="font-display text-4xl text-stone-800 block">{children}</span>
                                <span className="text-[10px] uppercase text-stone-400 tracking-wider">Crianças</span>
                            </div>
                            <button 
                                onClick={() => setChildren(Math.min(guest.maxChildren, children + 1))}
                                className="w-12 h-12 rounded-full border border-stone-300 flex items-center justify-center text-stone-400 hover:border-stone-900 hover:text-stone-900 transition-colors"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                    )}
                    
                    {companions > 0 && (
                        <div className="animate-fade-in space-y-2">
                             <Input 
                                label="Nome dos Acompanhantes" 
                                placeholder="Ex: Maria Silva, João Santos..."
                                value={companionNames}
                                onChange={(e) => setCompanionNames(e.target.value)}
                             />
                             <p className="text-xs text-stone-400 italic pl-1">
                                * Importante para a lista de recepção.
                             </p>
                        </div>
                    )}
                 </div>
             ) : (
                 <div className="text-center py-4 text-stone-500 italic">
                     Este convite é individual e não permite acompanhantes adicionais.
                 </div>
             )}

             <div className="flex gap-3 mt-8">
                 <Button variant="outline" className="flex-1" onClick={() => setStep('rsvp')} disabled={isSaving}>Voltar</Button>
                 <Button className="flex-1" onClick={() => handleSave(RSVPStatus.CONFIRMED)} isLoading={isSaving}>Finalizar</Button>
             </div>
        </div>
      )
  }

  // 1. RSVP Initial Choice
  return (
    <div className="w-full max-w-xl mx-auto relative">
      <button 
        onClick={onBack} 
        className="absolute -top-12 left-0 flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 hover:text-gold-600 transition-colors group"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Voltar
      </button>

      {/* The "Card" */}
      <div className="bg-white relative p-8 md:p-12 shadow-2xl rounded-sm animate-fade-in-up text-center border-t-4 border-gold-500">
        {/* Decorative Elements */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-stone-300"></div>
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-stone-300"></div>
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-stone-300"></div>
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-stone-300"></div>

        <div className="mb-10 space-y-3">
             <h3 className="font-sans text-xs uppercase tracking-[0.3em] text-stone-400">Você foi convidado</h3>
             <h1 className="font-display text-4xl md:text-5xl text-stone-900">{currentGuest.name}</h1>
             <div className="w-16 h-[1px] bg-gold-500 mx-auto my-4"></div>
             <p className="font-serif text-stone-500 italic text-lg">
                Solicitamos a honra de sua presença<br/>no dia 29 de Novembro de 2025<br/>
                <span className="text-sm text-stone-400">
                  Você pode levar até {guest.maxAdults} adulto(s) e {guest.maxChildren} criança(s)
                </span>
             </p>
        </div>

        <div className="space-y-8">
            {/* Selection Grid */}
            <div className="grid grid-cols-2 gap-6">
                <button
                    onClick={() => handleStatusChange(RSVPStatus.CONFIRMED)}
                    className={`
                    relative overflow-hidden p-6 border transition-all duration-500 group
                    ${rsvpStatus === RSVPStatus.CONFIRMED 
                        ? 'border-gold-600 bg-gold-50 text-stone-900' 
                        : 'border-stone-200 text-stone-400 hover:border-gold-300 hover:text-gold-700'}
                    `}
                >
                    <div className="flex flex-col items-center gap-3 relative z-10">
                        <Check className={`w-6 h-6 ${rsvpStatus === RSVPStatus.CONFIRMED ? 'text-gold-600' : 'opacity-50'}`} />
                        <span className="font-display text-sm tracking-wider font-bold">Confirmar</span>
                    </div>
                    {rsvpStatus === RSVPStatus.CONFIRMED && (
                        <div className="absolute inset-0 border-2 border-gold-500 opacity-20 animate-pulse"></div>
                    )}
                </button>

                <button
                    onClick={() => handleStatusChange(RSVPStatus.DECLINED)}
                    className={`
                    p-6 border transition-all duration-500
                    ${rsvpStatus === RSVPStatus.DECLINED
                        ? 'border-stone-800 bg-stone-100 text-stone-900' 
                        : 'border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-600'}
                    `}
                >
                     <div className="flex flex-col items-center gap-3">
                        <X className="w-6 h-6 opacity-50" />
                        <span className="font-display text-sm tracking-wider font-bold">Recusar</span>
                    </div>
                </button>
            </div>

            <Button 
                onClick={handleNext} 
                size="lg" 
                className="w-full"
                variant={rsvpStatus === RSVPStatus.DECLINED ? 'secondary' : 'primary'}
                disabled={rsvpStatus === RSVPStatus.PENDING || isSaving}
                isLoading={isSaving}
            >
                {rsvpStatus === RSVPStatus.DECLINED ? 'Enviar Justificativa' : 'Continuar'}
            </Button>
        </div>
      </div>
    </div>
  );
};