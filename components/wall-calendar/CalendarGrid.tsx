"use client"

import { CalendarDay } from "@/types/calendar"
import { DAYS } from "@/constants/calendar"
import DayCell from "./DayCell"

interface CalendarGridProps {
  days: CalendarDay[]
  isStart: (date: Date) => boolean
  isEnd: (date: Date) => boolean
  isInSelectedRange: (date: Date) => boolean
  isInHoverRange: (date: Date) => boolean
  onDayClick: (date: Date) => void
  onDayHover: (date: Date) => void
  onDayLeave: () => void
}


const CalendarGrid = ({
  days,
  isStart,
  isEnd,
  isInSelectedRange,
  isInHoverRange,
  onDayClick,
  onDayHover,
  onDayLeave,
}: CalendarGridProps) => {
  return (
    <div className="px-3 py-2">
      {/* Day-of-week header row */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((day) => (
          <div
            key={day}
            className={`
              text-center text-xs font-bold tracking-widest py-1
              ${day === "Sat" || day === "Sun" ? "text-blue-400" : "text-gray-400"}
            `}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day cells grid — 35 or 42 cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {days.map((day, index) => (
          <DayCell
            key={index}
            day={day}
            isStart={isStart(day.date)}
            isEnd={isEnd(day.date)}
            isInRange={isInSelectedRange(day.date)}
            isInHoverRange={isInHoverRange(day.date)}
            onClick={onDayClick}
            onMouseEnter={onDayHover}
            onMouseLeave={onDayLeave}
          />
        ))}
      </div>
    </div>
  )
}

export default CalendarGrid