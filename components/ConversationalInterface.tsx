'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  content: ReactNode;
  type: 'user' | 'assistant';
  timestamp?: Date;
}

interface ConversationalInterfaceProps {
  messages: Message[];
  onSendMessage?: (message: string) => Promise<void>;
  placeholder?: string;
  isLoading?: boolean;
  ariaLabel?: string;
}

/**
 * 2026 Conversational Interface Component
 * Features:
 * - AI-driven chat interface
 * - Organic chat bubble shapes
 * - Smooth animations (respects prefers-reduced-motion)
 * - Accessible keyboard navigation
 * - Personalized interactions
 * - Hands-free voice support ready
 */
export default function ConversationalInterface({
  messages,
  onSendMessage,
  placeholder = 'Ask me anything...',
  isLoading = false,
  ariaLabel = 'Chat interface',
}: ConversationalInterfaceProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');
    inputRef.current?.focus();

    if (onSendMessage) {
      await onSendMessage(message);
    }
  };

  return (
    <div
      className="flex flex-col h-full max-h-96 bg-white rounded-3xl border border-warm-200 overflow-hidden shadow-lg"
      aria-label={ariaLabel}
      role="region"
    >
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 chat-container">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-center">
            <div className="text-text-muted">
              <p className="text-sm font-medium">No messages yet</p>
              <p className="text-xs mt-1">Start a conversation to get personalized help</p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`chat-bubble ${
                message.type === 'user'
                  ? 'chat-bubble-user bg-primary text-white'
                  : 'chat-bubble-assistant bg-warm-100 text-text-primary'
              }`}
              role="article"
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="chat-bubble chat-bubble-assistant bg-warm-100 text-text-primary">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-text-secondary animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-text-secondary animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 rounded-full bg-text-secondary animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      {onSendMessage && (
        <form
          onSubmit={handleSendMessage}
          className="border-t border-warm-200 p-4 flex gap-3"
          aria-label="Message input"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded-full border border-warm-200 bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-50 disabled:opacity-50"
            aria-label="Message input field"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="btn btn-primary px-4 py-2 text-sm"
            aria-label="Send message"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              '→'
            )}
          </button>
        </form>
      )}
    </div>
  );
}
