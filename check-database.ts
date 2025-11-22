import { supabase } from './services/supabaseClient';

async function checkDatabase() {
    console.log('🔍 Verificando estrutura do banco de dados Supabase...\n');

    try {
        // Buscar todas as tabelas através de consultas
        const tables = ['guests', 'rsvps', 'events', 'checkins'];

        console.log('📊 TABELAS ENCONTRADAS:\n');

        for (const table of tables) {
            const { data, error, count } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });

            if (!error) {
                console.log(`✅ ${table.toUpperCase()}`);
                console.log(`   └─ Registros: ${count || 0}\n`);
            } else {
                console.log(`❌ ${table.toUpperCase()}`);
                console.log(`   └─ Erro: ${error.message}\n`);
            }
        }

        // Informações sobre o banco de dados
        console.log('🗄️ INFORMAÇÕES DO BANCO DE DADOS:');
        console.log(`   URL: https://tjvndvkrjjdlcefrxzvd.supabase.co`);
        console.log(`   Projeto: tjvndvkrjjdlcefrxzvd\n`);

        // Verificar colunas da tabela rsvps
        console.log('📋 ESTRUTURA DA TABELA RSVPS:');
        const { data: rsvpData } = await supabase
            .from('rsvps')
            .select('*')
            .limit(1);

        if (rsvpData && rsvpData.length > 0) {
            const columns = Object.keys(rsvpData[0]);
            console.log(`   Colunas: ${columns.join(', ')}\n`);
        }

    } catch (error) {
        console.error('❌ Erro ao verificar banco de dados:', error);
    }
}

// Executar verificação
checkDatabase();
