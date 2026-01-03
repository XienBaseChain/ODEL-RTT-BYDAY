import React from 'react';
import { TIME_SLOTS, KEY_MAPPING } from '../constants';
import { RawTimetableEntry } from '../types';

interface DailyScheduleTableProps {
  data: RawTimetableEntry[];
  dayIndex: number;
}

const DailyScheduleTable: React.FC<DailyScheduleTableProps> = ({ data, dayIndex }) => {
  // Get the keys for the selected day from the mapping
  const currentDayKeys = KEY_MAPPING[dayIndex];

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            {/* Room Column Header */}
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-32 sticky left-0 bg-gray-50 border-r border-gray-200 z-10">
              Room
            </th>
            {/* Time Slot Headers */}
            {TIME_SLOTS.map((slot, index) => (
              <th key={index} scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider min-w-[200px]">
                {slot.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((roomData, rowIndex) => {
            const roomName = roomData['DAY'];
            
            // Check if this row is completely empty for the day (optional: could hide empty rows)
            // For now, we render all filtered rows.

            return (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 sticky left-0 bg-white border-r border-gray-200 z-10">
                  {roomName}
                </td>
                {currentDayKeys.map((key, slotIndex) => {
                  const content = roomData[key];
                  const hasContent = content && content.trim() !== '' && content !== roomName;

                  return (
                    <td key={key} className="px-2 py-3 align-top h-full">
                      {hasContent ? (
                        <div className="h-full w-full bg-blue-50 border-l-4 border-blue-500 rounded p-3 shadow-sm hover:shadow-md transition-shadow">
                          <p className="text-xs font-semibold text-blue-900 line-clamp-3 leading-snug">
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