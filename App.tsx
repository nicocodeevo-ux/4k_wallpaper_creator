
import React, { useState, useCallback } from 'react';
import { generateAbstractWallpaper, AspectRatio } from './services/geminiService';
import Header from './components/Header';
import PromptControls from './components/PromptControls';
import WallpaperDisplay from './components/WallpaperDisplay';
import DownloadButton from './components/DownloadButton';
import ErrorDisplay from './components/ErrorDisplay';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('cosmic nebula with vibrant colors');
  
  // Initialize aspect ratio based on screen width (mobile first if screen is small)
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? '9:16' : '16:9';
    }
    return '16:9';
  });

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setImageUrl(null);
    setError(null);

    try {
      const base64Image = await generateAbstractWallpaper(prompt, aspectRatio);
      const dataUrl = `data:image/jpeg;base64,${base64Image}`;
      setImageUrl(dataUrl);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio, isLoading]);

  const handleDownload = useCallback(() => {
    if (!imageUrl) return;

    const link = document.createElement('a');
    link.href = imageUrl;
    const safePrompt = prompt.replace(/[^a-z0-9]/gi, '_').toLowerCase().substring(0, 30);
    const type = aspectRatio === '16:9' ? 'desktop' : 'mobile';
    link.download = `wallpaper_${type}_${safePrompt}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [imageUrl, prompt, aspectRatio]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 md:p-8 font-sans">
      <Header />
      <main className="w-full max-w-5xl flex flex-col items-center gap-8 mt-8">
        <WallpaperDisplay 
          imageUrl={imageUrl} 
          isLoading={isLoading} 
          aspectRatio={aspectRatio}
        />
        <ErrorDisplay error={error} />
        <div className="w-full bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-700 sticky bottom-4 z-10">
          <PromptControls
            prompt={prompt}
            setPrompt={setPrompt}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          <DownloadButton imageUrl={imageUrl} onDownload={handleDownload} />
        </div>
      </main>
    </div>
  );
};

export default App;
