import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import useChat from './useChat';
import suggestedPrompts from './suggestedPrompts';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const { messages, isLoading, error, send, resetError } = useChat();
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    resetError();
    send(draft);
    setDraft('');
  };

  const toggle = () => {
    resetError();
    setIsOpen((v) => !v);
  };

  return (
    <>
      {/* Launcher sits above ScrollToTopButton (bottom-8 right-8) to avoid overlap */}
      <motion.button
        onClick={toggle}
        className="fixed bottom-24 right-8 bg-theme text-white p-3.5 rounded-full shadow-large focus:outline-none transition-all duration-300 z-50 hover:-translate-y-1 hover:brightness-110"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={isOpen}
      >
        {isOpen ? <FaTimes size={16} /> : <FaComments size={16} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            className="command-palette-panel fixed bottom-40 right-4 sm:right-8 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-neutral-800 shadow-large overflow-hidden flex flex-col"
            style={{ height: '480px', maxHeight: '60vh' }}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            aria-label="Ask about Jason"
            role="dialog"
          >
            <header className="px-4 py-3 border-b border-neutral-800 flex items-center gap-2">
              <div>
                <p className="text-sm font-semibold text-neutral-50">Ask about Jason</p>
                <p className="text-xs text-neutral-400">Background, skills, projects</p>
              </div>
            </header>

            <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3" aria-live="polite">
              {messages.length === 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-neutral-400">
                    Hi! I can answer questions about Jason&apos;s experience, skills, and projects.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => send(prompt)}
                        disabled={isLoading}
                        className="text-xs px-3 py-1.5 rounded-full border border-neutral-700 text-neutral-200 hover:border-theme hover:text-theme transition-colors disabled:opacity-50"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <p
                    className={`max-w-[85%] text-sm px-3 py-2 rounded-2xl whitespace-pre-wrap break-words ${
                      msg.role === 'user'
                        ? 'bg-theme text-on-accent rounded-br-md'
                        : 'bg-neutral-800 text-neutral-100 rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </p>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <p className="text-sm px-3 py-2 rounded-2xl rounded-bl-md bg-neutral-800 text-neutral-400">
                    <span className="shimmer-bg inline-block w-16 h-3 rounded" aria-hidden="true" />
                    <span className="sr-only">Thinking…</span>
                  </p>
                </div>
              )}

              {error && (
                <p className="text-xs text-red-400" role="alert">
                  {error}
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-3 border-t border-neutral-800 flex items-center gap-2">
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={500}
                placeholder="Ask about Jason…"
                aria-label="Ask about Jason"
                className="command-palette-input flex-1 bg-transparent text-sm px-3 py-2 rounded-xl border border-neutral-700 focus:outline-none focus:border-theme placeholder:text-neutral-500"
              />
              <button
                type="submit"
                disabled={isLoading || !draft.trim()}
                className="btn-primary p-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <FaPaperPlane size={14} />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
