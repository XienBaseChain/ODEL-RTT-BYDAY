import React, { useState, useMemo } from 'react';
import { RAW_DATA, DAYS, KEY_MAPPING } from './constants';
import { RawTimetableEntry } from './types';
import DaySelector from './components/RoomSelector'; // Note: File name kept as RoomSelector per instruction, content is DaySelector
import DailyScheduleTable from './components/DailyScheduleTable';
import { DashboardStats } from './components/DashboardStats';
import RoomFilter from './components/RoomFilter';
import RoomDetailsModal from './components/RoomDetailsModal';

const App: React.FC = () => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [selectedRoomData, setSelectedRoomData] = useState<RawTimetableEntry | null>(null);

  // 1. Process Data: Remove the first entry which is just time metadata
  const cleanData = useMemo(() => RAW_DATA.slice(1), []);

  // 2. Extract list of all available rooms for the filter
  const allRooms = useMemo(() => cleanData.map(entry => entry['DAY']).sort(), [cleanData]);

  // 3. Calculate Stats
  const stats = useMemo(() => {
    let classCount = 0;
    const activeRoomsSet = new Set<string>();

    cleanData.forEach(room => {
      let hasClass = false;
      // Iterate over all possible slot keys in KEY_MAPPING
      KEY_MAPPING.forEach(dayKeys => {
        dayKeys.forEach(key => {
          const content = room[key];
          // Check if content exists and isn't just the room name repeated
          if (content && content.trim().length > 0 && content !== room['DAY']) {
            classCount++;
            hasClass = true;
          }
        });
      });
      if (hasClass) {
        activeRoomsSet.add(room['DAY']);
      }
    });

    return {
      totalClasses: classCount,
      activeRooms: activeRoomsSet.size
    };
  }, [cleanData]);

  // 4. Filter Data based on Search AND Selected Rooms
  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    
    // Apply Room Filter first
    let data = cleanData;
    if (selectedRooms.length > 0) {
      data = data.filter(room => selectedRooms.includes(room['DAY']));
    }

    // Apply Search Query
    if (!query) return data;

    return data.filter(room => {
      // Check room name
      if (room['DAY'].toLowerCase().includes(query)) return true;

      // Check ANY slot content for the CURRENT DAY
      const dayKeys = KEY_MAPPING[activeDayIndex];
      return dayKeys.some(key => {
        const content = room[key];
        return content && content.toLowerCase().includes(query);
      });
    });
  }, [cleanData, searchQuery, activeDayIndex, selectedRooms]);

  const handleRoomClick = (roomData: RawTimetableEntry) => {
    setSelectedRoomData(roomData);
  };

  const handleCloseModal = () => {
    setSelectedRoomData(null);
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] pb-12 font-sans">
      {/* Navbar (Simplified) */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="bg-[#23a440] text-white p-1 rounded">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </span>
                Timetable Viewer
            </span>
            <div className="text-sm text-gray-500">2026 Session</div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Info Cards */}
        <DashboardStats 
          totalClasses={stats.totalClasses} 
          activeRooms={stats.activeRooms} 
        />

        {/* Day Filters */}
        <DaySelector 
          activeDayIndex={activeDayIndex} 
          onSelectDay={setActiveDayIndex} 
        />

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-[#23a440] focus:border-[#23a440] sm:text-sm shadow-sm"
              placeholder="Search course code, name, or room..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="sm:w-auto">
             <RoomFilter 
               rooms={allRooms} 
               selectedRooms={selectedRooms} 
               onChange={setSelectedRooms} 
             />
          </div>
        </div>

        {/* Main Schedule Grid */}
        <DailyScheduleTable 
          data={filteredData} 
          dayIndex={activeDayIndex} 
          onRoomClick={handleRoomClick}
        />

        {/* Room Details Modal */}
        <RoomDetailsModal 
          isOpen={!!selectedRoomData} 
          onClose={handleCloseModal} 
          data={selectedRoomData} 
        />

      </main>
    </div>
  );
};

export default App;