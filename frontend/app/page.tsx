'use client';

import { useState } from 'react';
import QueryInput from '../components/QueryInput';
import ResponseDisplay from '../components/ResponseDisplay';
import LoadingState from '../components/LoadingState';
import ErrorMessage from '../components/ErrorMessage';
import { submitQuery, QueryResponse, ApiError } from '../lib/api';

interface HistoryItem {
  id: string;
  query: string;
  response: string;
  timestamp: string;
}

export default function Home() {
  const [currentResponse, setCurrentResponse] = useState<QueryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setCurrentResponse(null);

    try {
      const response = await submitQuery(query);

      // Add to history
      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        query: response.query,
        response: response.response,
        timestamp: response.timestamp,
      };

      setHistory(prev => [historyItem, ...prev]);
      setCurrentResponse(response);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const retryLastQuery = () => {
    if (history.length > 0) {
      handleSubmit(history[0].query);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🛫 Travio
          </h1>
          <p className="text-lg text-gray-600">
            Your AI Travel Assistant for Visa and Travel Requirements
          </p>
        </div>

        {/* Query Input */}
        <QueryInput onSubmit={handleSubmit} isLoading={isLoading} />

        {/* Error Display */}
        {error && (
          <ErrorMessage
            message={error}
            onRetry={history.length > 0 ? retryLastQuery : undefined}
          />
        )}

        {/* Loading State */}
        {isLoading && <LoadingState />}

        {/* Current Response */}
        {currentResponse && !isLoading && (
          <ResponseDisplay
            response={currentResponse.response}
            timestamp={currentResponse.timestamp}
          />
        )}

        {/* History Section */}
        {history.length > 0 && (
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <svg
                  className={`w-5 h-5 transition-transform ${showHistory ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="font-medium">
                  Query History ({history.length})
                </span>
              </button>

              <button
                onClick={clearHistory}
                className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
              >
                Clear History
              </button>
            </div>

            {showHistory && (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {history.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm text-gray-500">
                        {new Date(item.timestamp).toLocaleString()}
                      </div>
                      <button
                        onClick={() => handleSubmit(item.query)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Retry
                      </button>
                    </div>
                    <div className="mb-2">
                      <strong className="text-gray-800">Q:</strong> {item.query}
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-3">
                      <strong>A:</strong> {item.response.substring(0, 200)}...
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Powered by DeepSeek R1 via OpenRouter</p>
        </div>
      </div>
    </div>
  );
}