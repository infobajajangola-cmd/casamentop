import React, { useMemo } from 'react';
import { Guest, RSVPStatus } from '../../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface DashboardProps {
  guests: Guest[];
}

const COLORS = {
  [RSVPStatus.CONFIRMED]: '#D4AF37', // Gold
  [RSVPStatus.DECLINED]: '#1C1917', // Stone 900
  [RSVPStatus.PENDING]: '#E7E5E4', // Stone 200
};

export const Dashboard: React.FC<DashboardProps> = ({ guests }) => {
  
  const stats = useMemo(() => {
    return guests.reduce((acc, guest) => {
        acc.totalGuests++;
        acc.totalPax += (1 + (guest.status === RSVPStatus.CONFIRMED ? guest.confirmedCompanions : 0));
        
        if (guest.status === RSVPStatus.CONFIRMED) acc.confirmed++;
        if (guest.status === RSVPStatus.DECLINED) acc.declined++;
        if (guest.status === RSVPStatus.PENDING) acc.pending++;
        return acc;
    }, { totalGuests: 0, confirmed: 0, declined: 0, pending: 0, totalPax: 0 });
  }, [guests]);

  const pieData = [
    { name: 'Confirmados', value: stats.confirmed },
    { name: 'Recusados', value: stats.declined },
    { name: 'Pendentes', value: stats.pending },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded shadow-sm border-l-4 border-stone-900">
            <p className="text-xs uppercase font-bold text-stone-400 tracking-wider">Total Convites</p>
            <p className="text-4xl font-display text-stone-900 mt-2">{stats.totalGuests}</p>
        </div>
        <div className="bg-white p-6 rounded shadow-sm border-l-4 border-gold-500">
            <p className="text-xs uppercase font-bold text-stone-400 tracking-wider">Confirmados</p>
            <p className="text-4xl font-display text-gold-600 mt-2">{stats.confirmed}</p>
        </div>
        <div className="bg-white p-6 rounded shadow-sm border-l-4 border-stone-300">
            <p className="text-xs uppercase font-bold text-stone-400 tracking-wider">Total Pessoas (Pax)</p>
            <p className="text-4xl font-display text-stone-900 mt-2">{stats.totalPax}</p>
        </div>
        <div className="bg-white p-6 rounded shadow-sm border-l-4 border-red-400">
             <p className="text-xs uppercase font-bold text-stone-400 tracking-wider">Pendentes</p>
            <p className="text-4xl font-display text-stone-600 mt-2">{stats.pending}</p>
        </div>
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded shadow-sm">
            <h3 className="font-serif text-lg mb-4 text-stone-800">Status dos Convites</h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => {
                                // Map generic keys back to statuses for colors if needed, or just use index
                                const statusKey = entry.name === 'Confirmados' ? RSVPStatus.CONFIRMED : 
                                                  entry.name === 'Recusados' ? RSVPStatus.DECLINED : 
                                                  RSVPStatus.PENDING;
                                return <Cell key={`cell-${index}`} fill={COLORS[statusKey] || '#ccc'} />;
                            })}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#fff', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            itemStyle={{ fontFamily: 'serif' }}
                        />
                        <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Simple Progress Bars */}
        <div className="bg-white p-6 rounded shadow-sm flex flex-col justify-center space-y-6">
            <h3 className="font-serif text-lg mb-4 text-stone-800">Metas do Evento</h3>
            
            <div>
                <div className="flex justify-between text-sm mb-1">
                    <span className="text-stone-500">Taxa de Resposta</span>
                    <span className="font-bold text-stone-900">
                        {Math.round(((stats.confirmed + stats.declined) / (stats.totalGuests || 1)) * 100)}%
                    </span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2.5">
                    <div className="bg-gold-500 h-2.5 rounded-full" style={{ width: `${((stats.confirmed + stats.declined) / (stats.totalGuests || 1)) * 100}%` }}></div>
                </div>
            </div>

             <div>
                <div className="flex justify-between text-sm mb-1">
                    <span className="text-stone-500">Capacidade do Local (200 Máx)</span>
                    <span className="font-bold text-stone-900">
                        {Math.round((stats.totalPax / 200) * 100)}%
                    </span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2.5">
                    <div className="bg-stone-800 h-2.5 rounded-full" style={{ width: `${(stats.totalPax / 200) * 100}%` }}></div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};