
import React, { useState } from 'react';
import { Birthday } from '../types';
import { Icon } from './Icon';

interface AddBirthdayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (birthday: Omit<Birthday, 'id'>) => void;
}

const AddBirthdayModal: React.FC<AddBirthdayModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !date) {
      setError('Please fill out both name and date.');
      return;
    }
    onAdd({ name, date });
    setName('');
    setDate('');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-sm bg-white/60 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-2xl p-6 animate-slide-up dark:bg-gray-900/60 dark:border-gray-700/50">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Add a Birthday</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
                <Icon name="close" className="w-6 h-6" />
            </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white/80 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm dark:bg-gray-700/80 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                    placeholder="e.g., Jane Doe"
                />
            </div>
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Birth Date</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white/80 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm dark:bg-gray-700/80 dark:text-white dark:border-gray-600"
                />
            </div>
            
            {error && <p className="text-sm text-red-600 dark:text-red-500">{error}</p>}

            <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
                >
                <Icon name="gift" className="w-5 h-5"/>
                Save Birthday
            </button>
        </form>
      </div>
    </div>
  );
};

export default AddBirthdayModal;