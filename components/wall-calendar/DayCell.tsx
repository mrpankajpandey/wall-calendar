"use client"

import { CalendarDay } from "@/types/calendar"
import { formatDateKey } from "@/lib/calendar-utils"
import { HOLIDAYS } from "@/constants/calendar"

interface DayCellProps {
  day: CalendarDay
  isStart: boolean
  isEnd: boolean
  isInRange: boolean       
  isInHoverRange: boolean  
  onClick: (date: Date) => void
  onMouseEnter: (date: Date) => void
  onMouseLeave: () => void
}


const DayCell = ({
  day,
  isStart,
  isEnd,
  isInRange,
  isInHoverRange,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: DayCellProps) => {
  const { date, isCurrentMonth, isToday, isWeekend } = day
  const dateKey = formatDateKey(date)
  const holiday = HOLIDAYS[dateKey]
  const isRangeFilled = isInRange || isInHoverRange
  const fillColor = isInRange ? "bg-blue-100" : "bg-blue-50"

  const capClass = isStart
    ? "rounded-l-full"
    : isEnd
      ? "rounded-r-full"
      : ""

  const textColor = !isCurrentMonth
    ? "text-gray-300"
    : isStart || isEnd
      ? "text-white"
      : isWeekend
        ? "text-blue-500"
        : "text-gray-700"

  return (
    <div
      className={`
        relative flex items-center justify-center
        ${isRangeFilled || isStart || isEnd ? fillColor : ""}
        ${capClass}
      `}
      style={{ height: "36px" }}
    >
      {/* The clickable day circle */}
      <button
        onClick={() => onClick(date)}
        onMouseEnter={() => onMouseEnter(date)}
        onMouseLeave={onMouseLeave}
        className={`
          relative z-10 flex flex-col items-center justify-center
          w-8 h-8 rounded-full text-xs font-semibold
          transition-all duration-150 select-none
          ${isStart || isEnd
            ? "bg-blue-500 text-white shadow-md scale-105"
            : isCurrentMonth
              ? "hover:bg-blue-50 hover:scale-105"
              : "cursor-default"
          }
          ${textColor}
        `}
        aria-label={date.toDateString()}
        aria-pressed={isStart || isEnd}
      >
        <span>{date.getDate()}</span>

        {/* Today indicator — small blue dot below number */}
        {isToday && !isStart && !isEnd && (
          <div className="absolute inset-0 rounded-full border border-blue-400 animate-pulse opacity-60 group">
            {/* Dot */}
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-500" />

            {/* Tooltip */}
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] px-2 py-0.5 rounded bg-blue-500 text-white opacity-0 group-hover:opacity-100 transition">
              Today
            </span>
          </div>
        )}

        {/* Holiday indicator — small orange dot */}
        {holiday && !isStart && !isEnd && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 group">

            {/* Dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 block" />

            {/* Tooltip */}
            <div
              className="
        absolute bottom-4 left-1/2 -translate-x-1/2
        whitespace-nowrap
        bg-gray-900 text-white text-[10px] px-2 py-1 rounded-md
        opacity-0 group-hover:opacity-100
        pointer-events-none
        transition-all duration-200
        shadow-md
        z-50
      "
            >
              {holiday}
            </div>
          </div>
        )}
      </button>
    </div>
  )
}

export default DayCell