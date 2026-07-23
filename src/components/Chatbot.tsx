import { useEffect, useRef, useState } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { PROFILE } from '../lib/data';

interface Msg {
  role: 'user' | 'assistant';
  content: string;
}

const STORAGE_KEY = 'portfolio_chat_session';

function getSessionId() {
  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}

const WELCOME: Msg = {
  role: 'assistant',
  content: `Hi! I'm Simpy's AI assistant. Ask me about his 21+ years in network management, video surveillance, systems programming, or his projects and experience.`,
};

interface ReplyRule {
  keywords: string[];
  reply: string;
}

function matchReply(message: string, rules: ReplyRule[]): string {
  const msg = message.toLowerCase().trim();
  for (const rule of rules) {
    if (rule.keywords.some((kw) => msg.includes(kw))) {
      return rule.reply;
    }
  }
  return rules.find((r) => r.keywords.length === 0)?.reply
    ?? "Great question! I can tell you about Simpy's 21+ years of experience, his projects, technical skills, or how to get in touch. What interests you most?";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Msg = { role: 'user', content: text };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    const sessionId = getSessionId();

    try {
      let reply: string | null = null;

      if (supabase) {
        supabase.from('chat_messages').insert({
          session_id: sessionId,
          role: 'user',
          content: text,
        }).then(({ error }) => {
          if (error) console.warn('Failed to persist user message:', error.message);
        });

        const { data, error } = await supabase.functions.invoke('ai-chatbot', {
          body: { message: text, sessionId },
        });

        if (!error && data?.reply) {
          reply = data.reply;
          supabase.from('chat_messages').insert({
            session_id: sessionId,
            role: 'assistant',
            content: reply,
          }).then(({ error }) => {
            if (error) console.warn('Failed to persist assistant message:', error.message);
          });
        }
      }

      if (!reply) {
        const res = await fetch(`${import.meta.env.BASE_URL}chat-reply.json`);
        if (res.ok) {
          const rules = await res.json();
          reply = matchReply(text, rules);
        }
      }

      if (!reply) {
        reply = `I'm having trouble connecting right now. Feel free to reach out to ${PROFILE.name} directly at ${PROFILE.email}.`;
      }

      setMessages((m) => [...m, { role: 'assistant', content: reply! }]);
    } catch {
      const fallback: Msg = {
        role: 'assistant',
        content: `I'm having trouble connecting right now. Feel free to reach out to ${PROFILE.name} directly at ${PROFILE.email}.`,
      };
      setMessages((m) => [...m, fallback]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-600/40 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          open ? 'rotate-90 opacity-0 pointer-events-none' : 'rotate-0 opacity-100'
        }`}
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full ring-2 ring-white dark:ring-slate-950 animate-pulse" />
      </button>

      <div
        className={`fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[32rem] max-h-[80vh] origin-bottom-right transition-all duration-300 ${
          open ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-brand-600 text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-sm">AI Assistant</p>
                <p className="text-xs text-white/70">Ask me anything</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-brand-600 text-white rounded-br-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-sm'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="w-10 h-10 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
