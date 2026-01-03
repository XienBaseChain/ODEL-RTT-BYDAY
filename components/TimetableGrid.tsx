import React from 'react';
import { TIME_SLOTS, DAYS, KEY_MAPPING } from '../constants';
import { RawTimetableEntry } from '../types';

interface TimetableGridProps {
  data: RawTimetableEntry;
}

const TimetableGrid: React.FC<TimetableGridProps> = ({ data }) => {
  const roomName = data['DAY'];

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200 mt-6">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">
          Schedule for <span className="text-indigo-600">{roomName}</span>
        </h2>
        <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
          Weekly View
        </span>
      </div>
      
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-100 z-10 border-r border-gray-200 shadow-sm w-32">
              Day
            </th>
            {TIME_SLOTS.map((slot, index) => (
              <th key={index} scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider min-w-[160px]">
                <div className="flex flex-col">
                  <span>{slot.start}</span>
                  <span className="text-gray-400 font-normal">to</span>
                  <span>{slot.end}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {DAYS.map((day, dayIndex) => {
            const rowKeys = KEY_MAPPING[dayIndex];
            
            return (
              <tr key={day} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">
                  {day}
                </td>
                {rowKeys.map((key, slotIndex) => {
                  const content = data[key];
                  const isEmpty = !content || content.trim() === '';
                  const isRoomLabel = content === roomName; // Sometimes the room name is repeated in slots

                  return (
                    <td 
                      key={key} 
                      className={`px-4 py-4 text-center border-l border-gray-100 align-top ${isEmpty ? 'bg-gray-50/50' : ''}`}
                    >
                      {!isEmpty && !isRoomLabel ? (
                        <div className="bg-indigo-50 text-indigo-700 p-3 rounded-lg border border-indigo-100 shadow-sm h-full flex items-center justify-center">
                          <span className="font-medium text-xs sm:text-sm break-words w-full">
                            {content}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-300 text-xs italic">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TimetableGrid;