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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 bg-surface border-r border-border transform transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'w-0 sm:w-16' : 'w-56 sm:w-64 md:w-72 lg:w-80'
      } lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className={`flex items-center justify-between p-4 border-b border-border ${
            sidebarCollapsed ? 'px-3' : 'px-6'
          }`}>
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="w-8 h-8 bg-border rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              {!sidebarCollapsed && (
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-semibold text-text-primary">History</h2>
                  <p className="text-xs text-text-secondary">{history.length} queries</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-border rounded-lg transition-colors"
            >
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${sidebarCollapsed ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* History Content */}
          {!sidebarCollapsed && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {history.length === 0 ? (
                <div className="text-center text-text-secondary mt-12 px-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent/20 to-accent-hover/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-text-primary mb-2">No queries yet</h3>
                  <p className="text-sm text-text-secondary">Your travel questions and AI responses will appear here</p>
                </div>
              ) : (
                history.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => handleSubmit(item.query)}
                    className="p-3 rounded-lg hover:bg-border cursor-pointer transition-colors group"
                  >
                    <div className="text-sm text-text-primary line-clamp-2 mb-1">
                      {item.query}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {new Date(item.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Sidebar Footer */}
          {!sidebarCollapsed && history.length > 0 && (
            <div className="p-4 border-t border-border bg-surface/50">
              <button
                onClick={clearHistory}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02] text-sm"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Clear All History</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'lg:ml-16' : 'md:ml-72 lg:ml-80'
      }`}>
        {/* Mobile menu button */}
        <div className={`lg:hidden fixed top-4 left-4 z-40 ${sidebarCollapsed ? '' : 'hidden'}`}>
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="bg-surface shadow-lg rounded-lg p-2 text-text-secondary hover:text-text-primary"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Overlay for mobile */}
        {!sidebarCollapsed && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarCollapsed(true)}
          />
        )}

        <div className={`min-h-screen py-6 px-4 sm:py-8 sm:px-6 md:px-8 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:px-8' : 'lg:pl-8 lg:pr-16'
        }`}>
          <div className={`max-w-4xl mx-auto transition-all duration-300 ${
            sidebarCollapsed ? '' : 'md:max-w-5xl lg:max-w-6xl'
          }`}>
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-accent to-accent-hover rounded-2xl mb-4 sm:mb-6 shadow-lg">
                <span className="text-xl sm:text-2xl">🛫</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent mb-4">
                Travio
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary font-medium max-w-2xl mx-auto leading-relaxed px-4">
                Your intelligent AI travel assistant for visa requirements and journey planning
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

            {/* Footer */}
            <div className="text-center mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border/50 px-4">
              <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Powered by DeepSeek R1</span>
                </div>
                <div className="w-1 h-1 bg-border rounded-full"></div>
                <span>via OpenRouter</span>
              </div>
              <p className="mt-2 text-xs text-text-secondary">
                Intelligent travel assistance at your fingertips
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}