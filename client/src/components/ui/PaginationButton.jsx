import { useMemo } from "react";
import {Stack } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { createQueryString } from "../../utils/queryString";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton"

function PaginationButton(props) {
  const {
    pageCount,
    page,
    per_page,
    sort,
    isPending,
    siblingCount = 1,
  } = props
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
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

  return (
    <Stack direction="row" alignItems="center" spacing={2}  {...props}>
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
      {paginationRange.map((pageNumber, i) =>
        pageNumber === "..." ? (
          <CustomButton
            key={i}
            variant="outlined"
            size="small"
            disabled
          >
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
}

export { PaginationButton };
