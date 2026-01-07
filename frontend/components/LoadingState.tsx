export default function LoadingState() {
  return (
    <div className="bg-surface/95 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 mb-6 fade-in border border-border">
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent/30 border-t-accent"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent-hover animate-spin" style={{ animationDuration: '1.5s' }}></div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-text-primary">Analyzing your question...</h3>
          <p className="text-sm text-text-secondary">Consulting travel databases and AI</p>
        </div>
      </div>

      {/* Enhanced skeleton loader */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-gradient-to-r from-accent to-accent-hover rounded-full animate-pulse"></div>
          <div className="pulse-skeleton h-4 bg-gradient-to-r from-border to-surface rounded-full flex-1"></div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-gradient-to-r from-accent to-accent-hover rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="pulse-skeleton h-4 bg-gradient-to-r from-border to-surface rounded-full w-5/6"></div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-gradient-to-r from-accent to-accent-hover rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          <div className="pulse-skeleton h-4 bg-gradient-to-r from-border to-surface rounded-full w-4/5"></div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-gradient-to-r from-accent to-accent-hover rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
          <div className="pulse-skeleton h-4 bg-gradient-to-r from-border to-surface rounded-full w-3/4"></div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-text-secondary font-medium">Processing with DeepSeek R1 AI</span>
        </div>
        <p className="mt-2 text-xs text-text-secondary">
          This usually takes 10-30 seconds depending on query complexity
        </p>
      </div>
    </div>
  );
}