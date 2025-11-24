
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
        Abstract 4K Wallpaper Creator
      </h1>
      <p className="mt-2 text-lg text-gray-300">
        Craft your perfect desktop background with the power of AI
      </p>
    </header>
  );
};

export default Header;
