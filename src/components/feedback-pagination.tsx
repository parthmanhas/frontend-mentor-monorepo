'use client';

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function FeedbackPagination({ feedbacksCount }: { feedbacksCount: number | null }) {

    const MAX = Math.ceil((feedbacksCount || 0) / 10);

    const searchParams = useSearchParams();

    const { replace } = useRouter();
    const pathname = usePathname();

    const handlePaginationClick = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', `${page}`);
        replace(`${pathname}?${params.toString()}`);
    }

    const currentPageFromQueryParams = searchParams.has('page') ? Number(searchParams.get('page')) : 1;
    const [currentPage, setCurrentPage] = useState(currentPageFromQueryParams);

    const handlePreviousClick = () => {
        if (currentPage === 1) return;
        const newPage = currentPage - 1 < 1 ? 1 : currentPage - 1
        setCurrentPage(newPage);
        handlePaginationClick(newPage);
    }

    const handleNextClick = () => {
        if (currentPage === MAX) return;
        const newPage = currentPage + 1 > MAX ? MAX : currentPage + 1;
        setCurrentPage(newPage);
        handlePaginationClick(newPage);
    }

    return (
        <Pagination className="my-5">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={handlePreviousClick} />
                </PaginationItem>
                <div className="max-w-[200px] overflow-x-auto flex">
                    {Array.from({ length: MAX }, (_, i) => i + 1).map((item, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink isActive={searchParams?.get('page') == `${item}`} onClick={() => handlePaginationClick(item)}>{item}</PaginationLink>
                        </PaginationItem>
                    ))}
                </div>
                <PaginationItem>
                    <PaginationNext onClick={handleNextClick} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
