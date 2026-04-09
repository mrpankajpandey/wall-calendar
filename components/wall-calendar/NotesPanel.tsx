"use client"

import { useState } from "react"
import { Trash2, Plus, StickyNote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Note } from "@/types/calendar"
import { formatLabel } from "@/lib/calendar-utils"
import { DateRange } from "@/types/calendar"
import { paginate } from "@/lib/pagination"
import Pagination from "@/components/utility/Pagination"
interface NotesPanelProps {
  notes: Note[]
  dateRange: DateRange
  onAddNote: (text: string, label: string) => void
  onDeleteNote: (id: string) => void
}


const NotesPanel = ({ notes, dateRange, onAddNote, onDeleteNote }: NotesPanelProps) => {
  const [text, setText] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const NOTES_PER_PAGE = 8
  const { totalPages, paginatedData: paginatedNotes } = paginate(
    notes,
    currentPage,
    NOTES_PER_PAGE
  )
  const hasRange = !!dateRange.start && !!dateRange.end
  const rangeLabel = hasRange
    ? formatLabel(dateRange.start!, dateRange.end!)
    : null

  const handleSave = () => {
    if (!text.trim() || !rangeLabel) return
    onAddNote(text, rangeLabel)
    setCurrentPage(1) // Go back to first page to show new note
    setText("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ctrl+Enter or Cmd+Enter saves the note
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleSave()
    }
  }
  const handleDelete = (id: string) => {
    onDeleteNote(id)

    // Fix page if last item deleted
    if (paginatedNotes.length === 1 && currentPage > 1) {
      setCurrentPage((p) => p - 1)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Section label */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-100">
        <StickyNote className="h-3.5 w-3.5 text-blue-400" />
        <span className="text-xs font-bold tracking-widest uppercase text-gray-500">
          Notes
        </span>
      </div>

      {/* Input area */}
      <div className="px-4 py-3 border-b border-gray-100">
        {/* Show selected range label above textarea */}
        {rangeLabel ? (
          <Badge
            variant="secondary"
            className="mb-2 text-xs bg-blue-50 text-blue-600 border-blue-100"
          >
            {rangeLabel}
          </Badge>
        ) : (
          <p className="text-xs text-gray-400 mb-2 italic">
            Select a date range to attach a note
          </p>
        )}

        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={hasRange ? "Write a note... (Ctrl+Enter to save)" : "Select dates first"}
          disabled={!hasRange}
          className="text-xs resize-none border-gray-200 focus:border-blue-300 focus:ring-blue-100 min-h-[70px]"
          rows={3}
        />

        <Button
          onClick={handleSave}
          disabled={!hasRange || !text.trim()}
          size="sm"
          className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white text-xs h-7 gap-1"
        >
          <Plus className="h-3 w-3" />
          Save Note
        </Button>
      </div>

      {/* Saved notes list */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {notes.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-4 italic">
            No notes yet
          </p>
        ) : (
          paginatedNotes.map((note) => (
            <div
              key={note.id}
              className="group rounded-lg border border-gray-100 bg-gray-50 p-2.5 hover:border-blue-100 hover:bg-blue-50 transition-colors"
            >
              {/* Range label badge */}
              <div className="flex items-start justify-between gap-1 mb-1">
                <Badge
                  variant="outline"
                  className="text-[10px] px-1.5 py-0 border-blue-200 text-blue-500 bg-white shrink-0"
                >
                  {note.dateRangeLabel}
                </Badge>

                {/* Delete button — visible on hover */}
                <button
                  onClick={() => handleDelete(note.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-400 shrink-0"
                  aria-label="Delete note"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>

              {/* Note text */}
              <p className="text-xs text-gray-600 leading-relaxed break-words">
                {note.text}
              </p>
            </div>
          ))
        )}

        {/* pagination controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={notes.length}
          onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
          onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        />
      </div>
    </div>
  )
}

export default NotesPanel