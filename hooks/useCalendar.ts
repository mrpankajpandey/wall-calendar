"use client";

import { useState } from "react";
import { buildCalendarDays } from "@/lib/calendar-utils";
import { CalendarDay } from "@/types/calendar";
import { MONTHS } from "@/constants/calendar";

interface UseCalendarReturn {
  currentMonth: number; // 0-11
  currentYear: number;
  monthLabel: string; // e.g. "January"
  days: CalendarDay[]; // 35 or 42 grid cells
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
}

const useCalendar = (): UseCalendarReturn => {
  const today = new Date();

  const [dateState, setDateState] = useState({
    month: today.getMonth(),
    year: today.getFullYear(),
  });
  const goToNextMonth = () => {
    setDateState((prev) => {
      if (prev.month === 11) {
        return { month: 0, year: prev.year + 1 };
      }
      return { month: prev.month + 1, year: prev.year };
    });
  };

  const goToPrevMonth = () => {
    setDateState((prev) => {
      if (prev.month === 0) {
        return { month: 11, year: prev.year - 1 };
      }
      return { month: prev.month - 1, year: prev.year };
    });
  };

  const days = buildCalendarDays(dateState.month, dateState.year);

  return {
    currentMonth: dateState.month,
    currentYear: dateState.year,
    monthLabel: MONTHS[dateState.month],
    days,
    goToPrevMonth,
    goToNextMonth,
  };
};

export default useCalendar;
