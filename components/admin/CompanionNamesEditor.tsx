import React, { useState, useEffect } from 'react';
import { UserPlus, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { getGuestRSVP, saveGuestRSVP } from '../../services/storageService';
import { GuestRSVP, RSVPStatus } from '../../types';

interface CompanionNamesEditorProps {
    guestId: string;
}

const FORBIDDEN_NAMES = ['alexandre', 'adália', 'adalia'];

const validateCompanionName = (name: string): boolean => {
    const normalizedName = name.trim().toLowerCase();
    if (FORBIDDEN_NAMES.includes(normalizedName)) {
        return false;
    }
    return name.trim().length > 0;
};

export const CompanionNamesEditor: React.FC<CompanionNamesEditorProps> = ({ guestId }) => {
    const [rsvp, setRsvp] = useState<GuestRSVP | null>(null);
    const [companionNames, setCompanionNames] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const loadRSVP = async () => {
            setIsLoading(true);
            const existingRsvp = await getGuestRSVP(guestId);
            if (existingRsvp) {
                setRsvp(existingRsvp);
                setCompanionNames(existingRsvp.companionNames || []);
            }
            setIsLoading(false);
        };
        loadRSVP();
    }, [guestId]);

    const handleAddCompanion = () => {
        setCompanionNames([...companionNames, '']);
    };

    const handleRemoveCompanion = (index: number) => {
        setCompanionNames(companionNames.filter((_, i) => i !== index));
    };

    const handleCompanionNameChange = (index: number, value: string) => {
        const newNames = [...companionNames];
        newNames[index] = value;
        setCompanionNames(newNames);
    };

    const handleSave = async () => {
        // Validate names
        const filledNames = companionNames.filter(name => name.trim().length > 0);
        for (const name of filledNames) {
            if (!validateCompanionName(name)) {
                alert(`O nome "${name}" não é permitido. Os nomes dos noivos não podem ser adicionados como acompanhantes.`);
                return;
            }
        }

        if (!rsvp) {
            alert('Nenhum RSVP encontrado para este convidado');
            return;
        }

        setIsSaving(true);
        try {
            const updatedRsvp = {
                ...rsvp,
                companionNames: filledNames,
                adults: 1 + filledNames.length,
                updatedAt: new Date().toISOString()
            };

            await saveGuestRSVP(updatedRsvp);
            setRsvp(updatedRsvp);
            alert('Acompanhantes salvos com sucesso!');
        } catch (error) {
            console.error('Error saving companions:', error);
            alert('Erro ao salvar acompanhantes');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div className="text-center text-stone-500 text-sm">Carregando...</div>;
    }

    if (!rsvp || rsvp.status !== RSVPStatus.CONFIRMED) {
        return (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-gray-600 text-sm text-center">
                    Este convidado ainda não confirmou presença. Os acompanhantes serão gerenciados após a confirmação.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
                <h4 className="font-display text-lg text-blue-800 flex items-center gap-2">
                    <UserPlus size={18} />
                    Acompanhantes Confirmados
                </h4>
                <Button
                    onClick={handleAddCompanion}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                >
                    <UserPlus size={12} className="mr-1" />
                    Adicionar
                </Button>
            </div>

            {companionNames.length === 0 ? (
                <p className="text-blue-600 text-sm italic">
                    Nenhum acompanhante adicionado ainda
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

            <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-blue-600 text-xs mb-3">
                    ⚠️ Os nomes dos noivos não podem ser adicionados como acompanhantes
                </p>
                <Button
                    onClick={handleSave}
                    isLoading={isSaving}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                >
                    Salvar Acompanhantes
                </Button>
            </div>
        </div>
    );
};
