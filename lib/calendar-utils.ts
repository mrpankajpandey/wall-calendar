import { CalendarDay } from "@/types/calendar";

export const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const isInRange = (date: Date, start: Date, end: Date): boolean =>
  date > start && date < end;

export const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
export const formatLabel = (start: Date, end: Date): string => {
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(start)} – ${fmt(end)}`;
};

export const buildCalendarDays = (
  month: number,
  year: number,
): CalendarDay[] => {
  const days: CalendarDay[] = [];
  const today = new Date();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  let startPadding = firstDayOfMonth.getDay() - 1;
  if (startPadding === -1) startPadding = 6; // Sunday wraps to 6

  for (let i = startPadding - 1; i >= 0; i--) {
    const date = new Date(year, month, -i); // JS allows day=0 → last day of prev month, day=-1 → 2nd last, etc.
    days.push({
      date,
      isCurrentMonth: false,
      isToday: isSameDay(date, today),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
    });
  }

  for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
    const date = new Date(year, month, d);
    days.push({
      date,
      isCurrentMonth: true,
      isToday: isSameDay(date, today),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
    });
  }

  const totalCells = days.length <= 35 ? 35 : 42;
  const remainingDays = totalCells - days.length;
  for (let d = 1; d <= remainingDays; d++) {
    const date = new Date(year, month + 1, d);
    days.push({
      date,
      isCurrentMonth: false,
      isToday: isSameDay(date, today),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
    });
  }

  return days;
};
