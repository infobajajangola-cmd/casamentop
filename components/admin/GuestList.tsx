import React, { useState } from 'react';
import { Guest, GuestCategory, RSVPStatus } from '../../types';
import { bulkImportGuests, deleteGuest, saveGuest } from '../../services/storageService';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Trash2, Upload, Search, MessageSquare } from 'lucide-react';
import { AIAssistant } from './AIAssistant';

interface GuestListProps {
  guests: Guest[];
  refreshData: () => void;
}

export const GuestList: React.FC<GuestListProps> = ({ guests, refreshData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuestForAI, setSelectedGuestForAI] = useState<Guest | null>(null);
  
  // Form State
  const [newName, setNewName] = useState('');
  const [newCat, setNewCat] = useState(GuestCategory.FRIEND);
  const [newMaxComp, setNewMaxComp] = useState(1);

  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    g.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja remover?')) {
      deleteGuest(id);
      refreshData();
    }
  };

  const handleCreate = () => {
    const newGuest: Guest = {
      id: Date.now().toString(),
      name: newName,
      category: newCat,
      maxCompanions: newMaxComp,
      confirmedCompanions: 0,
      status: RSVPStatus.PENDING,
      updatedAt: new Date().toISOString(),
      qrCodeHash: Math.random().toString(36).substring(7)
    };
    saveGuest(newGuest);
    setIsModalOpen(false);
    refreshData();
    // Reset form
    setNewName('');
  };

  // Simulating CSV Import (mocking the Excel logic for browser compatibility)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
        const text = evt.target?.result as string;
        // Expecting CSV: Name,Category,MaxCompanions
        const lines = text.split('\n').slice(1); // Skip header
        const imported: Guest[] = [];
        
        lines.forEach((line, idx) => {
            const [name, cat, max] = line.split(',');
            if (name) {
                imported.push({
                    id: `import-${Date.now()}-${idx}`,
                    name: name.trim(),
                    category: (cat?.trim() as GuestCategory) || GuestCategory.FRIEND,
                    maxCompanions: parseInt(max) || 0,
                    confirmedCompanions: 0,
                    status: RSVPStatus.PENDING,
                    updatedAt: new Date().toISOString(),
                    qrCodeHash: Math.random().toString(36).substring(7)
                });
            }
        });

        if (imported.length > 0) {
            bulkImportGuests(imported);
            refreshData();
            alert(`Importados com sucesso ${imported.length} convidados.`);
        }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white rounded shadow-sm overflow-hidden">
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
            <Button onClick={() => setIsModalOpen(true)} size="sm" className="gap-2">
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
                {filteredGuests.map(guest => (
                    <tr key={guest.id} className="hover:bg-stone-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-stone-900">{guest.name}</td>
                        <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded text-xs bg-stone-100 border border-stone-200">
                                {guest.category}
                            </span>
                        </td>
                        <td className="px-6 py-4">
                            <span className={`
                                px-2 py-1 rounded text-xs font-bold
                                ${guest.status === RSVPStatus.CONFIRMED ? 'text-green-700 bg-green-50' : ''}
                                ${guest.status === RSVPStatus.DECLINED ? 'text-red-700 bg-red-50' : ''}
                                ${guest.status === RSVPStatus.PENDING ? 'text-yellow-700 bg-yellow-50' : ''}
                            `}>
                                {guest.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-stone-500">
                            {guest.status === RSVPStatus.CONFIRMED ? guest.confirmedCompanions : '-'} / {guest.maxCompanions}
                        </td>
                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                             <button 
                                onClick={() => setSelectedGuestForAI(guest)}
                                className="text-gold-600 hover:text-gold-800 p-1"
                                title="Mensagem AI"
                             >
                                <MessageSquare size={18} />
                             </button>
                             <button 
                                onClick={() => handleDelete(guest.id)}
                                className="text-stone-400 hover:text-red-600 p-1"
                             >
                                <Trash2 size={18} />
                             </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      {/* Add Guest Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-sm shadow-xl max-w-md w-full">
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
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button onClick={handleCreate}>Salvar</Button>
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