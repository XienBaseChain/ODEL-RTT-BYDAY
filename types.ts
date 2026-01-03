export interface RawTimetableEntry {
  [key: string]: string;
}

export interface ClassSession {
  subject: string;
  room: string;
}

export interface DaySchedule {
  dayName: string;
  slots: string[]; // Array of strings representing the class at that time slot
}

export interface RoomSchedule {
  roomName: string;
  schedule: DaySchedule[];
}

export interface TimeSlot {
  label: string;
  start: string;
  end: string;
}