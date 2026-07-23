-- Fix: replace always-true WITH CHECK (true) policies with meaningful field validation.
-- Only anon needs INSERT on these public-facing tables (no auth in this app).

-- chat_messages
DROP POLICY IF EXISTS "anon_insert_chat" ON chat_messages;
CREATE POLICY "anon_insert_chat" ON chat_messages
  FOR INSERT TO anon
  WITH CHECK (
    session_id IS NOT NULL AND session_id <> ''
    AND role IN ('user', 'assistant')
    AND content IS NOT NULL AND content <> ''
    AND length(content) <= 10000
  );

-- contact_messages
DROP POLICY IF EXISTS "anon_insert_contact" ON contact_messages;
CREATE POLICY "anon_insert_contact" ON contact_messages
  FOR INSERT TO anon
  WITH CHECK (
    name    IS NOT NULL AND name    <> ''
    AND email   IS NOT NULL AND email   <> '' AND email LIKE '%@%'
    AND subject IS NOT NULL AND subject <> ''
    AND message IS NOT NULL AND message <> ''
    AND length(message) <= 10000
  );
