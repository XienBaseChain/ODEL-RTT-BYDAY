import React from 'react';
import { TIME_SLOTS, KEY_MAPPING } from '../constants';
import { RawTimetableEntry } from '../types';

interface DailyScheduleTableProps {
  data: RawTimetableEntry[];
  dayIndex: number;
  onRoomClick: (roomData: RawTimetableEntry) => void;
}

const DailyScheduleTable: React.FC<DailyScheduleTableProps> = ({ data, dayIndex, onRoomClick }) => {
  // Get the keys for the selected day from the mapping
  const currentDayKeys = KEY_MAPPING[dayIndex];

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-[#36454F]">
            {/* Room Column Header */}
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider w-32 sticky left-0 bg-[#36454F] border-r border-gray-600 z-30 shadow-md">
              Room
            </th>
            {/* Time Slot Headers */}
            {TIME_SLOTS.map((slot, index) => (
              <th key={index} scope="col" className="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-wider min-w-[200px]">
                {slot.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((roomData, rowIndex) => {
            const roomName = roomData['DAY'];
            
            return (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors group">
                <td 
                  onClick={() => onRoomClick(roomData)}
                  className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 sticky left-0 bg-blue-50 border-r border-gray-200 z-20 cursor-pointer group-hover:bg-[#23a440]/10 group-hover:text-[#23a440] transition-colors shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]"
                  title="View full weekly schedule"
                >
                  <div className="flex items-center gap-2">
                    <span>{roomName}</span>
                    <svg className="w-4 h-4 text-[#23a440]/60 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </td>
                {currentDayKeys.map((key, slotIndex) => {
                  const content = roomData[key];
                  const hasContent = content && content.trim() !== '' && content !== roomName;

                  return (
                    <td key={key} className="px-2 py-3 align-top h-full">
                      {hasContent ? (
                        <div className="h-full w-full bg-[#23a440]/10 border-l-4 border-[#23a440] rounded p-3 shadow-sm hover:shadow-md transition-shadow">
                          <p className="text-xs font-semibold text-[#145220] line-clamp-3 leading-snug">
                            {content}
                          </p>
                        </div>
                      ) : (
                        <div className="h-full w-full"></div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          {data.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-gray-400 italic">
                No classes found matching your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DailyScheduleTable;