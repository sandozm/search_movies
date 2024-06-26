import React from "react";
import Button from "@/components/atoms/Button";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  ...restProps
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div {...restProps}>
      {currentPage !== 1 && <Button onClick={handlePrevious}>{"<"}</Button>}
      <span>{`Page ${currentPage} sur ${totalPages}`}</span>
      {currentPage !== totalPages && (
        <Button onClick={handleNext}>{">"}</Button>
      )}
    </div>
  );
};

export default Pagination;
