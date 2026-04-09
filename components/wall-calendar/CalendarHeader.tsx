"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MONTHS } from "@/constants/calendar"

interface CalendarHeaderProps {
  month: number
  year: number
  onPrev: () => void
  onNext: () => void
}

const CalendarHeader = ({ month, year, onPrev, onNext }: CalendarHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
      {/* Prev month button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrev}
        className="h-8 w-8 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
        aria-label="Previous month"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Month + Year label */}
      <h2 className="text-sm font-bold tracking-widest uppercase text-gray-700">
        {MONTHS[month]} {year}
      </h2>

      {/* Next month button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        className="h-8 w-8 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
        aria-label="Next month"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default CalendarHeader