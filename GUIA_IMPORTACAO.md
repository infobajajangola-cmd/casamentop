# 📋 GUIA DE IMPORTAÇÃO EM MASSA - Sistema de Casamento

## 🎯 Como Importar Convidados em Massa

### Passo 1: Preparar o Arquivo CSV

#### Formato Obrigatório:
```csv
Nome,Categoria,LadoFamilia,MaxAcompanhantes
```

#### Opções Válidas:

**Categoria** (escolha uma):
- `Família da Noiva`
- `Família do Noivo`
- `Amigo`
- `Trabalho`
- `VIP`

**LadoFamilia** (escolha uma):
- `Noiva` - Convidado do lado da noiva
- `Noivo` - Convidado do lado do noivo
- `Ambos` - Convidado comum aos dois (padrão)
- `Nenhum` - Não se aplica

**MaxAcompanhantes**:
- Número inteiro (0, 1, 2, 3, etc.)

---

### Passo 2: Exemplo de Arquivo CSV

Veja o arquivo: **`exemplo_importacao_convidados.csv`** na raiz do projeto.

```csv
Nome,Categoria,LadoFamilia,MaxAcompanhantes
Maria Silva Santos,Família da Noiva,Noiva,2
João Pedro Costa,Família do Noivo,Noivo,3
Ana Paula Ferreira,Amigo,Ambos,1
Carlos Eduardo Lima,Trabalho,Nenhum,1
Dr. Roberto Alves,VIP,Ambos,2
```

---

### Passo 3: Como Criar o Arquivo

#### Opção A: Microsoft Excel
1. Abra o Excel
2. Na primeira linha, escreva: `Nome,Categoria,LadoFamilia,MaxAcompanhantes`
3. Nas linhas seguintes, adicione os dados dos convidados
4. Salve como: **"Salvar Como" → "CSV UTF-8 (delimitado por vírgula) (*.csv)"**

#### Opção B: Google Sheets
1. Crie uma nova planilha
2. Na primeira linha (cabeçalho): Nome | Categoria | LadoFamilia | MaxAcompanhantes
3. Preencha os dados
4. Vá em: **Arquivo → Fazer download → Valores separados por vírgula (.csv)**

#### Opção C: Notepad (Bloco de Notas)
1. Copie o exemplo acima
2. Cole no Bloco de Notas
3. Salve com extensão `.csv`
4. ⚠️ **IMPORTANTE**: Codificação UTF-8

---

### Passo 4: Importar no Sistema

1. Acesse o **Painel Admin**
2. Vá em **"Lista de Convidados"**
3. Clique no botão **🟠 "Importar"** (laranja com ícone de upload)
4. Selecione seu arquivo `.csv`
5. Aguarde a mensagem de confirmação

**Mensagens Possíveis**:
- ✅ `Importados com sucesso X convidado(s).` - Tudo certo!
- ⚠️ `X linha(s) com erro foram ignoradas.` - Algumas linhas tinham problemas
- ❌ `Nenhum convidado válido encontrado.` - Verifique o formato do arquivo

---

## 🔍 Solução de Problemas

### ❌ Erro: "Falha na importação"
**Causas comuns**:
- Arquivo não está em UTF-8
- Falta o cabeçalho (primeira linha)
- Valores nas colunas não correspondem às opções válidas

**Solução**:
1. Verifique se a primeira linha é exatamente: `Nome,Categoria,LadoFamilia,MaxAcompanhantes`
2. Certifique-se que os valores de Categoria e LadoFamilia correspondem às opções listadas acima
3. Salve o arquivo em UTF-8

### ❌ Erro: "Nenhum convidado válido"
**Causa**: Todas as linhas foram ignoradas por problemas de formato

**Solução**:
- Certifique-se que há ao menos um nome válido
- Verifique se não há linhas completamente vazias (exceto a última)
- Confirme que está usando vírgula (,) como separador

### ⚠️ Caracteres especiais (acentos) aparecem errados
**Causa**: Problema de codificação

**Solução**:
- Salve o arquivo como **UTF-8 com BOM** no Excel
- No Notepad/Notepad++, selecione codificação UTF-8
- No Google Sheets, isso acontece automaticamente

---

## 💡 Dicas para Grandes Importações

### 📊 Organize seus Dados
Recomendamos separar em planilhas diferentes:
- `familia_noiva.csv` - Apenas família da noiva
- `familia_noivo.csv` - Apenas família do noivo
- `amigos_trabalho.csv` - Outros convidados

Importe cada arquivo separadamente para melhor controle.

### ✅ Valide Antes de Importar
1. Conte quantos convidados você tem na planilha
2. Após importar, verifique se o número bate
3. Use a busca para encontrar nomes específicos

### 🔄 Backup Antes de Importar
1. Clique em **🟢 "Exportar CSV"** antes de importar novos dados
2. Guarde o arquivo exportado como backup
3. Assim você pode restaurar se algo der errado

---

## 📤 Exportação de Dados

O sistema oferece 2 formatos de exportação:

### 🟢 CSV (Planilha)
- Ideal para: Abrir no Excel, Google Sheets, imprimir listas
- Inclui: Todos os dados + status RSVP
- Formato: Compatível com Excel e Numbers

### 🔵 JSON (Backup Técnico)
- Ideal para: Backup completo, migração de dados
- Inclui: Estrutura completa com todos os campos
- Formato: Pode ser reimportado programaticamente

**Ambos os arquivos** têm a data no nome: `convidados_2025-11-25.csv`

---

## 🎓 Exemplo Completo de 50 Convidados

Se você tem uma lista em Word/PDF, siga este processo:

1. **Copie a lista** para o Excel
2. **Organize em colunas**:
   - Coluna A: Nomes
   - Coluna B: Categoria (use fórmula: `=SE(PROCURAR("tia";A2)>0;"Família da Noiva";"Amigo")`)
   - Coluna C: Lado (Noiva/Noivo/Ambos)
   - Coluna D: Número de acompanhantes permitidos
3. **Adicione o cabeçalho** na linha 1
4. **Salve como CSV UTF-8**
5. **Importe no sistema**

---

## 🆘 Suporte

Se ainda tiver dúvidas:
1. Use o arquivo de exemplo (`exemplo_importacao_convidados.csv`)
2. Faça um teste com 2-3 convidados primeiro
3. Depois importe a lista completa

**Lembre-se**: Você pode sempre adicionar convidados manualmente clicando em **"+ Novo Convidado"**!

---

✨ **Boa sorte com a importação!**
