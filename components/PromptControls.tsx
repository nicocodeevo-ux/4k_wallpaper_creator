
import React from 'react';
import { AspectRatio } from '../services/geminiService';

interface PromptControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const PromptControls: React.FC<PromptControlsProps> = ({ 
  prompt, 
  setPrompt, 
  aspectRatio, 
  setAspectRatio, 
  onGenerate, 
  isLoading 
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onGenerate();
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Format Selection */}
      <div className="flex justify-center sm:justify-start gap-2">
        <button
          onClick={() => setAspectRatio('16:9')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            aspectRatio === '16:9'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 ring-1 ring-purple-400'
              : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Desktop (16:9)
        </button>
        <button
          onClick={() => setAspectRatio('9:16')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            aspectRatio === '9:16'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 ring-1 ring-purple-400'
              : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Mobile (9:16)
        </button>
      </div>

      {/* Input and Button */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
        <div className="relative flex-grow w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., liquid metal waves, futuristic cityscape"
            className="w-full bg-gray-700/50 border border-gray-600 rounded-full py-3 pr-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            disabled={isLoading}
          />
        </div>
        <button
          onClick={onGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold rounded-full hover:from-purple-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 min-w-[140px]"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </>
          ) : (
            'Generate'
          )}
        </button>
      </div>
    </div>
  );
};

export default PromptControls;
