import React, { useEffect, useState } from 'react';
import { Guest, GuestRSVP, RSVPStatus } from '../../types';
import { QrCode, Download, Share2, Sparkles, MapPin, Navigation, Calendar, Clock, Users, Crown, Heart, Flower, Star, Check, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { getGuestRSVP } from '../../services/storageService';

interface PremiumInvitationProps {
  guest: Guest;
  onBack?: () => void;
}

export const PremiumInvitation: React.FC<PremiumInvitationProps> = ({ guest, onBack }) => {
  const [rsvp, setRsvp] = useState<GuestRSVP | null>(null);
  const [qrCodeHash, setQrCodeHash] = useState<string>('');
  const [moodIndex, setMoodIndex] = useState(0);

  useEffect(() => {
    const loadRSVP = async () => {
      const guestRSVP = await getGuestRSVP(guest.id);
      setRsvp(guestRSVP);
    };
    loadRSVP();

    const generateQRCode = () => {
      const timestamp = Date.now().toString(36);
      const guestId = guest.id.substring(0, 8);
      return `${guestId.toUpperCase()}-${timestamp.toUpperCase()}`;
    };
    setQrCodeHash(generateQRCode());
  }, [guest.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMoodIndex((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Convite de Casamento - Alexandre & Adália`,
          text: `Você foi convidado para o casamento de Alexandre & Adália!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  const openMap = () => {
    window.open('https://maps.app.goo.gl/P3VZeRVYJgsRbPyB9', '_blank');
  };

  const getStatusColor = () => {
    if (!rsvp) return 'text-yellow-600 bg-yellow-50';
    switch (rsvp.status) {
      case RSVPStatus.CONFIRMED:
        return 'text-green-600 bg-green-50';
      case RSVPStatus.DECLINED:
        return 'text-red-600 bg-red-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  const getStatusText = () => {
    if (!rsvp) return 'Pendente';
    switch (rsvp.status) {
      case RSVPStatus.CONFIRMED:
        return 'Confirmado';
      case RSVPStatus.DECLINED:
        return 'Recusado';
      default:
        return 'Pendente';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 print:bg-white">
      {/* Header - Não imprime */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Crown className="text-amber-600" size={24} />
            <div>
              <h1 className="font-script text-xl text-amber-800">Convite Premium</h1>
              <p className="text-xs text-amber-600">Alexandre & Adália</p>
            </div>
          </div>
          <div className="flex gap-2">
            {onBack && (
              <Button variant="outline" size="sm" onClick={onBack}>
                Voltar
              </Button>
            )}
            <Button onClick={handleDownload} variant="outline" size="sm">
              <Download size={16} />
            </Button>
            <Button onClick={handleShare} variant="primary" size="sm">
              <Share2 size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 print:max-w-none print:p-0">
        {/* Capa do Convite - Fundo de imagem marfim com moldura dourada */}
        <div
          className="rounded-2xl shadow-2xl overflow-hidden mb-8 print:shadow-none print:rounded-none print:border-4 print:border-double print:border-amber-300 print:min-h-screen print-premium relative"
          style={{
            backgroundImage: `url('/assets/invitation-bg-1.png'), linear-gradient(135deg, #fef7f0 0%, #fff8e1 50%, #fff3e0 100%)`,
            backgroundSize: 'cover, cover',
            backgroundPosition: 'center, center'
          }}
        >

          {/* Textura de Papel Marfim */}
          <div className="absolute inset-0 opacity-30 print:opacity-20" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(139, 69, 19, 0.03) 10px, rgba(139, 69, 19, 0.03) 20px)`,
            backgroundSize: '20px 20px'
          }}></div>

          {/* Moldura Dourada Decorativa */}
          <div className="absolute inset-4 border-2 border-amber-300 rounded-lg print:inset-6 print:border-amber-400 print:border-4 print:border-double pointer-events-none"></div>

          {/* Elementos Florais Sutis nos Cantos */}
          <div className="absolute top-0 left-0 opacity-80 print:opacity-100">
            <img src="/images/decor/flower-corner-pink.png" alt="" className="w-20 md:w-48 print:w-40" />
          </div>
          <div className="absolute top-0 right-0 opacity-80 print:opacity-100">
            <img src="/images/decor/flower-corner-pink.png" alt="" className="w-20 md:w-48 print:w-40 transform scale-x-[-1]" />
          </div>
          <div className="absolute bottom-0 left-0 opacity-80 print:opacity-100">
            <img src="/images/decor/flower-corner-white.png" alt="" className="w-24 md:w-56 print:w-48" />
          </div>
          <div className="absolute bottom-0 right-0 opacity-80 print:opacity-100">
            <img src="/images/decor/flower-corner-white.png" alt="" className="w-24 md:w-56 print:w-48 transform scale-x-[-1]" />
          </div>

          {/* Capa Exterior - Conteúdo central */}
          <div className="relative p-6 md:p-12 text-center print:p-16">

            {/* Elementos Decorativos Premium */}
            <div className="absolute top-8 left-8 w-20 h-20 bg-gradient-to-br from-amber-300 to-orange-300 rounded-full opacity-30 animate-pulse print:hidden"></div>
            <div className="absolute bottom-8 right-8 w-24 h-24 bg-gradient-to-br from-yellow-300 to-amber-300 rounded-full opacity-30 animate-pulse print:hidden" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/3 left-6 w-12 h-12 bg-amber-400 rounded-full opacity-40 animate-bounce print:hidden" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-1/3 right-12 w-16 h-16 bg-orange-400 rounded-full opacity-40 animate-bounce print:hidden" style={{ animationDelay: '1.5s' }}></div>

            {/* Moldura Decorativa para Impressão */}
            <div className="print:absolute print:inset-4 print:border-4 print:border-amber-300 print:rounded-lg print:border-double print-gold-border"></div>

            {/* Cabeçalho com Monograma */}
            <div className="relative z-10 mb-12 print:mb-16">
              <div className="flex justify-center mb-8">
                <div className="bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-400 p-6 rounded-full shadow-2xl print:shadow-none print:border-4 print:border-amber-300 print-gold-border">
                  <Crown size={64} className="text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Monograma dos Noivos - Estilo Luxuoso */}
              <div className="mb-8">
                <div className="flex justify-center items-center gap-6 mb-6">
                  <div className="text-6xl font-script text-amber-800 drop-shadow-lg print:text-8xl print-gold-text">A</div>
                  <Heart className="text-amber-600 animate-pulse print:hidden" size={32} />
                  <div className="text-6xl font-script text-amber-800 drop-shadow-lg print:text-8xl print-gold-text">A</div>
                </div>
                <h1 className="font-script text-5xl md:text-8xl text-amber-800 mb-6 drop-shadow-lg print:text-9xl print:mb-8 print-gold-text">
                  Alexandre & Adália
                </h1>
              </div>

              {/* Versículo Bíblico */}
              <div className="max-w-2xl mx-auto mb-8 print:mb-12">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 shadow-md print:bg-amber-50 print:border-2 print:border-amber-300">
                  <p className="font-serif text-amber-800 italic text-lg leading-relaxed text-center mb-3 print:text-xl">
                    "Melhor é serem dois do que um, porque têm melhor paga do seu trabalho.
                    Porque se um cair, o outro levanta o seu companheiro...
                    Se alguém quiser prevalecer contra um, os dois lhe resistirão;
                    e o cordão de três dobras não se quebra tão depressa."
                  </p>
                  <p className="text-amber-600 text-sm text-center font-serif print:text-base">
                    — Eclesiastes 4:9-12
                  </p>
                </div>
              </div>
            </div>

            {/* Nome do Convidado - Destaque Especial */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-auto shadow-xl print:bg-white print:border-4 print:border-amber-200 print:rounded-3xl print:shadow-none print:p-10 print-gold-border print-shadow-premium">
              <div className="text-center space-y-4">
                <p className="text-amber-700 font-serif text-xl italic mb-4 print:text-2xl print-font-serif">
                  Você está cordialmente convidado(a) para celebrar o nosso casamento
                </p>

                <div className="border-t border-b border-amber-200 py-4 my-4 print:py-6 print-underline-gold">
                  <h2 className="font-script text-4xl text-amber-800 mb-2 print:text-5xl print-font-script">{guest.name}</h2>
                  {guest.category && (
                    <p className="text-amber-600 text-lg font-serif print:text-xl print-font-serif">{guest.category}</p>
                  )}

                  {/* Status de RSVP */}
                  {rsvp?.status === 'confirmed' && (
                    <div className="mt-3 inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                      <Check size={14} />
                      Presença Confirmada
                    </div>
                  )}
                  {rsvp?.status === 'declined' && (
                    <div className="mt-3 inline-flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium border border-red-200">
                      <X size={14} />
                      Não Comparecerá
                    </div>
                  )}
                </div>

                <div className="flex justify-center items-center gap-3 text-amber-600">
                  <Star size={16} className="text-amber-500" />
                  <Sparkles size={16} />
                  <span className="font-bold text-amber-700">Convite Especial</span>
                  <Sparkles size={16} />
                  <Star size={16} className="text-amber-500" />
                </div>
              </div>
            </div>

            {/* Elementos Decorativos de Rodapé */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 print:hidden">
              <img src="/images/decor/flower-divider.png" alt="" className="h-12 opacity-80" />
            </div>
          </div>

          {/* Interior do Convite - Layout Premium para Impressão */}
          <div className="bg-white p-6 md:p-12 print:p-16 print-gradient-premium">

            {/* Cabeçalho Interior com Detalhes Dourados */}
            <div className="text-center mb-12 print:mb-16">
              {/* Linha Decorativa Superior */}
              {/* Linha Decorativa Superior */}
              <div className="flex justify-center mb-6">
                <img src="/images/decor/flower-divider.png" alt="" className="h-16 md:h-20 object-contain opacity-90" />
              </div>

              {/* Título Interior */}
              <h2 className="font-script text-4xl md:text-6xl text-amber-800 mb-6 print:text-7xl print:mb-8 print-font-script print-gold-text">
                Alexandre & Adália
              </h2>

              <p className="text-amber-600 font-serif text-xl italic mb-8 print:text-2xl print:mb-10 print-font-serif">
                "Duas almas, um coração, uma jornada eterna de amor"
              </p>

              {/* Informações do Convidado - Cartão VIP */}
              <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 rounded-2xl p-8 mb-10 print:bg-gradient-to-r print:from-amber-100 print:via-orange-100 print:to-yellow-100 print:p-10 print:border-4 print:border-amber-200 print:rounded-3xl print-border-elegant print-shadow-premium">
                <div className="text-center space-y-4">
                  <p className="text-amber-700 font-bold text-sm uppercase tracking-wider mb-4 print:text-base">Convidado Especial</p>

                  <div className="border-2 border-amber-300 rounded-xl p-6 bg-white/80 print:bg-white print:border-4 print:border-amber-400 print:p-8 print-gold-border print-inner-shadow">
                    <h3 className="font-script text-4xl text-amber-800 mb-3 print:text-5xl print-font-script print-gold-text">{guest.name}</h3>
                    <div className="flex justify-center items-center gap-3">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor()} print:px-6 print:py-3 print:text-base print-gold-border`}>
                        {getStatusText()}
                      </span>
                      {guest.category && (
                        <span className="text-amber-600 text-base font-serif print:text-xl print-font-serif">{guest.category}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid de Informações - Layout Premium */}
            <div className="grid md:grid-cols-2 gap-8 mb-12 print:gap-12 print:mb-16">

              {/* Data e Hora - Cartão Dourado */}
              <div className="bg-gradient-to-br from-white to-amber-25 rounded-2xl p-8 border-2 border-amber-200 shadow-lg print:bg-gradient-to-br print:from-white print:to-amber-50 print:border-4 print:border-amber-300 print:shadow-none print:p-10 print:rounded-3xl print-border-elegant print-shadow-premium">
                <div className="flex items-center gap-4 mb-6 print:mb-8">
                  <div className="bg-gradient-to-br from-amber-200 to-orange-200 p-4 rounded-full print:bg-gradient-to-br print:from-amber-300 print:to-orange-300 print-gold-border">
                    <Calendar className="text-amber-700" size={28} />
                  </div>
                  <h3 className="font-display text-2xl text-amber-800 print:text-3xl print-gold-text">Data & Hora</h3>
                </div>
                <div className="space-y-3 print:space-y-4">
                  <p className="font-script text-3xl text-amber-900 print:text-4xl print-font-script print-gold-text">29 de Novembro, 2025</p>
                  <div className="flex items-center gap-3 text-amber-700">
                    <Clock size={18} />
                    <span className="font-serif text-lg print:text-xl print-font-serif">às 20:00 horas</span>
                  </div>
                  <p className="text-amber-600 text-base italic print:text-lg print-font-serif">Cerimônia seguida de recepção</p>
                </div>
              </div>

              {/* Local - Cartão Laranja */}
              <div className="bg-gradient-to-br from-white to-orange-25 rounded-2xl p-8 border-2 border-orange-200 shadow-lg print:bg-gradient-to-br print:from-white print:to-orange-50 print:border-4 print:border-orange-300 print:shadow-none print:p-10 print:rounded-3xl print-border-elegant print-shadow-premium">
                <div className="flex items-center gap-4 mb-6 print:mb-8">
                  <div className="bg-gradient-to-br from-orange-200 to-yellow-200 p-4 rounded-full print:bg-gradient-to-br print:from-orange-300 print:to-yellow-300 print-gold-border">
                    <MapPin className="text-orange-700" size={28} />
                  </div>
                  <h3 className="font-display text-2xl text-orange-800 print:text-3xl print-gold-text">Local</h3>
                </div>
                <div className="space-y-3 print:space-y-4">
                  <p className="font-script text-3xl text-orange-900 print:text-4xl print-font-script print-gold-text">Ulengo Center</p>
                  <p className="text-orange-700 font-serif text-lg print:text-xl print-font-serif">Ao lado do 11 de Novembro</p>
                  <p className="text-orange-600 text-base italic print:text-lg print-font-serif">Luanda, Angola</p>
                  <Button onClick={openMap} variant="outline" size="sm" className="mt-4 print:hidden">
                    <Navigation size={16} className="mr-2" />
                    Traçar Rota
                  </Button>
                </div>
              </div>
            </div>

            {/* Detalhes do RSVP - Se Confirmado */}
            {rsvp && (
              <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-8 border-2 border-green-200 mb-10 print:bg-gradient-to-r print:from-green-100 print:via-emerald-100 print:to-teal-100 print:border-4 print:border-green-300 print:p-10 print:rounded-3xl print:mb-12 print-border-elegant print-shadow-premium">
                <div className="flex items-center gap-4 mb-6 print:mb-8">
                  <div className="bg-gradient-to-br from-green-200 to-emerald-200 p-4 rounded-full print:bg-gradient-to-br print:from-green-300 print:to-emerald-300 print-gold-border">
                    <Users className="text-green-700" size={28} />
                  </div>
                  <h3 className="font-display text-2xl text-green-800 print:text-3xl print-gold-text">Confirmação de Presença</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6 print:gap-8">
                  <div className="text-center">
                    <p className="font-display text-3xl text-green-900 mb-2 print:text-4xl print-gold-text">{getStatusText()}</p>
                    <p className="text-green-600 text-sm uppercase tracking-wider print:text-base">Status</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-3xl text-green-900 mb-2 print:text-4xl print-gold-text">{rsvp.adults + rsvp.children}</p>
                    <p className="text-green-600 text-sm uppercase tracking-wider print:text-base">Total de Pessoas</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-3xl text-green-900 mb-2 print:text-4xl print-gold-text">{guest.maxAdults + guest.maxChildren}</p>
                    <p className="text-green-600 text-sm uppercase tracking-wider print:text-base">Limite de Convidados</p>
                  </div>
                </div>

                {/* Lista de Acompanhantes */}
                {rsvp.companionNames && rsvp.companionNames.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-green-200 print:mt-8 print:pt-8">
                    <h4 className="font-display text-lg text-green-800 mb-4 print:text-xl print-gold-text">Acompanhantes Confirmados:</h4>
                    <div className="space-y-2">
                      {rsvp.companionNames.map((name, index) => (
                        <div key={index} className="flex items-center gap-3 bg-white/50 rounded-lg p-3 print:bg-white print:border print:border-green-200">
                          <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold text-sm print:bg-green-300">
                            {index + 1}
                          </div>
                          <p className="font-serif text-green-900 text-lg print:text-xl">{name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* QR Code - Estilo VIP */}
            <div className="text-center mb-10 print:mb-12">
              <div className="bg-gradient-to-br from-white to-amber-25 rounded-2xl p-10 border-2 border-amber-200 shadow-lg max-w-md mx-auto print:bg-white print:border-4 print:border-amber-300 print:p-12 print:rounded-3xl print:shadow-none print-inner-shadow print-qr-premium">
                <div className="flex justify-center mb-6 print:mb-8">
                  <div className="bg-white p-6 rounded-2xl border-4 border-amber-300 shadow-xl print:p-8 print:border-8 print:shadow-none print:rounded-3xl print-gold-border">
                    <QrCode size={96} className="text-amber-800 print:size-32" />
                  </div>
                </div>
                <p className="text-xs font-mono text-amber-600 tracking-widest mb-3 print:text-sm print:text-amber-700">{qrCodeHash}</p>
                <p className="text-amber-700 font-serif text-base italic print:text-lg print-font-serif">Apresente este código na recepção do evento</p>
                <div className="flex justify-center gap-2 mt-4 print:hidden">
                  <Star size={12} className="text-amber-400" />
                  <Sparkles size={12} className="text-amber-500" />
                  <Star size={12} className="text-amber-400" />
                </div>
              </div>
            </div>

            {/* Mensagem Final - Cartão de Agradecimento */}
            <div className="text-center bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 rounded-2xl p-10 print:bg-gradient-to-r print:from-amber-200 print:via-orange-200 print:to-yellow-200 print:p-12 print:rounded-3xl print:mb-12 print-border-elegant print-shadow-premium">
              <div className="flex justify-center mb-6 print:mb-8">
                <Heart className="text-amber-600" size={40} />
              </div>
              <p className="text-amber-800 font-serif text-xl italic mb-6 leading-relaxed print:text-2xl print:mb-8 print-font-serif">
                "Contamos com sua presença para tornar este momento ainda mais especial.
                Será uma honra compartilhar o início da nossa nova jornada com você."
              </p>
              <div className="border-t border-amber-300 pt-6 print:pt-8 print-underline-gold">
                <p className="text-amber-700 font-bold text-base uppercase tracking-wider print:text-lg print-font-script print-gold-text">
                  Com amor, Alexandre & Adália
                </p>
                <div className="flex justify-center gap-3 mt-4 print:hidden">
                  <Heart size={16} className="text-amber-500" />
                  <Sparkles size={16} className="text-amber-600" />
                  <Heart size={16} className="text-amber-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé - Apenas Online */}
        <div className="text-center text-amber-600 font-serif text-sm print:hidden">
          <p>Para mais informações, entre em contato com os noivos</p>
          <p className="mt-2 text-amber-500">Este convite é válido apenas para o convidado mencionado</p>
        </div>
      </div>

      {/* Estilos de Impressão Premium - Nota 10 */}
      <style jsx>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
            padding: 0;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          body {
            margin: 0;
            padding: 0;
            background: white !important;
            font-family: 'Georgia', 'Times New Roman', serif;
          }
          
          .print\:hidden {
            display: none !important;
          }
          
          .print\:shadow-none {
            box-shadow: none !important;
          }
          
          /* Convite Premium para Impressão */
          .print-premium {
            background: linear-gradient(135deg, #fef7f0 0%, #fff8e1 50%, #fff3e0 100%) !important;
            border: 4px double #d4af37 !important;
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.3) !important;
          }
          
          /* Detalhes Dourados para Impressão */
          .print-gold-border {
            border: 3px solid #d4af37 !important;
            border-radius: 12px !important;
          }
          
          .print-gold-text {
            color: #b8860b !important;
            font-weight: bold !important;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1) !important;
          }
          
          /* Sombreamento Premium */
          .print-shadow-premium {
            box-shadow: 0 8px 32px rgba(212, 175, 55, 0.15) !important;
          }
          
          /* Tipografia Elegante */
          .print-font-script {
            font-family: 'Dancing Script', 'Brush Script MT', cursive !important;
            font-weight: 700 !important;
          }
          
          .print-font-serif {
            font-family: 'Georgia', 'Times New Roman', serif !important;
            font-style: italic !important;
          }
          
          /* Gradiente Premium para Impressão */
          .print-gradient-premium {
            background: linear-gradient(135deg, #fef7f0 0%, #fff8e1 25%, #fff3e0 50%, #fff8e1 75%, #fef7f0 100%) !important;
          }
          
          /* Bordas Decorativas */
          .print-border-elegant {
            border: 2px solid #d4af37 !important;
            border-radius: 16px !important;
            position: relative !important;
          }
          
          .print-border-elegant::before {
            content: '' !important;
            position: absolute !important;
            top: -6px !important;
            left: -6px !important;
            right: -6px !important;
            bottom: -6px !important;
            border: 1px solid #f4d03f !important;
            border-radius: 20px !important;
            z-index: -1 !important;
          }
          
          /* Elementos Decorativos para Impressão */
          .print-decoration-top::before {
            content: '❦' !important;
            position: absolute !important;
            top: -15px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            color: #d4af37 !important;
            font-size: 24px !important;
            background: white !important;
            padding: 0 10px !important;
          }
          
          /* QR Code Premium para Impressão */
          .print-qr-premium {
            border: 4px double #d4af37 !important;
            background: white !important;
            padding: 20px !important;
            border-radius: 12px !important;
            box-shadow: inset 0 0 10px rgba(212, 175, 55, 0.2) !important;
          }
          
          /* Sublinhado Dourado */
          .print-underline-gold {
            border-bottom: 2px solid #d4af37 !important;
            padding-bottom: 8px !important;
            margin-bottom: 16px !important;
          }
          
          /* Sombra Interna Premium */
          .print-inner-shadow {
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1) !important;
          }
        }
      `}</style>
    </div>
  );
};
