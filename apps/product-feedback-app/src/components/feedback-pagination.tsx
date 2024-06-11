'use client';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function FeedbackPagination({ feedbacksCount }: { feedbacksCount: number }) {
    const MAX = Math.ceil(feedbacksCount / 10);

    const searchParams = useSearchParams();

    const { replace } = useRouter();
    const pathname = usePathname();

    const handlePaginationClick = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', `${page}`);
        replace(`${pathname}?${params.toString()}`);
    }

    const [currentPage, setCurrentPage] = useState(+(searchParams?.get('page') || 1));

    const handlePreviousClick = () => {
        setCurrentPage(currentPage - 1 < 1 ? 1 : currentPage - 1);
        handlePaginationClick(currentPage - 1 < 1 ? 1 : currentPage - 1);
    }

    const handleNextClick = () => {
        setCurrentPage(currentPage + 1 > MAX ? MAX : currentPage + 1);
        handlePaginationClick(currentPage + 1 > MAX ? MAX : currentPage + 1);
    }

    return (
        <Pagination className="my-5">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={handlePreviousClick} />
                </PaginationItem>
                {Array.from({ length: MAX }, (_, i) => i + 1).map((item, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink isActive={searchParams?.get('page') == `${item}`} onClick={() => handlePaginationClick(item)}>{item}</PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext onClick={handleNextClick} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
