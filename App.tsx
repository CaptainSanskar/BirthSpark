
import React, { useState, useMemo, useEffect } from 'react';
import { Birthday } from './types';
import { BIRTHDAYS } from './constants';
import Header from './components/Header';
import TodaysBirthday from './components/TodaysBirthday';
import BirthdayList from './components/BirthdayList';
import WishGeneratorModal from './components/WishGeneratorModal';
import AddBirthdayModal from './components/AddBirthdayModal';
import { Icon } from './components/Icon';

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};

const App: React.FC = () => {
  const [birthdays, setBirthdays] = useState<Birthday[]>(() => {
    try {
      const savedBirthdays = localStorage.getItem('birthdays');
      if (savedBirthdays) {
        const parsed = JSON.parse(savedBirthdays);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to parse birthdays from localStorage", e);
    }
    return BIRTHDAYS;
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Birthday | null>(null);

  useEffect(() => {
    localStorage.setItem('birthdays', JSON.stringify(birthdays));
  }, [birthdays]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  const handleOpenWishModal = (person: Birthday) => {
    setSelectedPerson(person);
    setIsWishModalOpen(true);
  };

  const handleCloseWishModal = () => {
    setIsWishModalOpen(false);
    setSelectedPerson(null);
  };
  
  const handleAddBirthday = (newBirthdayData: Omit<Birthday, 'id'>) => {
    const newBirthday: Birthday = {
        ...newBirthdayData,
        id: Date.now(), // Simple unique ID
    };
    setBirthdays(prev => [...prev, newBirthday]);
    setIsAddModalOpen(false);
  };

  const handleDeleteBirthday = (id: number) => {
    setBirthdays(prev => prev.filter(b => b.id !== id));
  };

  const { todaysBirthdays, upcomingBirthdays, otherBirthdays } = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const sortedBirthdays = [...birthdays].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      dateA.setFullYear(now.getFullYear());
      dateB.setFullYear(now.getFullYear());
      if (dateA < now) dateA.setFullYear(now.getFullYear() + 1);
      if (dateB < now) dateB.setFullYear(now.getFullYear() + 1);
      return dateA.getTime() - dateB.getTime();
    });

    const todays = sortedBirthdays.filter(b => {
      const bDate = new Date(b.date);
      return bDate.getDate() === now.getDate() && bDate.getMonth() === now.getMonth();
    });

    const upcoming = sortedBirthdays.filter(b => {
      const bDate = new Date(b.date);
      const isToday = bDate.getDate() === now.getDate() && bDate.getMonth() === now.getMonth();
      if (isToday) return false;

      bDate.setFullYear(now.getFullYear());
      if (bDate < now) {
        bDate.setFullYear(now.getFullYear() + 1);
      }
      
      const diffTime = bDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30 && diffDays > 0; // Upcoming in the next 30 days
    });

    const others = sortedBirthdays.filter(b => 
        !todays.some(tb => tb.id === b.id) && 
        !upcoming.some(ub => ub.id === b.id)
    );

    return {
      todaysBirthdays: todays,
      upcomingBirthdays: upcoming,
      otherBirthdays: others
    };
  }, [birthdays]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-100 text-gray-800 dark:from-gray-900 dark:to-black dark:text-gray-200">
      <div className="max-w-md mx-auto min-h-screen bg-white/20 backdrop-blur-xl shadow-2xl dark:bg-black/20">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main className="p-4 sm:p-6 pb-20 space-y-8">
          <TodaysBirthday birthdays={todaysBirthdays} onGenerateWish={handleOpenWishModal} onDelete={handleDeleteBirthday} />
          <BirthdayList 
            title="Upcoming Birthdays"
            birthdays={upcomingBirthdays}
            onGenerateWish={handleOpenWishModal}
            onDelete={handleDeleteBirthday}
          />
          <BirthdayList 
            title="Later This Year"
            birthdays={otherBirthdays}
            onGenerateWish={handleOpenWishModal}
            onDelete={handleDeleteBirthday}
          />
        </main>
      </div>

      {selectedPerson && (
        <WishGeneratorModal
          isOpen={isWishModalOpen}
          onClose={handleCloseWishModal}
          person={selectedPerson}
        />
      )}
      
      <AddBirthdayModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddBirthday}
      />
      
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-6 right-6 bg-orange-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-orange-600 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
        aria-label="Add new birthday"
      >
        <Icon name="plus" className="w-8 h-8"/>
      </button>
    </div>
  );
};

export default App;