-- Adicionar coluna companion_names à tabela rsvps
ALTER TABLE rsvps
ADD COLUMN IF NOT EXISTS companion_names TEXT;

-- Adicionar comentário explicativo
COMMENT ON COLUMN rsvps.companion_names IS 'JSON array com os nomes dos acompanhantes';
