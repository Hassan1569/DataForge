import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button.jsx';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-ink-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button variant="secondary" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button variant="secondary" size="sm" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-ink-700">
            Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-ink-400 ring-1 ring-inset ring-ink-300 hover:bg-ink-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-ink-400 ring-1 ring-inset ring-ink-300 hover:bg-ink-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}