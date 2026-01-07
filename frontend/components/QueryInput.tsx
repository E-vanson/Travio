import { useState, useRef, KeyboardEvent } from 'react';

interface QueryInputProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export default function QueryInput({ onSubmit, isLoading }: QueryInputProps) {
  const [query, setQuery] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxLength = 500;

  const handleSubmit = () => {
    if (query.trim() && !isLoading) {
      onSubmit(query.trim());
      setQuery('');
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="glassmorphism rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-2xl">
      <div className="mb-6">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={query}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about travel visas and requirements..."
            className="w-full p-4 sm:p-5 border-2 border-border/50 rounded-2xl resize-none focus:ring-4 focus:ring-accent/20 focus:border-accent bg-surface/70 backdrop-blur-sm text-text-primary placeholder-text-secondary text-sm sm:text-base leading-relaxed transition-all duration-200 shadow-inner"
            rows={4}
            maxLength={maxLength}
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-3 text-xs text-text-secondary bg-surface/80 px-2 py-1 rounded-lg">
            {query.length}/{maxLength}
          </div>
        </div>
        <div className="flex justify-between items-center mt-3 text-sm text-text-secondary">
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-border rounded text-xs font-mono">Ctrl</kbd>
            <span>+</span>
            <kbd className="px-2 py-1 bg-border rounded text-xs font-mono">Enter</kbd>
            <span>to submit</span>
          </div>
          <div className="text-xs text-text-secondary">
            {query.length > maxLength * 0.8 && (
              <span className="text-orange-500 font-medium">
                {maxLength - query.length} characters remaining
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={!query.trim() || isLoading}
          className="bg-gradient-to-r from-accent to-accent-hover hover:from-accent-hover hover:to-accent disabled:from-border disabled:to-border disabled:cursor-not-allowed text-white font-semibold py-3 px-6 sm:py-4 sm:px-10 rounded-2xl transition-all duration-200 flex items-center space-x-2 sm:space-x-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none disabled:shadow-none text-sm sm:text-base"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span>Processing your question...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Ask Question</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}