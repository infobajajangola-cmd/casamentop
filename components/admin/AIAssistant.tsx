import React, { useState } from 'react';
import { Guest } from '../../types';
import { generateGuestMessage } from '../../services/geminiService';
import { Button } from '../ui/Button';
import { X, Sparkles, Copy } from 'lucide-react';

interface AIAssistantProps {
  guest: Guest;
  onClose: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ guest, onClose }) => {
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (type: 'invite' | 'thank_you' | 'reminder') => {
    setLoading(true);
    const text = await generateGuestMessage(guest, type);
    setGeneratedText(text);
    setLoading(false);
  };

  const copyToClipboard = () => {
      navigator.clipboard.writeText(generatedText);
      alert("Copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-sm shadow-2xl max-w-lg w-full flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center">
            <div className="flex items-center gap-2 text-gold-600">
                <Sparkles size={20} />
                <h3 className="font-serif font-bold text-lg">Concierge AI</h3>
            </div>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-800">
                <X size={24} />
            </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
            <p className="text-stone-600 mb-4">
                Generate a personalized message for <strong className="text-stone-900">{guest.name}</strong>.
            </p>

            <div className="grid grid-cols-3 gap-2 mb-6">
                <Button variant="outline" size="sm" onClick={() => handleGenerate('invite')} disabled={loading}>
                    Invitation
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleGenerate('reminder')} disabled={loading}>
                    RSVP Reminder
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleGenerate('thank_you')} disabled={loading}>
                    Thank You
                </Button>
            </div>

            {loading && (
                <div className="py-12 text-center text-stone-400 animate-pulse">
                    Thinking elegantly...
                </div>
            )}

            {!loading && generatedText && (
                <div className="bg-stone-50 p-4 rounded border border-stone-200 relative group">
                    <p className="font-serif text-lg leading-relaxed text-stone-800 italic">
                        "{generatedText}"
                    </p>
                    <button 
                        onClick={copyToClipboard}
                        className="absolute top-2 right-2 p-2 bg-white border border-stone-200 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-stone-500 hover:text-gold-600"
                    >
                        <Copy size={16} />
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};