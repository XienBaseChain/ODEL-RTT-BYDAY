import React from 'react';
import TimetableGrid from './TimetableGrid';
import { RawTimetableEntry } from '../types';

interface RoomDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: RawTimetableEntry | null;
}

const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col transform transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white rounded-t-2xl">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Room Details
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Full weekly schedule for <span className="font-semibold text-[#23a440]">{data['DAY']}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#23a440]"
            aria-label="Close modal"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto bg-gray-50 rounded-b-2xl">
           <TimetableGrid data={data} />
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsModal;