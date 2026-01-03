import React from 'react';

interface DashboardStatsProps {
  totalClasses: number;
  activeRooms: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ totalClasses, activeRooms }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* About Card */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-[#23a440]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-bold text-gray-900">About This Timetable</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            This interactive tool visualizes the <span className="font-semibold text-gray-800">2026 Residential School Timetable</span> for Open and Distance Learning (ODL) students. The schedule covers intensive sessions typically held at Chreso University. Use the search bar to find specific courses or rooms.
          </p>
        </div>
        <div className="flex justify-end">
          <button className="text-sm text-[#23a440] font-medium hover:text-[#1a7a30] transition-colors">
          </button>
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">Quick Stats</h4>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-3xl font-extrabold text-gray-900">{totalClasses}</div>
            <div className="text-xs text-gray-500 mt-1 font-medium">Total Classes</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-3xl font-extrabold text-gray-900">{activeRooms}</div>
            <div className="text-xs text-gray-500 mt-1 font-medium">Active Rooms</div>
          </div>
        </div>
        <div className="mt-6 flex justify-between text-xs text-gray-400 px-1">
          <span>Includes Sat/Sun</span>
          <span>08:00 - 18:00</span>
        </div>
      </div>
    </div>
  );
};