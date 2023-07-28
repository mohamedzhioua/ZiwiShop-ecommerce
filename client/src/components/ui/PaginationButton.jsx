import { useMemo } from "react";
import {Stack } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { createQueryString } from "../../utils/queryString";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton"
import PropTypes from "prop-types";

const  PaginationButton =(props) => {
  const {
    isMobileScreen,
    pageCount,
    page,
    per_page,
    sort,
    isPending,
    searchParams,
    siblingCount = 1,
  } = props
  const navigate = useNavigate();
  
  
  // Memoize pagination range to avoid unnecessary re-renders
  const paginationRange = useMemo(() => {
    const delta = siblingCount + 2;

    const range = [];
    for (let i = Math.max(2, Number(page) - delta); i <= Math.min(pageCount - 1, Number(page) + delta); i++) {
      range.push(i);
    }

    if (Number(page) - delta > 2) {
      range.unshift("...");
    }
    if (Number(page) + delta < pageCount - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (pageCount !== 1) {
      range.push(pageCount);
    }

    return range;
  }, [pageCount, page, siblingCount]);
  const maxVisiblePages = 5;


  return (
    <Stack
      direction="row"
      alignItems="center"
      marginTop={10}
      spacing={2}
      justifyContent={isMobileScreen ? "center" : "flex-start"} // Center on smaller screens
    >
      <CustomButton
        variant="outlined"
        size="small"
        onClick={() => {
          const queryString = createQueryString(searchParams, {
            page: 1,
            per_page: per_page ?? null,
            sort,
          });
          navigate(`${location.pathname}?${queryString}`);
        }}
        disabled={Number(page) === 1 || isPending}
        startIcon={<ChevronLeft />}
      >
        First
      </CustomButton>
      <CustomButton
        variant="outlined"
        size="small"
        onClick={() => {
          const queryString = createQueryString(searchParams, {
            page: Number(page) - 1,
            per_page: per_page ?? null,
            sort,
          });
          navigate(`${location.pathname}?${queryString}`);
        }}
        disabled={Number(page) === 1 || isPending}
        startIcon={<ChevronLeft />}
      >
        Prev
      </CustomButton>

      {isMobileScreen ? (
        // Render a simplified pagination for smaller screens
        <>
          {paginationRange.slice(1, -1).map((pageNumber, i) => (
            <CustomButton
              key={i}
              variant={Number(page) === pageNumber ? "contained" : "outlined"}
              size="small"
              onClick={() => {
                const queryString = createQueryString(searchParams, {
                  page: pageNumber,
                  per_page: per_page ?? null,
                  sort,
                });
                navigate(`${location.pathname}?${queryString}`);
              }}
              disabled={isPending}
            >
              {pageNumber}
            </CustomButton>
          ))}
          {paginationRange.length > maxVisiblePages && (
            <CustomButton
              variant="outlined"
              size="small"
              disabled
            >
              ...
            </CustomButton>
          )}
        </>
      ) : (
        // Render the full pagination for larger screens
        <>
          {paginationRange.map((pageNumber, i) =>
            pageNumber === "..." ? (
              <CustomButton key={i} variant="outlined" size="small" disabled>
                ...
              </CustomButton>
            ) : (
              <CustomButton
                key={i}
                variant={Number(page) === pageNumber ? "contained" : "outlined"}
                size="small"
                onClick={() => {
                  const queryString = createQueryString(searchParams, {
                    page: pageNumber,
                    per_page: per_page ?? null,
                    sort,
                  });
                  navigate(`${location.pathname}?${queryString}`);
                }}
                disabled={isPending}
              >
                {pageNumber}
              </CustomButton>
            )
          )}
        </>
      )}

      <CustomButton
        variant="outlined"
        size="small"
        onClick={() => {
          const queryString = createQueryString(searchParams, {
            page: Number(page) + 1,
            per_page: per_page ?? null,
            sort,
          });
          navigate(`${location.pathname}?${queryString}`);
        }}
        disabled={Number(page) === (pageCount ?? 10) || isPending}
        endIcon={<ChevronRight />}
      >
        Next
      </CustomButton>
      <CustomButton
        variant="outlined"
        size="small"
        onClick={() => {
          const queryString = createQueryString(searchParams, {
            page: pageCount ?? 10,
            per_page: per_page ?? null,
            sort,
          });
          navigate(`${location.pathname}?${queryString}`);
        }}
        disabled={Number(page) === (pageCount ?? 10) || isPending}
        endIcon={<ChevronRight />}
      >
        Last
      </CustomButton>
    </Stack>
  );
};

PaginationButton.propTypes = {
  pageCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  per_page: PropTypes.number,
  sort: PropTypes.string,
  isPending: PropTypes.bool,
  siblingCount: PropTypes.number,
  isMobileScreen: PropTypes.bool,
  searchParams: PropTypes.string,
};

export default PaginationButton;
  