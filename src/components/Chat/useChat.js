import { useCallback, useEffect, useRef, useState } from 'react';

const MAX_MESSAGE_CHARS = 500;

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const send = useCallback(
    async (rawText) => {
      const text = (rawText || '').trim();
      if (!text || isLoading) return false;
      if (text.length > MAX_MESSAGE_CHARS) {
        setError(`Please keep questions under ${MAX_MESSAGE_CHARS} characters.`);
        return false;
      }

      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setError(null);
      setMessages((prev) => [...prev, { role: 'user', text }]);
      setIsLoading(true);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text }),
          signal: controller.signal,
        });

        if (res.status === 429) {
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', text: 'Too many questions at once — please wait a minute and try again.' },
          ]);
          return true;
        }

        let data = null;
        try {
          data = await res.json();
        } catch {
          // Non-JSON response (e.g. 404 HTML fallback in CRA dev server)
        }

        if (!res.ok) {
          const msg =
            (data && (data.reply || data.error)) ||
            (res.status === 404
              ? 'Chat API endpoint not found (/api/chat). Run with `vercel dev` locally.'
              : `Request failed with status ${res.status}.`);
          setError(msg);
          return false;
        }

        const reply =
          (data && typeof data.reply === 'string' && data.reply.trim()) ||
          'Something went wrong on my side. Please try again.';
        setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
        return true;
      } catch (err) {
        if (err && err.name === 'AbortError') return false;
        setError('Could not reach the assistant. Check your connection and try again.');
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  const resetError = useCallback(() => setError(null), []);

  return { messages, isLoading, error, send, resetError };
};

export default useChat;
