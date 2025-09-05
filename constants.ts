
import { Birthday } from './types';

// To test the "Today's Birthday" feature, one of these dates should be set to today's date.
// For example, if today is June 10th, change one date to "1995-06-10".
const today = new Date();
const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
const currentDay = today.getDate().toString().padStart(2, '0');

export const BIRTHDAYS: Birthday[] = [
  { id: 1, name: 'Alice', date: `1995-${currentMonth}-${currentDay}` },
  { id: 2, name: 'Bob', date: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0].replace(/^\d{4}/, '1998') },
  { id: 3, name: 'Charlie', date: new Date(today.getTime() + 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0].replace(/^\d{4}/, '1992') },
  { id: 4, name: 'Diana', date: '1999-08-15' },
  { id: 5, name: 'Eve', date: '2001-11-22' },
  { id: 6, name: 'Frank', date: '1988-01-30' },
  { id: 7, name: 'Grace', date: '1996-09-05' },
];
