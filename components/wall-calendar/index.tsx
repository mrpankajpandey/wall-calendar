"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroImage from "./HeroImage"
import CalendarHeader from "./CalendarHeader"
import CalendarGrid from "./CalendarGrid"
import NotesPanel from "./NotesPanel"
import useCalendar from "@/hooks/useCalendar"
import useDateRange from "@/hooks/useDateRange"
import useNotes from "@/hooks/useNotes"
import { formatLabel } from "@/lib/calendar-utils"

const WallCalendar = () => {
    const calendar = useCalendar()
    const range = useDateRange()
    const notes = useNotes()

    const [isFlipping, setIsFlipping] = useState(false)

    const animateAndNavigate = (direction: "prev" | "next") => {
        setIsFlipping(true)
        setTimeout(() => {
            direction === "prev" ? calendar.goToPrevMonth() : calendar.goToNextMonth()
            setIsFlipping(false)
        }, 200)
    }

    const rangeLabel =
        range.dateRange.start && range.dateRange.end
            ? formatLabel(range.dateRange.start, range.dateRange.end)
            : null

    return (
        <div className="bg-gray-100 flex items-center justify-center py-10 md:py-16 px-4">
            <div
                className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08)" }}
            >

                {/* Spiral binding bar at the top */}
                <div className="h-5 bg-gray-200 flex items-center justify-center gap-3 relative z-10">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-3 h-3 rounded-full border-2 border-gray-400 bg-gray-300"
                            style={{ marginTop: "-4px" }}
                        />
                    ))}
                    {/* Hook in the middle */}
                    <div className="absolute  left-1/2 -translate-x-1/2 w-4 h-6 border-2 border-gray-500 rounded-full" />
                </div>

                {/* Main content — desktop: 2 columns, mobile: 1 column */}
                <div className="flex flex-col md:flex-row">

                    {/* LEFT PANEL: Image + Calendar */}
                    <div
                        className={`
              flex-1 min-w-0 flex flex-col
              transition-all duration-200
              ${isFlipping ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"}
            `}
                    >
                        {/* Hero photo with month/year overlay */}
                        <HeroImage month={calendar.currentMonth} year={calendar.currentYear} />

                        {/* Month navigation header */}
                        <CalendarHeader
                            month={calendar.currentMonth}
                            year={calendar.currentYear}
                            onPrev={() => animateAndNavigate("prev")}
                            onNext={() => animateAndNavigate("next")}
                        />

                        {/* Selected range status bar */}
                        {rangeLabel && (
                            <div className="flex items-center justify-between px-4 py-1.5 bg-blue-50 border-b border-blue-100">
                                <span className="text-xs text-blue-600 font-medium">
                                    📅 {rangeLabel}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={range.clearRange}
                                    className="h-5 w-5 text-blue-400 hover:text-blue-600 hover:bg-blue-100"
                                    aria-label="Clear selection"
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        )}

                        {/* Calendar day grid */}
                        <CalendarGrid
                            days={calendar.days}
                            isStart={range.isStart}
                            isEnd={range.isEnd}
                            isInSelectedRange={range.isInSelectedRange}
                            isInHoverRange={range.isInHoverRange}
                            onDayClick={range.handleDayClick}
                            onDayHover={range.handleDayHover}
                            onDayLeave={range.handleDayLeave}
                        />

                        {/* Legend */}
                        <div className="flex items-center gap-4 px-4 py-2 border-t border-gray-100">
                            <LegendItem color="bg-blue-500" label="Start / End" />
                            <LegendItem color="bg-blue-100" label="In range" />
                            <LegendItem color="bg-orange-400" label="Holiday" />
                            <LegendItem color="bg-blue-400 rounded-full w-1.5 h-1.5" label="Today" dot />
                        </div>
                    </div>

                    {/* Divider — vertical on desktop, horizontal on mobile */}
                    <div className="w-px bg-gray-100 hidden md:block" />
                    <div className="h-px bg-gray-100 md:hidden" />

                    {/* RIGHT PANEL: Notes */}
                    <div className="w-full md:w-64 flex flex-col border-t md:border-t-0 border-gray-100">
                        <NotesPanel
                            notes={notes.notes}
                            dateRange={range.dateRange}
                            onAddNote={notes.addNote}
                            onDeleteNote={notes.deleteNote}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

const LegendItem = ({
    color,
    label,
    dot,
}: {
    color: string
    label: string
    dot?: boolean
}) => (
    <div className="flex items-center gap-1">
        {dot ? (
            <span className={`inline-block w-2 h-2 rounded-full ${color}`} />
        ) : (
            <span className={`inline-block w-3 h-2 rounded-sm ${color}`} />
        )}
        <span className="text-[10px] text-gray-400">{label}</span>
    </div>
)

export default WallCalendar