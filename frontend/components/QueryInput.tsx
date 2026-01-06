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
    <div className="glassmorphism rounded-2xl p-6 mb-6">
      <div className="mb-4">
        <textarea
          ref={textareaRef}
          value={query}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about travel visas and requirements..."
          className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
          rows={4}
          maxLength={maxLength}
          disabled={isLoading}
        />
        <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
          <span>Press Ctrl+Enter to submit</span>
          <span>{query.length}/{maxLength}</span>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={!query.trim() || isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-8 rounded-xl transition-colors duration-200 flex items-center space-x-2"
        >
          {isLoading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          <span>{isLoading ? 'Processing...' : 'Ask Question'}</span>
        </button>
      </div>
    </div>
  );
}