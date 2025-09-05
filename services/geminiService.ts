import { Birthday } from '../types';

const WISH_TEMPLATES = [
  "HBD {name}! Hope you have the best day, you deserve it! 🎉",
  "Happy birthday, {name}! Wishing you a year full of good vibes and great memories. ✨",
  "Another trip around the sun for {name}! Hope it's a great one. 🎂",
  "Happy level-up day, {name}! May this next year be your best one yet. 🚀",
  "Cheers to you on your birthday, {name}! Have an amazing day. 🥳",
  "Happy birthday {name}! Sending you all the good energy for your special day. 💖",
  "It's {name}'s main character day! Happy birthday! 👑",
  "Wishing the happiest of birthdays to the one and only {name}! 🎈"
];


export const generateBirthdayWish = (person: Birthday): string => {
  const randomIndex = Math.floor(Math.random() * WISH_TEMPLATES.length);
  const template = WISH_TEMPLATES[randomIndex];
  
  return template.replace('{name}', person.name);
};
