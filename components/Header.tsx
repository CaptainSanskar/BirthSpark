
import React from 'react';
import { Icon } from './Icon';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="p-4 sm:p-6 flex justify-between items-center bg-white/20 backdrop-blur-lg dark:bg-black/20">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center">
            <Icon name="spark_logo" className="w-7 h-7 text-orange-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Birth Spark</h1>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        <Icon name={theme === 'light' ? 'moon' : 'sun'} className="w-6 h-6" />
      </button>
    </header>
  );
};

export default Header;