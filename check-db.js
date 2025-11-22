// Script para verificar tabelas do Supabase
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://tjvndvkrjjdlcefrxzvd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqdm5kdmtyampkbGNlZnJ4enZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyODA4NTAsImV4cCI6MjA3ODg1Njg1MH0.Mk3LzED8pHEmfIuRpATRvDbpF5q8GP5MS2aCkJcyOdg';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkDatabase() {
    console.log('\n🔍 VERIFICANDO ESTRUTURA DO BANCO DE DADOS SUPABASE\n');
    console.log('='.repeat(60));

    const tables = ['guests', 'rsvps', 'events', 'checkins'];
    let totalTables = 0;

    console.log('\n📊 TABELAS NO BANCO DE DADOS:\n');

    for (const table of tables) {
        try {
            const { data, error, count } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });

            if (!error) {
                totalTables++;
                console.log(`  ✅ ${table.toUpperCase()}`);
                console.log(`     └─ Registros: ${count || 0}`);
            } else {
                console.log(`  ❌ ${table.toUpperCase()}`);
                console.log(`     └─ Não existe ou sem permissão`);
            }
        } catch (err) {
            console.log(`  ⚠️  ${table.toUpperCase()}`);
            console.log(`     └─ Erro: ${err.message}`);
        }
        console.log('');
    }

    console.log('='.repeat(60));
    console.log(`\n📈 RESUMO:`);
    console.log(`  • Total de tabelas encontradas: ${totalTables}`);
    console.log(`  • Banco de dados: 1 (PostgreSQL no Supabase)`);
    console.log(`  • Projeto ID: tjvndvkrjjdlcefrxzvd`);
    console.log(`  • URL: ${SUPABASE_URL}\n`);

    // Verificar estrutura da tabela RSVPS
    console.log('='.repeat(60));
    console.log('\n📋 ESTRUTURA DA TABELA RSVPS:\n');

    try {
        const { data } = await supabase
            .from('rsvps')
            .select('*')
            .limit(1);

        if (data && data.length > 0) {
            const columns = Object.keys(data[0]);
            console.log('  Colunas encontradas:');
            columns.forEach(col => {
                console.log(`    • ${col}`);
            });
            console.log(`\n  Total: ${columns.length} colunas`);
        } else {
            console.log('  (Tabela vazia - sem dados para mostrar estrutura)');
        }
    } catch (err) {
        console.log(`  Erro ao verificar estrutura: ${err.message}`);
    }

    console.log('\n' + '='.repeat(60) + '\n');
}

checkDatabase().catch(console.error);
