import React, { useState, useEffect } from 'react';
import { Guest, GuestRSVP, RSVPStatus } from '../../types';
import { checkInGuest, getGuests, getGuestRSVP, getMainEvent } from '../../services/storageService';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Search, QrCode, CheckCircle, XCircle, RefreshCw, Clock } from 'lucide-react';

export const CheckInTerminal: React.FC = () => {
    const [searchCode, setSearchCode] = useState('');
    const [foundGuest, setFoundGuest] = useState<Guest | null>(null);
    const [guestRSVP, setGuestRSVP] = useState<GuestRSVP | null>(null);
    const [checkInStatus, setCheckInStatus] = useState<'idle' | 'success' | 'error' | 'already_checked'>('idle');
    const [isLoading, setIsLoading] = useState(false);
    const [eventId, setEventId] = useState<string | null>(null);

    useEffect(() => {
        const loadEvent = async () => {
            const event = await getMainEvent();
            if (event) {
                setEventId(event.id);
            }
        };
        loadEvent();
    }, []);

    const handleSearch = async () => {
        setIsLoading(true);
        setCheckInStatus('idle');
        setFoundGuest(null);
        setGuestRSVP(null);

        try {
            const allGuests = await getGuests();

            // Find by Name (Includes) - removido a busca por QR Code que não existe mais
            const guest = allGuests.find(g =>
                g.name.toLowerCase() === searchCode.toLowerCase() // Simple name search
            );

            if (guest) {
                setFoundGuest(guest);

                // Carregar RSVP do convidado
                const rsvp = await getGuestRSVP(guest.id);
                setGuestRSVP(rsvp);

                // Auto validation logic
                if (guest.checkedInAt) {
                    setCheckInStatus('already_checked');
                } else if (!rsvp || rsvp.status !== RSVPStatus.CONFIRMED) {
                    setCheckInStatus('error'); // Not on the confirmed list
                } else {
                    // Ready to check in
                }
            } else {
                setCheckInStatus('error');
            }
        } catch (e) {
            console.error(e);
            setCheckInStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    const performCheckIn = async () => {
        if (!foundGuest || !guestRSVP) return;

        if (!eventId) {
            alert("Erro: Evento não identificado no sistema.");
            return;
        }

        setIsLoading(true);
        // Corrected argument order: guestId, eventId, adults, children
        const success = await checkInGuest(foundGuest.id, eventId, guestRSVP.adults, guestRSVP.children);
        if (success) {
            setCheckInStatus('success');
            setFoundGuest({ ...foundGuest, checkedInAt: new Date().toISOString() });
        } else {
            alert("Erro ao realizar check-in");
        }
        setIsLoading(false);
    };

    const reset = () => {
        setSearchCode('');
        setFoundGuest(null);
        setGuestRSVP(null);
        setCheckInStatus('idle');
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header Terminal Style */}
            <div className="bg-stone-900 text-stone-400 p-6 rounded-t-md flex justify-between items-center font-mono text-sm border-b border-stone-800">
                <div className="flex items-center gap-2 text-gold-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    SYSTEM ONLINE
                </div>
                <div>TERMINAL #01 • ACCESS CONTROL</div>
            </div>

            <div className="bg-white p-8 shadow-lg rounded-b-md border border-t-0 border-stone-200 min-h-[400px] flex flex-col">

                {/* Search Area */}
                <div className="flex gap-4 mb-8">
                    <div className="flex-1 relative">
                        <QrCode className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <Input
                            placeholder="Escanear QR Code ou Digitar Nome..."
                            className="pl-10 font-mono text-lg"
                            value={searchCode}
                            onChange={e => setSearchCode(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSearch()}
                            autoFocus
                        />
                    </div>
                    <Button onClick={handleSearch} disabled={!searchCode} isLoading={isLoading}>
                        <Search size={18} className="mr-2" /> VERIFICAR
                    </Button>
                </div>

                {/* Results Display */}
                <div className="flex-1 flex items-center justify-center bg-stone-50 rounded border border-stone-100 p-8">
                    {!foundGuest && checkInStatus !== 'error' && (
                        <div className="text-center text-stone-400 opacity-50">
                            <QrCode size={64} className="mx-auto mb-4" />
                            <p className="font-mono uppercase tracking-widest">Aguardando Entrada...</p>
                        </div>
                    )}

                    {checkInStatus === 'error' && !foundGuest && (
                        <div className="text-center animate-scale-in">
                            <XCircle size={80} className="text-red-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-stone-800">Não Encontrado</h2>
                            <p className="text-stone-500 mt-2">Código ou nome inválido.</p>
                            <Button variant="outline" onClick={reset} className="mt-6">Tentar Novamente</Button>
                        </div>
                    )}

                    {foundGuest && (
                        <div className="w-full max-w-lg animate-fade-in-up">
                            <div className={`
                            border-l-8 pl-6 py-2 mb-6
                            ${checkInStatus === 'success' ? 'border-green-500' : ''}
                            ${checkInStatus === 'already_checked' ? 'border-yellow-500' : ''}
                            ${checkInStatus === 'idle' || checkInStatus === 'error' ? (guestRSVP?.status === RSVPStatus.CONFIRMED ? 'border-blue-500' : 'border-red-500') : ''}
                        `}>
                                <h1 className="text-4xl font-display text-stone-900">{foundGuest.name}</h1>
                                <p className="text-stone-500 uppercase tracking-widest text-xs mt-1 font-bold">{foundGuest.category}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="bg-white p-4 rounded shadow-sm">
                                    <span className="block text-[10px] uppercase text-stone-400 font-bold">Acompanhantes</span>
                                    <span className="text-2xl font-mono text-stone-800">
                                        {guestRSVP?.status === RSVPStatus.CONFIRMED ? (guestRSVP.adults + guestRSVP.children) : 0} / {foundGuest.maxAdults + foundGuest.maxChildren}
                                    </span>
                                </div>
                                <div className="bg-white p-4 rounded shadow-sm">
                                    <span className="block text-[10px] uppercase text-stone-400 font-bold">Status RSVP</span>
                                    <span className={`text-lg font-bold ${guestRSVP?.status === RSVPStatus.CONFIRMED ? 'text-green-600' : 'text-red-500'}`}>
                                        {guestRSVP?.status || 'PENDENTE'}
                                    </span>
                                </div>
                            </div>

                            {/* Status Logic UI */}
                            {checkInStatus === 'success' && (
                                <div className="bg-green-100 border border-green-200 text-green-800 p-4 rounded flex items-center gap-3">
                                    <CheckCircle size={24} />
                                    <div>
                                        <strong className="block">Entrada Registrada</strong>
                                        <span className="text-xs opacity-80">Bem-vindo ao evento.</span>
                                    </div>
                                </div>
                            )}

                            {checkInStatus === 'already_checked' && (
                                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded flex items-center gap-3 mb-4">
                                    <Clock size={24} />
                                    <div>
                                        <strong className="block">Já Utilizado</strong>
                                        <span className="text-xs">Check-in realizado em: {new Date(foundGuest.checkedInAt!).toLocaleTimeString()}</span>
                                    </div>
                                </div>
                            )}

                            {checkInStatus === 'error' && foundGuest && (
                                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded flex items-center gap-3 mb-4">
                                    <XCircle size={24} />
                                    <div>
                                        <strong className="block">Entrada Negada</strong>
                                        <span className="text-xs">Este convite não está confirmado ou foi cancelado.</span>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-4 mt-8">
                                <Button variant="outline" onClick={reset} className="flex-1">
                                    <RefreshCw size={16} className="mr-2" /> Nova Busca
                                </Button>

                                {checkInStatus === 'idle' && guestRSVP?.status === RSVPStatus.CONFIRMED && !foundGuest.checkedInAt && (
                                    <Button onClick={performCheckIn} className="flex-[2] bg-green-600 hover:bg-green-700 text-white border-transparent shadow-green-200" isLoading={isLoading}>
                                        <CheckCircle size={18} className="mr-2" /> CONFIRMAR ENTRADA
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};