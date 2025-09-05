import React from 'react';
import { getColorForName } from '../utils/colorUtils';

interface AvatarProps {
  name: string;
  sizeClasses: string;
  textClasses: string;
  extraClasses?: string;
}

const getInitials = (name: string): string => {
  const cleanedName = name.trim();
  if (!cleanedName) return '?';
  
  const parts = cleanedName.split(' ').filter(Boolean);
  if (parts.length === 0) return '?';

  if (parts.length > 1) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  
  return parts[0][0].toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({ name, sizeClasses, textClasses, extraClasses = '' }) => {
  const initials = getInitials(name);
  const bgColor = getColorForName(name);

  return (
    <div
      className={`flex items-center justify-center shrink-0 rounded-full ${sizeClasses} ${extraClasses}`}
      style={{ backgroundColor: bgColor }}
      aria-label={name}
    >
      <span className={`text-white font-bold ${textClasses}`}>
        {initials}
      </span>
    </div>
  );
};

export default Avatar;
