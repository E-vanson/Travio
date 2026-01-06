import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ResponseDisplayProps {
  response: string;
  timestamp: string;
}

export default function ResponseDisplay({ response, timestamp }: ResponseDisplayProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(response);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-4 fade-in">
      <div className="flex justify-between items-start mb-4">
        <div className="text-sm text-gray-500">
          Response received at {formatTimestamp(timestamp)}
        </div>
        <button
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
          title="Copy to clipboard"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

      <div className="prose prose-sm max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {response}
        </ReactMarkdown>
      </div>
    </div>
  );
}