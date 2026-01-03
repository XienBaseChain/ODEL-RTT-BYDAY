import React, { useState, useRef, useEffect } from 'react';

interface RoomFilterProps {
  rooms: string[];
  selectedRooms: string[];
  onChange: (selected: string[]) => void;
}

const RoomFilter: React.FC<RoomFilterProps> = ({ rooms, selectedRooms, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleRoom = (room: string) => {
    if (selectedRooms.includes(room)) {
      onChange(selectedRooms.filter((r) => r !== room));
    } else {
      onChange([...selectedRooms, room]);
    }
  };

  return (
    <div className="relative sm:w-72" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full cursor-pointer rounded-lg border border-gray-200 bg-white py-3 pl-3 pr-10 text-left shadow-sm focus:border-[#23a440] focus:outline-none focus:ring-2 focus:ring-[#23a440] sm:text-sm hover:bg-gray-50 transition-colors"
      >
        <span className={`block truncate ${selectedRooms.length === 0 ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>
          {selectedRooms.length === 0
            ? 'Filter by Room (All)'
            : `Selected ${selectedRooms.length} Room${selectedRooms.length === 1 ? '' : 's'}`}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
           <div className="sticky top-0 z-20 bg-gray-50 px-4 py-2 border-b border-gray-100 flex justify-between items-center backdrop-blur-sm bg-opacity-90">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Available Rooms</span>
              {selectedRooms.length > 0 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onChange([]);
                    }}
                    className="text-xs text-[#23a440] hover:text-[#1a7a30] font-bold uppercase tracking-wider"
                >
                    Clear All
                </button>
              )}
           </div>
          {rooms.map((room) => {
            const isSelected = selectedRooms.includes(room);
            return (
              <div
                key={room}
                className={`relative cursor-pointer select-none py-3 pl-4 pr-4 hover:bg-gray-50 transition-colors ${isSelected ? 'bg-[#23a440]/10' : ''}`}
                onClick={() => handleToggleRoom(room)}
              >
                <div className="flex items-center">
                  <div className={`flex items-center justify-center h-5 w-5 rounded border ${isSelected ? 'bg-[#23a440] border-[#23a440]' : 'border-gray-300 bg-white'}`}>
                     {isSelected && (
                         <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                     )}
                  </div>
                  <span className={`ml-3 block truncate ${isSelected ? 'font-semibold text-[#145220]' : 'text-gray-700'}`}>
                    {room}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RoomFilter;