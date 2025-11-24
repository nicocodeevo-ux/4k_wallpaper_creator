
import React from 'react';
import { AspectRatio } from '../services/geminiService';

interface WallpaperDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  aspectRatio: AspectRatio;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center p-8">
     <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-400"></div>
    <h3 className="mt-4 text-xl font-semibold text-gray-200">Generating your masterpiece...</h3>
    <p className="mt-1 text-gray-400">This can take a moment. High-quality art needs time!</p>
  </div>
);

const Placeholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center p-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="mt-4 text-2xl font-bold text-gray-300">Your 4K Wallpaper Awaits</h3>
        <p className="mt-2 text-gray-400">Select your format and describe an abstract concept.</p>
    </div>
);

const WallpaperDisplay: React.FC<WallpaperDisplayProps> = ({ imageUrl, isLoading, aspectRatio }) => {
  // Determine container dimensions based on aspect ratio
  const containerClasses = aspectRatio === '16:9' 
    ? 'w-full aspect-video' 
    : 'w-full max-w-md aspect-[9/16]';

  return (
    <div className={`
      relative bg-gray-800/30 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-700 transition-all duration-500
      ${containerClasses}
    `}>
      {isLoading ? (
        <LoadingSpinner />
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt="Generated abstract wallpaper"
          className="w-full h-full object-cover"
        />
      ) : (
        <Placeholder />
      )}
    </div>
  );
};

export default WallpaperDisplay;
