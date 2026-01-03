import React from 'react';
import { DAYS } from '../constants';

interface DaySelectorProps {
  activeDayIndex: number;
  onSelectDay: (index: number) => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({ activeDayIndex, onSelectDay }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {DAYS.map((day, index) => {
        const isActive = activeDayIndex === index;
        return (
          <button
            key={day}
            onClick={() => onSelectDay(index)}
            className={`
              px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out
              ${isActive 
                ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              }
            `}
          >
            {day.charAt(0) + day.slice(1).toLowerCase()}
          </button>
        );
      })}
    </div>
  );
};

export default DaySelector;