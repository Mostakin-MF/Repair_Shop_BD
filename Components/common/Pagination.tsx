import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  searchParams = {},
}: PaginationProps) {
  // Helper to build URL with existing search params
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    
    // Add existing params
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== 'page' && value) {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, v));
        } else {
          params.append(key, value);
        }
      }
    });
    
    // Add page param
    params.set('page', page.toString());
    
    return `${baseUrl}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Link 
        href={currentPage > 1 ? createPageUrl(currentPage - 1) : '#'} 
        aria-disabled={currentPage <= 1}
        className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
      >
        <Button variant="outline" size="sm" disabled={currentPage <= 1}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          পূর্ববর্তী
        </Button>
      </Link>

      <div className="flex items-center gap-1 text-sm font-medium">
        <span className="px-3 py-1 bg-muted rounded-md min-w-[3rem] text-center">
          {currentPage} / {totalPages}
        </span>
      </div>

      <Link 
        href={currentPage < totalPages ? createPageUrl(currentPage + 1) : '#'} 
        aria-disabled={currentPage >= totalPages}
        className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
      >
        <Button variant="outline" size="sm" disabled={currentPage >= totalPages}>
          পরবর্তী
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </Link>
    </div>
  );
}
