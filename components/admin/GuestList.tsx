import React, { useState, useEffect } from 'react';
import { Guest, GuestCategory, RSVPStatus, GuestRSVP } from '../../types';
import { bulkImportGuests, deleteGuest, saveGuest, updateGuest, getGuestRSVP } from '../../services/storageService';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Trash2, Upload, Search, MessageSquare, Pencil, X } from 'lucide-react';
import { AIAssistant } from './AIAssistant';
import { CompanionNamesEditor } from './CompanionNamesEditor';

interface GuestWithRSVP {
    guest: Guest;
    rsvp?: GuestRSVP;
}

interface GuestListProps {
    guests: Guest[];
    refreshData: () => void;
}

export const GuestList: React.FC<GuestListProps> = ({ guests, refreshData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedGuestForAI, setSelectedGuestForAI] = useState<{ guest: Guest, rsvp?: GuestRSVP } | null>(null);
    const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Form State (Create)
    const [newName, setNewName] = useState('');
    const [newCat, setNewCat] = useState(GuestCategory.FRIEND);
    const [newMaxComp, setNewMaxComp] = useState(1);
    const [guestsWithRSVP, setGuestsWithRSVP] = useState<GuestWithRSVP[]>([]);

    useEffect(() => {
        // Carregar RSVP para cada convidado
        const loadRSVPs = async () => {
            const guestsWithRSVPData = await Promise.all(
                guests.map(async (guest) => {
                    const rsvp = await getGuestRSVP(guest.id);
                    return { guest, rsvp };
                })
            );
            setGuestsWithRSVP(guestsWithRSVPData);
        };

        loadRSVPs();
    }, [guests]);

    const filteredGuests = guestsWithRSVP.filter(({ guest, rsvp }) =>
        guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (guest.category && guest.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja remover este convidado?')) {
            setIsLoading(true);
            await deleteGuest(id);
            refreshData();
            setIsLoading(false);
        }
    };

    const handleCreate = async () => {
        setIsLoading(true);
        const newGuest: Guest = {
            id: crypto.randomUUID(),
            name: newName,
            category: newCat,
            maxAdults: newMaxComp,
            maxChildren: 0,
            createdAt: new Date().toISOString()
        };
        await saveGuest(newGuest);
        setIsCreateModalOpen(false);
        refreshData();
        setNewName('');
        setIsLoading(false);
    };

    const handleEditClick = (guest: Guest) => {
        setEditingGuest(guest);
        setIsEditModalOpen(true);
    };

    const handleUpdateGuest = async () => {
        if (!editingGuest) return;
        setIsLoading(true);
        try {
            await updateGuest(editingGuest.id, {
                name: editingGuest.name,
                category: editingGuest.category,
                maxAdults: editingGuest.maxAdults,
                maxChildren: editingGuest.maxChildren
            });

            setIsEditModalOpen(false);
            setEditingGuest(null);
            refreshData();
        } catch (e) {
            alert('Erro ao atualizar');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsLoading(true);

        const reader = new FileReader();
        reader.onload = async (evt) => {
            const text = evt.target?.result as string;
            const lines = text.split('\n').slice(1);
            const imported: Guest[] = [];

            lines.forEach((line) => {
                const [name, cat, max] = line.split(',');
                if (name && name.trim() !== '') {
                    imported.push({
                        id: crypto.randomUUID(),
                        name: name.trim(),
                        category: (cat?.trim() as GuestCategory) || GuestCategory.FRIEND,
                        maxAdults: parseInt(max) || 1,
                        maxChildren: 0,
                        createdAt: new Date().toISOString()
                    });
                }
            });

            if (imported.length > 0) {
                try {
                    await bulkImportGuests(imported);
                    refreshData();
                    alert(`Importados com sucesso ${imported.length} convidados.`);
                } catch (error) {
                    alert("Falha na importação");
                }
            }
            setIsLoading(false);
        };
        reader.readAsText(file);
    };

    return (
        <div className="bg-white rounded shadow-sm overflow-hidden relative">
            {isLoading && <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-500"></div></div>}

            <div className="p-6 border-b border-stone-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                    <Input
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-9"
                    />
                </div>

                <div className="flex gap-2">
                    <label className="cursor-pointer bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 px-4 py-2 rounded-sm flex items-center gap-2 text-sm font-serif transition-colors">
                        <Upload size={16} /> Importar CSV
                        <input type="file" className="hidden" accept=".csv" onChange={handleFileUpload} />
                    </label>
                    <Button onClick={() => setIsCreateModalOpen(true)} size="sm" className="gap-2">
                        <Plus size={16} /> Novo Convidado
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-stone-50 text-stone-500 font-serif uppercase tracking-wider text-xs border-b border-stone-200">
                        <tr>
                            <th className="px-6 py-3">Nome</th>
                            <th className="px-6 py-3">Categoria</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Acompanhantes</th>
                            <th className="px-6 py-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {filteredGuests.map(({ guest, rsvp }) => (
                            <tr key={guest.id} className="hover:bg-stone-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-stone-900">{guest.name}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded text-xs bg-stone-100 border border-stone-200">
                                        {guest.category || 'N/A'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`
                                px-2 py-1 rounded text-xs font-bold
                                ${rsvp?.status === RSVPStatus.CONFIRMED ? 'text-green-700 bg-green-50' : ''}
                                ${rsvp?.status === RSVPStatus.DECLINED ? 'text-red-700 bg-red-50' : ''}
                                ${!rsvp || rsvp.status === RSVPStatus.PENDING ? 'text-yellow-700 bg-yellow-50' : ''}
                            `}>
                                        {rsvp?.status || 'PENDING'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-stone-500">
                                    {rsvp?.status === RSVPStatus.CONFIRMED ? `${rsvp.adults + rsvp.children}` : '-'} / {guest.maxAdults + guest.maxChildren}
                                </td>
                                <td className="px-6 py-4 text-right flex justify-end gap-2">
                                    <button
                                        onClick={() => handleEditClick(guest)}
                                        className="text-stone-400 hover:text-gold-600 p-1"
                                        title="Editar"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => setSelectedGuestForAI({ guest, rsvp })}
                                        className="text-gold-600 hover:text-gold-800 p-1"
                                        title="Mensagem AI"
                                    >
                                        <MessageSquare size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(guest.id)}
                                        className="text-stone-400 hover:text-red-600 p-1"
                                        title="Excluir"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-sm shadow-xl max-w-md w-full animate-scale-in">
                        <h3 className="font-display text-2xl mb-4">Adicionar Convidado</h3>
                        <div className="space-y-4">
                            <Input label="Nome Completo" value={newName} onChange={e => setNewName(e.target.value)} />
                            <div>
                                <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Categoria</label>
                                <select
                                    className="w-full border border-stone-300 rounded-sm p-2 mt-1 font-serif"
                                    value={newCat}
                                    onChange={e => setNewCat(e.target.value as GuestCategory)}
                                >
                                    {Object.values(GuestCategory).map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <Input
                                label="Máx Acompanhantes"
                                type="number"
                                min={0}
                                value={newMaxComp}
                                onChange={e => setNewMaxComp(parseInt(e.target.value))}
                            />
                            <div className="flex gap-3 justify-end mt-6">
                                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancelar</Button>
                                <Button onClick={handleCreate} isLoading={isLoading}>Salvar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && editingGuest && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-sm shadow-xl max-w-lg w-full animate-scale-in relative max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setIsEditModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-800">
                            <X size={20} />
                        </button>
                        <h3 className="font-display text-2xl mb-6 text-gold-600">Editar Convidado</h3>

                        <div className="space-y-5">
                            <Input
                                label="Nome Completo"
                                value={editingGuest.name}
                                onChange={e => setEditingGuest({ ...editingGuest, name: e.target.value })}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500 ml-1">Categoria</label>
                                    <select
                                        className="w-full border border-stone-200 bg-stone-50 px-3 py-3 rounded-sm mt-1 font-serif text-stone-800 focus:border-gold-500 outline-none"
                                        value={editingGuest.category || ''}
                                        onChange={e => setEditingGuest({ ...editingGuest, category: e.target.value as GuestCategory || undefined })}
                                    >
                                        {Object.values(GuestCategory).map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <Input
                                    label="Máx Adultos"
                                    type="number"
                                    min={0}
                                    value={editingGuest.maxAdults}
                                    onChange={e => setEditingGuest({ ...editingGuest, maxAdults: parseInt(e.target.value) || 1 })}
                                />
                            </div>
                            <Input
                                label="Máx Crianças"
                                type="number"
                                min={0}
                                value={editingGuest.maxChildren || 0}
                                onChange={e => setEditingGuest({ ...editingGuest, maxChildren: parseInt(e.target.value) || 0 })}
                            />

                            {/* Companion Names Editor */}
                            <CompanionNamesEditor guestId={editingGuest.id} />

                            <div className="flex gap-3 justify-end mt-8 pt-4 border-t border-stone-100">
                                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancelar</Button>
                                <Button onClick={handleUpdateGuest} isLoading={isLoading}>Atualizar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* AI Assistant Modal */}
            {selectedGuestForAI && (
                <AIAssistant guest={selectedGuestForAI} onClose={() => setSelectedGuestForAI(null)} />
            )}
        </div>
    );
};