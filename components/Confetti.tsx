
import React from 'react';

const ConfettiPiece: React.FC<{ index: number }> = ({ index }) => {
  const colors = ['bg-yellow-300', 'bg-pink-400', 'bg-blue-400', 'bg-teal-300', 'bg-purple-400'];
  const animations = ['animate-fall-1', 'animate-fall-2', 'animate-fall-3'];

  const color = colors[index % colors.length];
  const animation = animations[index % animations.length];
  const size = Math.random() * (12 - 6) + 6;
  const left = `${Math.random() * 100}%`;
  const animationDelay = `${Math.random() * 2}s`;
  const animationDuration = `${2 + Math.random() * 2}s`;

  return (
    <div
      className={`absolute top-[-20px] rounded-full ${color} ${animation}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left,
        animationDelay,
        animationDuration,
        animationFillMode: 'forwards',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear'
      }}
    ></div>
  );
};

const Confetti: React.FC = () => {
  const confettiCount = 50;

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <style>{`
        @keyframes fall-1 {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(150px) rotate(360deg); opacity: 0; }
        }
        @keyframes fall-2 {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(180px) rotate(-360deg); opacity: 0; }
        }
        @keyframes fall-3 {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(200px) rotate(270deg); opacity: 0; }
        }
        .animate-fall-1 { animation-name: fall-1; }
        .animate-fall-2 { animation-name: fall-2; }
        .animate-fall-3 { animation-name: fall-3; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-slide-up { animation: slideUp 0.4s ease-out forwards; }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
      {Array.from({ length: confettiCount }).map((_, i) => (
        <ConfettiPiece key={i} index={i} />
      ))}
    </div>
  );
};

export default Confetti;
