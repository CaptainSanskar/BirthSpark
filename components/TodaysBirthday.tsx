import React from 'react';
import { Birthday } from '../types';
import { calculateAge } from '../utils/dateUtils';
import Confetti from './Confetti';
import { Icon } from './Icon';
import Avatar from './Avatar';

interface TodaysBirthdayProps {
  birthdays: Birthday[];
  onGenerateWish: (person: Birthday) => void;
  onDelete: (id: number) => void;
}

const TodaysBirthday: React.FC<TodaysBirthdayProps> = ({ birthdays, onGenerateWish, onDelete }) => {
  if (birthdays.length === 0) {
    return (
      <div className="text-center p-6 bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 shadow-lg dark:bg-gray-800/30 dark:border-gray-700/50">
        <p className="text-gray-600 dark:text-gray-400">No birthdays today. Check back tomorrow!</p>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Today's Birthdays</h2>
      <div className="space-y-4">
        {birthdays.map((person) => {
          const age = calculateAge(person.date);
          
          return (
            <div key={person.id} className="relative overflow-hidden p-5 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl shadow-xl text-white dark:from-gray-700 dark:to-gray-800">
              <Confetti />
              <button 
                onClick={() => onDelete(person.id)}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors dark:bg-black/20 dark:hover:bg-black/40"
                aria-label={`Delete ${person.name}'s birthday`}
                >
                <Icon name="trash" className="w-5 h-5 text-white/80" />
              </button>
              <div className="relative z-10 flex flex-col items-center text-center">
                <Avatar 
                  name={person.name}
                  sizeClasses="w-24 h-24"
                  textClasses="text-4xl"
                  extraClasses="border-4 border-white/50 shadow-lg mb-4"
                />
                <p className="text-sm font-semibold uppercase tracking-wider">It's</p>
                <h3 className="text-3xl font-extrabold">{person.name}'s Birthday!</h3>
                <p className="mt-1 text-lg font-medium opacity-90">Turning {age} today</p>
                <button
                    onClick={() => onGenerateWish(person)}
                    className="mt-4 flex items-center gap-2 bg-white/90 text-teal-600 font-semibold px-4 py-2 rounded-full shadow-md hover:bg-white transition-transform transform hover:scale-105 dark:bg-white/90 dark:text-gray-800 dark:hover:bg-white"
                >
                    <Icon name="sparkles" className="w-5 h-5" />
                    Generate Wish
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TodaysBirthday;
