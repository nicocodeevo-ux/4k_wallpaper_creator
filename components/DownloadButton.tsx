
import React from 'react';

interface DownloadButtonProps {
  imageUrl: string | null;
  onDownload: () => void;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ imageUrl, onDownload }) => {
  if (!imageUrl) {
    return null;
  }

  return (
    <div className="w-full flex justify-center mt-4">
      <button
        onClick={onDownload}
        className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download 4K
      </button>
    </div>
  );
};

export default DownloadButton;
