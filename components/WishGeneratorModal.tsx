import React, { useState, useCallback, useEffect } from 'react';
import { Birthday } from '../types';
import { generateBirthdayWish } from '../services/geminiService';
import { Icon } from './Icon';

interface WishGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  person: Birthday;
}

const WishGeneratorModal: React.FC<WishGeneratorModalProps> = ({ isOpen, onClose, person }) => {
  const [wish, setWish] = useState('');

  const handleGenerateWish = useCallback(() => {
    const generatedWish = generateBirthdayWish(person);
    setWish(generatedWish);
  }, [person]);

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setWish('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-sm bg-white/60 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-2xl p-6 text-center animate-slide-up dark:bg-gray-900/60 dark:border-gray-700/50">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
            <Icon name="close" className="w-6 h-6" />
          </button>
        </div>

        <Icon name="cake" className="w-16 h-16 text-orange-500 mx-auto -mt-4" />
        
        <h3 className="text-2xl font-bold mt-2 text-gray-900 dark:text-gray-100">
          Wish for <span className="text-orange-600 dark:text-orange-500">{person.name}</span>
        </h3>

        <div className="mt-4 min-h-[100px] bg-white/50 p-4 rounded-xl text-gray-700 text-left dark:bg-black/20 dark:text-gray-300">
          {wish ? (
            <p className="text-lg leading-relaxed">{wish}</p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Click below to generate a unique birthday message!</p>
          )}
        </div>
        
        <button
          onClick={handleGenerateWish}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-teal-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 dark:bg-teal-600 dark:hover:bg-teal-700"
        >
          <Icon name="sparkles" className="w-5 h-5" />
          Generate Wish
        </button>
      </div>
    </div>
  );
};

export default WishGeneratorModal;
