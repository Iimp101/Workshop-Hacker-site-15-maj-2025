import React from "react";
import Button from "react-bootstrap/Button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ( { currentPage, totalPages, onPageChange} ) => {
    

    return (
        <div className="d-flex justify-content-between align-items-center">
            <Button
                variant="primary"
                disabled={currentPage === 0}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </Button>

            <div>PAGE {currentPage + 1} of {totalPages}</div>
            
            <Button
                variant="primary"
                disabled={currentPage + 1 >= totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </Button>
        </div>
    )
}

export default Pagination;