"use client"

import { useState, useEffect } from "react"
import { Note } from "@/types/calendar"

const STORAGE_KEY = "wall-calendar-notes"

interface UseNotesReturn {
  notes: Note[]
  addNote: (text: string, dateRangeLabel: string) => void
  deleteNote: (id: string) => void
  clearAll: () => void
}

const useNotes = (): UseNotesReturn => {
  const [notes, setNotes] = useState<Note[]>([])

  // Load from localStorage on first render
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setNotes(JSON.parse(stored))
      }
    } catch {
      // localStorage not available (SSR or private mode) — silently skip
    }
  }, [])

  // Persist to localStorage whenever notes change
  const persist = (updated: Note[]) => {
    setNotes(updated)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {
      // silently skip
    }
  }

  const addNote = (text: string, dateRangeLabel: string) => {
    if (!text.trim()) return
    const newNote: Note = {
      id: `note-${Date.now()}`,
      text: text.trim(),
      dateRangeLabel,
      createdAt: new Date().toISOString(),
    }
    persist([newNote, ...notes])
  }

  const deleteNote = (id: string) => {
    persist(notes.filter((n) => n.id !== id))
  }

  const clearAll = () => persist([])

  return { notes, addNote, deleteNote, clearAll }
}

export default useNotes