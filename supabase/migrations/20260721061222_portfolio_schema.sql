/*
# Portfolio Website Schema

## Summary
Creates the data tables for the Technical Director portfolio website.

## Tables

### contact_messages
Stores messages submitted via the contact form.
- id: UUID primary key
- name: sender's full name
- email: sender's email address
- subject: message subject
- message: message body
- created_at: submission timestamp

### blog_posts
Stores blog articles authored by the portfolio owner.
- id: UUID primary key
- title: post title
- slug: URL-friendly identifier
- excerpt: short summary for listing pages
- content: full markdown content
- cover_image: URL to cover image
- tags: array of tag strings
- published: boolean flag (only published posts shown publicly)
- published_at: publication date
- created_at: creation timestamp

### chat_messages
Persists AI chatbot conversation history per session.
- id: UUID primary key
- session_id: client-generated session identifier
- role: 'user' or 'assistant'
- content: message text
- created_at: timestamp

## Security
- RLS enabled on all tables
- contact_messages: anon INSERT (write-only), no public read
- blog_posts: anon SELECT for published posts only
- chat_messages: anon SELECT and INSERT scoped by session_id
*/

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact" ON contact_messages;
CREATE POLICY "anon_insert_contact" ON contact_messages FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_contact" ON contact_messages;
CREATE POLICY "anon_select_contact" ON contact_messages FOR SELECT
TO anon, authenticated USING (false);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  cover_image text NOT NULL DEFAULT '',
  tags text[] NOT NULL DEFAULT '{}',
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_blog" ON blog_posts;
CREATE POLICY "anon_select_blog" ON blog_posts FOR SELECT
TO anon, authenticated USING (published = true);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_chat" ON chat_messages;
CREATE POLICY "anon_select_chat" ON chat_messages FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_chat" ON chat_messages;
CREATE POLICY "anon_insert_chat" ON chat_messages FOR INSERT
TO anon, authenticated WITH CHECK (true);

-- Seed blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, tags, published, published_at) VALUES
(
  'The Future of AI in Enterprise Architecture',
  'ai-enterprise-architecture',
  'Exploring how generative AI and LLMs are reshaping enterprise software architecture patterns, from microservices to intelligent agents.',
  '## The Future of AI in Enterprise Architecture

Over my 21+ years in technology leadership, few shifts have been as profound as the emergence of generative AI in enterprise systems.

### The New Architecture Paradigm

Traditional enterprise architecture focused on deterministic systems — inputs map predictably to outputs. AI-powered architectures introduce probabilistic reasoning, fundamentally changing how we design for reliability and scalability.

Key patterns I am seeing adopted:

- **RAG (Retrieval-Augmented Generation)** for grounding LLM outputs in company-specific knowledge
- **Agentic workflows** replacing rigid automation pipelines with adaptive, goal-driven processes
- **Vector databases** as first-class citizens alongside relational stores

### Organizational Implications

The technology shift demands organizational evolution. Engineering teams must develop new competencies around prompt engineering, model evaluation, and responsible AI governance. As a Technical Director, I spend significant time building these capabilities within my teams.

### What Comes Next

The organizations that treat AI as infrastructure — not novelty — will define the next decade of enterprise software. The winners will be those who embed AI reasoning deeply into their systems while maintaining the reliability standards their customers expect.',
  'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ARRAY['AI', 'Architecture', 'Enterprise', 'Leadership'],
  true,
  now() - interval '5 days'
),
(
  'Scaling Engineering Teams: Lessons from 20 Years',
  'scaling-engineering-teams',
  'Hard-won insights on building, scaling, and retaining high-performance engineering teams across startups and large enterprises.',
  '## Scaling Engineering Teams: Lessons from 20 Years

Building great engineering teams is the highest-leverage activity a Technical Director can undertake. Here is what two decades of experience has taught me.

### Hire for Trajectory, Not Just Credentials

The best engineers I have worked with were not always the most credentialed. Intellectual curiosity, ownership mentality, and communication skills predict long-term contribution better than any degree or previous employer.

### Invest in Engineering Culture Before You Need It

Culture is hardest to build when you are already at scale. The practices, rituals, and values that define how your team works must be established when the team is small enough for every person to internalize them directly.

### Technical Debt is a Strategic Decision

Teams that treat every instance of technical debt as an emergency burn out. Great engineering leaders help their teams distinguish between debt that blocks progress and debt that can be managed — and communicate that distinction clearly to stakeholders.

### Remote and Distributed Teams

Having led distributed teams across time zones for over a decade, I have learned that async communication, documentation culture, and deliberate connection-building are not nice-to-haves — they are the infrastructure of remote team performance.',
  'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ARRAY['Leadership', 'Engineering', 'Management', 'Culture'],
  true,
  now() - interval '12 days'
),
(
  'Cloud-Native Architecture Patterns for 2025',
  'cloud-native-2025',
  'A practical guide to the cloud-native patterns that are driving resilience and developer velocity in modern engineering organizations.',
  '## Cloud-Native Architecture Patterns for 2025

Cloud-native has moved from buzzword to baseline expectation. Here are the architectural patterns delivering the most value in 2025.

### Platform Engineering is Mainstream

Internal developer platforms (IDPs) are no longer a luxury for FAANG companies. Teams of 20+ engineers benefit enormously from a paved path: standardized CI/CD, observability, secrets management, and service templates. The investment pays back within months.

### FinOps as Engineering Discipline

Cloud costs at scale demand that engineering teams understand and own their infrastructure spend. The best engineering organizations I work with treat FinOps as a first-class engineering concern, not a finance department problem.

### Observability-First Development

The shift from monitoring to observability — structured logs, distributed traces, and metrics as a unified story — has fundamentally improved how teams understand and debug production systems. Building observability in from day one is non-negotiable.

### Security as Code

Shift-left security through policy-as-code, automated vulnerability scanning in CI, and infrastructure security checks at PR time has dramatically reduced the mean time to detect and remediate vulnerabilities.',
  'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ARRAY['Cloud', 'Architecture', 'DevOps', 'Platform Engineering'],
  true,
  now() - interval '20 days'
)
ON CONFLICT (slug) DO NOTHING;
