export interface DateRange {
  start: Date | null
  end: Date | null
}

export interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isWeekend: boolean
}

export interface Note {
  id: string
  text: string
  dateRangeLabel: string
  createdAt: string
}

export interface CalendarState {
  currentMonth: number
  currentYear: number
  dateRange: DateRange
  hoverDate: Date | null
}