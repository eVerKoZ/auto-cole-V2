import React from 'react';
import { Car } from 'lucide-react';

interface LogoProps {
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ color = 'currentColor' }) => {
  return (
    <div className="flex items-center justify-center">
      <div className={`rounded-full p-1 ${color === 'white' ? 'bg-white' : 'bg-primary-600'}`}>
        <Car 
          size={28} 
          className={color === 'white' ? 'text-primary-600' : 'text-white'} 
          strokeWidth={2.5}
        />
      </div>
    </div>
  );
};

export default Logo;