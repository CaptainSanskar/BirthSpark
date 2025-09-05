import React from 'react';
import { Birthday } from '../types';
import BirthdayCard from './BirthdayCard';
import { Icon } from './Icon';

interface BirthdayListProps {
  title: string;
  birthdays: Birthday[];
  onGenerateWish: (person: Birthday) => void;
  onDelete: (id: number) => void;
}

const BirthdayList: React.FC<BirthdayListProps> = ({ title, birthdays, onGenerateWish, onDelete }) => {
  if (birthdays.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">{title}</h2>
      {birthdays.length > 0 ? (
        <div className="space-y-3">
          {birthdays.map((person) => (
            <BirthdayCard key={person.id} person={person} onGenerateWish={onGenerateWish} onDelete={onDelete} />
          ))}
        </div>
      ) : (
        <div className="text-center p-4 bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 dark:bg-gray-800/30 dark:border-gray-700/50">
           <p className="text-gray-500 dark:text-gray-400">No birthdays in this category.</p>
        </div>
      )}
    </section>
  );
};

export default BirthdayList;