"use client"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  onPrev: () => void
  onNext: () => void
}

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  onPrev,
  onNext,
}: PaginationProps) => {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100 text-xs bg-white">
      
      <span className="text-gray-400">
        {totalItems} notes
      </span>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-gray-500">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination