import React from 'react';
import { Birthday } from '../types';
import { calculateAge, getDaysRemaining, formatDate } from '../utils/dateUtils';
import { Icon } from './Icon';
import Avatar from './Avatar';

interface BirthdayCardProps {
  person: Birthday;
  onGenerateWish: (person: Birthday) => void;
  onDelete: (id: number) => void;
}

const BirthdayCard: React.FC<BirthdayCardProps> = ({ person, onGenerateWish, onDelete }) => {
  const age = calculateAge(person.date);
  const daysRemaining = getDaysRemaining(person.date);

  const dayText = daysRemaining === 1 ? '1 day left' : `${daysRemaining} days left`;

  return (
    <div className="p-4 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg flex items-center space-x-4 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl dark:bg-gray-800/40 dark:border-gray-700/50">
      <Avatar
        name={person.name}
        sizeClasses="w-14 h-14"
        textClasses="text-xl"
        extraClasses="border-2 border-white"
      />
      <div className="flex-grow">
        <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">{person.name}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Turns {age + 1} on {formatDate(person.date)}
        </p>
        <p className="text-sm font-semibold text-teal-600 dark:text-teal-400">{dayText}</p>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onGenerateWish(person)}
          className="p-3 bg-white/70 rounded-full text-teal-500 hover:bg-white hover:text-teal-600 transition-all duration-200 shadow-sm hover:shadow-md dark:bg-gray-700/70 dark:text-teal-400 dark:hover:bg-gray-600"
          aria-label={`Generate wish for ${person.name}`}
        >
          <Icon name="sparkles" className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onDelete(person.id)}
          className="p-3 bg-white/70 rounded-full text-red-500 hover:bg-white hover:text-red-600 transition-all duration-200 shadow-sm hover:shadow-md dark:bg-gray-700/70 dark:text-red-400 dark:hover:bg-gray-600"
          aria-label={`Delete ${person.name}'s birthday`}
        >
          <Icon name="trash" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default BirthdayCard;
