import { SetURLSearchParams } from "react-router-dom";
import classes from "../styles/component/Pagination.module.css";
import { getPages } from "../utils/utils";
import ArrrowIcon from "./icons/ArrrowIcon";

type PaginationProps = {
  activePage: string;
  total?: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  setSearchParams: SetURLSearchParams;
};

const Pagination = ({
  total,
  activePage,
  setSearchParams,
  hasNextPage,
  hasPrevPage,
}: PaginationProps) => {
  const pages = getPages(total!);

  const handleSetActivePage = (page: string) => {
    setSearchParams((prev) => {
      prev.set("page", page);
      return prev;
    });
  };

  const handleNextPageClick = () => {
    const nextPage = parseInt(activePage) + 1;
    setSearchParams((prev) => {
      prev.set("page", nextPage.toString());
      return prev;
    });
  };

  const handlePrevPageClick = () => {
    const prevPage = parseInt(activePage) - 1;
    setSearchParams((prev) => {
      prev.set("page", prevPage.toString());
      return prev;
    });
  };

  return (
    <div className={classes["pagination-container"]}>
      {hasPrevPage && (
        <button
          onClick={handlePrevPageClick}
          className={`${classes["prev-button"]}`}
        >
          <ArrrowIcon />
        </button>
      )}
      {pages &&
        pages.map((page, i) => (
          <button
            key={page}
            className={`${classes["pagination-number"]} ${
              activePage === page ? classes.active : ""
            } `}
            onClick={() => handleSetActivePage(page)}
            onKeyDown={() => handleSetActivePage(page)}
            role="button"
            tabIndex={i}
          >
            {page}
          </button>
        ))}
      {hasNextPage && (
        <button onClick={handleNextPageClick}>
          <ArrrowIcon />
        </button>
      )}
    </div>
  );
};

export default Pagination;
