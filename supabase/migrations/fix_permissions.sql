-- Grant permissions for guests table
GRANT ALL ON guests TO anon;
GRANT ALL ON guests TO authenticated;

-- Grant permissions for rsvps table
GRANT ALL ON rsvps TO anon;
GRANT ALL ON rsvps TO authenticated;

-- Grant permissions for checkins table
GRANT ALL ON checkins TO anon;
GRANT ALL ON checkins TO authenticated;

-- Grant permissions for invitation_tokens table
GRANT ALL ON invitation_tokens TO anon;
GRANT ALL ON invitation_tokens TO authenticated;

-- Grant permissions for events table
GRANT ALL ON events TO anon;
GRANT ALL ON events TO authenticated;

-- Grant permissions for imports table
GRANT ALL ON imports TO anon;
GRANT ALL ON imports TO authenticated;

-- Grant permissions for audit_logs table
GRANT ALL ON audit_logs TO anon;
GRANT ALL ON audit_logs TO authenticated;