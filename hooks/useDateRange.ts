"use client"

import { useState } from "react"
import { DateRange } from "@/types/calendar"
import { isSameDay, isInRange } from "@/lib/calendar-utils"

interface UseDateRangeReturn {
  dateRange: DateRange
  hoverDate: Date | null
  handleDayClick: (date: Date) => void
  handleDayHover: (date: Date) => void
  handleDayLeave: () => void
  clearRange: () => void
  isStart: (date: Date) => boolean
  isEnd: (date: Date) => boolean
  isInSelectedRange: (date: Date) => boolean
  isInHoverRange: (date: Date) => boolean
}

const useDateRange = (): UseDateRangeReturn => {
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null })
  const [hoverDate, setHoverDate] = useState<Date | null>(null)

  const handleDayClick = (date: Date) => {
    const { start, end } = dateRange

    // Case 1: No start yet — set start
    if (!start) {
      setDateRange({ start: date, end: null })
      return
    }

    // Case 2: Start exists, no end yet
    if (start && !end) {
      // Clicked same day as start → reset
      if (isSameDay(date, start)) {
        setDateRange({ start: null, end: null })
        return
      }
      // Clicked before start → swap: new start is clicked date
      if (date < start) {
        setDateRange({ start: date, end: start })
        return
      }
      // Normal case: set end
      setDateRange({ start, end: date })
      setHoverDate(null)
      return
    }

    // Case 3: Both set → start a new selection
    setDateRange({ start: date, end: null })
    setHoverDate(null)
  }

  const handleDayHover = (date: Date) => {
    if (dateRange.start && !dateRange.end) {
      setHoverDate(date)
    }
  }

  const handleDayLeave = () => {
    setHoverDate(null)
  }

  const clearRange = () => {
    setDateRange({ start: null, end: null })
    setHoverDate(null)
  }


  const isStart = (date: Date): boolean =>
    !!dateRange.start && isSameDay(date, dateRange.start)

  const isEnd = (date: Date): boolean =>
    !!dateRange.end && isSameDay(date, dateRange.end)

  // True range (confirmed start + end)
  const isInSelectedRange = (date: Date): boolean => {
    if (!dateRange.start || !dateRange.end) return false
    return isInRange(date, dateRange.start, dateRange.end)
  }

  const isInHoverRange = (date: Date): boolean => {
    if (!dateRange.start || dateRange.end || !hoverDate) return false
    const [rangeStart, rangeEnd] =
      hoverDate > dateRange.start
        ? [dateRange.start, hoverDate]
        : [hoverDate, dateRange.start]
    return isInRange(date, rangeStart, rangeEnd)
  }

  return {
    dateRange,
    hoverDate,
    handleDayClick,
    handleDayHover,
    handleDayLeave,
    clearRange,
    isStart,
    isEnd,
    isInSelectedRange,
    isInHoverRange,
  }
}

export default useDateRange