import { FIRST_PAGE, MAX_PAGES_TO_SHOW } from "@/constants";
import React from "react";
import { Pagination } from "react-bootstrap";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const getPaginationItems = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const paginationItems = [];

  const middleItem = Math.ceil(MAX_PAGES_TO_SHOW / 2);

  let startPage = currentPage - middleItem;
  let endPage = currentPage + middleItem - 1;

  if (startPage < 1) {
    endPage += Math.abs(startPage) + 1;
    startPage = 1;
  }

  if (endPage > totalPages) {
    startPage -= endPage - totalPages;
    endPage = totalPages;
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationItems.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => onPageChange(i)}>
        {i}
      </Pagination.Item>
    );
  }

  return paginationItems;
};

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => (
  <Pagination>
    <Pagination.First onClick={() => onPageChange(FIRST_PAGE)} />
    <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === FIRST_PAGE} />
    {getPaginationItems({
      currentPage,
      totalPages,
      onPageChange,
    })}
    <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
    <Pagination.Last onClick={() => onPageChange(totalPages)} />
  </Pagination>
);

export default PaginationComponent;
